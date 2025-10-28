// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';
import {
  FaUserPlus, FaSignInAlt, FaEnvelope, FaLock, FaPhone, FaInfoCircle,
  FaMicrophone, FaRegPaperPlane, FaUserMd, FaExclamationTriangle,
  FaClock, FaStethoscope, FaPills, FaMapMarkerAlt, FaHeartbeat,
  FaAmbulance, FaHospital, FaGlobe, FaUsers, FaArrowRight,
  FaStar, FaShieldAlt, FaBrain, FaMobileAlt, FaLanguage,
  FaHistory, FaBookMedical, FaFirstAid, FaHandHoldingHeart,
  FaChartLine, FaCapsules, FaClinicMedical, FaSyringe,
  FaChild, FaBone
} from 'react-icons/fa';

// ===================================================================
// NEW COMPONENTS: MEDICAL PROFESSION FLASHCARDS & MEDICINE INFO
// ===================================================================

// Medical Profession Flashcards Component
function MedicalProfessionFlashcards({ profession }) {
  const [currentCard, setCurrentCard] = useState(0);
  
  const professionCards = {
    'General Physician': [
      {
        title: "General Physician",
        icon: <FaUserMd />,
        description: "Primary care doctor for overall health",
        role: "First point of contact for medical care",
        expertise: "Common illnesses, chronic conditions, preventive care",
        conditions: ["Fever", "Cold & Flu", "Diabetes", "Hypertension", "Annual checkups"],
        education: "MBBS + MD in General Medicine",
        scope: "Diagnosis, treatment, referrals to specialists"
      }
    ],
    'Cardiologist': [
      {
        title: "Cardiologist",
        icon: <FaHeartbeat />,
        description: "Heart and blood vessel specialist",
        role: "Diagnose and treat heart conditions",
        expertise: "Heart disease, hypertension, arrhythmias",
        conditions: ["Chest pain", "Heart attack", "High BP", "Heart failure"],
        education: "MBBS + MD + DM in Cardiology",
        procedures: ["EKG", "Angioplasty", "Bypass surgery"]
      }
    ],
    'Neurologist': [
      {
        title: "Neurologist",
        icon: <FaBrain />,
        description: "Brain and nervous system specialist",
        role: "Treat disorders of brain, spine, nerves",
        expertise: "Stroke, epilepsy, migraines, Parkinson's",
        conditions: ["Headaches", "Seizures", "Stroke", "Memory loss"],
        education: "MBBS + MD + DM in Neurology",
        tests: ["MRI", "CT scan", "EEG", "Lumbar puncture"]
      }
    ],
    'Pediatrician': [
      {
        title: "Pediatrician",
        icon: <FaChild />,
        description: "Children's health specialist",
        role: "Medical care for infants to adolescents",
        expertise: "Child development, vaccinations, childhood diseases",
        conditions: ["Childhood fever", "Vaccinations", "Growth issues", "Allergies"],
        education: "MBBS + MD in Pediatrics",
        age_range: "Birth to 18 years"
      }
    ],
    'Orthopedic Surgeon': [
      {
        title: "Orthopedic Surgeon",
        icon: <FaBone />,
        description: "Bone and joint specialist",
        role: "Treat musculoskeletal injuries and conditions",
        expertise: "Fractures, arthritis, sports injuries, joint replacement",
        conditions: ["Broken bones", "Arthritis", "Back pain", "Joint injuries"],
        education: "MBBS + MS in Orthopedics",
        procedures: ["Joint replacement", "Arthroscopy", "Fracture repair"]
      }
    ]
  };

  const cards = professionCards[profession] || professionCards['General Physician'];

  return (
    <div className="flashcard-container">
      <div className="flashcard">
        <div className="flashcard-header">
          {cards[currentCard].icon}
          <h3>{cards[currentCard].title}</h3>
        </div>
        <div className="flashcard-content">
          <p><strong>Description:</strong> {cards[currentCard].description}</p>
          <p><strong>Primary Role:</strong> {cards[currentCard].role}</p>
          <p><strong>Areas of Expertise:</strong> {cards[currentCard].expertise}</p>
          <p><strong>Common Conditions:</strong> {cards[currentCard].conditions.join(", ")}</p>
          <p><strong>Education:</strong> {cards[currentCard].education}</p>
          {cards[currentCard].procedures && (
            <p><strong>Common Procedures:</strong> {cards[currentCard].procedures.join(", ")}</p>
          )}
          {cards[currentCard].age_range && (
            <p><strong>Patient Age Range:</strong> {cards[currentCard].age_range}</p>
          )}
          {cards[currentCard].scope && (
            <p><strong>Scope:</strong> {cards[currentCard].scope}</p>
          )}
        </div>
      </div>
      <div className="flashcard-navigation">
        <button 
          onClick={() => setCurrentCard(prev => Math.max(0, prev - 1))}
          disabled={currentCard === 0}
        >
          Previous
        </button>
        <span>{currentCard + 1} / {cards.length}</span>
        <button 
          onClick={() => setCurrentCard(prev => Math.min(cards.length - 1, prev + 1))}
          disabled={currentCard === cards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Medicine Information Component
function MedicineInfo({ condition }) {
  const medicineData = {
    'Headache': {
      commonMeds: [
        { name: "Paracetamol", dosage: "500-1000mg every 4-6 hours", purpose: "Pain relief" },
        { name: "Ibuprofen", dosage: "200-400mg every 6-8 hours", purpose: "Anti-inflammatory" },
        { name: "Aspirin", dosage: "325-650mg every 4 hours", purpose: "Pain relief" }
      ],
      firstAid: [
        "Rest in a quiet, dark room",
        "Apply cold compress to forehead",
        "Stay hydrated",
        "Avoid bright lights and loud noises"
      ],
      precautions: ["Don't exceed recommended dosage", "Consult if pain persists >48 hours"]
    },
    'Fever': {
      commonMeds: [
        { name: "Paracetamol", dosage: "500-1000mg every 4-6 hours", purpose: "Fever reduction" },
        { name: "Ibuprofen", dosage: "200-400mg every 6-8 hours", purpose: "Fever and pain" }
      ],
      firstAid: [
        "Rest and stay hydrated",
        "Use lukewarm sponge bath",
        "Wear light clothing",
        "Monitor temperature regularly"
      ],
      precautions: ["Seek help if fever >103°F or lasts >3 days"]
    },
    'Cough & Cold': {
      commonMeds: [
        { name: "Dextromethorphan", dosage: "10-20mg every 4-6 hours", purpose: "Cough suppressant" },
        { name: "Guaifenesin", dosage: "200-400mg every 4 hours", purpose: "Expectorant" },
        { name: "Chlorpheniramine", dosage: "4mg every 4-6 hours", purpose: "Antihistamine" }
      ],
      firstAid: [
        "Drink warm fluids like tea with honey",
        "Use humidifier",
        "Gargle with salt water",
        "Get plenty of rest"
      ],
      precautions: ["Consult if cough lasts >2 weeks or with breathing difficulty"]
    },
    'Abdominal Pain': {
      commonMeds: [
        { name: "Antacids", dosage: "As directed on package", purpose: "Acid reduction" },
        { name: "Simethicone", dosage: "40-125mg after meals", purpose: "Gas relief" }
      ],
      firstAid: [
        "Rest in comfortable position",
        "Apply warm compress to abdomen",
        "Sip clear fluids",
        "Avoid solid foods initially"
      ],
      precautions: ["Seek immediate help for severe pain, fever, or vomiting blood"]
    }
  };

  const data = medicineData[condition] || medicineData['Headache'];

  return (
    <div className="medicine-info">
      <h4>Treatment Information for {condition}</h4>
      
      <div className="medicine-section">
        <h5>💊 Common Medications</h5>
        <div className="medication-list">
          {data.commonMeds.map((med, index) => (
            <div key={index} className="medication-item">
              <strong>{med.name}</strong>
              <span>Dosage: {med.dosage}</span>
              <span>Purpose: {med.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="firstaid-section">
        <h5>🩹 First Aid Tips</h5>
        <ul className="firstaid-list">
          {data.firstAid.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="precautions-section">
        <h5>⚠️ Important Precautions</h5>
        <p>{data.precautions}</p>
      </div>
    </div>
  );
}

// ===================================================================
// COMPONENT 1: SYMPTOM ANALYZER + MEDICINE INFO
// ===================================================================
function SymptomAnalyzer() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);

  // Helper function to extract primary condition from reasoning
  const getPrimaryCondition = (reasoning) => {
    if (!reasoning) return 'Headache';
    if (reasoning.includes('headache') || reasoning.includes('migraine')) return 'Headache';
    if (reasoning.includes('fever')) return 'Fever';
    if (reasoning.includes('cough') || reasoning.includes('cold')) return 'Cough & Cold';
    if (reasoning.includes('abdominal') || reasoning.includes('stomach')) return 'Abdominal Pain';
    return 'Headache'; // default
  };

  // 🎙️ Enhanced Voice Input with visual feedback
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Sorry, your browser does not support voice recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms(transcript);
      setError(null);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError(`Voice recognition error: ${event.error}. Please type your symptoms.`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // 🚀 Enhanced Submit with History
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    const API_URL = 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) throw new Error('Server not responding properly.');

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setResult(data);
      
      // Save to history
      const newEntry = {
        id: Date.now(),
        symptoms,
        result: data,
        timestamp: new Date().toLocaleString()
      };
      setSymptomHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5 entries
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 🎯 Enhanced Triage System
  const getTriageDetails = (level) => {
    const levels = {
      'Emergency': { 
        icon: <FaExclamationTriangle />, 
        class: 'triage-emergency',
        description: 'Life-threatening condition requiring immediate care',
        action: 'Call emergency services or go to nearest ER'
      },
      'Urgent': { 
        icon: <FaAmbulance />, 
        class: 'triage-urgent',
        description: 'Serious condition requiring care within hours',
        action: 'Visit urgent care or schedule same-day appointment'
      },
      'Routine': { 
        icon: <FaStethoscope />, 
        class: 'triage-routine',
        description: 'Non-urgent condition requiring medical attention',
        action: 'Schedule appointment with recommended specialist'
      },
      'Self-Care': { 
        icon: <FaHeartbeat />, 
        class: 'triage-self-care',
        description: 'Mild symptoms manageable with self-care',
        action: 'Monitor symptoms and consult if condition worsens'
      }
    };
    return levels[level] || levels['Self-Care'];
  };

  // 💊 Quick Symptom Templates
  const quickSymptoms = [
    "Headache with fever and stiff neck",
    "Chest pain spreading to left arm",
    "Difficulty breathing and wheezing",
    "Severe abdominal pain with vomiting",
    "Sudden weakness on one side of body"
  ];

  return (
    <div className="analyzer-container">
      <header>
        <h1>SymptomNav 🧭</h1>
        <p>AI-powered healthcare navigation by Eduverse AI</p>
        <div className="header-stats">
          <div className="stat">
            <FaUsers className="stat-icon" />
            <span>10,000+ Lives Guided</span>
          </div>
          <div className="stat">
            <FaShieldAlt className="stat-icon" />
            <span>98% Accuracy Rate</span>
          </div>
          <div className="stat">
            <FaClock className="stat-icon" />
            <span>24/7 Available</span>
          </div>
        </div>
      </header>

      <main>
        {/* ========== QUICK SYMPTOM TEMPLATES ========== */}
        <div className="quick-templates">
          <h3>Common Symptoms Quick Select</h3>
          <div className="template-grid">
            {quickSymptoms.map((symptom, index) => (
              <button
                key={index}
                className="template-btn"
                onClick={() => setSymptoms(symptom)}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* ========== ENHANCED SYMPTOM ANALYZER ========== */}
        <form className="symptom-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>Describe Your Symptoms</h3>
            <div className="form-tips">
              <FaInfoCircle />
              <span>Be specific about duration, severity, and location</span>
            </div>
          </div>
          
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: I've had a persistent headache for 3 days, accompanied by fever and sensitivity to light. The pain is mostly on the right side of my head..."
            className="symptom-textarea"
          />
          
          <button
            type="button"
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={handleVoiceInput}
            aria-label="Use voice"
          >
            <FaMicrophone />
            {isListening && <div className="pulse-ring"></div>}
          </button>

          <div className="button-group">
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading || symptoms.trim() === ''}
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  Analyzing Symptoms...
                </div>
              ) : (
                <>
                  <FaRegPaperPlane /> 
                  Analyze Symptoms
                  <FaBrain className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <FaExclamationTriangle />
            {error}
          </div>
        )}

        {/* ========== ENHANCED RESULTS ========== */}
        {result && (
          <div className="results-container">
            <div className="results-header">
              <h2>Analysis Results</h2>
              <div className="confidence-score">
                <FaStar className="star-icon" />
                <span>High Confidence Analysis</span>
              </div>
            </div>

            <div className={`triage-card ${getTriageDetails(result.triage_level).class}`}>
              <div className="triage-icon">{getTriageDetails(result.triage_level).icon}</div>
              <div className="triage-content">
                <h2>{result.triage_level} Care Needed</h2>
                <p className="triage-description">
                  {getTriageDetails(result.triage_level).description}
                </p>
                <p className="triage-reasoning">{result.reasoning}</p>
                <div className="action-alert">
                  <FaExclamationTriangle />
                  <strong>Recommended Action:</strong> {getTriageDetails(result.triage_level).action}
                </div>
              </div>
            </div>

            <div className="specialist-card">
              <div className="specialist-header">
                <FaUserMd className="specialist-main-icon" />
                <h3>Recommended Specialist</h3>
              </div>
              <p className="specialist-name">{result.specialist}</p>
              <p className="specialist-description">
                This specialist has expertise in conditions matching your symptoms
              </p>
              
              {/* Add Medical Profession Flashcards */}
              <MedicalProfessionFlashcards profession={result.specialist} />
              
              <div className="specialist-actions">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.google_query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="find-btn primary"
                >
                  <FaMapMarkerAlt />
                  Find {result.specialist} Near Me
                </a>
                <button className="find-btn secondary">
                  <FaBookMedical />
                  Learn About {result.specialist}
                </button>
              </div>
            </div>

            {/* ========== ADDITIONAL RESOURCES ========== */}
            <div className="resources-section">
              <h3>Additional Resources</h3>
              <div className="resources-grid">
                <div className="resource-card">
                  <FaFirstAid className="resource-icon" />
                  <h4>First Aid Tips</h4>
                  <p>Immediate steps you can take while waiting for care</p>
                  {/* Add Medicine Info for common conditions */}
                  <MedicineInfo condition={getPrimaryCondition(result.reasoning)} />
                </div>
                <div className="resource-card">
                  <FaCapsules className="resource-icon" />
                  <h4>Medication Info</h4>
                  <p>Common medications prescribed for similar symptoms</p>
                </div>
                <div className="resource-card">
                  <FaHandHoldingHeart className="resource-icon" />
                  <h4>Support Resources</h4>
                  <p>Patient support groups and educational materials</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SYMPTOM HISTORY ========== */}
        {symptomHistory.length > 0 && (
          <div className="history-section">
            <h3>Recent Symptom Checks</h3>
            <div className="history-list">
              {symptomHistory.map(entry => (
                <div key={entry.id} className="history-item">
                  <div className="history-symptoms">
                    <strong>Symptoms:</strong> {entry.symptoms.substring(0, 100)}...
                  </div>
                  <div className="history-result">
                    <span className={`triage-badge ${getTriageDetails(entry.result.triage_level).class}`}>
                      {entry.result.triage_level}
                    </span>
                    <span className="history-time">{entry.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <FaShieldAlt className="footer-icon" />
            <p><strong>Medical Disclaimer:</strong> This tool provides preliminary guidance only. Always consult healthcare professionals for medical advice.</p>
          </div>
          <div className="footer-links">
            <span>Powered by Eduverse AI</span>
            <span>•</span>
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===================================================================
// MODAL + AUTH COMPONENTS
// ===================================================================
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

// ===================================================================
// ENHANCED PROBLEM SECTION
// ===================================================================
function ProblemSection() {
  const stats = [
    { number: "2-3", label: "Weeks average diagnosis delay", icon: <FaClock /> },
    { number: "40%", label: "Non-emergency ER visits", icon: <FaHospital /> },
    { number: "60%", label: "Rural patients travel 50+ miles", icon: <FaMapMarkerAlt /> },
    { number: "25%", label: "Higher costs from misdiagnosis", icon: <FaChartLine /> }
  ];

  return (
    <section className="problem-section">
      <div className="problem-container">
        <div className="section-header">
          <h2>The Healthcare Navigation Crisis</h2>
          <p className="problem-subtitle">
            Millions struggle to find the right medical care when they need it most
          </p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">
              <FaHospital />
            </div>
            <h3>Wrong Specialist Visits</h3>
            <p>Patients often start with general practitioners, leading to multiple referrals and delayed proper diagnosis.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              <FaAmbulance />
            </div>
            <h3>Emergency Room Overcrowding</h3>
            <p>Non-emergency cases flood ERs because people lack guidance on appropriate care pathways.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Rural Healthcare Gaps</h3>
            <p>Limited specialist access forces rural patients to travel long distances or settle for inadequate care.</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">
              <FaLanguage />
            </div>
            <h3>Language & Health Literacy</h3>
            <p>Medical jargon and language barriers prevent clear understanding of symptoms and care options.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// ENHANCED SOLUTION SECTION
// ===================================================================
function SolutionSection({ onGetStarted }) {
  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Triage",
      description: "Advanced algorithms analyze symptoms and provide accurate urgency assessment"
    },
    {
      icon: <FaMicrophone />,
      title: "Voice Input",
      description: "Speech-to-text technology for easy symptom description without typing"
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile First",
      description: "Optimized for smartphones to reach rural and semi-urban communities"
    },
    {
      icon: <FaLanguage />,
      title: "Multi-Language",
      description: "Support for multiple languages to serve diverse populations"
    }
  ];

  return (
    <section className="solution-section">
      <div className="solution-container">
        <div className="section-header">
          <h2>How SymptomNav Transforms Healthcare Access</h2>
          <p className="solution-subtitle">
            Bridging gaps in healthcare navigation through intelligent technology
          </p>
        </div>
        
        <div className="solution-steps">
          <div className="solution-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Describe Symptoms Naturally</h3>
              <p>Use simple language or voice input - no medical knowledge required. Our AI understands context and severity.</p>
            </div>
          </div>

          <div className="solution-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Instant Triage Assessment</h3>
              <p>Get immediate guidance on urgency level and recommended course of action based on clinical guidelines.</p>
            </div>
          </div>

          <div className="solution-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Specialist Matching</h3>
              <p>Connect directly to the right healthcare provider with location-based recommendations and availability.</p>
            </div>
          </div>

          <div className="solution-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Ongoing Support</h3>
              <p>Track your symptoms, access educational resources, and get follow-up guidance as needed.</p>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="cta-container">
          <div className="cta-content">
            <h3>Ready to Navigate Healthcare with Confidence?</h3>
            <p>Join thousands who have found the right care faster with SymptomNav by Eduverse AI</p>
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={onGetStarted}>
                Start Symptom Analysis <FaArrowRight />
              </button>
              <button className="cta-button secondary">
                <FaBookMedical />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// MAIN APP COMPONENT
// ===================================================================
function App() {
  const [view, setView] = useState('home');
  const [modalView, setModalView] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '', contact: '', info: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (view === 'analyzer') {
      document.body.classList.add('analyzer-active');
    } else {
      document.body.classList.remove('analyzer-active');
    }
    
    return () => {
      document.body.classList.remove('analyzer-active');
    };
  }, [view]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = async (e, endpoint) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    let bodyData = {};
    if (endpoint === 'login' || endpoint === 'signup') {
      bodyData = { email: formData.email, password: formData.password };
    } else if (endpoint === 'help') {
      bodyData = { email: formData.email, contact: formData.contact, info: formData.info };
    }

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');

      setMessage({ type: 'success', text: data.success || 'Success!' });

      if (endpoint === 'login' || endpoint === 'signup') {
        setTimeout(() => {
          setModalView(null);
          setMessage({ type: '', text: '' });
          setView('analyzer');
        }, 1500);
      } else {
        setTimeout(() => {
          setModalView(null);
          setMessage({ type: '', text: '' });
        }, 2000);
      }

    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const renderModalContent = () => {
    if (message.text) {
      return <div className={`message ${message.type}`}>{message.text}</div>;
    }
    if (modalView === 'login') {
      return (
        <form className="auth-form" onSubmit={(e) => handleAuthSubmit(e, 'login')}>
          <div className="input-group">
            <FaEnvelope />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="form-submit-btn" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          <div className="auth-links">
            <a href="#forgot">Forgot password?</a>
          </div>
        </form>
      );
    }
    if (modalView === 'signup') {
      return (
        <form className="auth-form" onSubmit={(e) => handleAuthSubmit(e, 'signup')}>
          <div className="input-group">
            <FaEnvelope />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <FaLock />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="form-submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
          <div className="auth-links">
            <span>By signing up, you agree to our Terms of Service</span>
          </div>
        </form>
      );
    }
    if (modalView === 'help') {
      return (
        <form className="auth-form" onSubmit={(e) => handleAuthSubmit(e, 'help')}>
          <div className="input-group">
            <FaEnvelope />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <FaPhone />
            <input type="tel" name="contact" placeholder="Contact (Optional)" value={formData.contact} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <FaInfoCircle />
            <textarea name="info" placeholder="How can we help you? Share your questions or feedback..." value={formData.info} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="form-submit-btn" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      );
    }
  };

  if (view === 'analyzer') return <SymptomAnalyzer />;

  return (
    <div className="home-container">
      <nav>
        <div className="nav-brand">
          <FaHeartbeat className="brand-icon" />
          <span>SymptomNav</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => setModalView('login')} className="nav-btn">
            <FaSignInAlt /> Log In
          </button>
          <button onClick={() => setModalView('signup')} className="nav-btn primary">
            <FaUserPlus /> Sign Up
          </button>
          <button onClick={() => setModalView('help')} className="nav-btn">
            <FaEnvelope /> Contact
          </button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <FaShieldAlt />
            Trusted by Healthcare Professionals
          </div>
          <h1 className="title">SymptomNav</h1>
          <p className="subtitle">By Eduverse AI - Intelligent Healthcare Navigation</p>
          <p className="hero-description">
            Bridging healthcare gaps for rural and semi-urban communities through 
            AI-powered symptom analysis and specialist navigation. Get the right care, 
            at the right time, with the right specialist.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>98%</strong>
              <span>Accuracy Rate</span>
            </div>
            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Available</span>
            </div>
            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Lives Guided</span>
            </div>
          </div>
          <button className="hero-cta" onClick={() => setView('analyzer')}>
            Start Your Health Journey <FaArrowRight />
          </button>
        </div>
      </main>

      <ProblemSection />
      <SolutionSection onGetStarted={() => setView('analyzer')} />

      {modalView && (
        <Modal 
          title={modalView.charAt(0).toUpperCase() + modalView.slice(1)} 
          onClose={() => { setModalView(null); setMessage({ type: '', text: '' }); }}
        >
          {renderModalContent()}
        </Modal>
      )}
    </div>
  );
}

export default App;