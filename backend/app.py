import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
# We need these for password hashing
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # allow frontend to access backend

# --- Filenames for our simple file-based database ---
# These files will be created in your 'backend' folder
USERS_FILE = 'users.json'
HELP_FILE = 'help_messages.json'

# Helper function to read data from our JSON files
def read_data(file_name):
    if not os.path.exists(file_name):
        return []  # Return an empty list if file doesn't exist
    try:
        with open(file_name, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []  # Return empty list if file is empty or corrupt

# Helper function to write data to our JSON files
def write_data(file_name, data):
    with open(file_name, 'w') as f:
        json.dump(data, f, indent=4)


# --- NEW ROUTE: User Signup ---
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    users = read_data(USERS_FILE)

    # Check if user already exists
    for user in users:
        if user['email'] == email:
            return jsonify({"error": "Email already exists"}), 400

    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Add new user
    users.append({"email": email, "password": hashed_password})
    write_data(USERS_FILE, users)

    return jsonify({"success": "User created successfully"}), 201

# --- NEW ROUTE: User Login ---
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    users = read_data(USERS_FILE)

    for user in users:
        if user['email'] == email and check_password_hash(user['password'], password):
            # Passwords match!
            return jsonify({"success": "Login successful"}), 200

    return jsonify({"error": "Invalid email or password"}), 401

# --- NEW ROUTE: Help/Message ---
@app.route('/help', methods=['POST'])
def help_message():
    data = request.json
    email = data.get('email')
    contact = data.get('contact')
    info = data.get('info')

    if not email or not info:
        return jsonify({"error": "Email and message are required"}), 400

    messages = read_data(HELP_FILE)
    messages.append({"email": email, "contact": contact, "info": info})
    write_data(HELP_FILE, messages)

    return jsonify({"success": "Message received. We will get back to you soon."}), 200


# --- YOUR ORIGINAL /analyze ROUTE (UNCHANGED) ---
@app.route('/analyze', methods=['POST'])
def analyze_symptoms():
    data = request.get_json()
    symptoms = data.get("symptoms", "").lower()

    if not symptoms:
        return jsonify({"error": "No symptoms provided."}), 400

    # Simple logic (you can improve with AI later)
    if "chest" in symptoms and "pain" in symptoms:
        return jsonify({
            "triage_level": "Emergency",
            "reasoning": "Chest pain can indicate a heart attack or serious condition.",
            "specialist": "Cardiologist",
            "google_query": "Cardiologist near me"
        })
    elif "headache" in symptoms:
        return jsonify({
            "triage_level": "Routine",
            "reasoning": "Likely tension or migraine headache. Rest and hydration recommended.",
            "specialist": "Neurologist",
            "google_query": "Neurologist near me"
        })
    elif "fever" in symptoms:
        return jsonify({
            "tGriage_level": "Routine",
            "reasoning": "Possible infection or flu.",
            "specialist": "General Physician",
            "google_query": "General Physician near me"
        })
    else:
        return jsonify({
            "triage_level": "Self-Care",
            "reasoning": "No critical symptoms detected.",
            "specialist": "General Practitioner",
            "google_query": "Clinic near me"
        })

if __name__ == '__main__':
    # Make sure to run on port 5000 so the frontend can find it
    app.run(debug=True, port=5000)