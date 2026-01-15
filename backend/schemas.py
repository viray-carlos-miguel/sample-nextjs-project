# backend/schemas.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# -----------------------
# User Schemas
# -----------------------

class UserBase(BaseModel):
    name: str
    email: str
    role: str  # "patient" or "doctor"


class UserCreate(UserBase):
    pass


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True


# -----------------------
# Case Schemas
# -----------------------

class CaseBase(BaseModel):
    symptoms: str


class CaseCreate(CaseBase):
    patient_id: int


class CaseUpdate(BaseModel):
    status: Optional[str] = None
    prescription: Optional[str] = None


class CaseResponse(CaseBase):
    id: int
    patient_id: int
    status: str
    prescription: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
