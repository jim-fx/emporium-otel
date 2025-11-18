import pika
import json
import os
from database import SessionLocal
from src import crud
import schemas
import email_client
from tenacity import retry, stop_after_attempt, wait_fixed
import sys

RABBITMQ_HOST = os.environ.get("RABBITMQ_HOST", "rabbitmq")

@retry(wait=wait_fixed(2), stop=stop_after_attempt(5))
def get_rabbitmq_connection():
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
        print("Worker successfully connected to RabbitMQ.")
        return connection
    except pika.exceptions.AMQPConnectionError as e:
        print(f"Worker could not connect to RabbitMQ: {e}, retrying...")
        raise

def main():
    connection = get_rabbitmq_connection()
    channel = connection.channel()

    channel.queue_declare(queue='order_queue', durable=True)
    print('Worker: Waiting for messages. To exit press CTRL+C')

    def callback(ch, method, properties, body):
        print(f"Worker: Received order data")
        try:
            order_data = json.loads(body)
            order_schema = schemas.OrderCreate(**order_data)
            
            db = SessionLocal()
            db_order = crud.create_order(db=db, order=order_schema)
            db.close()
            
            print(f"Worker: Order for user {order_schema.user_id} processed and saved.")

            # Send confirmation email
            order_details = f"Order ID: {db_order.id}\nTotal Price: {db_order.total_price}"
            email_client.send_order_confirmation_email(user_id=order_schema.user_id, order_details=order_details)

            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(f"Worker: Error processing message: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False) # Avoid requeueing poison pills

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='order_queue', on_message_callback=callback)

    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
