from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS  # Import CORS


app = Flask(__name__)

CORS(app, origins="http://localhost:4200")

# Charger les artefacts
model      = joblib.load('model.pkl')
scaler     = joblib.load('scaler.pkl')
label_encs = joblib.load('label_encoders.pkl')
target_enc = joblib.load('target_encoder.pkl')

FEATURE_COLS = [
    'Competences','NomCandidate','Langues_Parlees','IDCandidate',
    'Langage_Dev','Domaine','competences_offres','salaire'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Vérifier la présence des 8 champs
    missing = [c for c in FEATURE_COLS if c not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {missing}'}), 400

    # Construire un DataFrame d’une seule ligne
    df = pd.DataFrame([{c: data[c] for c in FEATURE_COLS}])

    # Encodage des colonnes catégorielles
    for col, le in label_encs.items():
        if col in df.columns:
            val = df.at[0, col]
            df.at[0, col] = le.transform([val])[0] if val in le.classes_ else 0

    # Forcer les types numériques
    df['IDCandidate'] = pd.to_numeric(df['IDCandidate'])
    df['salaire']     = pd.to_numeric(df['salaire'])

    # Normaliser
    X_scaled = scaler.transform(df)

    # Prédiction
    y_pred  = model.predict(X_scaled)
    y_proba = model.predict_proba(X_scaled)[:, 1]

    # Décoder la prédiction
    pred_label = target_enc.inverse_transform(y_pred)[0]
    if isinstance(pred_label, np.generic):
        pred_label = pred_label.item()

    # Convertir la probabilité en float natif
    pred_proba = y_proba[0]
    if isinstance(pred_proba, np.generic):
        pred_proba = float(pred_proba)

    return jsonify({
        'prediction': pred_label,
        'probability': round(pred_proba, 4)
    })

if __name__ == '__main__':
    app.run(debug=True)
