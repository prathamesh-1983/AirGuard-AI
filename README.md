# 🌍 AirGuard AI – Intelligent Urban Air Defense System

### Transforming Air Quality Data into Smarter, Healthier Decisions

AirGuard AI is an AI-powered environmental intelligence platform designed to help people understand air pollution, monitor air-quality conditions, and make informed decisions for healthier and more sustainable lifestyles.

The platform combines air-quality data, environmental analytics, personalized recommendations, and Generative AI to transform complex pollution information into practical clean-air guidance.

> **Project Theme:** Artificial Intelligence for Environmental Sustainability  
> **Challenge:** Hack2Skill – PromptWars Virtual Challenge  
> **Project Type:** AI-Powered Full-Stack Web Application

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Generative AI Integration](#-generative-ai-integration)
- [Data Sources and Accuracy](#-data-sources-and-accuracy)
- [Future Enhancements](#-future-enhancements)
- [Expected Impact](#-expected-impact)
- [Limitations](#-limitations)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚨 Problem Statement

Air pollution is a major environmental challenge affecting urban communities. People are frequently exposed to pollutants such as PM2.5, PM10, nitrogen dioxide, ozone, carbon monoxide, and sulphur dioxide.

However, understanding air-quality readings and converting them into practical everyday decisions can be difficult.

Some common challenges include:

- Limited awareness of local air-quality conditions.
- Difficulty understanding pollutant measurements.
- Lack of personalized recommendations for outdoor activities.
- Uncertainty about improving indoor air quality.
- Limited awareness of sustainable transportation alternatives.
- Difficulty understanding the environmental impact of everyday decisions.

## 💡 Our Solution

**AirGuard AI** provides an integrated environmental intelligence platform that helps users move from simply checking air-quality numbers to taking meaningful action.

It combines environmental data, analytical calculations, and Generative AI to deliver:

- Air-quality monitoring and pollutant insights.
- Hourly air-quality trends.
- Personalized daily activity recommendations.
- Indoor air-quality improvement guidance.
- Air-purifier sizing estimates.
- Sustainable transportation comparisons.
- AI-powered environmental assistance.

Our vision is to make clean-air information more accessible, understandable, and actionable.

---

## 🚀 Key Features

### 1. Real-Time Air Quality Intelligence

Monitor important air pollutants and understand current environmental conditions.

**Pollutants monitored:**
- PM2.5 – Fine particulate matter.
- PM10 – Coarse particulate matter.
- NO2 – Nitrogen dioxide.
- O3 – Ozone.
- CO – Carbon monoxide.
- SO2 – Sulphur dioxide.

The dashboard presents available measurements and hourly trends in an understandable format.

### 2. Pollution Trends and Forecasting

Explore air-quality trends through visual analytics.

Features include:
- Hourly PM2.5 trends.
- PM10 monitoring.
- Forecast data visualization.
- Pollutant comparison.
- Environmental trend analysis.

### 3. Personalized Daily Planner

Receive practical recommendations based on available air-quality information.

Examples:
- Suggestions for outdoor activities.
- Recommendations to reduce exposure during polluted periods.
- Guidance for selecting suitable activity times.
- Everyday clean-air habits.

### 4. Indoor Air Advisor

Understand indoor air-quality improvement options.

The module includes a CADR-based air-purifier sizing calculator.

**CADR calculation:**

CADR = Room Volume × Target Air Changes per Hour

Where:

Room Volume = Length × Width × Height

The calculator provides an estimated purifier capacity requirement based on room dimensions and the selected air-change target.

### 5. EcoRoute – Sustainable Mobility

Compare transportation alternatives and explore their estimated environmental impact.

The module is designed to encourage informed and sustainable transportation choices.

Possible comparisons include:
- Private vehicle travel.
- Public transportation.
- Shared mobility.
- Walking and cycling.

Emission factors used in the current prototype are illustrative and should not be interpreted as verified local emissions measurements.

### 6. Environmental Impact Simulator

Explore how changing everyday habits can influence estimated environmental impact.

The concept focuses on:
- Sustainable transportation choices.
- Pollution-conscious daily routines.
- Environmental awareness.
- Scenario-based comparisons.

### 7. AI Environmental Copilot

An AI-powered assistant designed to help users understand environmental information.

Powered by Google Gemini API when configured, it can assist with:

- Explaining air-quality information.
- Interpreting pollutant measurements.
- Suggesting practical clean-air habits.
- Answering environmental awareness questions.
- Providing contextual recommendations.

The application also includes a rule-based fallback advisor when Gemini is unavailable or not configured.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, Vite, TypeScript |
| Styling | CSS |
| Backend | Python, FastAPI |
| Data Validation | Pydantic |
| AI Integration | Google Gemini API |
| Environmental Data | Open-Meteo Air Quality API |
| Data Visualization | Recharts |
| API Communication | REST API |
| Testing | Pytest |
| Development Tools | VS Code, Git, GitHub |

---

## 🏗️ System Architecture

AirGuard AI follows a frontend-backend architecture.

```text
                 USER
                   |
                   v
          REACT WEB APPLICATION
             (Vite + TypeScript)
                   |
                   v
             FASTAPI BACKEND
                   |
          +--------+---------+
          |        |         |
          v        v         v
      AIR DATA  CALCULATION  AI ADVISOR
      SERVICE    SERVICES    SERVICE
          |        |         |
          v        v         v
      OPEN-METEO  CADR &    GOOGLE
         API     IMPACT     GEMINI
                 LOGIC       API
          |        |         |
          +--------+---------+
                   |
                   v
          PROCESSED RESPONSES
                   |
                   v
           USER DASHBOARD
```

---

## 📂 Project Structure

```text
AirGuard-AI/
│
├── .github/
│   └── copilot-instructions.md
│
├── .vscode/
│   └── extensions.json
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── air.py
│   │   │       └── tools.py
│   │   │
│   │   ├── core/
│   │   │   └── config.py
│   │   │
│   │   ├── schemas/
│   │   │   └── requests.py
│   │   │
│   │   ├── services/
│   │   │   ├── air_quality.py
│   │   │   ├── calculations.py
│   │   │   └── advisor.py
│   │   │
│   │   └── main.py
│   │
│   ├── tests/
│   │   └── test_calculations.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── MetricCard.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   │
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/
│   ├── ARCHITECTURE.md
│   └── DEVELOPMENT_ROADMAP.md
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these instructions to run AirGuard AI locally.

### Prerequisites

Install the following tools:

- Python 3.11 or above.
- Node.js 20 or above.
- npm.
- Git.
- Visual Studio Code.

### Step 1: Clone the Repository

```bash
git clone YOUR_PUBLIC_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd AirGuard-AI
```

### Step 2: Set Up the Backend

Navigate to the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

```bash
py -m venv .venv
```

Activate the environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create the environment file:

```powershell
Copy-Item .env.example .env
```

### Step 3: Configure the Frontend

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Create the frontend environment file:

```powershell
Copy-Item .env.example .env
```

---

## 🔐 Environment Configuration

### Backend Configuration

Update `backend/.env`:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash

FRONTEND_ORIGIN=http://localhost:5173
```

The Gemini API key is optional if you want to use the rule-based fallback advisor.

Get a Gemini API key:

https://aistudio.google.com/apikey

**Security:** Never upload your real API key to GitHub. Keep it in your local `.env` file and use deployment secrets in production.

### Frontend Configuration

Update `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## ▶️ Running the Application

### Start the Backend

From the backend directory:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend URL:

http://localhost:8000

Interactive API documentation:

http://localhost:8000/docs

Health endpoint:

http://localhost:8000/health

### Start the Frontend

From the frontend directory:

```bash
npm run dev
```

Open your browser:

http://localhost:5173

You should now be able to access the AirGuard AI web application.

---

## 🔌 API Endpoints

The FastAPI backend exposes endpoints for environmental data and calculation services.

| Endpoint | Purpose |
|---|---|
| `/health` | Backend health check |
| `/docs` | Interactive Swagger API documentation |
| `/api/air` | Air-quality data functionality |
| `/api/tools` | Environmental calculation tools |

For exact request parameters and response schemas, refer to the automatically generated Swagger documentation at:

`http://localhost:8000/docs`

---

## 🤖 Generative AI Integration

AirGuard AI integrates Google's Gemini API to provide an environmental assistance experience.

### Role of Gemini

The AI Environmental Copilot helps users understand environmental information and receive practical recommendations.

Example questions:

- What does PM2.5 mean?
- How can I reduce indoor air pollution?
- What precautions should I take on a polluted day?
- How can I adopt cleaner transportation habits?
- Why is air quality important for urban communities?

### AI Architecture

```text
USER QUESTION
      |
      v
REACT FRONTEND
      |
      v
FASTAPI BACKEND
      |
      v
GEMINI API
      |
      v
AI GENERATED RESPONSE
      |
      v
USER INTERFACE
```

Environmental calculations and measurements are handled separately by application services and data providers rather than relying on AI-generated numbers.

---

## 🌐 Data Sources and Accuracy

AirGuard AI uses the Open-Meteo Air Quality API for environmental data integration.

API documentation:

https://open-meteo.com/en/docs/air-quality-api

Important data considerations:

- Measurements should be displayed with their units and timestamps.
- Data availability and freshness depend on the provider.
- Open-Meteo values must not be represented as official CPCB station observations.
- Provider pollutant concentrations should not automatically be labelled as official Indian AQI.
- Environmental estimates and illustrative emission factors must be clearly distinguished from measured values.
- AI-generated explanations are informational and should not replace professional medical advice.

---

## 🔮 Future Enhancements

AirGuard AI has the potential to evolve into a comprehensive urban environmental intelligence platform.

Planned improvements include:

- Interactive geospatial pollution maps.
- More advanced pollution forecasting models.
- Household profiles and family-oriented protection guidance.
- User authentication and personalized dashboards.
- Community clean-air reporting and awareness features.
- Location-based notifications and pollution alerts.
- PostGIS-based environmental data management.
- Advanced analytics and historical pollution comparisons.
- Mobile-friendly progressive web application.
- More validated regional emissions data and environmental integrations.

---

## 🌱 Expected Impact

AirGuard AI aims to support healthier and more sustainable communities through accessible environmental information.

| Impact Area | Expected Benefit |
|---|---|
| Environmental Awareness | Better understanding of pollution |
| Personal Well-being | More informed daily activity decisions |
| Indoor Air Quality | Guidance for improving indoor environments |
| Sustainable Mobility | Encouragement of cleaner travel choices |
| AI Innovation | Easier interpretation of environmental data |
| Community Awareness | Greater interest in clean-air initiatives |

---

## ⚠️ Limitations

- Air-quality information depends on the availability and freshness of external data providers.
- Some planned modules may not yet be implemented in the current MVP.
- CADR outputs are sizing estimates, not guarantees of indoor air quality.
- Transportation emission comparisons use illustrative factors in the current prototype.
- AI recommendations are informational and are not medical diagnoses or prescriptions.
- Advanced forecasting and community features are planned enhancements, not claims of current functionality.

---

## 🤝 Contributing

Contributions and suggestions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test your implementation.
5. Submit a Pull Request.

```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

---

## 📜 License

This project is intended for educational, hackathon, and environmental innovation purposes.

Add an appropriate open-source license file, such as MIT, if you intend to distribute the project under that license.

---

## 👨‍💻 Project Credits

**Project Name:** AirGuard AI – Intelligent Urban Air Defense System

**Challenge:** Hack2Skill – PromptWars Virtual Challenge

**Focus Areas:**
- Artificial Intelligence
- Generative AI
- Environmental Sustainability
- Air Quality Intelligence
- Full-Stack Development

### 🌍 Clean Air. Healthy Life. Smarter Decisions.

**AirGuard AI – Making environmental intelligence actionable.**
