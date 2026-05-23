import { useState, useEffect, useRef, createContext, useContext } from "react";

const DARK_COLORS = {
  bg: "#0a0a0f",
  bg2: "#111118",
  bg3: "#16161f",
  card: "#1a1a25",
  border: "#2a2a3a",
  accent: "#f97316",
  accent2: "#fb923c",
  cyan: "#22d3ee",
  green: "#4ade80",
  purple: "#a78bfa",
  pink: "#f472b6",
  yellow: "#fbbf24",
  red: "#f87171",
  text: "#f1f5f9",
  muted: "#94a3b8",
  dim: "#475569",
};

const LIGHT_COLORS = {
  bg: "#f5f5f7",
  bg2: "#ffffff",
  bg3: "#eef0f4",
  card: "#ffffff",
  border: "#dde1e8",
  accent: "#ea6a0e",
  accent2: "#f08c3a",
  cyan: "#0891b2",
  green: "#16a34a",
  purple: "#7c3aed",
  pink: "#db2777",
  yellow: "#ca8a04",
  red: "#dc2626",
  text: "#1e293b",
  muted: "#64748b",
  dim: "#94a3b8",
};

const ThemeContext = createContext({ theme: "dark", COLORS: DARK_COLORS, toggleTheme: () => {} });
const useTheme = () => useContext(ThemeContext);

function buildCss(theme) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0a0a0f" : "#f5f5f7";
  const scrollTrack = isDark ? "#0a0a0f" : "#eef0f4";
  const scrollThumb = isDark ? "#2a2a3a" : "#c4c9d4";
  const textColor = isDark ? "#f1f5f9" : "#1e293b";
  const inputBg = isDark ? "#1a1a25" : "#f0f2f6";
  const inputBorder = isDark ? "#2a2a3a" : "#dde1e8";
  const rangeBg = isDark ? "#2a2a3a" : "#d0d5dd";

  return `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${scrollTrack}; }
  ::-webkit-scrollbar-thumb { background: ${scrollThumb}; border-radius: 2px; }
  body { background: ${bg}; color: ${textColor}; font-family: 'DM Sans', sans-serif; transition: background 0.35s ease, color 0.35s ease; }
  input, select, textarea { background: ${inputBg}; border: 1px solid ${inputBorder}; color: ${textColor}; border-radius: 8px; padding: 8px 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.35s, color 0.35s; }
  input:focus, select:focus, textarea:focus { border-color: #f97316; box-shadow: 0 0 0 2px rgba(249,115,22,0.2); }
  input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: ${rangeBg}; border: none; padding: 0; cursor: pointer; transition: background 0.2s; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #f97316; cursor: pointer; box-shadow: 0 0 10px rgba(249,115,22,0.5); transition: transform 0.2s; }
  input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
  button { cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
  button:active { transform: scale(0.96); }
  
  .btn-modern {
    background: linear-gradient(135deg, rgba(${isDark ? '255,255,255' : '0,0,0'},0.05), rgba(${isDark ? '255,255,255' : '0,0,0'},0.01));
    border: 1px solid rgba(${isDark ? '255,255,255' : '0,0,0'},0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    color: ${isDark ? '#fff' : '#1e293b'};
    font-weight: 600;
  }
  .btn-modern:hover {
    background: linear-gradient(135deg, rgba(${isDark ? '255,255,255' : '0,0,0'},0.1), rgba(${isDark ? '255,255,255' : '0,0,0'},0.02));
    border-color: rgba(${isDark ? '255,255,255' : '0,0,0'},0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,${isDark ? '0.3' : '0.1'});
  }

  .interactive-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .interactive-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 12px 30px rgba(0,0,0,${isDark ? '0.4' : '0.12'});
    border-color: rgba(${isDark ? '255,255,255' : '0,0,0'},0.15) !important;
  }

  @keyframes wave {
    0% { transform: translateX(0) translateZ(0) scaleY(1); }
    50% { transform: translateX(-25%) translateZ(0) scaleY(0.95); }
    100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
  }
  @keyframes floatBubble {
    0% { transform: translateY(0) scale(1); opacity: 0.8; }
    100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
  }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes scaleIn { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes fillBar { from{width:0%} to{width:var(--w)} }
  @keyframes countUp { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(249,115,22,0.3)} 50%{box-shadow:0 0 20px rgba(249,115,22,0.6)} }
  @keyframes ripple { to{transform:scale(4);opacity:0} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  .slide-up { animation: slideUp 0.4s ease forwards; }
  .fade-in { animation: fadeIn 0.3s ease forwards; }
  .scale-in { animation: scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .glow-pulse { animation: glow 2s ease-in-out infinite; }
  .float { animation: float 3s ease-in-out infinite; }
  
  /* Typography Fixes — prevent vertical compression on Syne headings */
  h1, h2, h3 { line-height: 1.35; letter-spacing: -0.02em; }
  .page-title { line-height: 1.4; padding-top: 4px; padding-bottom: 2px; }

  /* Auth responsive styles & animations */
  @media (max-width: 900px) {
    .auth-left { display: none !important; }
    .auth-right { width: 100% !important; padding: 40px 24px !important; }
  }
  .minimal-input {
    background: transparent !important;
    border: none !important;
    border-bottom: 1.5px solid ${isDark ? '#2a2a3a' : '#dde1e8'} !important;
    border-radius: 0px !important;
    padding: 10px 0px !important;
    font-size: 16px !important;
    color: ${textColor} !important;
    transition: border-color 0.25s ease !important;
  }
  .minimal-input:focus {
    border-color: #f97316 !important;
    box-shadow: none !important;
  }
  .minimal-select {
    background: transparent !important;
    border: none !important;
    border-bottom: 1.5px solid ${isDark ? '#2a2a3a' : '#dde1e8'} !important;
    border-radius: 0px !important;
    padding: 10px 0px !important;
    font-size: 16px !important;
    color: ${textColor} !important;
    transition: border-color 0.25s ease !important;
    cursor: pointer;
  }
  .minimal-select:focus {
    border-color: #f97316 !important;
    box-shadow: none !important;
  }
`;
}

const NAV = [
  { id:"dashboard", icon:"⚡", label:"Dashboard" },
  { id:"calories",  icon:"🔥", label:"Calories" },
  { id:"nutrition", icon:"🧬", label:"Nutrition" },
  { id:"water",     icon:"💧", label:"Hydration" },
  { id:"workout",   icon:"💪", label:"Workout" },
  { id:"diet",      icon:"🥗", label:"Diet Plans" },
  { id:"muscle",    icon:"🏋️", label:"Muscle Gain" },
  { id:"routine",   icon:"📅", label:"Daily Routine" },
  { id:"progress",  icon:"📈", label:"Progress" },
  { id:"ai",        icon:"🤖", label:"AI Coach" },
  { id:"sleep",     icon:"🌙", label:"Sleep" },
  { id:"stats",     icon:"🎯", label:"Body Stats" },
  { id:"cardio",    icon:"🏃", label:"Cardio" },
  { id:"supplements",icon:"💊",label:"Supplements" },
  { id:"goals",     icon:"🏆", label:"Goals" },
  { id:"calculator",icon:"🧮", label:"Calculator" },
  { id:"settings",  icon:"⚙️", label:"Settings" },
];

const FOODS = [
  {name:"Grilled Chicken (100g)", cal:165, protein:31, carbs:0, fat:4},
  {name:"Brown Rice (100g)", cal:112, protein:2.6, carbs:24, fat:0.9},
  {name:"Egg (1 large)", cal:72, protein:6, carbs:0.4, fat:5},
  {name:"Banana (medium)", cal:89, protein:1.1, carbs:23, fat:0.3},
  {name:"Greek Yogurt (100g)", cal:59, protein:10, carbs:3.6, fat:0.4},
  {name:"Almonds (30g)", cal:174, protein:6, carbs:6, fat:15},
  {name:"Salmon (100g)", cal:208, protein:20, carbs:0, fat:13},
  {name:"Sweet Potato (100g)", cal:86, protein:1.6, carbs:20, fat:0.1},
  {name:"Oats (100g)", cal:389, protein:17, carbs:66, fat:7},
  {name:"Broccoli (100g)", cal:34, protein:2.8, carbs:7, fat:0.4},
  {name:"Avocado (100g)", cal:160, protein:2, carbs:9, fat:15},
  {name:"Protein Shake (1 scoop)", cal:120, protein:25, carbs:5, fat:2},
];

const EXERCISES = [
  {name:"Bench Press", muscle:"Chest", sets:4, reps:"8-10", rest:"90s", level:"intermediate"},
  {name:"Pull-Ups", muscle:"Back", sets:4, reps:"6-12", rest:"90s", level:"intermediate"},
  {name:"Squat", muscle:"Legs", sets:4, reps:"8-10", rest:"120s", level:"beginner"},
  {name:"Deadlift", muscle:"Full Body", sets:3, reps:"5-6", rest:"180s", level:"advanced"},
  {name:"Overhead Press", muscle:"Shoulders", sets:4, reps:"8-10", rest:"90s", level:"intermediate"},
  {name:"Bicep Curl", muscle:"Arms", sets:3, reps:"12-15", rest:"60s", level:"beginner"},
  {name:"Tricep Dips", muscle:"Arms", sets:3, reps:"12-15", rest:"60s", level:"beginner"},
  {name:"Lunges", muscle:"Legs", sets:3, reps:"12 each", rest:"60s", level:"beginner"},
  {name:"Cable Row", muscle:"Back", sets:4, reps:"10-12", rest:"90s", level:"intermediate"},
  {name:"Lateral Raises", muscle:"Shoulders", sets:3, reps:"15-20", rest:"60s", level:"beginner"},
  {name:"Romanian Deadlift", muscle:"Hamstrings", sets:3, reps:"10-12", rest:"90s", level:"intermediate"},
  {name:"Plank", muscle:"Core", sets:3, reps:"60s", rest:"45s", level:"beginner"},
];

const DIET_PLANS = [
  {
    name:"Muscle Builder",icon:"💪",color:DARK_COLORS.accent,calories:3200,
    description:"High protein, moderate carbs for lean muscle growth",
    meals:[
      {time:"7:00 AM",name:"Breakfast",items:["Oats with banana","3 eggs scrambled","Protein shake"]},
      {time:"10:00 AM",name:"Snack",items:["Greek yogurt","Almonds","Apple"]},
      {time:"1:00 PM",name:"Lunch",items:["Grilled chicken breast","Brown rice","Broccoli"]},
      {time:"4:00 PM",name:"Pre-Workout",items:["Sweet potato","Protein bar"]},
      {time:"7:00 PM",name:"Dinner",items:["Salmon fillet","Quinoa","Mixed greens"]},
      {time:"9:00 PM",name:"Night Snack",items:["Cottage cheese","Casein protein"]},
    ]
  },
  {
    name:"Fat Burner",icon:"🔥",color:DARK_COLORS.cyan,calories:1800,
    description:"Caloric deficit with high protein to preserve muscle",
    meals:[
      {time:"7:00 AM",name:"Breakfast",items:["Egg whites (4)","Spinach","Black coffee"]},
      {time:"12:00 PM",name:"Lunch",items:["Turkey breast","Salad","Olive oil dressing"]},
      {time:"3:00 PM",name:"Snack",items:["Protein shake","Cucumber slices"]},
      {time:"7:00 PM",name:"Dinner",items:["Grilled fish","Steamed veggies","Small potato"]},
    ]
  },
  {
    name:"Clean Bulk",icon:"⚡",color:DARK_COLORS.green,calories:2800,
    description:"Moderate surplus with whole foods for quality gains",
    meals:[
      {time:"7:00 AM",name:"Breakfast",items:["Whole grain toast","4 eggs","Avocado","OJ"]},
      {time:"10:30 AM",name:"Mid-Morning",items:["Banana","Peanut butter","Protein shake"]},
      {time:"1:00 PM",name:"Lunch",items:["Chicken + rice bowl","Veggies","Nuts"]},
      {time:"4:00 PM",name:"Pre-Workout",items:["Oats","Honey","Banana"]},
      {time:"7:00 PM",name:"Dinner",items:["Steak","Sweet potato","Green beans"]},
    ]
  },
];

const MUSCLE_PLANS = [
  {
    name:"PPL Split", tag:"6 Days/Week", color:DARK_COLORS.accent,
    days:[
      {day:"Monday",focus:"Push",exercises:["Bench Press","Incline DB Press","Lateral Raises","Tricep Pushdown","Overhead Press"]},
      {day:"Tuesday",focus:"Pull",exercises:["Deadlift","Pull-Ups","Cable Row","Bicep Curls","Face Pulls"]},
      {day:"Wednesday",focus:"Legs",exercises:["Squat","Leg Press","Romanian DL","Leg Curl","Calf Raises"]},
      {day:"Thursday",focus:"Push",exercises:["Overhead Press","Cable Flies","Dips","Skull Crushers","Lateral Raises"]},
      {day:"Friday",focus:"Pull",exercises:["Barbell Row","Lat Pulldown","Seated Row","Hammer Curls","Rear Delt Flies"]},
      {day:"Saturday",focus:"Legs",exercises:["Front Squat","Bulgarian Split Squat","Leg Extension","Nordic Curls","Hip Thrust"]},
      {day:"Sunday",focus:"Rest",exercises:["Active Recovery","Stretching","Walking"]},
    ]
  },
  {
    name:"Upper/Lower", tag:"4 Days/Week", color:DARK_COLORS.cyan,
    days:[
      {day:"Monday",focus:"Upper A",exercises:["Bench Press","Barbell Row","OHP","Pull-Ups","Bicep Curls","Triceps"]},
      {day:"Tuesday",focus:"Lower A",exercises:["Squat","Romanian DL","Leg Press","Calf Raises","Core Work"]},
      {day:"Wednesday",focus:"Rest",exercises:["Light cardio","Mobility work"]},
      {day:"Thursday",focus:"Upper B",exercises:["Incline Press","Cable Row","DB Shoulder Press","Lat Pulldown"]},
      {day:"Friday",focus:"Lower B",exercises:["Deadlift","Front Squat","Leg Curl","Hip Thrust","Abs"]},
    ]
  },
];

const MICRONUTRIENTS = [
  {name:"Vitamin C", unit:"mg", daily:90, current:65, color:DARK_COLORS.accent, foods:"Citrus, peppers, berries"},
  {name:"Vitamin D", unit:"IU", daily:800, current:420, color:DARK_COLORS.yellow, foods:"Sunlight, fatty fish, eggs"},
  {name:"Calcium", unit:"mg", daily:1000, current:780, color:DARK_COLORS.cyan, foods:"Dairy, leafy greens"},
  {name:"Iron", unit:"mg", daily:18, current:12, color:DARK_COLORS.red, foods:"Red meat, beans, spinach"},
  {name:"Potassium", unit:"mg", daily:3500, current:2100, color:DARK_COLORS.green, foods:"Bananas, potatoes"},
  {name:"Magnesium", unit:"mg", daily:420, current:280, color:DARK_COLORS.purple, foods:"Nuts, seeds, dark chocolate"},
  {name:"Zinc", unit:"mg", daily:11, current:8, color:DARK_COLORS.pink, foods:"Oysters, beef, pumpkin seeds"},
  {name:"B12", unit:"μg", daily:2.4, current:1.8, color:DARK_COLORS.cyan, foods:"Meat, dairy, fortified foods"},
];

const TIPS = [
  "💡 Drink water before meals to reduce calorie intake by ~13%",
  "🔥 Progressive overload: increase weight 2.5% every 2 weeks",
  "😴 Sleep 7-9 hours — growth hormone peaks during deep sleep",
  "⚡ Compound movements burn 3x more calories than isolation exercises",
  "🥗 Eat protein within 30 minutes post-workout for optimal muscle synthesis",
  "💧 Aim for urine color like pale lemonade — sign of good hydration",
  "📅 Consistency beats intensity — 3 workouts/week beats 1 brutal session",
  "🧬 Track your lifts weekly, not daily — strength adapts slowly",
];

function RingChart({ value, max, color, size = 80, stroke = 8, children }) {
  const { COLORS } = useTheme();
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", display:"block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={COLORS.border} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
      {children}
    </svg>
  );
}

function StatCard({ label, value, unit, icon, color, sub }) {
  const { COLORS } = useTheme();
  return (
    <div className="scale-in interactive-card" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: COLORS.muted, fontFamily:"'DM Sans'", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom: 6 }}>{label}</div>
          <div style={{ display:"flex", alignItems:"baseline", gap: 4, flexWrap:"wrap" }}>
            <span style={{ fontSize: 26, fontWeight: 700, fontFamily:"'Syne'", lineHeight: 1.35, color: COLORS.text }}>{value}</span>
            <span style={{ fontSize: 12, color: COLORS.muted }}>{unit}</span>
          </div>
          {sub && <div style={{ fontSize: 12, color: COLORS.dim, marginTop: 4 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: 22, padding: 8, background: `${color}15`, borderRadius: 10, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, max, color, unit }) {
  const { COLORS } = useTheme();
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: COLORS.muted }}>{label}</span>
        <span style={{ fontSize: 13, color: COLORS.text, fontFamily:"'JetBrains Mono'" }}>{value}{unit} <span style={{ color: COLORS.dim }}>/ {max}{unit}</span></span>
      </div>
      <div style={{ background: COLORS.border, borderRadius: 4, height: 6, overflow:"hidden" }}>
        <div style={{ width: `${pct}%`, height:"100%", background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 4, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}

function Badge({ label, color }) {
  return <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, background: `${color}20`, color, border: `1px solid ${color}40`, fontWeight: 500 }}>{label}</span>;
}

// ─── PAGE TITLE HELPER ──────────────────────────────────────────────────────

function PageTitle({ children }) {
  return (
    <div className="page-title" style={{ fontFamily: "'Syne'", fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.4, paddingTop: 4 }}>
      {children}
    </div>
  );
}

// ─── PAGES ──────────────────────────────────────────────────────────────────

function Dashboard({ data, setData, setPage }) {
  const { COLORS } = useTheme();
  const today = new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
  const tip = TIPS[Math.floor(Date.now() / 86400000) % TIPS.length];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 4 }}>{today}</div>
        <h1 style={{ fontFamily:"'Syne'", fontSize: 30, fontWeight: 800, color: COLORS.text, lineHeight: 1.4, paddingTop: 4, paddingBottom: 2 }}>
          Good Morning, <span style={{ color: COLORS.accent }}>{data.name || "Athlete"}! 🔥</span>
        </h1>
        <div style={{ marginTop: 8, padding: "10px 16px", background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}30`, borderRadius: 10, fontSize: 13, color: COLORS.accent }}>{tip}</div>
      </div>

      {/* 4 rings row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {[
          { label:"Calories", value: data.calories,    max: data.calGoal,       color: COLORS.accent,  unit:"kcal", icon:"🔥" },
          { label:"Water",    value: data.water * 250, max: data.waterGoal*250, color: COLORS.cyan,    unit:"ml",   icon:"💧" },
          { label:"Protein",  value: data.protein,     max: data.proteinGoal,   color: COLORS.green,   unit:"g",    icon:"🧬" },
          { label:"Steps",    value: data.steps,       max: data.stepsGoal,     color: COLORS.purple,  unit:"",     icon:"👟" },
        ].map(({ label, value, max, color, unit, icon }) => {
          const p = Math.min(Math.round((value / max) * 100), 100);
          return (
            <div key={label} className="scale-in" style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"18px 14px", textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${color},transparent)` }} />
              <div style={{ position:"relative", display:"inline-block" }}>
                <RingChart value={value} max={max} color={color} size={88} stroke={8} />
                <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) rotate(90deg)", fontSize:20 }}>{icon}</div>
              </div>
              <div style={{ fontSize:21, fontFamily:"'Syne'", fontWeight:800, color: COLORS.text, marginTop:8 }}>{p}%</div>
              <div style={{ fontSize:11, color: COLORS.muted }}>{label}</div>
              <div style={{ fontSize:10, color, marginTop:2 }}>{typeof value==="number"?value.toLocaleString():value} {unit}</div>
            </div>
          );
        })}
      </div>

      {/* Stat Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        <StatCard label="Workout Streak"  value={data.streak}         unit="days" icon="⚡" color={COLORS.yellow} sub="Personal best: 21d" />
        <StatCard label="Weekly Workouts" value={data.weeklyWorkouts} unit="/ 5"  icon="💪" color={COLORS.purple} sub="2 remaining" />
        <StatCard label="Body Weight"     value={data.weight}         unit="kg"   icon="⚖️" color={COLORS.pink}   sub={`BMI: ${(data.weight/(data.height/100)**2).toFixed(1)}`} />
        <StatCard label="Calories Burned" value={data.burned}         unit="kcal" icon="🏃" color={COLORS.red}    sub="Exercise + BMR" />
      </div>

      {/* Macro + weekly chart */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:20 }}>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Today's Macros</div>
          <ProgressBar label="Protein" value={data.protein} max={data.proteinGoal} color={COLORS.green}  unit="g" />
          <ProgressBar label="Carbs"   value={data.carbs}   max={data.carbsGoal}   color={COLORS.cyan}   unit="g" />
          <ProgressBar label="Fats"    value={data.fat}     max={data.fatGoal}     color={COLORS.yellow} unit="g" />
          <ProgressBar label="Fiber"   value={data.fiber}   max={35}               color={COLORS.purple} unit="g" />
        </div>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Weekly Activity</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:90, marginBottom:10 }}>
            {[65,100,40,85,70,55,30].map((v,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", background: i===new Date().getDay()-1 ? COLORS.accent : `${COLORS.accent}45`, height:`${v}%`, borderRadius:"4px 4px 0 0", minHeight:4 }} />
                <div style={{ fontSize:10, color: i===new Date().getDay()-1 ? COLORS.accent : COLORS.dim }}>{"MTWTFSS"[i]}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:COLORS.muted }}>
            <span>Avg 1,840 kcal/day</span>
            <span style={{ color:COLORS.green }}>+12% vs last week ↑</span>
          </div>
        </div>
      </div>

      {/* Schedule + Quick Access */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:20 }}>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Today's Schedule</div>
          {[
            { time:"7:00",  task:"Morning hydration + stretching",   done:true,  color:COLORS.cyan },
            { time:"8:00",  task:"Breakfast — Oats + Protein Shake", done:true,  color:COLORS.green },
            { time:"12:00", task:"Lunch — Chicken + Rice",           done:false, color:COLORS.accent },
            { time:"17:00", task:"Push Day Workout",                  done:false, color:COLORS.purple },
            { time:"19:00", task:"Dinner — Salmon + Sweet Potato",   done:false, color:COLORS.pink },
            { time:"22:00", task:"Night protein + wind down",        done:false, color:COLORS.yellow },
          ].map(({ time, task, done, color }) => (
            <div key={task} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:`1px solid ${COLORS.border}` }}>
              <div style={{ width:42, fontSize:11, fontFamily:"'JetBrains Mono'", color: COLORS.muted, flexShrink:0 }}>{time}</div>
              <div style={{ width:7, height:7, borderRadius:"50%", background: done ? COLORS.green : color, flexShrink:0 }} />
              <div style={{ fontSize:13, color: done ? COLORS.dim : COLORS.text, textDecoration: done ? "line-through" : "none", flex:1 }}>{task}</div>
              {done && <Badge label="✓" color={COLORS.green} />}
            </div>
          ))}
        </div>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Quick Access</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:9 }}>
            {[
              {id:"calories",    icon:"🔥", label:"Log Food",     color:COLORS.accent},
              {id:"water",       icon:"💧", label:"Log Water",    color:COLORS.cyan},
              {id:"workout",     icon:"💪", label:"Exercises",    color:COLORS.purple},
              {id:"ai",          icon:"🤖", label:"AI Coach",     color:COLORS.green},
              {id:"cardio",      icon:"🏃", label:"Cardio",       color:COLORS.red},
              {id:"calculator",  icon:"🧮", label:"Calculator",   color:COLORS.yellow},
              {id:"progress",    icon:"📈", label:"Progress",     color:COLORS.pink},
              {id:"supplements", icon:"💊", label:"Supplements",  color:COLORS.green},
              {id:"goals",       icon:"🏆", label:"Goals",        color:COLORS.yellow},
            ].map(q => (
              <button key={q.id} onClick={() => setPage(q.id)}
                style={{ padding:"12px 6px", background:COLORS.bg3, border:`1px solid ${COLORS.border}`, borderRadius:10, cursor:"pointer", textAlign:"center", transition:"all 0.2s" }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=q.color;e.currentTarget.style.background=`${q.color}18`;}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=COLORS.border;e.currentTarget.style.background=COLORS.bg3;}}>
                <div style={{ fontSize:20, marginBottom:4 }}>{q.icon}</div>
                <div style={{ fontSize:10, color:COLORS.muted, whiteSpace:"nowrap" }}>{q.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Supplements checklist + Achievements */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>💊 Supplement Checklist</div>
          {["Creatine 5g","Vitamin D3 3000 IU","Omega-3 2g","Whey Protein","Magnesium (night)"].map((s,i) => {
            const done = i < 2;
            return (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${COLORS.border}` }}>
                <div style={{ width:18, height:18, borderRadius:5, border:`2px solid ${done?COLORS.green:COLORS.border}`, background:done?COLORS.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {done && <span style={{ fontSize:10, color:"#000", fontWeight:700 }}>✓</span>}
                </div>
                <span style={{ fontSize:13, color:done?COLORS.dim:COLORS.text, textDecoration:done?"line-through":"none" }}>{s}</span>
              </div>
            );
          })}
          <button onClick={()=>setPage("supplements")} style={{ marginTop:12, fontSize:12, color:COLORS.accent, background:"transparent", border:"none", cursor:"pointer", padding:0, textDecoration:"underline" }}>
            View full tracker →
          </button>
        </div>
        <div style={{ background: COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:"20px 22px" }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>🏅 Recent Achievements</div>
          {[
            {icon:"🔥", name:"Week Warrior",   desc:"7-day streak",        color:COLORS.accent},
            {icon:"⚡", name:"Two-Week Titan", desc:"14-day streak",       color:COLORS.yellow},
            {icon:"🍽️", name:"Calorie Counter",desc:"5 days logged",       color:COLORS.green},
            {icon:"💧", name:"Hydration Hero", desc:"Water goal x10",      color:COLORS.cyan},
            {icon:"📈", name:"Personal Record",desc:"New bench PR",        color:COLORS.purple},
          ].map(a => (
            <div key={a.name} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${COLORS.border}` }}>
              <div style={{ fontSize:18, padding:6, background:`${a.color}20`, borderRadius:8, flexShrink:0 }}>{a.icon}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:a.color }}>{a.name}</div>
                <div style={{ fontSize:11, color:COLORS.dim }}>{a.desc}</div>
              </div>
            </div>
          ))}
          <button onClick={()=>setPage("goals")} style={{ marginTop:12, fontSize:12, color:COLORS.yellow, background:"transparent", border:"none", cursor:"pointer", padding:0, textDecoration:"underline" }}>
            View all badges →
          </button>
        </div>
      </div>
    </div>
  );
}

function CaloriesPage({ data, setData }) {
  const { COLORS } = useTheme();
  const [log, setLog] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);

  const filtered = FOODS.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const totalCal = log.reduce((a,b) => a + b.cal, 0);

  const addFood = () => {
    if (!selected) return;
    const food = { ...selected, cal: Math.round(selected.cal * qty), protein: +(selected.protein * qty).toFixed(1), carbs: +(selected.carbs * qty).toFixed(1), fat: +(selected.fat * qty).toFixed(1), id: Date.now() };
    setLog(prev => [...prev, food]);
    setData(prev => ({ ...prev, calories: prev.calories + food.cal, protein: prev.protein + food.protein, carbs: prev.carbs + food.carbs, fat: prev.fat + food.fat }));
    setSelected(null); setQty(1); setSearch("");
  };

  const netCal = totalCal - data.burned;
  const remaining = data.calGoal - totalCal;

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Calorie <span style={{ color:COLORS.accent }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Log your meals and track your daily intake</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Consumed" value={totalCal} unit="kcal" icon="🍽️" color={COLORS.accent} />
        <StatCard label="Burned" value={data.burned} unit="kcal" icon="🏃" color={COLORS.red} />
        <StatCard label="Net" value={netCal} unit="kcal" icon="⚖️" color={netCal > 0 ? COLORS.yellow : COLORS.green} />
        <StatCard label="Remaining" value={Math.max(remaining, 0)} unit="kcal" icon="🎯" color={COLORS.purple} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Add food */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:14 }}>Add Food</div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search food..." style={{ width:"100%", marginBottom:10 }} />
          <div style={{ maxHeight:200, overflowY:"auto", marginBottom:14 }}>
            {filtered.slice(0,8).map(f => (
              <div key={f.name} onClick={() => setSelected(f)} style={{ padding:"10px 12px", borderRadius:8, marginBottom:4, background: selected?.name === f.name ? `${COLORS.accent}20` : COLORS.bg3, border: `1px solid ${selected?.name === f.name ? COLORS.accent : "transparent"}`, cursor:"pointer", transition:"all 0.2s" }}>
                <div style={{ fontSize:13, color:COLORS.text }}>{f.name}</div>
                <div style={{ fontSize:11, color:COLORS.muted }}>{f.cal} kcal · P:{f.protein}g · C:{f.carbs}g · F:{f.fat}g</div>
              </div>
            ))}
          </div>
          {selected && (
            <div style={{ padding:12, background:`${COLORS.accent}10`, borderRadius:10, marginBottom:12, border:`1px solid ${COLORS.accent}30` }}>
              <div style={{ fontSize:13, color:COLORS.accent, marginBottom:8 }}>{selected.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:12, color:COLORS.muted }}>Servings:</span>
                <input type="number" value={qty} onChange={e => setQty(+e.target.value || 1)} min="0.5" max="10" step="0.5" style={{ width:60 }} />
                <span style={{ fontSize:12, color:COLORS.muted }}>{Math.round(selected.cal * qty)} kcal total</span>
              </div>
            </div>
          )}
          <button onClick={addFood} style={{ width:"100%", padding:"10px", background: COLORS.accent, color:"#fff", border:"none", borderRadius:10, fontWeight:600, fontSize:14, transition:"opacity 0.2s" }} onMouseOver={e=>e.target.style.opacity=0.85} onMouseOut={e=>e.target.style.opacity=1}>
            + Add to Log
          </button>
        </div>

        {/* Today's log */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:14 }}>Today's Log</div>
          {log.length === 0 ? (
            <div style={{ textAlign:"center", color:COLORS.dim, padding:"40px 0", fontSize:13 }}>No foods logged yet<br/>Search and add foods →</div>
          ) : (
            <div style={{ maxHeight:320, overflowY:"auto" }}>
              {log.map(item => (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${COLORS.border}` }}>
                  <div>
                    <div style={{ fontSize:13, color:COLORS.text }}>{item.name}</div>
                    <div style={{ fontSize:11, color:COLORS.muted }}>P:{item.protein}g · C:{item.carbs}g · F:{item.fat}g</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:600, color:COLORS.accent }}>{item.cal}</div>
                    <div style={{ fontSize:10, color:COLORS.dim }}>kcal</div>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", paddingTop:12, fontWeight:600 }}>
                <span style={{ color:COLORS.muted }}>Total</span>
                <span style={{ color:COLORS.accent }}>{totalCal} kcal</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Macro bars */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginTop:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:16 }}>Macro Breakdown</div>
        <ProgressBar label="Calories" value={totalCal} max={data.calGoal} color={COLORS.accent} unit=" kcal" />
        <ProgressBar label="Protein" value={log.reduce((a,b)=>a+b.protein,0).toFixed(1)} max={data.proteinGoal} color={COLORS.green} unit="g" />
        <ProgressBar label="Carbs" value={log.reduce((a,b)=>a+b.carbs,0).toFixed(1)} max={data.carbsGoal} color={COLORS.cyan} unit="g" />
        <ProgressBar label="Fats" value={log.reduce((a,b)=>a+b.fat,0).toFixed(1)} max={data.fatGoal} color={COLORS.yellow} unit="g" />
      </div>
    </div>
  );
}

function NutritionPage({ data, setData }) {
  const { COLORS } = useTheme();
  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Micronutrient <span style={{ color:COLORS.cyan }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Monitor vitamins, minerals and essential nutrients</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:24 }}>
        {MICRONUTRIENTS.map(m => {
          const pct = Math.round((m.current/m.daily)*100);
          return (
            <div key={m.name} className="scale-in" style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:14, padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:600, color:COLORS.text }}>{m.name}</div>
                  <div style={{ fontSize:11, color:COLORS.muted, marginTop:2 }}>{m.foods}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:18, fontFamily:"'Syne'", fontWeight:700, color: pct >= 80 ? COLORS.green : pct >= 50 ? COLORS.yellow : COLORS.red }}>{pct}%</div>
                  <div style={{ fontSize:10, color:COLORS.dim }}>{m.current}/{m.daily} {m.unit}</div>
                </div>
              </div>
              <div style={{ background:"#2a2a3a", borderRadius:4, height:6 }}>
                <div style={{ width:`${Math.min(pct,100)}%`, height:"100%", background: pct>=80 ? COLORS.green : pct>=50 ? COLORS.yellow : COLORS.red, borderRadius:4, transition:"width 1s ease" }} />
              </div>
              <Badge label={pct >= 80 ? "✓ Good" : pct >= 50 ? "⚠ Low" : "✗ Deficient"} color={pct>=80?COLORS.green:pct>=50?COLORS.yellow:COLORS.red} />
              <span style={{ display:"inline-block", marginLeft:8 }} />
            </div>
          );
        })}
      </div>

      {/* Macro ratios */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>Optimal Macro Ratios by Goal</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {[
            { goal:"Muscle Gain", protein:"30%", carbs:"50%", fat:"20%", color:COLORS.accent },
            { goal:"Fat Loss", protein:"40%", carbs:"30%", fat:"30%", color:COLORS.cyan },
            { goal:"Maintenance", protein:"25%", carbs:"50%", fat:"25%", color:COLORS.green },
          ].map(g => (
            <div key={g.goal} style={{ padding:16, background:COLORS.bg3, borderRadius:12, border:`1px solid ${g.color}30` }}>
              <div style={{ fontSize:13, fontWeight:600, color:g.color, marginBottom:12 }}>{g.goal}</div>
              {[["Protein",g.protein,COLORS.green],["Carbs",g.carbs,COLORS.cyan],["Fat",g.fat,COLORS.yellow]].map(([n,v,c])=>(
                <div key={n} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:12, color:COLORS.muted }}>{n}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:c }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WaterPage({ data, setData }) {
  const { COLORS } = useTheme();
  const cups = data.waterGoal;
  const drunk = data.water;
  const pct = Math.round((drunk/cups)*100);
  const [bubbles, setBubbles] = useState([]);

  const addWater = (n = 1) => setData(prev => ({ ...prev, water: Math.min(prev.water + n, prev.waterGoal) }));
  const resetWater = () => setData(prev => ({ ...prev, water: 0 }));

  const handleGlassClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setBubbles(p => [...p, { id, x, y }]);
    setTimeout(() => setBubbles(p => p.filter(b => b.id !== id)), 1000);
    addWater(1);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    e.currentTarget.style.transform = `perspective(500px) rotateY(${x/15}deg) rotateX(${-y/15}deg)`;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `perspective(500px) rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Hydration <span style={{ color:COLORS.cyan }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:28 }}>Stay hydrated for peak performance</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Big water visual */}
        <div className="interactive-card" style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:20, padding:30, textAlign:"center" }}>
          <div 
            onClick={handleGlassClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              position:"relative", width:160, height:220, margin:"0 auto 24px", 
              background:`rgba(34, 211, 238, 0.05)`, borderRadius:"12px 12px 24px 24px", 
              border:`2px solid rgba(34, 211, 238, 0.2)`, 
              borderTop:`1px solid rgba(255,255,255,0.1)`,
              overflow:"hidden", cursor:"pointer",
              transition:"transform 0.2s ease-out, box-shadow 0.3s",
              boxShadow: "inset 10px 0 20px rgba(255,255,255,0.05), inset -10px 0 20px rgba(0,0,0,0.5)"
            }}>
            
            {/* Waves */}
            <div style={{ 
              position:"absolute", bottom:0, left:0, right:0, 
              height:`${pct}%`, transition:"height 0.8s cubic-bezier(0.4, 0, 0.2, 1)" 
            }}>
              <div style={{
                position:"absolute", top:"-10px", left:"0", width:"200%", height:"20px",
                background:`radial-gradient(ellipse at 50% 50%, rgba(34, 211, 238, 0.4) 0%, rgba(34,211,238,0) 70%)`,
                animation:"wave 4s linear infinite", opacity: pct > 0 ? 1 : 0
              }} />
              <div style={{
                position:"absolute", top:0, left:0, width:"100%", height:"100%",
                background:`linear-gradient(180deg, rgba(34, 211, 238, 0.5) 0%, rgba(34, 211, 238, 0.2) 100%)`,
                backdropFilter:"blur(4px)"
              }} />
            </div>

            {/* Bubbles */}
            {bubbles.map(b => (
              <div key={b.id} style={{
                position:"absolute", left: b.x, top: b.y, width: 8, height: 8, 
                borderRadius:"50%", border:"1px solid rgba(255,255,255,0.6)", 
                background:"rgba(255,255,255,0.2)",
                animation:"floatBubble 1s ease-in forwards", pointerEvents:"none"
              }} />
            ))}

            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center", pointerEvents:"none" }}>
              <div style={{ fontSize:36, fontFamily:"'Syne'", fontWeight:800, color:"#fff", textShadow:"0 2px 10px rgba(0,0,0,0.5)" }}>{pct}%</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.8)" }}>{drunk*250}ml</div>
            </div>
          </div>
          <div style={{ fontSize:20, fontFamily:"'Syne'", fontWeight:700, color:COLORS.text }}>{drunk} / {cups} glasses</div>
          <div style={{ fontSize:13, color:COLORS.muted, marginBottom:20 }}>{drunk*250}ml / {cups*250}ml daily goal</div>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <button className="btn-modern" onClick={() => addWater(1)} style={{ padding:"10px 24px", background:`linear-gradient(135deg, ${COLORS.cyan}, #0ea5e9)`, color:"#000", border:"none" }}>+ 1 Glass</button>
            <button className="btn-modern" onClick={() => addWater(2)} style={{ padding:"10px 24px", background:`rgba(34, 211, 238, 0.15)`, color:COLORS.cyan, border:`1px solid rgba(34, 211, 238, 0.3)` }}>+ 500ml</button>
            <button className="btn-modern" onClick={resetWater} style={{ padding:"10px 16px", background:"transparent", color:COLORS.dim, border:`1px solid ${COLORS.border}` }}>Reset</button>
          </div>
        </div>

        {/* Info & tips */}
        <div>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginBottom:14 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Hydration Stats</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                {l:"Consumed",v:`${drunk*250}ml`,c:COLORS.cyan},{l:"Remaining",v:`${(cups-drunk)*250}ml`,c:COLORS.muted},
                {l:"Goal",v:`${cups*250}ml`,c:COLORS.accent},{l:"Glasses",v:`${drunk}/${cups}`,c:COLORS.green},
              ].map(i=>(
                <div key={i.l} style={{ background:COLORS.bg3, borderRadius:10, padding:12, textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:700, fontFamily:"'Syne'", color:i.c }}>{i.v}</div>
                  <div style={{ fontSize:11, color:COLORS.dim }}>{i.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginBottom:14 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:12 }}>Set Daily Goal</div>
            <input type="range" min={4} max={16} value={data.waterGoal} onChange={e => setData(p=>({...p,waterGoal:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.cyan }} />
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:12, color:COLORS.muted }}>4 glasses (1L)</span>
              <span style={{ fontSize:13, fontWeight:600, color:COLORS.cyan }}>{data.waterGoal} glasses ({data.waterGoal*250}ml)</span>
              <span style={{ fontSize:12, color:COLORS.muted }}>16 glasses (4L)</span>
            </div>
          </div>

          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:12 }}>💡 Hydration Tips</div>
            {["Drink a glass immediately upon waking","Drink water 30 min before each meal","Keep a water bottle at your desk","Urine should be pale yellow","Add lemon or mint for flavor","Increase intake on workout days (+500ml)"].map(t=>(
              <div key={t} style={{ fontSize:12, color:COLORS.muted, padding:"6px 0", borderBottom:`1px solid ${COLORS.border}` }}>• {t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutPage({ data, setData }) {
  const { COLORS } = useTheme();
  const [filter, setFilter] = useState("All");
  const muscles = ["All","Chest","Back","Legs","Shoulders","Arms","Core","Full Body","Hamstrings"];
  const filtered = filter === "All" ? EXERCISES : EXERCISES.filter(e => e.muscle === filter);
  const levelColor = { beginner:COLORS.green, intermediate:COLORS.yellow, advanced:COLORS.red };

  // Rest timer state
  const [restTime, setRestTime] = useState(90);
  const [restLeft, setRestLeft] = useState(90);
  const [restRunning, setRestRunning] = useState(false);
  const [restDone, setRestDone] = useState(false);
  const restRef = useRef(null);

  // Set logger
  const [sessionLog, setSessionLog] = useState([]);
  const [activeEx, setActiveEx] = useState(null);
  const [logWeight, setLogWeight] = useState(60);
  const [logReps, setLogReps] = useState(8);

  useEffect(() => {
    if (!restRunning) { clearInterval(restRef.current); return; }
    restRef.current = setInterval(() => {
      setRestLeft(t => {
        if (t <= 1) { clearInterval(restRef.current); setRestRunning(false); setRestDone(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(restRef.current);
  }, [restRunning]);

  const startRest = (secs) => {
    setRestTime(secs); setRestLeft(secs); setRestRunning(true); setRestDone(false);
  };

  const logSet = () => {
    if (!activeEx) return;
    const entry = { ex: activeEx.name, weight: logWeight, reps: logReps, id: Date.now() };
    setSessionLog(p => [...p, entry]);
    startRest(parseInt(activeEx.rest));
  };

  const pct = Math.round((restLeft / restTime) * 100);
  const restColor = pct > 60 ? COLORS.green : pct > 30 ? COLORS.yellow : COLORS.red;

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Workout <span style={{ color:COLORS.purple }}>Library</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:20 }}>Exercise database with live set logger and rest timer</div>

      {/* Rest Timer + Session Log row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:22 }}>
        {/* Rest Timer */}
        <div style={{ background:COLORS.card, border:`2px solid ${restRunning ? restColor+"80" : COLORS.border}`, borderRadius:16, padding:20, textAlign:"center", transition:"border-color 0.4s" }}>
          <div style={{ fontSize:13, fontWeight:600, color:COLORS.muted, marginBottom:12, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            {restRunning ? "⏱️ Resting..." : restDone ? "✅ Rest Complete!" : "Rest Timer"}
          </div>
          <div style={{ position:"relative", display:"inline-block", marginBottom:14 }}>
            <RingChart value={restLeft} max={restTime} color={restColor} size={110} stroke={9} />
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) rotate(90deg)", textAlign:"center" }}>
              <div style={{ fontSize:26, fontFamily:"'Syne'", fontWeight:800, color:restColor }}>
                {String(Math.floor(restLeft/60)).padStart(2,"0")}:{String(restLeft%60).padStart(2,"0")}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            {[60,90,120,180].map(s => (
              <button key={s} onClick={() => startRest(s)} style={{ padding:"6px 12px", background: restTime===s && restRunning ? `${COLORS.purple}30` : COLORS.bg3, border:`1px solid ${restTime===s && restRunning ? COLORS.purple : COLORS.border}`, borderRadius:8, color:COLORS.muted, fontSize:12, cursor:"pointer" }}>{s}s</button>
            ))}
            <button onClick={() => { setRestRunning(false); setRestLeft(restTime); setRestDone(false); }} style={{ padding:"6px 12px", background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:8, color:COLORS.dim, fontSize:12, cursor:"pointer" }}>↺</button>
          </div>
          {activeEx && (
            <div style={{ marginTop:12, padding:"8px 12px", background:`${COLORS.purple}15`, borderRadius:8, fontSize:12, color:COLORS.purple }}>
              Active: <strong>{activeEx.name}</strong>
            </div>
          )}
        </div>

        {/* Set Logger */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:12 }}>📋 Set Logger</div>
          <div style={{ marginBottom:10 }}>
            <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Exercise</label>
            <select value={activeEx?.name || ""} onChange={e => setActiveEx(EXERCISES.find(x=>x.name===e.target.value)||null)} style={{ width:"100%" }}>
              <option value="">Select exercise...</option>
              {EXERCISES.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
            </select>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <div>
              <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Weight (kg): {logWeight}</label>
              <input type="range" min={5} max={200} step={2.5} value={logWeight} onChange={e=>setLogWeight(+e.target.value)} style={{ width:"100%", accentColor:COLORS.purple }} />
            </div>
            <div>
              <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Reps: {logReps}</label>
              <input type="range" min={1} max={30} value={logReps} onChange={e=>setLogReps(+e.target.value)} style={{ width:"100%", accentColor:COLORS.purple }} />
            </div>
          </div>
          <button onClick={logSet} style={{ width:"100%", padding:9, background:COLORS.purple, color:"#fff", border:"none", borderRadius:9, fontWeight:600, fontSize:13, marginBottom:10 }}>
            + Log Set & Start Rest Timer
          </button>
          <div style={{ maxHeight:120, overflowY:"auto" }}>
            {sessionLog.length === 0
              ? <div style={{ fontSize:12, color:COLORS.dim, textAlign:"center", padding:"16px 0" }}>No sets logged yet</div>
              : sessionLog.map((s,i) => (
                <div key={s.id} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${COLORS.border}`, fontSize:12 }}>
                  <span style={{ color:COLORS.muted }}>#{i+1} {s.ex}</span>
                  <span style={{ color:COLORS.purple, fontFamily:"'JetBrains Mono'" }}>{s.weight}kg × {s.reps}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:18 }}>
        {muscles.map(m => (
          <button key={m} onClick={() => setFilter(m)} style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${filter===m ? COLORS.purple : COLORS.border}`, background: filter===m ? `${COLORS.purple}20` : "transparent", color: filter===m ? COLORS.purple : COLORS.muted, fontSize:12, transition:"all 0.2s", cursor:"pointer" }}>{m}</button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14, marginBottom:20 }}>
        {filtered.map(ex => (
          <div key={ex.name} className="scale-in"
            onClick={() => setActiveEx(ex)}
            style={{ background: activeEx?.name===ex.name ? `${COLORS.purple}18` : COLORS.card, border:`1px solid ${activeEx?.name===ex.name ? COLORS.purple : COLORS.border}`, borderRadius:14, padding:18, transition:"all 0.2s", cursor:"pointer" }}
            onMouseOver={e=>{if(activeEx?.name!==ex.name)e.currentTarget.style.borderColor=COLORS.purple+"80";}}
            onMouseOut={e=>{if(activeEx?.name!==ex.name)e.currentTarget.style.borderColor=COLORS.border;}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color: activeEx?.name===ex.name ? COLORS.purple : COLORS.text }}>{ex.name}</div>
                <div style={{ fontSize:12, color:COLORS.muted, marginTop:3 }}>🎯 {ex.muscle}</div>
              </div>
              <Badge label={ex.level} color={levelColor[ex.level]} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {[["Sets",ex.sets],["Reps",ex.reps],["Rest",ex.rest]].map(([k,v])=>(
                <div key={k} style={{ background:COLORS.bg3, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:COLORS.purple }}>{v}</div>
                  <div style={{ fontSize:10, color:COLORS.dim }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Complete workout */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600 }}>🏅 Finish Workout</div>
            <div style={{ fontSize:12, color:COLORS.muted, marginTop:3 }}>{sessionLog.length} sets logged this session</div>
          </div>
          <button onClick={() => setData(p=>({...p, weeklyWorkouts: p.weeklyWorkouts+1, burned: p.burned+350, streak: p.streak+1}))} style={{ padding:"10px 24px", background:COLORS.purple, color:"#fff", border:"none", borderRadius:10, fontWeight:600, fontSize:14 }}>
            ✓ Complete (+350 kcal)
          </button>
        </div>
      </div>
    </div>
  );
}

function DietPage({ data }) {
  const { COLORS } = useTheme();
  const [active, setActive] = useState(0);
  const plan = DIET_PLANS[active];

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Diet <span style={{ color:COLORS.green }}>Plans</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Structured meal plans for your specific goals</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {DIET_PLANS.map((p,i) => (
          <div key={p.name} onClick={() => setActive(i)} style={{ background:COLORS.card, border:`2px solid ${active===i ? p.color : COLORS.border}`, borderRadius:14, padding:18, cursor:"pointer", transition:"all 0.3s", transform: active===i ? "scale(1.02)" : "scale(1)" }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{p.icon}</div>
            <div style={{ fontSize:16, fontFamily:"'Syne'", fontWeight:700, color: active===i ? p.color : COLORS.text }}>{p.name}</div>
            <div style={{ fontSize:12, color:COLORS.muted, marginTop:4 }}>{p.description}</div>
            <div style={{ marginTop:10, fontSize:13, color:p.color, fontWeight:600 }}>{p.calories} kcal/day</div>
          </div>
        ))}
      </div>

      <div style={{ background:COLORS.card, border:`1px solid ${plan.color}40`, borderRadius:16, padding:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
          <span style={{ fontSize:32 }}>{plan.icon}</span>
          <div>
            <div style={{ fontFamily:"'Syne'", fontSize:20, fontWeight:700, color:plan.color }}>{plan.name} Plan</div>
            <div style={{ fontSize:13, color:COLORS.muted }}>{plan.calories} kcal · {plan.description}</div>
          </div>
        </div>
        {plan.meals.map(m => (
          <div key={m.time} style={{ display:"flex", gap:16, padding:"14px 0", borderBottom:`1px solid ${COLORS.border}` }}>
            <div style={{ width:70, fontSize:12, fontFamily:"'JetBrains Mono'", color:plan.color, paddingTop:2, flexShrink:0 }}>{m.time}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:COLORS.text, marginBottom:4 }}>{m.name}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {m.items.map(item => (
                  <span key={item} style={{ fontSize:12, padding:"3px 10px", background:`${plan.color}15`, color:plan.color, borderRadius:20 }}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MusclePage() {
  const { COLORS } = useTheme();
  const [active, setActive] = useState(0);
  const plan = MUSCLE_PLANS[active];

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Muscle Gain <span style={{ color:COLORS.pink }}>Plans</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Structured training splits for maximum hypertrophy</div>

      <div style={{ display:"flex", gap:12, marginBottom:24 }}>
        {MUSCLE_PLANS.map((p,i) => (
          <button key={p.name} onClick={() => setActive(i)} style={{ padding:"10px 24px", borderRadius:10, border:`1px solid ${active===i ? p.color : COLORS.border}`, background: active===i ? `${p.color}20` : "transparent", color: active===i ? p.color : COLORS.muted, fontWeight:600, fontSize:14, transition:"all 0.2s" }}>
            {p.name} <span style={{ fontSize:11, opacity:0.7 }}>({p.tag})</span>
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {plan.days.map(d => {
          const focusColors = { Push:COLORS.accent, Pull:COLORS.cyan, Legs:COLORS.purple, Rest:COLORS.dim, "Upper A":COLORS.green, "Upper B":COLORS.green, "Lower A":COLORS.yellow, "Lower B":COLORS.yellow };
          const c = focusColors[d.focus] || COLORS.muted;
          return (
            <div key={d.day} className="scale-in" style={{ background:COLORS.card, border:`1px solid ${c}30`, borderRadius:14, padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:700, color:COLORS.text }}>{d.day}</div>
                <Badge label={d.focus} color={c} />
              </div>
              {d.exercises.map(ex => (
                <div key={ex} style={{ fontSize:12, color:COLORS.muted, padding:"5px 0", display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:c, flexShrink:0 }} />
                  {ex}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Muscle group guide */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24, marginTop:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:16 }}>Muscle Group Recovery Times</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[
            {group:"Chest",time:"48-72h",color:COLORS.accent},{group:"Back",time:"48-72h",color:COLORS.cyan},
            {group:"Shoulders",time:"48h",color:COLORS.yellow},{group:"Biceps",time:"48h",color:COLORS.green},
            {group:"Triceps",time:"48h",color:COLORS.purple},{group:"Legs (Quads)",time:"72-96h",color:COLORS.pink},
            {group:"Hamstrings",time:"72-96h",color:COLORS.red},{group:"Core",time:"24-48h",color:COLORS.muted},
            {group:"Calves",time:"24-48h",color:COLORS.dim},
          ].map(m => (
            <div key={m.group} style={{ background:COLORS.bg3, borderRadius:10, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:13, fontWeight:600, color:m.color }}>{m.group}</div>
              <div style={{ fontSize:11, color:COLORS.muted, marginTop:4 }}>Recovery: {m.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoutinePage() {
  const { COLORS } = useTheme();
  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const schedule = {
    Monday: { type:"Push", items:["Warm-up 10min","Bench Press 4×8","OHP 4×8","Triceps 3×12","Core 3×60s"], color:COLORS.accent },
    Tuesday: { type:"Pull", items:["Warm-up 10min","Deadlift 3×5","Pull-Ups 4×8","Cable Row 4×10","Biceps 3×12"], color:COLORS.cyan },
    Wednesday: { type:"Active Recovery", items:["30min walk","Yoga/Stretching","Foam rolling","Light cycling"], color:COLORS.green },
    Thursday: { type:"Legs", items:["Warm-up 10min","Squat 4×8","Leg Press 4×12","RDL 3×10","Calf Raises 4×15"], color:COLORS.purple },
    Friday: { type:"Upper Body", items:["Incline Press 4×8","Barbell Row 4×8","Lateral Raises 3×15","Face Pulls 3×15"], color:COLORS.yellow },
    Saturday: { type:"Cardio + Abs", items:["HIIT 20min","Cable Crunches 4×15","Plank 3×60s","Mountain Climbers 3×20"], color:COLORS.pink },
    Sunday: { type:"Rest Day", items:["Sleep 8+ hours","Meal prep","Light walk","Recovery shake"], color:COLORS.dim },
  };

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Daily <span style={{ color:COLORS.yellow }}>Routine</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Weekly exercise and wellness schedule</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {days.map(day => {
          const s = schedule[day];
          return (
            <div key={day} className="scale-in" style={{ background:COLORS.card, border:`1px solid ${s.color}30`, borderRadius:14, padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:700, color:COLORS.text }}>{day}</div>
                <Badge label={s.type} color={s.color} />
              </div>
              {s.items.map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 0", borderBottom:`1px solid ${COLORS.border}`, fontSize:12, color:COLORS.muted }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:s.color, flexShrink:0 }} />
                  {item}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProgressPage({ data, setData }) {
  const { COLORS } = useTheme();
  const weeks = ["W1","W2","W3","W4","W5","W6","W7","W8"];
  const weightData = [82, 81.5, 81, 80.8, 80.2, 79.8, 79.5, data.weight];
  const strengthData = [100, 105, 107.5, 110, 112.5, 115, 117.5, 120];

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Progress <span style={{ color:COLORS.accent }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Track your fitness journey over time</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Starting Weight" value="82.0" unit="kg" icon="📊" color={COLORS.dim} />
        <StatCard label="Current Weight" value={data.weight} unit="kg" icon="⚖️" color={COLORS.accent} />
        <StatCard label="Total Lost" value="2.5" unit="kg" icon="📉" color={COLORS.green} />
        <StatCard label="Strength Gain" value="+20%" unit="" icon="💪" color={COLORS.purple} />
      </div>

      {/* Weight chart */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24, marginBottom:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>Weight Progress (8 weeks)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:160 }}>
          {weightData.map((w,i) => {
            const maxW = Math.max(...weightData);
            const minW = Math.min(...weightData);
            const h = ((w - minW) / (maxW - minW + 0.01)) * 120 + 30;
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontSize:10, color:COLORS.muted }}>{w}</div>
                <div style={{ width:"100%", background:`linear-gradient(0deg, ${COLORS.accent}, ${COLORS.accent}80)`, height:h, borderRadius:"4px 4px 0 0", transition:"height 0.8s ease" }} />
                <div style={{ fontSize:10, color:COLORS.dim }}>{weeks[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strength chart */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24, marginBottom:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>Bench Press Strength (lbs)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:160 }}>
          {strengthData.map((s,i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ fontSize:10, color:COLORS.muted }}>{s}</div>
              <div style={{ width:"100%", background:`linear-gradient(0deg, ${COLORS.purple}, ${COLORS.purple}80)`, height:(s/130)*130, borderRadius:"4px 4px 0 0", transition:"height 0.8s ease" }} />
              <div style={{ fontSize:10, color:COLORS.dim }}>{weeks[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Measurements */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:16 }}>Body Measurements</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[
            {part:"Chest",start:"100cm",now:"102cm",color:COLORS.accent},
            {part:"Waist",start:"86cm",now:"84cm",color:COLORS.cyan},
            {part:"Hips",start:"98cm",now:"97cm",color:COLORS.green},
            {part:"Left Arm",start:"35cm",now:"37cm",color:COLORS.purple},
            {part:"Right Arm",start:"35cm",now:"37cm",color:COLORS.purple},
            {part:"Thighs",start:"58cm",now:"60cm",color:COLORS.pink},
          ].map(m => (
            <div key={m.part} style={{ background:COLORS.bg3, borderRadius:10, padding:12 }}>
              <div style={{ fontSize:12, color:COLORS.muted, marginBottom:6 }}>{m.part}</div>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div style={{ fontSize:12, color:COLORS.dim }}>Start: {m.start}</div>
                <div style={{ fontSize:13, fontWeight:600, color:m.color }}>Now: {m.now}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIPage({ data }) {
  const { COLORS } = useTheme();
  const [messages, setMessages] = useState([
    { role:"ai", text:"👋 Hey! I'm your AI Fitness Coach. I can help you with workout plans, nutrition advice, progress analysis, and personalized recommendations. What would you like to know?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const SUGGESTIONS = ["Create a 4-week muscle gain plan","What should I eat before a workout?","How do I break a weight loss plateau?","Best exercises for bigger arms?","How much protein do I need daily?"];

  // Comprehensive local AI response engine
  const getAIResponse = (userMsg) => {
    const kw = userMsg.toLowerCase();

    // Greeting
    if (/^(hi|hello|hey|yo|sup|what'?s up)/i.test(kw))
      return `👋 Hey ${data.name || "there"}! Ready to crush your goals today? Here's your quick snapshot:\n\n🔥 Calories: ${data.calories}/${data.calGoal} kcal\n💧 Water: ${data.water}/${data.waterGoal} glasses\n🧬 Protein: ${data.protein}/${data.proteinGoal}g\n⚡ Streak: ${data.streak} days\n\nAsk me about workouts, nutrition, recovery, or anything fitness related!`;

    // Muscle gain plan / 4 week plan
    if ((kw.includes("4-week") || kw.includes("4 week") || kw.includes("plan")) && (kw.includes("muscle") || kw.includes("gain") || kw.includes("bulk")))
      return `💪 Here's your 4-Week Muscle Gain Blueprint:\n\n📅 **Week 1-2: Foundation Phase**\n• Push/Pull/Legs split, 4 sets × 10-12 reps\n• Focus on form and mind-muscle connection\n• Progressive overload: start at RPE 7\n\n📅 **Week 3-4: Growth Phase**\n• Same split, 4 sets × 8-10 reps (heavier)\n• Add 2.5-5kg to compound lifts\n• RPE 8-9 on working sets\n\n🍽️ **Nutrition:**\n• Calories: TDEE + 300 kcal (~${Math.round((10*data.weight + 6.25*data.height - 5*data.age + 5)*1.55 + 300)} kcal/day for you)\n• Protein: 2.0-2.2g/kg (${Math.round(2.1*data.weight)}g/day)\n• Prioritize carbs around workouts\n\n😴 Sleep 7-9 hours for optimal recovery. Consistency beats perfection! 🔥`;

    // Pre-workout nutrition
    if (kw.includes("before") && (kw.includes("workout") || kw.includes("training") || kw.includes("gym")))
      return `⚡ **Pre-Workout Nutrition Guide:**\n\n🕐 **2-3 hours before:**\n• Complex carbs + moderate protein + low fat\n• Example: Chicken + rice + veggies or oats + banana + protein shake\n\n🕐 **30-60 minutes before:**\n• Quick-digesting carbs + small protein\n• Example: Banana + rice cake, or a small protein bar\n\n☕ **Optional caffeine:** 200mg (1-2 cups coffee) 30 min before for performance boost\n\n❌ **Avoid:**\n• Heavy fatty meals (slow digestion)\n• Too much fiber (GI discomfort)\n• Trying new foods on workout day\n\n💡 Hydrate with 500ml water in the hour before training!`;

    // Weight loss plateau
    if (kw.includes("plateau") || (kw.includes("stuck") && (kw.includes("weight") || kw.includes("losing"))))
      return `📉 **Breaking Through a Weight Loss Plateau:**\n\n1️⃣ **Recalculate TDEE** — as you lose weight, your maintenance calories drop. You may need to reduce by another 100-200 kcal\n\n2️⃣ **Diet breaks** — try eating at maintenance for 1-2 weeks, then resume your deficit. This resets leptin and ghrelin\n\n3️⃣ **Increase NEAT** — walk 2000 more steps/day (burns ~100-150 extra kcal)\n\n4️⃣ **Check hidden calories** — oils, sauces, "healthy" snacks add up fast. Track everything for 1 week\n\n5️⃣ **Add refeed days** — 1-2 high-carb days per week at maintenance to boost metabolism\n\n6️⃣ **Prioritize sleep** — poor sleep raises cortisol and increases hunger hormones\n\n⚠️ If the scale hasn't moved in 2+ weeks but your measurements are changing, you may be recomping (losing fat, gaining muscle). Take progress photos! 📸`;

    // Arms / biceps / triceps
    if (kw.includes("arm") || kw.includes("bicep") || kw.includes("tricep"))
      return `💪 **Best Exercises for Bigger Arms:**\n\n**Biceps (2/3 of arm size):**\n1. Barbell Curl — 3×8-10 (heavy, strict form)\n2. Incline Dumbbell Curl — 3×10-12 (great stretch)\n3. Hammer Curls — 3×10-12 (brachialis = arm width)\n4. Cable Curl — 3×12-15 (constant tension finisher)\n\n**Triceps (2/3 of arm size!):**\n1. Close-Grip Bench Press — 3×8-10 (heavy compound)\n2. Overhead Tricep Extension — 3×10-12 (long head focus)\n3. Cable Pushdown — 3×12-15\n4. Dips — 3×8-12 (bodyweight or weighted)\n\n📋 **Training tips:**\n• Train arms 2x/week with 48h rest between\n• Total volume: 12-20 sets per week\n• Progressive overload: add weight or reps weekly\n• Don't neglect triceps — they're 2/3 of arm size! 🔥`;

    // Protein needs
    if (kw.includes("protein") && (kw.includes("how much") || kw.includes("need") || kw.includes("daily") || kw.includes("enough")))
      return `🧬 **Your Personalized Protein Needs:**\n\nBased on your stats (${data.weight}kg, goal: ${data.goal || "muscle"}):\n\n📊 **Recommended intake:**\n• Muscle gain: **${Math.round(2.0*data.weight)}-${Math.round(2.2*data.weight)}g/day** (2.0-2.2g/kg)\n• Fat loss: **${Math.round(2.2*data.weight)}-${Math.round(2.4*data.weight)}g/day** (2.2-2.4g/kg — higher to preserve muscle)\n• Maintenance: **${Math.round(1.6*data.weight)}-${Math.round(1.8*data.weight)}g/day** (1.6-1.8g/kg)\n\n🍽️ **Spread across meals:**\n• 4-5 meals with 30-50g protein each\n• Include protein within 2h post-workout\n\n🥩 **Top sources (per 100g):**\n• Chicken breast: 31g\n• Greek yogurt: 10g\n• Eggs (2 large): 12g\n• Salmon: 20g\n• Whey shake: 25g per scoop\n\nYou're currently at ${data.protein}g / ${data.proteinGoal}g today. ${data.protein >= data.proteinGoal ? "Great job hitting your target! ✅" : `${data.proteinGoal - data.protein}g to go! 💪`}`;

    // General muscle building
    if (kw.includes("muscle") || kw.includes("build") || kw.includes("hypertrophy") || kw.includes("mass"))
      return `💪 **Muscle Building Fundamentals:**\n\n1️⃣ **Progressive Overload** — increase weight, reps, or sets over time\n2️⃣ **Volume** — 10-20 sets per muscle group per week\n3️⃣ **Protein** — 1.6-2.2g per kg bodyweight (${Math.round(2.0*data.weight)}g/day for you)\n4️⃣ **Caloric Surplus** — eat 200-500 kcal above maintenance\n5️⃣ **Recovery** — 48-72h between training same muscle group\n6️⃣ **Sleep** — 7-9 hours for optimal growth hormone release\n\n🔑 Compound movements (squats, deadlifts, bench, rows) should form 70% of your training. Isolation exercises fine-tune.\n\nConsistency over perfection — 3-4 quality sessions/week beats 6 mediocre ones! 🔥`;

    // Fat loss / weight loss / cutting
    if (kw.includes("fat") || kw.includes("weight loss") || kw.includes("lose") || kw.includes("cut") || kw.includes("lean"))
      return `🔥 **Smart Fat Loss Strategy:**\n\n📊 Based on your stats:\n• Estimated TDEE: ~${Math.round((10*data.weight + 6.25*data.height - 5*data.age + 5)*1.55)} kcal\n• Moderate deficit target: ~${Math.round((10*data.weight + 6.25*data.height - 5*data.age + 5)*1.55 - 400)} kcal/day\n\n🎯 **The 5 rules:**\n1. Caloric deficit of 300-500 kcal (not more!)\n2. High protein (2.2g/kg = ${Math.round(2.2*data.weight)}g/day) to preserve muscle\n3. Strength train 3-4x/week (don't switch to only cardio!)\n4. Walk 8,000-10,000 steps daily for NEAT\n5. Sleep 7-9 hours (poor sleep = more hunger hormones)\n\n⚡ Aim to lose 0.5-1% bodyweight per week (${(data.weight*0.005).toFixed(1)}-${(data.weight*0.01).toFixed(1)}kg/week for you). Faster = muscle loss risk!`;

    // Sleep / recovery
    if (kw.includes("sleep") || kw.includes("recover") || kw.includes("rest"))
      return `😴 **Sleep & Recovery Optimization:**\n\n🛏️ **Sleep targets:**\n• Duration: 7-9 hours (you logged quality ${data.sleepQuality}/10)\n• Consistency: same bed/wake time ±30 min\n\n🧊 **Recovery stack:**\n1. Sleep 8h → Growth hormone peaks during deep sleep\n2. Active recovery days → light walking, stretching, foam rolling\n3. Protein before bed → casein or cottage cheese (slow release)\n4. Hydration → dehydration impairs recovery by up to 25%\n5. Stress management → high cortisol blocks muscle growth\n\n💡 **Sleep hygiene tips:**\n• Room temp 18-20°C (65-68°F)\n• No screens 1h before bed (blue light blocks melatonin)\n• Magnesium glycinate 300-400mg before bed\n• No caffeine after 2pm\n• Dark room — blackout curtains or sleep mask`;

    // Workout / exercise / training
    if (kw.includes("workout") || kw.includes("exercise") || kw.includes("train") || kw.includes("gym") || kw.includes("routine"))
      return `🏋️ **Workout Recommendations:**\n\nBased on your ${data.weeklyWorkouts}/5 weekly workouts and ${data.streak}-day streak:\n\n📋 **Recommended split:** Push/Pull/Legs\n• Push: Bench, OHP, Lateral Raises, Triceps\n• Pull: Rows, Pull-ups, Curls, Face Pulls\n• Legs: Squats, RDL, Leg Press, Calves\n\n⏱️ **Session structure:**\n1. Warm-up: 5-10 min dynamic stretching\n2. Compound lifts: 3-4 exercises, 4 sets each\n3. Isolation work: 2-3 exercises, 3 sets each\n4. Cool down: 5 min stretching\n\n📈 Total time: 45-75 minutes\n\n🔑 **Pro tips:**\n• Rest 2-3 min for compounds, 60-90s for isolation\n• Log your weights — if you're not tracking, you're guessing!\n• Deload every 4-6 weeks (reduce volume by 40-50%)\n\nYou're at ${data.weeklyWorkouts} workouts this week. Keep it up! ${data.weeklyWorkouts >= 3 ? "🔥" : "💪"}`;

    // Calories / TDEE / macros
    if (kw.includes("calorie") || kw.includes("macro") || kw.includes("tdee") || kw.includes("bmr"))
      return `📊 **Your Calorie & Macro Breakdown:**\n\nBMR (base): ~${Math.round(10*data.weight + 6.25*data.height - 5*data.age + 5)} kcal\nTDEE (active): ~${Math.round((10*data.weight + 6.25*data.height - 5*data.age + 5)*1.55)} kcal\n\n📈 **Today's progress:**\n• Consumed: ${data.calories} / ${data.calGoal} kcal\n• Protein: ${data.protein}g / ${data.proteinGoal}g\n• Carbs: ${data.carbs}g / ${data.carbsGoal}g\n• Fat: ${data.fat}g / ${data.fatGoal}g\n\n🎯 **Ideal macro split for ${data.goal || 'muscle gain'}:**\n• Protein: 30% (${Math.round(data.calGoal*0.30/4)}g)\n• Carbs: 45% (${Math.round(data.calGoal*0.45/4)}g)\n• Fat: 25% (${Math.round(data.calGoal*0.25/9)}g)\n\n${data.calories < data.calGoal ? `You have ${data.calGoal - data.calories} kcal remaining today. Don't skip meals! 🍽️` : "You've hit your calorie target! ✅"}`;

    // Water / hydration
    if (kw.includes("water") || kw.includes("hydrat"))
      return `💧 **Hydration Guide:**\n\nCurrent: ${data.water}/${data.waterGoal} glasses (${data.water*250}ml / ${data.waterGoal*250}ml)\n\n📏 **How much you need:**\n• Base: 35ml per kg bodyweight = ${Math.round(35*data.weight)}ml/day\n• On workout days: add 500-750ml\n• Hot weather: add 500ml\n\n⏰ **When to drink:**\n• Immediately upon waking (500ml)\n• 30 min before meals\n• During workout (250ml every 15-20 min)\n• Before bed (small amount)\n\n🎯 Urine should be pale yellow. Dark = dehydrated! ${data.water >= data.waterGoal ? "✅ Great, you've hit your goal!" : `${data.waterGoal - data.water} glasses to go!`}`;

    // Supplements
    if (kw.includes("supplement") || kw.includes("creatine") || kw.includes("vitamin") || kw.includes("omega"))
      return `💊 **Evidence-Based Supplement Stack:**\n\n✅ **Tier 1 (must-haves):**\n1. Creatine Monohydrate — 5g/day, every day. #1 supplement for strength & muscle\n2. Protein Powder — convenient way to hit protein targets\n3. Vitamin D3 — 2000-5000 IU/day (most people are deficient)\n\n🟡 **Tier 2 (recommended):**\n4. Omega-3 Fish Oil — 1-3g EPA+DHA for joints & inflammation\n5. Magnesium Glycinate — 300-400mg before bed for sleep & recovery\n6. Caffeine — 200mg pre-workout for performance\n\n⚠️ **Skip these (waste of money):**\n• BCAAs (redundant if eating enough protein)\n• Fat burners (just caffeine with a markup)\n• Testosterone boosters (no evidence they work)\n\n💡 Food first, supplements second. They supplement a good diet, not replace one!`;

    // Chest exercises
    if (kw.includes("chest") || kw.includes("bench") || kw.includes("pec"))
      return `🎯 **Complete Chest Training Guide:**\n\n**Top exercises:**\n1. Flat Barbell Bench Press — 4×6-8 (strength foundation)\n2. Incline Dumbbell Press — 3×8-12 (upper chest)\n3. Cable Flyes — 3×12-15 (stretch & squeeze)\n4. Dips (leaning forward) — 3×8-12 (lower chest)\n5. Push-Ups — 3×failure (finisher)\n\n📋 **Weekly volume:** 12-16 sets\n**Frequency:** 2x per week with 48-72h rest\n\n💡 **Tips:**\n• Retract & depress shoulder blades on all pressing\n• Full range of motion > heavy weight\n• Vary grip width for different emphasis\n• Incline work = upper chest, the area most people underdevelop 🔥`;

    // Back exercises
    if (kw.includes("back") || kw.includes("lat") || kw.includes("row") || kw.includes("pull-up") || kw.includes("pullup"))
      return `🎯 **Back Training Guide:**\n\n**Top exercises:**\n1. Deadlift / Barbell Row — 4×6-8 (thickness)\n2. Pull-Ups / Lat Pulldown — 4×8-12 (width)\n3. Seated Cable Row — 3×10-12 (mid-back)\n4. Face Pulls — 3×15-20 (rear delts & posture)\n5. Single-Arm Dumbbell Row — 3×10-12\n\n📋 **Volume:** 14-20 sets/week, 2x frequency\n\n💡 **Tips:**\n• "Pull with your elbows, not your hands"\n• Squeeze shoulder blades together at peak contraction\n• Vary grips: wide (lats), close (mid-back), neutral (overall)\n• A strong back = better posture + injury prevention 💪`;

    // Legs / squat
    if (kw.includes("leg") || kw.includes("squat") || kw.includes("glute") || kw.includes("quad") || kw.includes("hamstring"))
      return `🦵 **Leg Training Guide:**\n\n**Quad-dominant:**\n1. Barbell Back Squat — 4×6-8\n2. Leg Press — 3×10-12\n3. Bulgarian Split Squat — 3×10 each\n4. Leg Extension — 3×12-15\n\n**Hamstring & Glute:**\n1. Romanian Deadlift — 3×8-10\n2. Hip Thrust — 3×10-12\n3. Lying Leg Curl — 3×10-12\n4. Walking Lunges — 3×12 each\n\n**Calves:** Standing Raises 4×15, Seated 3×20\n\n📋 **Volume:** 16-20 sets/week\n**Recovery:** 72-96 hours between leg days\n\n💡 Never skip legs — they release the most growth hormone and testosterone! 🔥`;

    // Shoulder
    if (kw.includes("shoulder") || kw.includes("delt") || kw.includes("ohp") || kw.includes("overhead press"))
      return `🎯 **Shoulder Training Guide:**\n\n1. Overhead Press — 4×6-8 (main strength builder)\n2. Lateral Raises — 4×12-15 (width — the money exercise!)\n3. Rear Delt Flyes — 3×15-20 (often neglected)\n4. Face Pulls — 3×15-20 (posture & health)\n5. Arnold Press — 3×10-12 (all three heads)\n\n📋 **Volume:** 14-18 sets/week\n💡 The lateral head (side delt) gives that wide, capped look. Train it with higher reps and controlled tempo!`;

    // Stretching / flexibility / mobility
    if (kw.includes("stretch") || kw.includes("flex") || kw.includes("mobil") || kw.includes("warm"))
      return `🧘 **Mobility & Stretching Guide:**\n\n**Pre-workout (dynamic, 5 min):**\n• Arm circles, leg swings, hip circles\n• Cat-cow, world's greatest stretch\n• Light band work for shoulders\n\n**Post-workout (static, 5-10 min):**\n• Hold each stretch 30-60 seconds\n• Focus on muscles trained that day\n• Hip flexors, hamstrings, chest, lats\n\n**Daily mobility (5 min):**\n• Deep squat hold (1 min)\n• Thoracic spine rotation\n• Pigeon pose for hips\n• Doorway chest stretch\n\n💡 Flexibility ≠ weakness. Mobile muscles can contract through a fuller range = more gains! 🔥`;

    // Injury / pain
    if (kw.includes("injur") || kw.includes("pain") || kw.includes("hurt") || kw.includes("sore"))
      return `⚠️ **Pain & Injury Management:**\n\n**DOMS (soreness) vs injury:**\n• DOMS: dull, bilateral, peaks 24-48h, improves with movement ✅\n• Injury: sharp, one-sided, sudden onset, worsens with movement ❌\n\n**If DOMS:**\n• Light movement, stretching, foam rolling\n• Adequate protein and sleep\n• It gets better as you train consistently\n\n**If potential injury:**\n1. Stop the exercise immediately\n2. RICE: Rest, Ice, Compress, Elevate\n3. See a physiotherapist before returning to training\n4. Train around the injury (injured shoulder? Train legs!)\n\n⚠️ I'm an AI coach, not a doctor. If pain persists for more than a few days, please consult a healthcare professional! 🏥`;

    // Motivation
    if (kw.includes("motivat") || kw.includes("discipl") || kw.includes("consistent") || kw.includes("lazy") || kw.includes("quit"))
      return `🔥 **Motivation & Discipline:**\n\n💡 "Motivation gets you started. Discipline keeps you going."\n\n**Practical tips:**\n1. **Never miss twice** — missed Monday? Train Tuesday no matter what\n2. **2-minute rule** — just get to the gym. Once you're there, you'll train\n3. **Track progress** — you're on a ${data.streak}-day streak! Don't break it 🔥\n4. **Small wins** — celebrate hitting protein goals, water goals, showing up\n5. **Environment design** — prep gym bag night before, set alarm\n6. **Identity shift** — you're not "trying to workout", you ARE someone who trains\n\n📈 You've completed ${data.weeklyWorkouts} workouts this week. That's effort compounding over time!\n\nRemember: the person who trains 3x/week for 5 years will ALWAYS beat the person who trains 7x/week for 5 weeks. 💪`;

    // Thank you / thanks
    if (kw.includes("thank") || kw.includes("thanks") || kw.includes("awesome") || kw.includes("great") || kw.includes("perfect"))
      return `🙏 You're welcome! That's what I'm here for. Keep crushing it — your ${data.streak}-day streak shows real dedication! 🔥\n\nAnything else you want to know about? I can help with:\n• 💪 Training programs\n• 🥗 Nutrition planning\n• 😴 Recovery optimization\n• 📊 Progress analysis\n• 💊 Supplement guidance`;

    // Default
    return `Great question! Here's what I can help you with:\n\n💪 **Training** — workout plans, exercise form, splits, progressive overload\n🥗 **Nutrition** — meal planning, macros, protein needs, pre/post workout food\n📉 **Fat Loss** — caloric deficit, plateaus, recomposition strategies\n💪 **Muscle Gain** — bulking plans, exercise selection, volume recommendations\n😴 **Recovery** — sleep optimization, rest days, deload weeks\n💊 **Supplements** — evidence-based recommendations\n🏃 **Cardio** — HIIT, steady state, heart rate zones\n📊 **Progress** — tracking, measurements, adjusting plans\n\nJust ask about any of these topics and I'll give you personalized advice based on your stats! 🔥`;
  };

  const sendMsg = async (text) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages(prev => [...prev, { role:"user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // Simulate thinking delay for natural feel
    await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
    const reply = getAIResponse(userMsg);
    setMessages(prev => [...prev, { role:"ai", text: reply }]);

    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
  };

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>AI <span style={{ color:COLORS.cyan }}>Coach</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:20 }}>Your personal fitness intelligence — ask anything!</div>

      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => sendMsg(s)} style={{ padding:"7px 14px", borderRadius:20, border:`1px solid ${COLORS.border}`, background:"transparent", color:COLORS.muted, fontSize:12, cursor:"pointer", transition:"all 0.2s" }} onMouseOver={e=>{e.target.style.borderColor=COLORS.cyan;e.target.style.color=COLORS.cyan}} onMouseOut={e=>{e.target.style.borderColor=COLORS.border;e.target.style.color=COLORS.muted}}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, display:"flex", flexDirection:"column", height:420 }}>
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>
          {messages.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent: m.role==="user" ? "flex-end" : "flex-start", marginBottom:12 }}>
              <div style={{ maxWidth:"80%", padding:"10px 16px", borderRadius: m.role==="user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role==="user" ? COLORS.accent : COLORS.bg3, color: m.role==="user" ? "#fff" : COLORS.text, fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap" }}>
                {m.role === "ai" && <div style={{ fontSize:11, color:COLORS.cyan, marginBottom:4, fontWeight:600 }}>🤖 FitForge AI</div>}
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display:"flex", gap:6, padding:"10px 16px", background:COLORS.bg3, borderRadius:"16px 16px 16px 4px", width:"fit-content" }}>
              {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:COLORS.cyan, animation:`pulse 1s ${i*0.2}s infinite` }} />)}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding:"12px 16px", borderTop:`1px solid ${COLORS.border}`, display:"flex", gap:10 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg(input)} placeholder="Ask about nutrition, workouts, recovery..." style={{ flex:1, borderRadius:10 }} />
          <button onClick={() => sendMsg(input)} style={{ padding:"8px 20px", background:COLORS.cyan, color:"#000", border:"none", borderRadius:10, fontWeight:700, fontSize:14 }}>Send</button>
        </div>
      </div>
    </div>
  );
}

function SleepPage({ data, setData }) {
  const { COLORS } = useTheme();
  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Sleep <span style={{ color:COLORS.purple }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Optimize recovery through quality sleep</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>Last Night's Sleep</div>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontSize:52, fontFamily:"'Syne'", fontWeight:800, color:COLORS.purple }}>7.5</div>
            <div style={{ fontSize:14, color:COLORS.muted }}>hours of sleep</div>
            <Badge label="Good" color={COLORS.green} />
          </div>
          <ProgressBar label="Sleep Duration" value={7.5} max={9} color={COLORS.purple} unit="h" />
          <ProgressBar label="Deep Sleep" value={1.8} max={3} color={COLORS.cyan} unit="h" />
          <ProgressBar label="REM Sleep" value={2.1} max={2.5} color={COLORS.pink} unit="h" />
          <ProgressBar label="Sleep Quality" value={78} max={100} color={COLORS.green} unit="%" />
        </div>

        <div>
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginBottom:14 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Log Tonight's Sleep</div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Bedtime</label>
              <input type="time" defaultValue="22:30" style={{ width:"100%" }} />
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Wake Time</label>
              <input type="time" defaultValue="06:30" style={{ width:"100%" }} />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Quality (1-10): {data.sleepQuality}</label>
              <input type="range" min={1} max={10} value={data.sleepQuality} onChange={e=>setData(p=>({...p,sleepQuality:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.purple }} />
            </div>
            <button style={{ width:"100%", padding:10, background:COLORS.purple, color:"#fff", border:"none", borderRadius:10, fontWeight:600 }}>Log Sleep</button>
          </div>

          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:12 }}>😴 Sleep Tips</div>
            {["Keep consistent sleep/wake schedule","Avoid screens 1h before bed","Room temp 65-68°F (18-20°C)","No caffeine after 2pm","Limit alcohol — disrupts REM","Magnesium supplement can help"].map(t => (
              <div key={t} style={{ fontSize:12, color:COLORS.muted, padding:"6px 0", borderBottom:`1px solid ${COLORS.border}` }}>• {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly sleep chart */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>Weekly Sleep (hours)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:120 }}>
          {[7,6.5,8,7.5,6,8.5,7.5].map((h,i) => (
            <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
              <div style={{ fontSize:10, color:COLORS.muted }}>{h}h</div>
              <div style={{ width:"100%", background: h >= 7.5 ? `${COLORS.green}80` : h >= 6.5 ? `${COLORS.yellow}80` : `${COLORS.red}80`, height:(h/9)*100, borderRadius:"4px 4px 0 0" }} />
              <div style={{ fontSize:10, color:COLORS.dim }}>{["M","T","W","T","F","S","S"][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsPage({ data, setData }) {
  const { COLORS } = useTheme();
  const bmi = (data.weight / ((data.height/100)**2)).toFixed(1);
  const bmiCat = bmi < 18.5 ? {l:"Underweight",c:COLORS.yellow} : bmi < 25 ? {l:"Normal",c:COLORS.green} : bmi < 30 ? {l:"Overweight",c:COLORS.yellow} : {l:"Obese",c:COLORS.red};
  const bmr = Math.round(10*data.weight + 6.25*data.height - 5*data.age + 5);
  const tdee = Math.round(bmr * 1.55);

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Body <span style={{ color:COLORS.pink }}>Stats</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Your physical metrics and metabolic data</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:18 }}>Update Your Stats</div>
          {[
            ["Weight (kg)", "weight", 40, 150],
            ["Height (cm)", "height", 140, 220],
            ["Age", "age", 15, 80],
          ].map(([label, key, min, max]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <label style={{ fontSize:12, color:COLORS.muted }}>{label}</label>
                <span style={{ fontSize:13, fontWeight:600, color:COLORS.pink }}>{data[key]}</span>
              </div>
              <input type="range" min={min} max={max} value={data[key]} onChange={e=>setData(p=>({...p,[key]:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.pink }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, color:COLORS.muted }}>Body Fat %: {data.bodyFat}%</label>
            <input type="range" min={5} max={40} value={data.bodyFat} onChange={e=>setData(p=>({...p,bodyFat:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.pink }} />
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:COLORS.card, border:`1px solid ${bmiCat.c}40`, borderRadius:14, padding:20, textAlign:"center" }}>
            <div style={{ fontSize:11, color:COLORS.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>BMI</div>
            <div style={{ fontSize:42, fontFamily:"'Syne'", fontWeight:800, color:bmiCat.c }}>{bmi}</div>
            <Badge label={bmiCat.l} color={bmiCat.c} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <StatCard label="BMR" value={bmr} unit="kcal" icon="🔋" color={COLORS.cyan} sub="At complete rest" />
            <StatCard label="TDEE" value={tdee} unit="kcal" icon="⚡" color={COLORS.accent} sub="Moderately active" />
          </div>
        </div>
      </div>

      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:18 }}>Calorie Goals by Target</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            {goal:"Lose Weight",cal:tdee-500,note:"-500 deficit",color:COLORS.cyan},
            {goal:"Maintain",cal:tdee,note:"Maintenance",color:COLORS.green},
            {goal:"Gain Muscle",cal:tdee+300,note:"+300 surplus",color:COLORS.accent},
          ].map(g => (
            <div key={g.goal} style={{ background:COLORS.bg3, borderRadius:12, padding:16, border:`1px solid ${g.color}30`, textAlign:"center" }}>
              <div style={{ fontSize:22, fontFamily:"'Syne'", fontWeight:700, color:g.color }}>{g.cal.toLocaleString()}</div>
              <div style={{ fontSize:11, color:COLORS.muted }}>kcal/day</div>
              <div style={{ fontSize:13, fontWeight:600, color:COLORS.text, marginTop:6 }}>{g.goal}</div>
              <div style={{ fontSize:11, color:g.color, marginTop:3 }}>{g.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CARDIO PAGE ─────────────────────────────────────────────────────────────

function CardioPage({ data, setData }) {
  const { COLORS } = useTheme();
  const [timerWork, setTimerWork] = useState(40);
  const [timerRest, setTimerRest] = useState(20);
  const [rounds, setRounds] = useState(8);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(40);
  const [cardioLog, setCardioLog] = useState([
    {type:"Running",duration:30,cal:280,date:"Today"},
    {type:"Cycling",duration:45,cal:350,date:"Yesterday"},
    {type:"Jump Rope",duration:20,cal:220,date:"2 days ago"},
  ]);
  const [newActivity, setNewActivity] = useState({type:"Running",duration:30});
  const intervalRef = useRef(null);

  const ACTIVITIES = [
    {type:"Running",  calPerMin:9.5},{type:"Cycling",    calPerMin:7.8},
    {type:"Swimming", calPerMin:8.0},{type:"Jump Rope",  calPerMin:11},
    {type:"Rowing",   calPerMin:8.5},{type:"Elliptical", calPerMin:7.0},
    {type:"Stair Climb",calPerMin:9},{type:"HIIT",       calPerMin:12},
    {type:"Walking",  calPerMin:4.5},{type:"Boxing",     calPerMin:10},
  ];

  const HR_ZONES = [
    {zone:"Zone 1 — Recovery",   pct:"50–60%", hr:"95–115", benefit:"Active recovery, fat burning",  color:COLORS.cyan},
    {zone:"Zone 2 — Aerobic",    pct:"60–70%", hr:"115–133",benefit:"Base endurance, fat oxidation", color:COLORS.green},
    {zone:"Zone 3 — Tempo",      pct:"70–80%", hr:"133–152",benefit:"Improved aerobic capacity",     color:COLORS.yellow},
    {zone:"Zone 4 — Threshold",  pct:"80–90%", hr:"152–171",benefit:"Lactate threshold, performance",color:COLORS.accent},
    {zone:"Zone 5 — Max Effort", pct:"90–100%",hr:"171–190",benefit:"Speed, power, VO2 max gains",   color:COLORS.red},
  ];

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setPhase(p => {
            if (p === "work") { setTimeLeft(timerRest); return "rest"; }
            setCurrentRound(r => {
              if (r >= rounds) { setRunning(false); setCurrentRound(1); setPhase("work"); setTimeLeft(timerWork); return 1; }
              return r + 1;
            });
            setTimeLeft(timerWork);
            return "work";
          });
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, timerWork, timerRest, rounds]);

  const logActivity = () => {
    const act = ACTIVITIES.find(a => a.type === newActivity.type);
    const cal = Math.round((act?.calPerMin || 8) * newActivity.duration);
    const entry = { type: newActivity.type, duration: newActivity.duration, cal, date: "Just now" };
    setCardioLog(p => [entry, ...p]);
    setData(p => ({ ...p, cardioMinutes: p.cardioMinutes + newActivity.duration, cardioCalBurned: p.cardioCalBurned + cal, burned: p.burned + cal }));
  };

  const totalCardioToday = cardioLog.filter(c => c.date === "Today" || c.date === "Just now").reduce((a,b) => a+b.cal, 0);
  const phaseColor = phase === "work" ? COLORS.accent : COLORS.cyan;

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Cardio & <span style={{ color:COLORS.red }}>HIIT</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Interval timer, activity log, and heart rate zones</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Steps Today"   value={data.steps.toLocaleString()}  unit=""    icon="👟" color={COLORS.green}  sub={`Goal: ${data.stepsGoal.toLocaleString()}`} />
        <StatCard label="Cardio Burned" value={data.cardioCalBurned || totalCardioToday} unit="kcal" icon="🔥" color={COLORS.red} sub="This session" />
        <StatCard label="Active Minutes"value={data.cardioMinutes || 95}     unit="min" icon="⏱️" color={COLORS.accent} sub="Today" />
        <StatCard label="VO2 Max Est."  value="42.5"                         unit="ml/kg" icon="💨" color={COLORS.cyan} sub="Above average" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        {/* HIIT Timer */}
        <div style={{ background:COLORS.card, border:`1px solid ${phaseColor}40`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:20 }}>HIIT Interval Timer</div>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:11, color:phaseColor, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:8 }}>
              {running ? phase === "work" ? "🔥 WORK" : "❄️ REST" : "READY"}
            </div>
            <div style={{ fontSize:72, fontFamily:"'Syne'", fontWeight:800, color:phaseColor, lineHeight:1, transition:"color 0.5s" }}>
              {String(Math.floor(timeLeft/60)).padStart(2,"0")}:{String(timeLeft%60).padStart(2,"0")}
            </div>
            <div style={{ fontSize:13, color:COLORS.muted, marginTop:8 }}>
              Round {currentRound} / {rounds}
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:12 }}>
              {Array.from({length:rounds}).map((_,i) => (
                <div key={i} style={{ width:10, height:10, borderRadius:"50%", background: i < currentRound-1 ? COLORS.green : i === currentRound-1 && running ? phaseColor : COLORS.border, transition:"background 0.3s" }} />
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:20 }}>
            <button onClick={() => { setRunning(p=>!p); if(!running){setTimeLeft(timerWork);setPhase("work");setCurrentRound(1);} }} style={{ padding:"10px 28px", background:running ? COLORS.red : COLORS.accent, color:"#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:15 }}>
              {running ? "⏸ Pause" : "▶ Start"}
            </button>
            <button onClick={() => { setRunning(false); setTimeLeft(timerWork); setPhase("work"); setCurrentRound(1); }} style={{ padding:"10px 18px", background:"transparent", color:COLORS.muted, border:`1px solid ${COLORS.border}`, borderRadius:10 }}>↺ Reset</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {[["Work (s)",timerWork,setTimerWork,10,120],["Rest (s)",timerRest,setTimerRest,5,60],["Rounds",rounds,setRounds,2,20]].map(([l,v,fn,mn,mx])=>(
              <div key={l}>
                <div style={{ fontSize:11, color:COLORS.muted, marginBottom:4 }}>{l}: <span style={{ color:COLORS.text, fontWeight:600 }}>{v}</span></div>
                <input type="range" min={mn} max={mx} value={v} onChange={e=>{fn(+e.target.value); if(!running) setTimeLeft(+e.target.value);}} style={{ width:"100%", accentColor:phaseColor }} />
              </div>
            ))}
          </div>
        </div>

        {/* Log activity */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:16 }}>Log Activity</div>
          <div style={{ marginBottom:12 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Activity Type</label>
            <select value={newActivity.type} onChange={e=>setNewActivity(p=>({...p,type:e.target.value}))} style={{ width:"100%" }}>
              {ACTIVITIES.map(a=><option key={a.type} value={a.type}>{a.type} (~{a.calPerMin} kcal/min)</option>)}
            </select>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Duration: {newActivity.duration} min</label>
            <input type="range" min={5} max={120} step={5} value={newActivity.duration} onChange={e=>setNewActivity(p=>({...p,duration:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.red }} />
          </div>
          <div style={{ padding:12, background:`${COLORS.red}15`, borderRadius:10, marginBottom:16, textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:700, fontFamily:"'Syne'", color:COLORS.red }}>
              ~{Math.round((ACTIVITIES.find(a=>a.type===newActivity.type)?.calPerMin||8)*newActivity.duration)} kcal
            </div>
            <div style={{ fontSize:11, color:COLORS.muted }}>estimated burn</div>
          </div>
          <button onClick={logActivity} style={{ width:"100%", padding:10, background:COLORS.red, color:"#fff", border:"none", borderRadius:10, fontWeight:600 }}>+ Log Activity</button>

          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:13, fontWeight:600, color:COLORS.muted, marginBottom:10 }}>Recent Activities</div>
            {cardioLog.slice(0,4).map((c,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${COLORS.border}` }}>
                <div>
                  <div style={{ fontSize:13, color:COLORS.text }}>{c.type}</div>
                  <div style={{ fontSize:11, color:COLORS.muted }}>{c.duration} min · {c.date}</div>
                </div>
                <div style={{ fontSize:14, fontWeight:600, color:COLORS.red }}>{c.cal} kcal</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Heart Rate Zones */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:6 }}>Heart Rate Training Zones</div>
        <div style={{ fontSize:13, color:COLORS.muted, marginBottom:18 }}>Based on estimated max HR of {220 - data.age} bpm (age {data.age})</div>
        {HR_ZONES.map(z => (
          <div key={z.zone} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 0", borderBottom:`1px solid ${COLORS.border}` }}>
            <div style={{ width:10, height:40, borderRadius:4, background:z.color, flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:COLORS.text }}>{z.zone}</div>
              <div style={{ fontSize:12, color:COLORS.muted }}>{z.benefit}</div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:13, fontWeight:600, color:z.color }}>{z.hr} bpm</div>
              <div style={{ fontSize:11, color:COLORS.dim }}>{z.pct} of max HR</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SUPPLEMENTS PAGE ─────────────────────────────────────────────────────────

function SupplementsPage({ data, setData }) {
  const { COLORS } = useTheme();
  const SUPPS = [
    { name:"Creatine Monohydrate", dose:"5g", timing:"Post-workout or anytime", icon:"⚡", color:COLORS.accent,
      benefit:"#1 evidence-backed supplement. Increases strength, power, and muscle volume by saturating phosphocreatine stores.",
      tags:["Strength","Power","Muscle"], when:"daily" },
    { name:"Whey Protein",         dose:"25–50g", timing:"Within 30 min post-workout", icon:"🥛", color:COLORS.cyan,
      benefit:"Fast-absorbing complete protein. Maximizes muscle protein synthesis when taken post-workout.",
      tags:["Muscle","Recovery"], when:"post-workout" },
    { name:"Vitamin D3",           dose:"2000–5000 IU", timing:"Morning with fat-containing meal", icon:"☀️", color:COLORS.yellow,
      benefit:"Critical for testosterone, immunity, bone health. Most people are deficient, especially with limited sun exposure.",
      tags:["Hormones","Immunity","Bone"], when:"morning" },
    { name:"Omega-3 Fish Oil",     dose:"1–3g EPA+DHA", timing:"With meals", icon:"🐟", color:COLORS.green,
      benefit:"Reduces inflammation, supports joint health, improves heart health, and may slightly aid muscle recovery.",
      tags:["Joints","Heart","Recovery"], when:"meals" },
    { name:"Magnesium Glycinate",  dose:"300–400mg", timing:"30–60 min before bed", icon:"🌙", color:COLORS.purple,
      benefit:"Improves sleep quality, muscle relaxation, reduces cramps. Highly bioavailable form with minimal GI issues.",
      tags:["Sleep","Recovery","Muscles"], when:"night" },
    { name:"Caffeine",             dose:"200mg", timing:"30–45 min pre-workout", icon:"☕", color:COLORS.red,
      benefit:"Most researched ergogenic aid. Boosts strength, endurance, focus, and fat burning during training.",
      tags:["Energy","Focus","Performance"], when:"pre-workout" },
    { name:"Zinc",                 dose:"25–45mg", timing:"Before bed, away from calcium", icon:"💎", color:COLORS.pink,
      benefit:"Critical for testosterone production, immune function, and recovery. Often depleted in athletes.",
      tags:["Hormones","Immunity"], when:"night" },
    { name:"Vitamin C",            dose:"500–1000mg", timing:"Morning with breakfast", icon:"🍊", color:COLORS.accent2,
      benefit:"Antioxidant, collagen synthesis, immune support. Helps counter exercise-induced oxidative stress.",
      tags:["Immunity","Recovery"], when:"morning" },
  ];

  const toggleSupp = (name) => setData(p => ({ ...p, suppChecked: { ...p.suppChecked, [name]: !p.suppChecked[name] } }));
  const checkedCount = Object.values(data.suppChecked || {}).filter(Boolean).length;

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Supplement <span style={{ color:COLORS.green }}>Tracker</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Evidence-based supplements with timing protocols</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Taken Today" value={checkedCount} unit={`/ ${SUPPS.length}`} icon="✅" color={COLORS.green} sub="Keep it consistent!" />
        <StatCard label="Stack Score"  value={Math.round((checkedCount/SUPPS.length)*100)} unit="%" icon="📊" color={COLORS.accent} sub="Daily compliance" />
        <StatCard label="Streak"       value={data.streak} unit="days" icon="🔥" color={COLORS.yellow} sub="Supplement streak" />
      </div>

      {/* Timing guide */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginBottom:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>Daily Timing Protocol</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            {time:"Morning",       icon:"🌅", items:["Vitamin D3","Vitamin C","Omega-3"],        color:COLORS.yellow},
            {time:"Pre-Workout",   icon:"⚡", items:["Caffeine","Pre-workout formula"],          color:COLORS.accent},
            {time:"Post-Workout",  icon:"💪", items:["Whey Protein","Creatine","Fast carbs"],    color:COLORS.cyan},
            {time:"Night",         icon:"🌙", items:["Magnesium","Zinc","Casein Protein"],       color:COLORS.purple},
          ].map(t => (
            <div key={t.time} style={{ background:COLORS.bg3, borderRadius:10, padding:14, border:`1px solid ${t.color}30` }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{t.icon}</div>
              <div style={{ fontSize:12, fontWeight:600, color:t.color, marginBottom:8 }}>{t.time}</div>
              {t.items.map(item => <div key={item} style={{ fontSize:11, color:COLORS.muted, marginBottom:4 }}>• {item}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Supplement cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {SUPPS.map(s => {
          const checked = data.suppChecked?.[s.name];
          return (
            <div key={s.name} className="scale-in" onClick={() => toggleSupp(s.name)} style={{ background:COLORS.card, border:`1px solid ${checked ? s.color : COLORS.border}`, borderRadius:14, padding:18, cursor:"pointer", transition:"all 0.2s", opacity: checked ? 1 : 0.85 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ fontSize:24, padding:8, background:`${s.color}20`, borderRadius:10 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color: checked ? s.color : COLORS.text }}>{s.name}</div>
                    <div style={{ fontSize:11, color:COLORS.muted }}>{s.dose} · {s.timing}</div>
                  </div>
                </div>
                <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${checked ? s.color : COLORS.border}`, background: checked ? s.color : "transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", flexShrink:0 }}>
                  {checked && <span style={{ fontSize:12, color:"#000", fontWeight:700 }}>✓</span>}
                </div>
              </div>
              <div style={{ fontSize:12, color:COLORS.muted, lineHeight:1.5, marginBottom:10 }}>{s.benefit}</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {s.tags.map(tag => <Badge key={tag} label={tag} color={s.color} />)}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop:20, padding:16, background:`${COLORS.yellow}15`, border:`1px solid ${COLORS.yellow}30`, borderRadius:12, fontSize:13, color:COLORS.yellow }}>
        ⚠️ <strong>Disclaimer:</strong> Consult a healthcare professional before starting any supplement regimen. Individual needs vary based on diet, health status, and training level.
      </div>
    </div>
  );
}

// ─── GOALS & ACHIEVEMENTS PAGE ────────────────────────────────────────────────

function GoalsPage({ data, setData }) {
  const { COLORS } = useTheme();
  const [goals, setGoals] = useState([
    { id:1, text:"Lose 5kg body weight",    target:5,    current:2.5, unit:"kg",   cat:"weight",  color:COLORS.cyan,   done:false },
    { id:2, text:"Bench Press 100kg",       target:100,  current:80,  unit:"kg",   cat:"strength",color:COLORS.accent, done:false },
    { id:3, text:"Run 5km without stopping",target:5,    current:3.2, unit:"km",   cat:"cardio",  color:COLORS.red,    done:false },
    { id:4, text:"21-day workout streak",   target:21,   current:14,  unit:"days", cat:"habit",   color:COLORS.yellow, done:false },
    { id:5, text:"Drink 3L water daily",    target:10,   current:data.water, unit:"glasses",cat:"habit",color:COLORS.green, done:false },
    { id:6, text:"Get to 15% body fat",     target:15,   current:data.bodyFat, unit:"%", cat:"weight",color:COLORS.purple,done:false },
  ]);

  const [newGoal, setNewGoal] = useState({ text:"", target:10, unit:"reps", cat:"strength" });

  const BADGES = [
    { id:"streak_7",  name:"Week Warrior",    desc:"7-day workout streak",       icon:"🔥", earned: data.streak>=7,  color:COLORS.accent },
    { id:"streak_14", name:"Two-Week Titan",  desc:"14-day workout streak",      icon:"⚡", earned: data.streak>=14, color:COLORS.yellow },
    { id:"streak_21", name:"Habit Machine",   desc:"21-day workout streak",      icon:"💎", earned: data.streak>=21, color:COLORS.cyan },
    { id:"cal_5",     name:"Calorie Counter", desc:"Logged 5 days of meals",     icon:"🍽️", earned: true,            color:COLORS.green },
    { id:"water_10",  name:"Hydration Hero",  desc:"Hit water goal 10 days",     icon:"💧", earned: true,            color:COLORS.cyan },
    { id:"workout_10",name:"Iron Veteran",    desc:"Completed 10 workouts",      icon:"🏋️", earned: data.weeklyWorkouts>=2, color:COLORS.purple },
    { id:"protein",   name:"Protein Pro",     desc:"Hit protein goal 7 days",    icon:"🧬", earned: false,           color:COLORS.pink },
    { id:"sleep_7",   name:"Dream Chaser",    desc:"7 nights 8+ hours sleep",    icon:"🌙", earned: data.sleepQuality>=8, color:COLORS.purple },
    { id:"5k",        name:"5K Finisher",     desc:"Ran 5km continuously",       icon:"🏃", earned: false,           color:COLORS.red },
    { id:"first_pr",  name:"Personal Record", desc:"Set first strength PR",      icon:"📈", earned: true,            color:COLORS.accent },
    { id:"10_workouts",name:"Dedicated",      desc:"10 logged workouts total",   icon:"💪", earned: true,            color:COLORS.green },
    { id:"macro_day", name:"Macro Master",    desc:"Hit all macros in one day",  icon:"🎯", earned: false,           color:COLORS.yellow },
  ];

  const earnedBadges = BADGES.filter(b => b.earned).length;

  const addGoal = () => {
    if (!newGoal.text) return;
    setGoals(p => [...p, { ...newGoal, id:Date.now(), current:0, done:false, color:COLORS.accent }]);
    setNewGoal({ text:"", target:10, unit:"reps", cat:"strength" });
  };

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Goals & <span style={{ color:COLORS.yellow }}>Achievements</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Track milestones and unlock achievement badges</div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="Active Goals"  value={goals.filter(g=>!g.done).length}  unit="" icon="🎯" color={COLORS.accent} />
        <StatCard label="Completed"     value={goals.filter(g=>g.done).length}   unit="" icon="✅" color={COLORS.green} />
        <StatCard label="Badges Earned" value={earnedBadges} unit={`/ ${BADGES.length}`} icon="🏆" color={COLORS.yellow} />
      </div>

      {/* Goal progress */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24, marginBottom:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:18 }}>Active Goals</div>
        {goals.map(g => {
          const pct = Math.min(Math.round((g.current/g.target)*100), 100);
          return (
            <div key={g.id} style={{ marginBottom:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                <div style={{ fontSize:14, color:COLORS.text }}>{g.text}</div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:12, fontFamily:"'JetBrains Mono'", color:g.color }}>{g.current} / {g.target} {g.unit}</span>
                  <Badge label={`${pct}%`} color={pct>=100?COLORS.green:g.color} />
                </div>
              </div>
              <div style={{ background:"#2a2a3a", borderRadius:6, height:8, overflow:"hidden" }}>
                <div style={{ width:`${pct}%`, height:"100%", background:pct>=100?COLORS.green:g.color, borderRadius:6, transition:"width 1s ease" }} />
              </div>
            </div>
          );
        })}

        {/* Add new goal */}
        <div style={{ marginTop:20, paddingTop:20, borderTop:`1px solid ${COLORS.border}` }}>
          <div style={{ fontFamily:"'Syne'", fontSize:14, fontWeight:600, marginBottom:12 }}>+ Add New Goal</div>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:10, alignItems:"flex-end" }}>
            <div>
              <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Goal Description</label>
              <input value={newGoal.text} onChange={e=>setNewGoal(p=>({...p,text:e.target.value}))} placeholder="e.g. Squat 120kg" style={{ width:"100%" }} />
            </div>
            <div>
              <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Target</label>
              <input type="number" value={newGoal.target} onChange={e=>setNewGoal(p=>({...p,target:+e.target.value}))} style={{ width:"100%" }} />
            </div>
            <div>
              <label style={{ fontSize:11, color:COLORS.muted, display:"block", marginBottom:4 }}>Unit</label>
              <input value={newGoal.unit} onChange={e=>setNewGoal(p=>({...p,unit:e.target.value}))} placeholder="kg, km, days..." style={{ width:"100%" }} />
            </div>
            <button onClick={addGoal} style={{ padding:"8px 16px", background:COLORS.accent, color:"#fff", border:"none", borderRadius:8, fontWeight:600 }}>Add</button>
          </div>
        </div>
      </div>

      {/* Achievements / badges */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600 }}>Achievement Badges</div>
          <div style={{ fontSize:13, color:COLORS.yellow }}>{earnedBadges} / {BADGES.length} earned</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {BADGES.map(b => (
            <div key={b.id} className="scale-in" style={{ background:COLORS.bg3, borderRadius:12, padding:16, textAlign:"center", border:`1px solid ${b.earned ? b.color+"50" : COLORS.border}`, opacity: b.earned ? 1 : 0.45, transition:"all 0.2s" }}>
              <div style={{ fontSize:30, marginBottom:8, filter: b.earned ? "none" : "grayscale(1)" }}>{b.icon}</div>
              <div style={{ fontSize:13, fontWeight:600, color: b.earned ? b.color : COLORS.dim }}>{b.name}</div>
              <div style={{ fontSize:11, color:COLORS.dim, marginTop:4 }}>{b.desc}</div>
              {b.earned && <div style={{ marginTop:8 }}><Badge label="Earned ✓" color={b.color} /></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MACRO CALCULATOR PAGE ────────────────────────────────────────────────────

function CalculatorPage({ data, setData }) {
  const { COLORS } = useTheme();
  const [goal, setGoal] = useState("muscle");
  const [activity, setActivity] = useState(1.55);
  const [unit, setUnit] = useState("metric");

  const weightKg = data.weight;
  const heightCm = data.height;
  const age = data.age;

  const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + (data.gender === "female" ? -161 : 5));
  const tdee = Math.round(bmr * activity);

  const goalMap = {
    lose_fast:   { adj:-700, protein:2.4, carbs:1.6, fat:0.8, label:"Aggressive Cut (−700 kcal)", color:COLORS.red },
    lose:        { adj:-400, protein:2.2, carbs:1.8, fat:0.8, label:"Moderate Cut (−400 kcal)",   color:COLORS.cyan },
    maintain:    { adj:0,    protein:1.8, carbs:2.5, fat:0.9, label:"Maintenance",                color:COLORS.green },
    muscle:      { adj:300,  protein:2.2, carbs:4.0, fat:1.0, label:"Lean Bulk (+300 kcal)",      color:COLORS.accent },
    muscle_fast: { adj:600,  protein:2.0, carbs:5.0, fat:1.1, label:"Aggressive Bulk (+600 kcal)",color:COLORS.yellow },
  };

  const g = goalMap[goal];
  const targetCal = tdee + g.adj;
  const proteinG = Math.round(g.protein * weightKg);
  const carbsG   = Math.round(g.carbs * weightKg);
  const fatG      = Math.round(g.fat * weightKg);

  const proteinCal = proteinG * 4;
  const carbsCal   = carbsG * 4;
  const fatCal     = fatG * 9;
  const totalMacroCal = proteinCal + carbsCal + fatCal;

  const applyToTracker = () => setData(p => ({
    ...p, calGoal: targetCal, proteinGoal: proteinG, carbsGoal: carbsG, fatGoal: fatG,
  }));

  const ORM_FORMULAS = [
    { name:"Epley",   fn:(w,r)=>(w*(1+r/30)).toFixed(1) },
    { name:"Brzycki", fn:(w,r)=>(w/(1.0278-0.0278*r)).toFixed(1) },
    { name:"Lander",  fn:(w,r)=>(100*w/(101.3-2.67123*r)).toFixed(1) },
  ];
  const [liftW, setLiftW] = useState(80);
  const [liftR, setLiftR] = useState(5);

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Fitness <span style={{ color:COLORS.cyan }}>Calculator</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>TDEE, macro targets, and one-rep max estimator</div>

      {/* TDEE result */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        <StatCard label="BMR"          value={bmr.toLocaleString()}    unit="kcal" icon="🔋" color={COLORS.muted}   sub="At complete rest" />
        <StatCard label="TDEE"         value={tdee.toLocaleString()}   unit="kcal" icon="⚡" color={COLORS.cyan}   sub="Maintenance level" />
        <StatCard label="Target Cals"  value={targetCal.toLocaleString()} unit="kcal" icon="🎯" color={g.color}   sub={g.label} />
        <StatCard label="Protein Need" value={proteinG} unit="g/day" icon="🧬" color={COLORS.green} sub={`${g.protein}g per kg BW`} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>
        {/* Settings */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:18 }}>Your Parameters</div>
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <label style={{ fontSize:12, color:COLORS.muted }}>Weight</label>
              <span style={{ fontSize:12, fontWeight:600, color:COLORS.text }}>{data.weight} kg</span>
            </div>
            <input type="range" min={40} max={150} value={data.weight} onChange={e=>setData(p=>({...p,weight:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.cyan }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <label style={{ fontSize:12, color:COLORS.muted }}>Height</label>
              <span style={{ fontSize:12, fontWeight:600, color:COLORS.text }}>{data.height} cm</span>
            </div>
            <input type="range" min={140} max={220} value={data.height} onChange={e=>setData(p=>({...p,height:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.cyan }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <label style={{ fontSize:12, color:COLORS.muted }}>Age</label>
              <span style={{ fontSize:12, fontWeight:600, color:COLORS.text }}>{data.age}</span>
            </div>
            <input type="range" min={15} max={75} value={data.age} onChange={e=>setData(p=>({...p,age:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.cyan }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Activity Level</label>
            <select value={activity} onChange={e=>setActivity(+e.target.value)} style={{ width:"100%" }}>
              <option value={1.2}>Sedentary (desk job, no exercise)</option>
              <option value={1.375}>Lightly active (1–3 workouts/week)</option>
              <option value={1.55}>Moderately active (3–5 workouts/week)</option>
              <option value={1.725}>Very active (6–7 workouts/week)</option>
              <option value={1.9}>Extremely active (physical job + training)</option>
            </select>
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Goal</label>
            <select value={goal} onChange={e=>setGoal(e.target.value)} style={{ width:"100%" }}>
              {Object.entries(goalMap).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={applyToTracker} style={{ width:"100%", padding:10, background:COLORS.cyan, color:"#000", border:"none", borderRadius:10, fontWeight:700, fontSize:14 }}>
            ✓ Apply to My Tracker
          </button>
        </div>

        {/* Macro targets */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:6 }}>Recommended Macros</div>
          <div style={{ fontSize:12, color:COLORS.muted, marginBottom:18 }}>For goal: <span style={{ color:g.color }}>{g.label}</span></div>

          {[
            { name:"Protein", g:proteinG, cal:proteinCal, color:COLORS.green,  pct:Math.round((proteinCal/totalMacroCal)*100) },
            { name:"Carbs",   g:carbsG,   cal:carbsCal,   color:COLORS.cyan,   pct:Math.round((carbsCal/totalMacroCal)*100) },
            { name:"Fats",    g:fatG,     cal:fatCal,     color:COLORS.yellow, pct:Math.round((fatCal/totalMacroCal)*100) },
          ].map(m => (
            <div key={m.name} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, color:COLORS.muted }}>{m.name}</span>
                <span style={{ fontSize:13, fontWeight:600, color:m.color }}>{m.g}g · {m.cal} kcal · {m.pct}%</span>
              </div>
              <div style={{ background:"#2a2a3a", borderRadius:4, height:8 }}>
                <div style={{ width:`${m.pct}%`, height:"100%", background:m.color, borderRadius:4 }} />
              </div>
            </div>
          ))}

          <div style={{ background:COLORS.bg3, borderRadius:10, padding:14, marginTop:16 }}>
            <div style={{ fontSize:13, color:COLORS.muted, marginBottom:10 }}>Meal timing split (4 meals)</div>
            {["Breakfast 25%","Lunch 30%","Dinner 30%","Snack 15%"].map(m => (
              <div key={m} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:12, color:COLORS.muted }}>{m.split(" ")[0]}</span>
                <span style={{ fontSize:12, fontWeight:600, color:COLORS.text }}>
                  {Math.round(targetCal * (parseInt(m.split(" ")[1])/100))} kcal
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1RM Calculator */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:6 }}>One-Rep Max (1RM) Estimator</div>
        <div style={{ fontSize:13, color:COLORS.muted, marginBottom:18 }}>Estimate your maximum lift from submaximal reps</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:20 }}>
          <div>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Weight Lifted (kg): {liftW}</label>
            <input type="range" min={10} max={300} value={liftW} onChange={e=>setLiftW(+e.target.value)} style={{ width:"100%", accentColor:COLORS.accent }} />
          </div>
          <div>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Reps Performed: {liftR}</label>
            <input type="range" min={1} max={15} value={liftR} onChange={e=>setLiftR(+e.target.value)} style={{ width:"100%", accentColor:COLORS.accent }} />
          </div>
          <div style={{ background:COLORS.bg3, borderRadius:10, padding:14, textAlign:"center" }}>
            <div style={{ fontSize:11, color:COLORS.muted }}>Average 1RM</div>
            <div style={{ fontSize:32, fontFamily:"'Syne'", fontWeight:800, color:COLORS.accent }}>
              {Math.round(ORM_FORMULAS.reduce((a,f)=>a+parseFloat(f.fn(liftW,liftR)),0)/ORM_FORMULAS.length)} kg
            </div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
          {ORM_FORMULAS.map(f => (
            <div key={f.name} style={{ background:COLORS.bg3, borderRadius:10, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:11, color:COLORS.muted }}>{f.name} Formula</div>
              <div style={{ fontSize:22, fontFamily:"'Syne'", fontWeight:700, color:COLORS.cyan }}>{f.fn(liftW,liftR)} kg</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize:12, color:COLORS.muted, marginBottom:12 }}>Training percentages based on your estimated 1RM:</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
          {[50,60,70,80,90].map(pct => {
            const orm1 = Math.round(ORM_FORMULAS.reduce((a,f)=>a+parseFloat(f.fn(liftW,liftR)),0)/ORM_FORMULAS.length);
            return (
              <div key={pct} style={{ background:COLORS.bg3, borderRadius:10, padding:10, textAlign:"center" }}>
                <div style={{ fontSize:13, fontWeight:700, color:COLORS.accent }}>{Math.round(orm1*pct/100)} kg</div>
                <div style={{ fontSize:10, color:COLORS.dim }}>{pct}% 1RM</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────

function SettingsPage({ data, setData, handleLogout }) {
  const { COLORS, theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [localName, setLocalName] = useState(data.name || "Athlete");
  const [localGoal, setLocalGoal] = useState(data.goal || "muscle");
  const [localGender, setLocalGender] = useState(data.gender || "male");
  const [notifs, setNotifs] = useState({ water:true, workout:true, meals:true, sleep:false });
  const [units, setUnits] = useState("metric");

  const save = () => {
    setData(p => ({ ...p, name:localName, goal:localGoal, gender:localGender }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const resetAll = () => {
    setData(p => ({ ...p, calories:0, protein:0, carbs:0, fat:0, fiber:0, water:0 }));
  };

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <PageTitle>Settings & <span style={{ color:COLORS.muted }}>Profile</span></PageTitle>
      <div style={{ fontSize:14, color:COLORS.muted, marginBottom:24 }}>Manage your profile, goals, and preferences</div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Profile */}
        <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:24 }}>
          <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:600, marginBottom:18 }}>👤 Profile</div>
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Display Name</label>
            <input value={localName} onChange={e=>setLocalName(e.target.value)} style={{ width:"100%" }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Gender</label>
            <select value={localGender} onChange={e=>setLocalGender(e.target.value)} style={{ width:"100%" }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Primary Goal</label>
            <select value={localGoal} onChange={e=>setLocalGoal(e.target.value)} style={{ width:"100%" }}>
              <option value="muscle">Build Muscle</option>
              <option value="fat_loss">Lose Fat</option>
              <option value="maintain">Maintain Weight</option>
              <option value="performance">Athletic Performance</option>
              <option value="endurance">Improve Endurance</option>
            </select>
          </div>
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12, color:COLORS.muted, display:"block", marginBottom:6 }}>Units</label>
            <div style={{ display:"flex", gap:8 }}>
              {["metric","imperial"].map(u => (
                <button key={u} onClick={() => setUnits(u)} style={{ flex:1, padding:"8px 0", borderRadius:8, border:`1px solid ${units===u?COLORS.accent:COLORS.border}`, background:units===u?`${COLORS.accent}20`:"transparent", color:units===u?COLORS.accent:COLORS.muted, fontWeight:600, fontSize:13, textTransform:"capitalize" }}>
                  {u} {u==="metric"?"(kg/cm)":"(lbs/in)"}
                </button>
              ))}
            </div>
          </div>
          <button onClick={save} style={{ width:"100%", padding:10, background: saved ? COLORS.green : COLORS.accent, color:saved ? "#000" : "#fff", border:"none", borderRadius:10, fontWeight:700, fontSize:14, transition:"background 0.3s" }}>
            {saved ? "✓ Saved!" : "Save Profile"}
          </button>
        </div>

        {/* Goals + notifications */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Daily targets */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>🎯 Daily Targets</div>
            {[
              ["Calorie Goal (kcal)", "calGoal", 1200, 5000, 100],
              ["Protein Goal (g)",    "proteinGoal", 50, 300, 5],
              ["Water Goal (glasses)","waterGoal",   4, 16,  1],
              ["Steps Goal",         "stepsGoal",   3000, 20000, 500],
            ].map(([label, key, mn, mx, step]) => (
              <div key={key} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <label style={{ fontSize:12, color:COLORS.muted }}>{label}</label>
                  <span style={{ fontSize:12, fontWeight:600, color:COLORS.text }}>{data[key]?.toLocaleString()}</span>
                </div>
                <input type="range" min={mn} max={mx} step={step} value={data[key]} onChange={e=>setData(p=>({...p,[key]:+e.target.value}))} style={{ width:"100%", accentColor:COLORS.accent }} />
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>🔔 Reminders</div>
            {[
              {key:"water",   label:"Hydration reminders",   sub:"Every 2 hours"},
              {key:"workout", label:"Workout reminder",       sub:"Daily at 5:00 PM"},
              {key:"meals",   label:"Meal logging reminders", sub:"At meal times"},
              {key:"sleep",   label:"Bedtime reminder",       sub:"Daily at 10:00 PM"},
            ].map(n => (
              <div key={n.key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${COLORS.border}` }}>
                <div>
                  <div style={{ fontSize:13, color:COLORS.text }}>{n.label}</div>
                  <div style={{ fontSize:11, color:COLORS.dim }}>{n.sub}</div>
                </div>
                <button onClick={()=>setNotifs(p=>({...p,[n.key]:!p[n.key]}))} style={{ width:44, height:24, borderRadius:12, border:"none", background: notifs[n.key] ? COLORS.accent : COLORS.border, position:"relative", transition:"background 0.3s", cursor:"pointer" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left: notifs[n.key] ? 23 : 3, transition:"left 0.3s" }} />
                </button>
              </div>
            ))}
          </div>

          {/* Theme toggle */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>🎨 Appearance</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:`1px solid ${COLORS.border}` }}>
              <div>
                <div style={{ fontSize:13, color:COLORS.text }}>Theme Mode</div>
                <div style={{ fontSize:11, color:COLORS.dim }}>{theme === "dark" ? "Dark mode active" : "Light mode active"}</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["light","dark"].map(t => (
                  <button key={t} onClick={toggleTheme} style={{ padding:"7px 16px", borderRadius:8, border:`1px solid ${theme===t ? COLORS.accent : COLORS.border}`, background: theme===t ? `${COLORS.accent}20` : "transparent", color: theme===t ? COLORS.accent : COLORS.muted, fontWeight:600, fontSize:12, textTransform:"capitalize", cursor:"pointer" }}>
                    {t === "light" ? "☀️" : "🌙"} {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div style={{ background:COLORS.card, border:`1px solid ${COLORS.red}30`, borderRadius:16, padding:20 }}>
            <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, color:COLORS.red, marginBottom:12 }}>⚠️ Data Management</div>
            <button onClick={resetAll} style={{ width:"100%", padding:10, background:`${COLORS.red}10`, color:COLORS.red, border:`1px solid ${COLORS.red}30`, borderRadius:10, fontWeight:600, fontSize:13, marginBottom:10, cursor:"pointer" }} onMouseOver={e=>e.currentTarget.style.background=`${COLORS.red}20`} onMouseOut={e=>e.currentTarget.style.background=`${COLORS.red}10`}>
              Reset Today's Logs
            </button>
            <button onClick={handleLogout} style={{ width:"100%", padding:10, background:`${COLORS.red}20`, color:COLORS.red, border:`1px solid ${COLORS.red}40`, borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer" }} onMouseOver={e=>e.currentTarget.style.background=`${COLORS.red}30`} onMouseOut={e=>e.currentTarget.style.background=`${COLORS.red}20`}>
              Sign Out of Account
            </button>
          </div>
        </div>
      </div>

      {/* App info */}
      <div style={{ background:COLORS.card, border:`1px solid ${COLORS.border}`, borderRadius:16, padding:20, marginTop:20 }}>
        <div style={{ fontFamily:"'Syne'", fontSize:15, fontWeight:600, marginBottom:14 }}>ℹ️ About FitForge</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            {l:"Version",v:"2.0.0",c:COLORS.accent},{l:"Pages",v:"17",c:COLORS.cyan},
            {l:"AI Coach",v:"Active",c:COLORS.green},{l:"Features",v:"50+",c:COLORS.purple},
          ].map(i=>(
            <div key={i.l} style={{ background:COLORS.bg3, borderRadius:10, padding:12, textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:700, fontFamily:"'Syne'", color:i.c }}>{i.v}</div>
              <div style={{ fontSize:11, color:COLORS.dim }}>{i.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const DEFAULT_USER_DATA = {
  calories:0, calGoal:2000, protein:0, proteinGoal:150,
  carbs:0, carbsGoal:250, fat:0, fatGoal:70, fiber:0,
  water:0, waterGoal:8, burned:0, streak:0, weeklyWorkouts:0,
  weight:70, height:170, age:25, bodyFat:15,
  sleepQuality:7, steps:0, stepsGoal:10000,
  name:"Athlete", goal:"muscle", gender:"male",
  cardioMinutes:0, cardioCalBurned:0,
  suppChecked:{},
  achievements:[],
};

function AuthPage({ onLoginSuccess }) {
  const { COLORS, theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Profile info
  const [name, setName] = useState("");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("muscle");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "None", color: "transparent" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score <= 1) return { score, label: "Weak 🔴", color: COLORS.red };
    if (score <= 3) return { score, label: "Fair 🟡", color: COLORS.yellow };
    return { score, label: "Strong 🟢", color: COLORS.green };
  };

  const strength = getPasswordStrength(password);

  const validateEmail = (em) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  };

  const handleNextStep = () => {
    setError("");
    if (!email) return setError("Email is required.");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    try {
      const users = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return setError("An account with this email already exists.");
      }
    } catch(e) {}
    
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    
    if (!name.trim()) return setError("Display name is required.");
    const numAge = parseInt(age);
    const numWeight = parseFloat(weight);
    const numHeight = parseFloat(height);

    if (isNaN(numAge) || numAge < 10 || numAge > 100) return setError("Age must be between 10 and 100.");
    if (isNaN(numWeight) || numWeight < 30 || numWeight > 300) return setError("Weight must be between 30 and 300 kg.");
    if (isNaN(numHeight) || numHeight < 100 || numHeight > 250) return setError("Height must be between 100 and 250 cm.");

    setLoading(true);
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
        const newUser = {
          email: email.toLowerCase(),
          password: password,
          name: name.trim(),
          age: numAge,
          weight: numWeight,
          height: numHeight,
          gender,
          goal,
          data: {
            ...DEFAULT_USER_DATA,
            calGoal: goal === "muscle" ? 3000 : goal === "fat_loss" ? 1800 : 2200,
            proteinGoal: Math.round(numWeight * 2),
            carbsGoal: Math.round(numWeight * 4),
            fatGoal: Math.round(numWeight * 1),
            weight: numWeight, height: numHeight, age: numAge,
            name: name.trim(), goal, gender,
          }
        };
        users.push(newUser);
        localStorage.setItem("fitforge_users", JSON.stringify(users));
        localStorage.setItem("fitforge_active_user", newUser.email);
        setLoading(false);
        onLoginSuccess(newUser.data, newUser.email);
      } catch (e) {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Email is required.");
    if (!password) return setError("Password is required.");

    setLoading(true);
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (!user) {
          setLoading(false);
          return setError("Invalid email or password.");
        }
        localStorage.setItem("fitforge_active_user", user.email);
        setLoading(false);
        onLoginSuccess(user.data || { ...DEFAULT_USER_DATA, name: user.name, weight: user.weight, height: user.height }, user.email);
      } catch(e) {
        setLoading(false);
        setError("Error loading account.");
      }
    }, 800);
  };

  return (
    <div style={{ width:"100vw", height:"100vh", display:"flex", background:COLORS.bg, overflow:"hidden", position:"relative" }}>
      
      {/* Left Column (Branding - Editorial) */}
      <div className="auth-left" style={{ width:"50%", padding:"80px 60px", background:COLORS.bg2, display:"flex", flexDirection:"column", justifyContent:"space-between", borderRight:`1px solid ${COLORS.border}`, flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"'Syne'", fontSize:20, fontWeight:800, color:COLORS.text, letterSpacing:"-0.5px", textTransform:"uppercase" }}>
            FitForge
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column" }}>
          <h1 style={{ fontFamily:"'Syne'", fontSize:56, fontWeight:800, color:COLORS.text, textTransform:"uppercase", letterSpacing:"-1.5px", lineHeight:1.1, marginBottom:24 }}>
            Shape your<br/>
            <span style={{ color:COLORS.accent }}>strength.</span>
          </h1>
          <div style={{ width:60, height:2, background:COLORS.accent, marginBottom:24 }} />
          <p style={{ fontSize:15, color:COLORS.muted, lineHeight:1.8, maxWidth:420, fontWeight:400 }}>
            Structured workspace for calorie logging, dynamic diet planning, muscle building logs, sleep metrics, and context-aware AI coaching. Focus on progression, without distractions.
          </p>
        </div>

        <div>
          <div style={{ fontSize:11, color:COLORS.dim, letterSpacing:"0.08em", fontWeight:600, textTransform:"uppercase" }}>
            © 2026 FitForge Performance System
          </div>
        </div>
      </div>

      {/* Right Column (Form Panel) */}
      <div className="auth-right" style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"80px 60px", background:COLORS.bg, overflowY:"auto" }}>
        <div style={{ width:"100%", maxWidth:380, display:"flex", flexDirection:"column" }}>
          
          {/* Header */}
          <div style={{ marginBottom:28 }}>
            <h2 style={{ fontFamily:"'Syne'", fontSize:32, fontWeight:700, color:COLORS.text, letterSpacing:"-0.5px", marginBottom:6 }}>
              {isLogin ? "Sign In" : step === 1 ? "Sign Up" : "Profile Settings"}
            </h2>
            <p style={{ fontSize:13, color:COLORS.muted, lineHeight:1.4 }}>
              {isLogin ? "Access your metrics and logged activities." : step === 1 ? "Provide your login credentials." : "Complete your body profile information."}
            </p>
          </div>

          {/* Validation Alert */}
          {error && (
            <div className="slide-up" style={{ color:COLORS.red, fontSize:13, fontWeight:600, marginBottom:20, display:"flex", alignItems:"center", gap:6 }}>
              <span>✕</span> <span>{error}</span>
            </div>
          )}

          {isLogin ? (
            /* Login Form */
            <form onSubmit={handleLogin} style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>EMAIL ADDRESS</label>
                <input className="minimal-input" type="email" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:"100%" }} />
              </div>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>PASSWORD</label>
                <input className="minimal-input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:"100%" }} />
              </div>
              <button type="submit" disabled={loading} style={{ width:"100%", padding:"14px", background:COLORS.accent, color:"#fff", border:"none", borderRadius:6, fontWeight:600, fontSize:15, marginTop:10, cursor:"pointer", transition:"opacity 0.2s" }} onMouseOver={e=>e.currentTarget.style.opacity=0.9} onMouseOut={e=>e.currentTarget.style.opacity=1}>
                {loading ? "Authenticating..." : "Access Workspace"}
              </button>
              
              <div style={{ textAlign:"center", marginTop:16 }}>
                <span style={{ fontSize:13, color:COLORS.muted }}>New to FitForge? </span>
                <span onClick={() => { setIsLogin(false); setStep(1); setError(""); }} style={{ fontSize:13, color:COLORS.accent, fontWeight:600, cursor:"pointer", textDecoration:"underline" }}>Create account</span>
              </div>
            </form>
          ) : step === 1 ? (
            /* Signup Step 1 Form */
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>EMAIL ADDRESS</label>
                <input className="minimal-input" type="email" placeholder="you@domain.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ width:"100%" }} />
              </div>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>PASSWORD</label>
                <input className="minimal-input" type="password" placeholder="Min. 6 characters" value={password} onChange={e=>setPassword(e.target.value)} style={{ width:"100%" }} />
                {password && (
                  <div style={{ fontSize:10, color:COLORS.dim, fontWeight:600, marginTop:6 }}>
                    Strength: {strength.label.split(" ")[0]}
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>CONFIRM PASSWORD</label>
                <input className="minimal-input" type="password" placeholder="Verify password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} style={{ width:"100%" }} />
              </div>
              <button onClick={handleNextStep} style={{ width:"100%", padding:"14px", background:COLORS.accent, color:"#fff", border:"none", borderRadius:6, fontWeight:600, fontSize:15, marginTop:10, cursor:"pointer" }}>
                Next Step
              </button>
              
              <div style={{ textAlign:"center", marginTop:16 }}>
                <span style={{ fontSize:13, color:COLORS.muted }}>Already registered? </span>
                <span onClick={() => { setIsLogin(true); setError(""); }} style={{ fontSize:13, color:COLORS.accent, fontWeight:600, cursor:"pointer", textDecoration:"underline" }}>Sign in</span>
              </div>
            </div>
          ) : (
            /* Signup Step 2 Form */
            <form onSubmit={handleSignup} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>DISPLAY NAME</label>
                <input className="minimal-input" type="text" placeholder="Athlete Name" value={name} onChange={e=>setName(e.target.value)} style={{ width:"100%" }} />
              </div>
              
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>AGE</label>
                  <input className="minimal-input" type="number" placeholder="25" value={age} onChange={e=>setAge(e.target.value)} style={{ width:"100%" }} />
                </div>
                <div>
                  <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>WEIGHT (KG)</label>
                  <input className="minimal-input" type="number" step="0.1" placeholder="70" value={weight} onChange={e=>setWeight(e.target.value)} style={{ width:"100%" }} />
                </div>
                <div>
                  <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>HEIGHT (CM)</label>
                  <input className="minimal-input" type="number" placeholder="170" value={height} onChange={e=>setHeight(e.target.value)} style={{ width:"100%" }} />
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>GENDER</label>
                  <select className="minimal-select" value={gender} onChange={e=>setGender(e.target.value)} style={{ width:"100%" }}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:10, color:COLORS.dim, fontWeight:700, letterSpacing:"0.1em", display:"block", marginBottom:4 }}>FITNESS GOAL</label>
                  <select className="minimal-select" value={goal} onChange={e=>setGoal(e.target.value)} style={{ width:"100%" }}>
                    <option value="muscle">Build Muscle</option>
                    <option value="fat_loss">Lose Fat</option>
                    <option value="maintain">Maintain</option>
                  </select>
                </div>
              </div>

              <div style={{ display:"flex", gap:12, marginTop:16 }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex:1, padding:"12px", background:"transparent", color:COLORS.muted, border:`1px solid ${COLORS.border}`, borderRadius:6, fontWeight:600, fontSize:14, cursor:"pointer" }}>
                  Back
                </button>
                <button type="submit" disabled={loading} style={{ flex:2, padding:"12px", background:COLORS.accent, color:"#fff", border:"none", borderRadius:6, fontWeight:600, fontSize:14, cursor:"pointer" }}>
                  {loading ? "Registering..." : "Forge Profile"}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("fitforge-theme") || "dark"; } catch { return "dark"; }
  });
  const COLORS = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("fitforge-theme", next); } catch {}
  };

  const [activeUserEmail, setActiveUserEmail] = useState(() => {
    try {
      return localStorage.getItem("fitforge_active_user") || "";
    } catch {
      return "";
    }
  });

  const [data, setData] = useState(() => {
    return {
      calories: 0, calGoal: 2000, protein: 0, proteinGoal: 150,
      carbs: 0, carbsGoal: 250, fat: 0, fatGoal: 70, fiber: 0,
      water: 0, waterGoal: 8, burned: 0, streak: 0, weeklyWorkouts: 0,
      weight: 70, height: 170, age: 25, bodyFat: 15,
      sleepQuality: 7, steps: 0, stepsGoal: 10000,
      name: "Athlete", goal: "muscle", gender: "male",
      cardioMinutes: 0, cardioCalBurned: 0,
      suppChecked: {},
      achievements: [],
    };
  });

  // Pre-register demo user at startup
  useEffect(() => {
    try {
      const users = localStorage.getItem("fitforge_users");
      if (!users) {
        const demoUser = {
          email: "demo@fitforge.com",
          password: "password123",
          name: "Demo Athlete",
          age: 28,
          weight: 79.5,
          height: 175,
          gender: "male",
          goal: "muscle",
          data: {
            calories: 1420, calGoal: 2800, protein: 98, proteinGoal: 160,
            carbs: 145, carbsGoal: 300, fat: 52, fatGoal: 80, fiber: 18,
            water: 5, waterGoal: 10, burned: 420, streak: 14, weeklyWorkouts: 3,
            weight: 79.5, height: 175, age: 28, bodyFat: 18,
            sleepQuality: 8, steps: 7240, stepsGoal: 10000,
            name: "Demo Athlete", goal: "muscle", gender: "male",
            cardioMinutes: 0, cardioCalBurned: 0,
            suppChecked: {},
            achievements: [{name: "Week Warrior", desc: "7-day streak"}],
          }
        };
        localStorage.setItem("fitforge_users", JSON.stringify([demoUser]));
      }
    } catch(e) {}
  }, []);

  // Load user data on change
  useEffect(() => {
    if (!activeUserEmail) return;
    try {
      const users = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
      const user = users.find(u => u.email.toLowerCase() === activeUserEmail.toLowerCase());
      if (user && user.data) {
        setData(user.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeUserEmail]);

  // Sync user data to localStorage on changes
  useEffect(() => {
    if (!activeUserEmail) return;
    try {
      const users = JSON.parse(localStorage.getItem("fitforge_users") || "[]");
      const updated = users.map(u => {
        if (u.email.toLowerCase() === activeUserEmail.toLowerCase()) {
          return {
            ...u,
            name: data.name,
            age: data.age,
            weight: data.weight,
            height: data.height,
            gender: data.gender,
            goal: data.goal,
            data: data
          };
        }
        return u;
      });
      localStorage.setItem("fitforge_users", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, [data, activeUserEmail]);

  const handleLoginSuccess = (userData, email) => {
    setData(userData);
    setActiveUserEmail(email);
    setPage("dashboard");
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("fitforge_active_user");
    } catch {}
    setActiveUserEmail("");
    setData({
      calories: 0, calGoal: 2000, protein: 0, proteinGoal: 150,
      carbs: 0, carbsGoal: 250, fat: 0, fatGoal: 70, fiber: 0,
      water: 0, waterGoal: 8, burned: 0, streak: 0, weeklyWorkouts: 0,
      weight: 70, height: 170, age: 25, bodyFat: 15,
      sleepQuality: 7, steps: 0, stepsGoal: 10000,
      name: "Athlete", goal: "muscle", gender: "male",
      cardioMinutes: 0, cardioCalBurned: 0,
      suppChecked: {},
      achievements: [],
    });
    setPage("dashboard");
  };

  const pages = {
    dashboard:   <Dashboard      data={data} setData={setData} setPage={setPage} />,
    calories:    <CaloriesPage   data={data} setData={setData} />,
    nutrition:   <NutritionPage  data={data} setData={setData} />,
    water:       <WaterPage      data={data} setData={setData} />,
    workout:     <WorkoutPage    data={data} setData={setData} />,
    diet:        <DietPage       data={data} />,
    muscle:      <MusclePage />,
    routine:     <RoutinePage />,
    progress:    <ProgressPage   data={data} setData={setData} />,
    ai:          <AIPage         data={data} />,
    sleep:       <SleepPage      data={data} setData={setData} />,
    stats:       <StatsPage      data={data} setData={setData} />,
    cardio:      <CardioPage     data={data} setData={setData} />,
    supplements: <SupplementsPage data={data} setData={setData} />,
    goals:       <GoalsPage      data={data} setData={setData} />,
    calculator:  <CalculatorPage data={data} setData={setData} />,
    settings:    <SettingsPage   data={data} setData={setData} handleLogout={handleLogout} />,
  };

  if (!activeUserEmail) {
    return (
      <ThemeContext.Provider value={{ theme, COLORS, toggleTheme }}>
        <style>{buildCss(theme)}</style>
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, COLORS, toggleTheme }}>
      <style>{buildCss(theme)}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:COLORS.bg, fontFamily:"'DM Sans', sans-serif", transition:"background 0.35s ease" }}>
        {/* Sidebar */}
        <div style={{ width: sidebarOpen ? 236 : 64, background:COLORS.bg2, borderRight:`1px solid ${COLORS.border}`, display:"flex", flexDirection:"column", transition:"width 0.3s cubic-bezier(0.4,0,0.2,1), background 0.35s ease", overflow:"hidden", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
          {/* Logo */}
          <div style={{ padding:"18px 14px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", gap:10, overflow:"hidden" }}>
            <div className="glow-pulse" style={{ width:38, height:38, borderRadius:11, background:`linear-gradient(135deg, ${COLORS.accent}, ${COLORS.yellow})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, boxShadow:`0 0 16px ${COLORS.accent}50` }}>⚡</div>
            {sidebarOpen && (
              <div style={{ overflow:"hidden" }}>
                <div style={{ fontFamily:"'Syne'", fontSize:19, fontWeight:800, color:COLORS.text, whiteSpace:"nowrap", letterSpacing:"-0.5px", lineHeight: 1.4 }}>FitForge</div>
                <div style={{ fontSize:10, color:COLORS.muted, whiteSpace:"nowrap", letterSpacing:"0.08em" }}>PERFORMANCE TRACKER</div>
              </div>
            )}
          </div>

          {/* Nav groups */}
          <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
            {[
              { label:"OVERVIEW",  ids:["dashboard"] },
              { label:"NUTRITION", ids:["calories","nutrition","water","diet"] },
              { label:"TRAINING",  ids:["workout","muscle","routine","cardio"] },
              { label:"WELLNESS",  ids:["sleep","progress","stats"] },
              { label:"TOOLS",     ids:["supplements","goals","calculator","ai"] },
              { label:"SYSTEM",    ids:["settings"] },
            ].map(group => (
              <div key={group.label} style={{ marginBottom:6 }}>
                {sidebarOpen && (
                  <div style={{ fontSize:10, color:COLORS.dim, letterSpacing:"0.12em", fontWeight:600, padding:"8px 10px 4px", userSelect:"none" }}>{group.label}</div>
                )}
                {group.ids.map(id => {
                  const n = NAV.find(x => x.id === id);
                  if (!n) return null;
                  const active = page === n.id;
                  return (
                    <button key={n.id} onClick={() => setPage(n.id)}
                      style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:10, border:"none", background: active ? `${COLORS.accent}18` : "transparent", color: active ? COLORS.accent : COLORS.muted, cursor:"pointer", marginBottom:1, textAlign:"left", transition:"all 0.18s", overflow:"hidden", whiteSpace:"nowrap", position:"relative" }}
                      onMouseOver={e=>{ if(!active){e.currentTarget.style.background=`${COLORS.accent}0e`;e.currentTarget.style.color=COLORS.text;}}}
                      onMouseOut={e=>{ if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color=COLORS.muted;}}}>
                      {active && <div style={{ position:"absolute", left:0, top:"20%", bottom:"20%", width:3, borderRadius:"0 3px 3px 0", background:COLORS.accent }} />}
                      <span style={{ fontSize:17, flexShrink:0 }}>{n.icon}</span>
                      {sidebarOpen && <span style={{ fontSize:13, fontWeight: active ? 600 : 400, letterSpacing: active ? "-0.1px" : "normal" }}>{n.label}</span>}
                    </button>
                  );
                })}
                {sidebarOpen && <div style={{ height:1, background:COLORS.border, margin:"6px 4px 2px" }} />}
              </div>
            ))}
          </nav>

          {/* User footer + toggle */}
          {sidebarOpen && (
            <div style={{ padding:"12px 12px 8px", borderTop:`1px solid ${COLORS.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:10, background:COLORS.bg3, cursor:"pointer" }} onClick={() => setPage("settings")}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:`linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>
                  {(data.name||"A")[0].toUpperCase()}
                </div>
                <div style={{ overflow:"hidden" }}>
                  <div style={{ fontSize:13, fontWeight:600, color:COLORS.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{data.name || "Athlete"}</div>
                  <div style={{ fontSize:10, color:COLORS.green }}>● Active</div>
                </div>
                <div style={{ marginLeft:"auto", fontSize:12, color:COLORS.dim }}>⚙️</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} style={{ margin:"0 8px 8px", padding:"9px", borderRadius:10, border:`1px solid ${COLORS.red}30`, background:"transparent", color:COLORS.red, cursor:"pointer", fontSize:14, transition:"all 0.2s", display:"flex", alignItems:"center", justifyContent:sidebarOpen ? "flex-start" : "center", gap:10 }} onMouseOver={e=>{e.currentTarget.style.background=`${COLORS.red}15`}} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
            <span style={{ fontSize:15 }}>🚪</span>
            {sidebarOpen && <span style={{ fontWeight:600, fontSize:12 }}>Sign Out</span>}
          </button>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ margin:"8px 8px 12px", padding:"9px", borderRadius:10, border:`1px solid ${COLORS.border}`, background:"transparent", color:COLORS.muted, cursor:"pointer", fontSize:14, transition:"all 0.2s" }} onMouseOver={e=>e.currentTarget.style.background=COLORS.bg3} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
            {sidebarOpen ? "◀ Collapse" : "▶"}
          </button>
        </div>

        {/* Main */}
        <div style={{ flex:1, overflow:"auto" }}>
          {/* Topbar */}
          <div style={{ padding:"14px 32px", borderBottom:`1px solid ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:COLORS.bg2, position:"sticky", top:0, zIndex:10, backdropFilter:"blur(12px)", transition:"background 0.35s ease" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontFamily:"'Syne'", fontSize:16, fontWeight:700, color:COLORS.text, lineHeight: 1.4 }}>{NAV.find(n=>n.id===page)?.icon} {NAV.find(n=>n.id===page)?.label}</div>
              <div style={{ width:1, height:16, background:COLORS.border }} />
              <div style={{ fontSize:12, color:COLORS.muted, display:"flex", alignItems:"center", gap:5 }}>
                👟 <span style={{ color:COLORS.green, fontWeight:600 }}>{data.steps?.toLocaleString()}</span> / {data.stepsGoal?.toLocaleString()} steps
              </div>
            </div>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              {/* Theme toggle in topbar */}
              <button onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                style={{ width:36, height:36, borderRadius:"50%", border:`1px solid ${COLORS.border}`, background:COLORS.bg3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, cursor:"pointer", transition:"all 0.3s" }}
                onMouseOver={e=>{e.currentTarget.style.borderColor=COLORS.accent;e.currentTarget.style.transform="scale(1.1)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=COLORS.border;e.currentTarget.style.transform="scale(1)";}}>
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:6, background:`${COLORS.accent}15`, border:`1px solid ${COLORS.accent}30`, borderRadius:20, padding:"5px 12px" }}>
                <span style={{ fontSize:13 }}>🔥</span>
                <span style={{ fontSize:12, fontWeight:600, color:COLORS.accent }}>{data.streak} day streak</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, background:`${COLORS.cyan}15`, border:`1px solid ${COLORS.cyan}30`, borderRadius:20, padding:"5px 12px" }}>
                <span style={{ fontSize:12, color:COLORS.cyan, fontWeight:600 }}>⚡ {data.calories?.toLocaleString()} / {data.calGoal?.toLocaleString()} kcal</span>
              </div>
              <div style={{ position:"relative" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:COLORS.green, position:"absolute", top:0, right:0, border:`2px solid ${COLORS.bg2}` }} />
                <div onClick={() => setPage("settings")} style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg, ${COLORS.accent}, ${COLORS.purple})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", cursor:"pointer", fontFamily:"'Syne'" }}>
                  {(data.name||"A")[0].toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{ padding:"28px 32px", maxWidth:1100, margin:"0 auto" }}>
            {pages[page]}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
