import smtplib
import os
import random
from email.mime.text import MIMEText
from opentelemetry import trace
from opentelemetry.trace import StatusCode

tracer = trace.get_tracer(__name__)

def send_confirmation_email(order_data):
    """Sends an order confirmation email."""
    sender = 'scribe@emporium.com'
    receiver = order_data['user_id']
    # In a real app, you'd look up the username. For now, we'll use the user_id.
    username = order_data['user_id']
    order_id = random.randint(1000, 9999) # This is temporary until a real ID is available

    total_price = order_data.get('total_price', 'N/A')
    products = order_data.get('products', [])

    body = f"Thank you for your order, {username}!\n\n"
    body += f"Order Confirmation #{order_id}\n"
    body += f"Total Price: ${total_price / 100:.2f}\n\n"
    body += "Products:\n"
    for product in products:
        body += f"- {product.get('name')} (Quantity: {product.get('quantity')})\n"


    msg = MIMEText(body)
    msg['Subject'] = f"Order Confirmation #{order_id}"
    msg['From'] = sender
    msg['To'] = receiver

    with tracer.start_as_current_span("send_confirmation_email") as span:
        span.set_attribute("order_id", order_id)
        span.set_attribute("recipient", receiver)
        span.set_attribute("total_price", total_price)
        try:
            with smtplib.SMTP(os.getenv('SMTP_HOST', 'smtp4dev'), int(os.getenv('SMTP_PORT', 25))) as s:
                s.send_message(msg)
            print(f" [x] Sent confirmation email for order #{order_id} to {receiver}")
            span.set_status(StatusCode.OK)
        except Exception as e:
            print(f" [!] Failed to send email for order #{order_id}. Error: {e}")
            span.set_status(StatusCode.ERROR, description=str(e))
            raise
