import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from tenacity import retry, stop_after_attempt, wait_fixed

SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://postgres:postgres@db:5432/app")

@retry(wait=wait_fixed(2), stop=stop_after_attempt(5))
def get_engine():
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        # Try to connect to the database
        with engine.connect() as connection:
            print("Successfully connected to the database.")
        return engine
    except Exception as e:
        print(f"Could not connect to database: {e}, retrying...")
        raise

engine = get_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
