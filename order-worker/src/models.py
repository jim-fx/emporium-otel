from sqlalchemy import Column, String, Integer, JSON, TIMESTAMP, func
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=False)
    products = Column(JSON, nullable=False)
    total_price = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now(), nullable=False)
