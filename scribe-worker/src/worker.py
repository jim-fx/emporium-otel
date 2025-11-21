import pika
import os
import json
import sys
from tenacity import retry, stop_after_attempt, wait_fixed
import email_client
from tracing import configure_tracing

def callback(ch, method, properties, body):
    print(f" [x] Received order message")
    try:
        order_data = json.loads(body)
        email_client.send_confirmation_email(order_data)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(f" [!] Error processing message: {e}")
        # Message will not be requeued
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

@retry(wait=wait_fixed(2), stop=stop_after_attempt(5))
def get_rabbitmq_connection():
    try:
        rabbitmq_host = os.getenv('RABBITMQ_HOST', 'rabbitmq')
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
        print("Order-Worker successfully connected to RabbitMQ.")
        return connection
    except pika.exceptions.AMQPConnectionError as e:
        print(f"Order-Worker could not connect to RabbitMQ: {e}, retrying...")
        raise

def main():
    configure_tracing()
    connection = get_rabbitmq_connection()
    channel = connection.channel()

    channel.queue_declare(queue='order_queue', durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='order_queue', on_message_callback=callback)

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        print('Interrupted')
        channel.stop_consuming()
        connection.close()
        sys.exit(0)

if __name__ == '__main__':
    main()
