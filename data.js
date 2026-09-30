// Data repository for Varshini K A Portfolio
// Includes all Resume data, 3D Skill models, ML training weights/heuristics, and certificate records

const PORTFOLIO_DATA = {
  personal: {
    name: "VARSHINI K A",
    degree: "BCA (Data Science) Graduate",
    university: "Presidency University, Bangalore",
    cgpa: "8.2",
    gradYear: 2026,
    email: "kavarshini70@gmail.com",
    phone: "+91-9019565856",
    linkedin: "https://www.linkedin.com/in/varshini-k-a-46965029a",
    location: "Bangalore, Karnataka, India"
  },

  skills: {
    "python": {
      name: "Python",
      category: "Programming & Machine Learning Core",
      proficiency: 92,
      icon: "fa-brands fa-python",
      color: "#00f5d4",
      toolkit: "NumPy, Pandas, Scikit-learn, OpenCV, Flask",
      summary: "Core programming language for developing automated machine learning pipelines, facial gesture tracking via OpenCV, high-performance data wrangling with Pandas, and lightweight Flask REST APIs.",
      codeSnippet: `# Computer Vision & Gesture Recognition Pipeline
import cv2
import mediapipe as mp
import numpy as np

class VirtualMouseTracker:
    def __init__(self, sensitivity=1.8):
        self.face_mesh = mp.solutions.face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.7
        )
        self.sensitivity = sensitivity
        self.prev_x, self.prev_y = 0, 0

    def calculate_cursor(self, landmark_pt, frame_w, frame_h):
        # Smoothed cursor calculation via EMA filter
        raw_x = landmark_pt.x * frame_w * self.sensitivity
        raw_y = landmark_pt.y * frame_h * self.sensitivity
        smooth_x = 0.7 * self.prev_x + 0.3 * raw_x
        smooth_y = 0.7 * self.prev_y + 0.3 * raw_y
        self.prev_x, self.prev_y = smooth_x, smooth_y
        return int(smooth_x), int(smooth_y)`
    },

    "ml": {
      name: "Machine Learning",
      category: "Predictive Modeling & Statistical Inference",
      proficiency: 90,
      icon: "fa-solid fa-brain",
      color: "#a855f7",
      toolkit: "Random Forest, Logistic Regression, Decision Trees, SVM, SMOTE",
      summary: "End-to-end predictive modeling workflows: feature selection, handling multi-class and imbalanced medical data, cross-validation, hyperparameter grid search, and ROC-AUC / F1 evaluation.",
      codeSnippet: `# Multi-Disease Predictive Classifier Engine
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import RobustScaler
from sklearn.metrics import classification_report, roc_auc_score

def train_disease_engine(X, y):
    scaler = RobustScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=y
    )
    
    rf = RandomForestClassifier(
        n_estimators=150,
        max_depth=8,
        min_samples_split=4,
        class_weight='balanced'
    )
    rf.fit(X_train, y_train)
    score = roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])
    print(f"ROC-AUC Score: {score:.4f}")
    return rf, scaler`
    },

    "data-analysis": {
      name: "Data Analysis",
      category: "Exploratory Data Analysis & Statistical Modeling",
      proficiency: 88,
      icon: "fa-solid fa-chart-pie",
      color: "#38bdf8",
      toolkit: "EDA, Missing Value Imputation, Correlation Analysis, Seaborn",
      summary: "Proficient in cleaning unstructured datasets, discovering statistical trends, computing correlation matrices, formulating data-driven hypotheses, and communicating findings through actionable dashboards.",
      codeSnippet: `# Exploratory Data Analysis & Biomarker Correlation
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

def analyze_clinical_cohort(filepath):
    df = pd.read_csv(filepath)
    # Handle missing biometric measurements
    biomarkers = ['Glucose', 'BloodPressure', 'BMI', 'Insulin']
    for col in biomarkers:
        df[col] = df[col].replace(0, np.nan)
        df[col] = df[col].fillna(df[col].median())
    
    # Compute Pearson correlation matrix
    corr = df.corr()
    print("Highest Risk Correlates:\n", corr['Outcome'].sort_values(ascending=False))
    return df`
    },

    "mysql": {
      name: "MySQL / RDBMS",
      category: "Database Design & Storage Architecture",
      proficiency: 86,
      icon: "fa-solid fa-database",
      color: "#f59e0b",
      toolkit: "Relational Schemas, Complex Joins, Indexing, ACID, Scaler Certified",
      summary: "Designing normalized relational databases (1NF to BCNF), authoring high-throughput SQL queries, implementing stored procedures, foreign key integrity, and logging AI prediction sessions.",
      codeSnippet: `-- MySQL Schema for Patient Clinical Predictions Audit Trail
CREATE TABLE IF NOT EXISTS patient_diagnostic_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_uuid VARCHAR(64) NOT NULL,
    disease_category ENUM('Diabetes', 'Cardiovascular', 'Kidney') NOT NULL,
    risk_score DECIMAL(5,2) NOT NULL,
    predicted_class TINYINT(1) NOT NULL,
    biomarker_payload JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category_risk (disease_category, risk_score)
);`
    },

    "excel": {
      name: "Microsoft Excel",
      category: "Advanced Business Analytics & Modeling",
      proficiency: 92,
      icon: "fa-solid fa-file-excel",
      color: "#10b981",
      toolkit: "Diploma (UniAthena), Pivot Tables, XLOOKUP, Nested Logic, Dashboards",
      summary: "UniAthena Diploma certified in advanced MS Excel. Formulating multi-criteria logic, dynamic financial/clinical dashboards, What-If scenario modeling, and automated data cleaning macros.",
      codeSnippet: `/* Advanced Excel Formulas for Clinical Stratification */
=IF(AND(Glucose>=140, BMI>=30), "High Risk - Clinical Intervention", 
    IF(OR(Glucose>=126, BMI>=25), "Moderate Risk - Monitoring Required", 
    "Normal Baseline Reference"))

/* Dynamic Patient Biometrics Lookup via XLOOKUP */
=XLOOKUP(TargetPatientID, PatientRecords[ID], PatientRecords[RiskScore], "Not Found", 0)`
    },

    "c": {
      name: "C Programming",
      category: "Systems & Memory Architecture Foundations",
      proficiency: 82,
      icon: "fa-solid fa-code",
      color: "#6366f1",
      toolkit: "Pointers, Dynamic Allocation (malloc/free), Linked Lists, Big-O",
      summary: "Firm grounding in computational efficiency, low-level pointer arithmetic, memory management, and implementing fundamental data structures like stacks, queues, and balanced binary trees from scratch.",
      codeSnippet: `// Efficient Node Structure for Dynamic Telemetry Queue
#include <stdio.h>
#include <stdlib.h>

typedef struct GesturePacket {
    int landmark_id;
    float x_coord;
    float y_coord;
    struct GesturePacket* next;
} GesturePacket;

GesturePacket* push_gesture(GesturePacket* head, int id, float x, float y) {
    GesturePacket* new_node = (GesturePacket*)malloc(sizeof(GesturePacket));
    new_node->landmark_id = id;
    new_node->x_coord = x;
    new_node->y_coord = y;
    new_node->next = head;
    return new_node;
}`
    },

    "html": {
      name: "HTML (Basic)",
      category: "Frontend Web Structuring",
      proficiency: 80,
      icon: "fa-brands fa-html5",
      color: "#ef4444",
      toolkit: "HTML5 Semantic Elements, Forms & Validation, DOM Hierarchy",
      summary: "Constructing accessible, semantic web layouts to host machine learning dashboards, interactive diagnostic portals, and responsive user feedback forms.",
      codeSnippet: `<!-- Diagnostic Input Form Component -->
<form class="clinical-input-card" aria-label="Biomarker Form">
  <fieldset class="input-fieldset">
    <legend>Clinical Assessment Input</legend>
    <label for="plasma-glucose">Glucose (mg/dL)</label>
    <input type="number" id="plasma-glucose" name="glucose" 
           min="50" max="300" required aria-required="true">
    <button type="submit" class="btn-predict">Analyze Risk</button>
  </fieldset>
</form>`
    },

    "ai-tools": {
      name: "Modern AI Tools",
      category: "Generative AI & Accelerated Engineering",
      proficiency: 95,
      icon: "fa-solid fa-wand-magic-sparkles",
      color: "#ec4899",
      toolkit: "ChatGPT, Claude AI, Google Gemini, Microsoft Copilot",
      summary: "Expert workflow integration with cutting-edge LLMs for rapid prototyping, synthetic dataset augmentation, code refactoring, prompt engineering, and scientific literature summarization.",
      codeSnippet: `/* AI Prompt Workflow & Pipeline Augmentation */
System: "You are an expert Clinical Data Science Assistant."
Prompt: "Generate a synthetic balanced distribution of PIMA Indian Diabetes 
         biomarkers following Gaussian distributions for Glucose (mean: 120, std: 32)
         and BMI (mean: 26.5, std: 6.2) for unit testing predictive models."`
    },

    "ms-office": {
      name: "MS Office Suite",
      category: "Executive Productivity & Documentation",
      proficiency: 90,
      icon: "fa-solid fa-briefcase",
      color: "#0ea5e9",
      toolkit: "PowerPoint Presentations, Word Technical Docs, Outlook, Teams",
      summary: "Crafting polished executive presentations, translating complex statistical metrics into intuitive slide decks for non-technical stakeholders, and maintaining rigorous project documentation.",
      codeSnippet: `// Key Presentation Deliverables:
1. Executive Slide Deck: "Assistive AI: Real-Time Virtual Mouse for Motor Accessibility"
2. Clinical Report: "Multi-Disease Predictive Analytics Validation & Sensitivity Analysis"
3. Technical Documentation: "Presidency University Capstone Engineering Portfolio"`
    }
  },

  certificates: {
    scaler: {
      title: "RDBMS Certification",
      issuer: "Scaler Academy",
      icon: "fa-solid fa-database",
      badgeClass: "scaler-badge",
      credentialId: "SCLR-RDBMS-2024-918",
      skillsGained: ["Relational Database Management", "Schema Normalization", "Indexing Strategies", "Complex Joins", "Transaction Isolation"],
      description: "Comprehensive qualification covering enterprise database design, SQL query optimization, concurrency control, B+ Tree indexing, and entity-relationship mapping."
    },
    infosys: {
      title: "Deep Learning for Developers",
      issuer: "Infosys Springboard",
      icon: "fa-solid fa-network-wired",
      badgeClass: "infosys-badge",
      credentialId: "INF-DL-DEV-77341",
      skillsGained: ["Artificial Neural Networks", "Backpropagation", "Convolutional Neural Networks", "Computer Vision", "Activation Functions"],
      description: "Hands-on deep learning curriculum focusing on feed-forward networks, gradient descent optimization algorithms, CNN feature extraction, and computer vision architectures."
    },
    simplilearn: {
      title: "Machine Learning Specialist",
      issuer: "Simplilearn",
      icon: "fa-solid fa-brain",
      badgeClass: "simplilearn-badge",
      credentialId: "SMPL-ML-882094",
      skillsGained: ["Supervised Learning", "Classification & Regression", "Random Forest", "Model Tuning", "Evaluation Metrics"],
      description: "Rigorous industry certificate validating proficiency in scikit-learn, exploratory data modeling, cross-validation, hyperparameter tuning, and production pipeline design."
    },
    uniathena: {
      title: "Diploma in Microsoft Excel",
      issuer: "UniAthena",
      icon: "fa-solid fa-file-excel",
      badgeClass: "uniathena-badge",
      credentialId: "UNIA-EXCEL-DIP-4412",
      skillsGained: ["Advanced Formulas", "Dynamic Pivot Tables", "XLOOKUP & Nested Logic", "Scenario Analysis", "Dashboard Creation"],
      description: "Postgraduate-level diploma validating advanced spreadsheet architecture, nested statistical formulas, business analytics, dynamic dashboard building, and data auditing."
    }
  },

  // Real-time Medical Predictor Presets & Heuristic Weights
  clinicalPresets: {
    diabetes: {
      healthy: { glucose: 88, bmi: 21.8, bp: 72, age: 24, insulin: 65 },
      borderline: { glucose: 138, bmi: 27.4, bp: 82, age: 46, insulin: 140 },
      highRisk: { glucose: 185, bmi: 36.2, bp: 94, age: 58, insulin: 220 }
    },
    heart: {
      healthy: { chol: 175, hr: 165, chestPain: 3, stDepress: 0.2 },
      borderline: { chol: 225, hr: 140, chestPain: 1, stDepress: 1.4 },
      highRisk: { chol: 295, hr: 110, chestPain: 0, stDepress: 3.2 }
    },
    kidney: {
      healthy: { creat: 0.8, hemo: 15.2, urea: 22, hyper: "no" },
      borderline: { creat: 1.4, hemo: 12.1, urea: 48, hyper: "yes" },
      highRisk: { creat: 3.2, hemo: 9.4, urea: 85, hyper: "yes" }
    }
  }
};
