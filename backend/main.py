from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, crud, database, ai_logic

app = FastAPI(title="AI-Assisted Medical Demo")
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/cases/", response_model=schemas.CaseOut)
def submit_case(case: schemas.CaseCreate, db: Session = Depends(get_db)):
    db_case = crud.create_case(db, case)
    diagnosis = ai_logic.suggest_diagnosis(case.symptoms)
    prescription = ai_logic.suggest_prescription(diagnosis)
    crud.update_case(db, db_case.id, schemas.CaseUpdate(prescription=prescription, status="reviewed"))
    return crud.get_case(db, db_case.id)

@app.get("/cases/patient/{patient_id}", response_model=list[schemas.CaseOut])
def get_patient_cases(patient_id: int, db: Session = Depends(get_db)):
    return crud.get_cases_by_patient(db, patient_id)

@app.get("/cases/pending", response_model=list[schemas.CaseOut])
def get_pending(db: Session = Depends(get_db)):
    return crud.get_pending_cases(db)

@app.put("/cases/{case_id}", response_model=schemas.CaseOut)
def update_case(case_id: int, update: schemas.CaseUpdate, db: Session = Depends(get_db)):
    db_case = crud.update_case(db, case_id, update)
    if not db_case:
        raise HTTPException(status_code=404, detail="Case not found")
    return db_case
