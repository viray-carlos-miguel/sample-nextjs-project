def suggest_diagnosis(symptoms: str) -> str:
    symptoms = symptoms.lower()
    if "fever" in symptoms and "cough" in symptoms:
        return "Flu-like illness"
    elif "headache" in symptoms and "nausea" in symptoms:
        return "Migraine"
    else:
        return "General checkup recommended"

def suggest_prescription(diagnosis: str) -> str:
    if diagnosis == "Flu-like illness":
        return "Rest, hydration, paracetamol 500mg"
    elif diagnosis == "Migraine":
        return "Pain relievers, rest in dark room"
    else:
        return "Consult physician for further evaluation"
