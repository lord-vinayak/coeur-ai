#!/usr/bin/env python3
"""
test_end_to_end_model.py

Test the Conv1D end-to-end raw audio model (1s 16kHz audio) in Python.
Supports single-file and whole-folder prediction.
"""

import json
import numpy as np
import librosa
import tensorflow as tf
from pathlib import Path

# --------- Paths ---------
MODEL_PATH  = Path(__file__).resolve().parents[1] / "models" / "end_to_end_model2.h5"
LABELS_PATH = Path(__file__).resolve().parents[1] / "data" / "manifests" / "labels.json"
SAMPLE_RATE = 16000
AUDIO_LENGTH = SAMPLE_RATE * 2  # 1 second

# --------- Load model ---------
print("🔄 Loading model...")
model = tf.keras.models.load_model(MODEL_PATH, compile=False)
print("✅ Model loaded successfully.")

# --------- Load labels ---------
with open(LABELS_PATH) as f:
    labels = json.load(f)

# --------- Prediction function ---------
def predict_file(file_path):
    """Predict a single audio file"""
    y, sr = librosa.load(file_path, sr=SAMPLE_RATE, mono=True)

    # Pad or truncate to 1 second
    if len(y) < AUDIO_LENGTH:
        y = np.pad(y, (0, AUDIO_LENGTH - len(y)))
    else:
        y = y[:AUDIO_LENGTH]

    # Add batch & channel dimension
    y = np.expand_dims(y, axis=(0, -1))  # shape (1, 16000, 1)

    # Predict
    pred = model.predict(y, verbose=0)
    class_idx = np.argmax(pred[0])
    return labels[class_idx], pred[0]

def predict_folder(folder_path):
    """Predict all .wav files in a folder"""
    folder_path = Path(folder_path)
    results = []
    for wav_file in folder_path.glob("*.wav"):
        try:
            label, probs = predict_file(wav_file)
            results.append((wav_file.name, label, probs))
            print(f"🎵 {wav_file.name} → {label}")
        except Exception as e:
            print(f"[WARN] Failed to process {wav_file}: {e}")
    return results

# --------- Example usage ---------
if __name__ == "__main__":
    # Change this to your test folder
    test_folder = Path("./data/newtest")
    results = predict_folder(test_folder)

    print("\n📊 Final Results:")
    for fname, label, probs in results:
        print(f"{fname}: {label} ({probs})")
