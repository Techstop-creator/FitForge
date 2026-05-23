# ⚡ FitForge — Premium Fitness & Performance Tracker Workspace

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62B" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Local_Storage-007ACC?style=for-the-badge&logo=cache&logoColor=white" alt="Local Storage" />
</p>

FitForge is a premium, minimalist, and responsive fitness workspace. Refined for athletes and performance-focused individuals, it brings training logs, nutritional metrics, TDEE, 1-Rep Max estimation, and context-aware AI coaching into a single, cohesive interface.

---

## ✨ Features

### 👤 Entry & Session Protection
- **Minimalist Auth Page**: Full-screen split interface with large, sleek Syne typography.
- **Constraints Validation**: Instant client-side validation for emails, password length, and profile stat values (height, weight, age limits).
- **Data Persistence**: All session logs, workout completions, macros, weight targets, and stats are saved to `localStorage` per email.

### 🥗 Calorie & Macro Tracker
- **Nutrient Breakdown**: Logs proteins, carbs, fats, fiber, and net calories against customizable daily goals.
- **Micro-logging**: Dynamic meals database selector with quick-add calorie multipliers.
- **Hydration Log**: Interactive counter tracking daily cups against custom goals.

### 💪 Performance & Training
- **Workout Builder**: Choose exercises by targeted muscle groups (Chest, Back, Legs, Shoulders, Core), set reps/sets, and Rest intervals.
- **Training Splits**: In-depth guidance for **PPL splits** (6 Days/Week) and **Upper/Lower splits** (4 Days/Week).
- **Checklist Routines**: Custom daily checklist covering workouts, morning hydration, and rest day stretches.

### 🤖 Context-Aware AI Coach
- **Secure Chat Integration**: Chat with a custom trained AI Coach to get real-time recommendations.
- **Context injection**: The coach reads your current metrics (height, weight, daily calorie goal, and fitness goal) automatically to offer tailored guidance.

### 🧮 Fitness Calculators
- **TDEE & BMR Estimators**: Calculate physical metabolic rates based on activity metrics.
- **1-Rep Max (1RM) Tool**: Estimate single lift limits utilizing Epley, Brzycki, Lander, and O'Conner formulas simultaneously.

---

## 🎨 Design Theme

FitForge utilizes a high-contrast layout tailored for modern high-performance interfaces:
- **Dark Mode**: Sleek obsidian background (`#0a0a0f`) with vibrant warm orange (`#f97316`) and cyan (`#22d3ee`) glows.
- **Light Mode**: High-contrast, clean elements with stark borders (`#dde1e8`) and neutral backgrounds (`#f5f5f7`).
- **Typography**: Editorial header spacing featuring the **Syne** Google font, body text set in **DM Sans**, and statistical readouts formatted in **JetBrains Mono**.

---

## 🚀 Quick Start

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Techstop-creator/FitForge.git
   cd FitForge
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open the browser at `http://localhost:5173/`.

### 🔑 Demo Account Credentials
For review, a demo profile is pre-registered upon loading:
- **Email:** `demo@fitforge.com`
- **Password:** `password123`

---

## 🏗️ Build & Deployment

To build the static assets for production deployment:
```bash
npm run build
```
This generates the optimized bundles inside the `dist/` directory, ready to be hosted on services like Vercel, Netlify, or GitHub Pages.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
