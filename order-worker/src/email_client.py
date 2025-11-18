import smtplib
import os
from email.mime.text import MIMEText

SMTP_HOST = os.environ.get("SMTP_HOST", "smtp4dev")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 25))
SENDER_EMAIL = "noreply@emporium.com"

def send_order_confirmation_email(user_id: str, order_details: str):
    """Sends an order confirmation email to the user."""
    # In a real application, you would look up the user's email address based on the user_id
    recipient_email = f"{user_id}@example.com"

    message = MIMEText(f"Your order has been confirmed!\n\n{order_details}")
    message["Subject"] = "Order Confirmation"
    message["From"] = SENDER_EMAIL
    message["To"] = recipient_email

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.sendmail(SENDER_EMAIL, [recipient_email], message.as_string())
        print(f"Successfully sent email to {recipient_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
