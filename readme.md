# Swasthya Ecosystem 🏥🇮🇳

**Swasthya** is a comprehensive, AI-driven digital healthcare infrastructure designed to bridge the gap between proper healthcare delivery, efficient administration, and citizen accessibility. 

The ecosystem is built on a high-performance hybrid backend and consists of three specialized applications that work in tandem to create a unified healthcare network.

---

## 🌐 Ecosystem Overview

The Swasthya ecosystem operates on a unified data layer where information flows seamlessly between citizens, healthcare providers, and government administrators.

```mermaid
graph TD
    subgraph "Core Infrastructure"
        Backend[Hybrid Backend (Rust + Python)]
        DB[(Supabase Database)]
        Backend <--> DB
    end

    subgraph "The Three Pillars"
        Gov[🏛️ Gov-App\n(Administration & Analytics)]
        Public[👥 Public-App\n(Citizen Services)]
        Hospital[🏥 Hospital-App\n(Operations & Management)]
    end

    Public <-->|Appointments, Reports| Backend
    Hospital <-->|Capacity, Admissions| Backend
    Gov <-->|Analytics, Resource Allocation| Backend
    
    Hospital -->|Real-time Capabilities| Gov
    Gov -->|Health Advisories| Public
```

### **The Three Pillars**

1.  **🏛️ Gov-App (The Command Center):**  
    Empowers health officials with real-time surveillance, predictive analytics, and resource allocation tools to manage public health effectively.

2.  **👥 Public-App (The Citizen Portal):**  
    A user-friendly interface for citizens to access healthcare services, book appointments, find clinics, and receive health alerts.

3.  **🏥 Hospital-App (The Operational Hub):**  
    A management tool for hospitals to update bed availability, manage appointments, and coordinate with the central network.

---

## 🏛️ Government App (`/gov-app`)
**Role:** Command Center & Decision Support System

The **Gov-App** is a sophisticated dashboard for policymakers and health administrators. It transforms raw data into actionable intelligence.

### **Key Features**
-   **📊 Real-Time Surveillance:** Monitor disease outbreaks, hospital occupancy (ICU/General), and medical supply levels across the state/city in real-time.
-   **📈 Predictive Analytics:** AI-powered forecasting for potential disease outbreaks and hospital overload risks 7-14 days in advance.
-   **🚨 Crisis Management:** Automated alert system for critical thresholds (e.g., Dengue hotspots, Oxygen shortage).
-   **🗺️ Interactive Heatmaps:** Geospatial visualization of health metrics to identify vulnerable zones.
-   **📋 Resource Allocation:** Dynamic tools to deploy mobile medical units and redirect resources to affected areas.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Recharts, Framer Motion.

---

## 👥 Public App (`/public-app`)
**Role:** Citizen Engagement & Service Delivery

The **Public-App** is the front-facing interface for the general population, ensuring healthcare is accessible to everyone.

### **Key Features**
-   **🏥 Facility Locator:** Find nearest hospitals, clinics, and pharmacies with live operational status.
-   **📅 Appointment Booking:** Seamless scheduling for OPD and specialist consultations at government and empanelled private hospitals.
-   **🤖 AI Health Assistant (MediBot):** A multilingual chatbot for symptom checking, health advice, and navigation assistance.
-   **🚑 Emergency Services:** One-touch access to ambulance services (108) and emergency lines.
-   **🔔 Health Alerts:** Personalized notifications about local health hazards (e.g., "High Dengue Risk in your area").
-   **📍 Smart Routing:** Intelligent navigation to the nearest available facility based on current traffic and hospital load.

**Tech Stack:** Next.js 16, Leaflet Maps, GSAP Animations, Lucide React, Groq SDK (AI).

---

## 🏥 Hospital App (`/hospital-app`)
**Role:** Facility Operations & Patient Management

The **Hospital-App** serves as the operational interface for doctors, nurses, and hospital administrators.

### **Key Features**
-   **🛏️ Live Bed Management:** Real-time updating of ICU, Oxygen, and General bed availability.
-   **🗓️ OPD Management:** Streamlined queue management and appointment scheduling for doctors.
-   **🩺 Patient Records:** Secure access to patient medical history and digital prescriptions.
-   **📦 Inventory Tracking:** Monitoring of essential drugs and medical equipment stocks.
-   **🔗 Network Integration:** Syncs local hospital data with the central government dashboard instantly.

**Tech Stack:** Next.js, Tailwind CSS, Shadcn UI.

---

## ⚙️ Hybrid Backend Architecture (`/backend`)
**Role:** The High-Performance Core

The backend employs a **Hybrid Microservices Architecture** that combines the speed of Rust with the data science capabilities of Python.

### **Layer 1: Rust Edge Gateway (`/rust-predictions-api`)**
-   **Role:** The Shield & Traffic Controller.
-   **Tech:** Rust, Axum, Tokio.
-   **Function:** Handles high-concurrency requests, validation, rate limiting, and security before routing to the logic layer. ensuring sub-millisecond latency.

### **Layer 2: Python Intelligence Engine (`/backend/app`)**
-   **Role:** The Brain.
-   **Tech:** Python, FastAPI, Pandas, Scikit-learn.
-   **Function:** Handles complex business logic, AI/ML model inference (for outbreak prediction), data processing, and database interactions.

---

## 🚀 Getting Started

### **Prerequisites**
-   Node.js 18+
-   Python 3.10+
-   Rust (Cargo)
-   Docker (optional)

### **Running the Ecosystem**

1.  **Backend (Python):**
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn app.main:app --reload
    ```

2.  **API Gateway (Rust):**
    ```bash
    cd rust-predictions-api
    cargo run
    ```

3.  **Frontend Applications:**
    ```bash
    # For any app (gov-app, public-app, hospital-app)
    cd [app-name]
    npm install
    npm run dev
    ```

---

**Swasthya** — *Empowering Health through Data.*
