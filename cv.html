import { useState, useRef, useCallback } from "react";

// ── GOC Scoring Logic ──────────────────────────────────────────────────────────
function calcGOCScore({ educationLevel, workExYears, age, germanLevel, englishLevel, prevGermanyStay }) {
  let score = 0;
  const breakdown = [];

  // Education
  const eduMap = { phd: 4, masters: 3, bachelors: 2, diploma: 1, other: 0 };
  const eduPts = eduMap[educationLevel] ?? 0;
  score += eduPts;
  breakdown.push({ label: "Qualification", points: eduPts, max: 4 });

  // Work Experience
  const wePts = workExYears >= 5 ? 3 : workExYears >= 2 ? 2 : workExYears >= 1 ? 1 : 0;
  score += wePts;
  breakdown.push({ label: "Work Experience", points: wePts, max: 3 });

  // Age
  const agePts = age < 35 ? 2 : age < 40 ? 1 : 0;
  score += agePts;
  breakdown.push({ label: "Age", points: agePts, max: 2 });

  // German
  const dePts = germanLevel === "b2_c1" ? 2 : germanLevel === "a2_b1" ? 1 : 0;
  score += dePts;
  breakdown.push({ label: "German Proficiency", points: dePts, max: 2 });

  // English
  const enPts = ["b2", "c1", "native"].includes(englishLevel) ? 1 : 0;
  score += enPts;
  breakdown.push({ label: "English Proficiency", points: enPts, max: 1 });

  // Germany stay
  const gsPts = prevGermanyStay === "yes" ? 1 : 0;
  score += gsPts;
  breakdown.push({ label: "Previous Germany Stay", points: gsPts, max: 1 });

  const status = score >= 8 ? "eligible" : score >= 6 ? "potential" : "not_eligible";
  return { score, breakdown, status, total: 13 };
}

// ── Text Extraction Helpers ────────────────────────────────────────────────────
function extractEmail(text) {
  const m = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return m ? m[0] : "";
}

function extractPhone(text) {
  const m = text.match(/(\+?[\d\s\-().]{10,16})/g);
  if (!m) return "";
  return m.find(p => p.replace(/\D/g, "").length >= 10) || "";
}

function extractName(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 6)) {
    if (line.length < 5 || line.length > 50) continue;
    if (/[0-9@]/.test(line)) continue;
    if (/resume|curriculum|vitae|cv\b/i.test(line)) continue;
    return line;
  }
  return "";
}

function extractEducation(text) {
  const lower = text.toLowerCase();
  if (/ph\.?d|doctorate/i.test(lower)) return "phd";
  if (/master|m\.?s\b|m\.?tech|mba|m\.?e\b/i.test(lower)) return "masters";
  if (/bachelor|b\.?tech|b\.?e\b|b\.?sc|b\.?com|b\.?a\b/i.test(lower)) return "bachelors";
  if (/diploma|polytechnic/i.test(lower)) return "diploma";
  return "other";
}

function extractWorkExYears(text) {
  // Find all year ranges like 2018-2022, 2020–Present
  const ranges = [...text.matchAll(/(\d{4})\s*[-–—]\s*(\d{4}|present|current|now)/gi)];
  let total = 0;
  const currentYear = new Date().getFullYear();
  for (const r of ranges) {
    const start = parseInt(r[1]);
    const end = /present|current|now/i.test(r[2]) ? currentYear : parseInt(r[2]);
    if (end > start && start > 1990 && end <= currentYear + 1) total += end - start;
  }
  return Math.min(total, 30);
}

function extractRole(text) {
  const patterns = [
    /(?:current|present|recent)?\s*(?:position|role|title|designation)[:\s]+([^\n,]+)/i,
    /^([\w\s]+(?:engineer|developer|manager|analyst|consultant|officer|director|lead|specialist|nurse|doctor|technician)[\w\s]*)/im,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim().slice(0, 60);
  }
  return "";
}

function extractYearOfPassing(text) {
  const eduKeywords = /university|college|institute|school|academy/i;
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (eduKeywords.test(lines[i])) {
      const ctx = lines.slice(i, i + 4).join(" ");
      const m = ctx.match(/\b(19|20)\d{2}\b/g);
      if (m) return m[m.length - 1];
    }
  }
  const m = text.match(/graduated?[:\s]+(\d{4})/i) || text.match(/batch[:\s]+(\d{4})/i);
  return m ? m[1] : "";
}

// ── PDF Text Extraction ────────────────────────────────────────────────────────
async function extractTextFromPDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const pdfjsLib = window["pdfjs-dist/build/pdf"];
        pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        const pdf = await pdfjsLib.getDocument({ data: e.target.result }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          fullText += content.items.map(item => item.str).join(" ") + "\n";
        }
        resolve(fullText);
      } catch (err) { reject(err); }
    };
    reader.readAsArrayBuffer(file);
  });
}

async function extractTextFromDOCX(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const mammoth = window.mammoth;
        const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
        resolve(result.value);
      } catch (err) { reject(err); }
    };
    reader.readAsArrayBuffer(file);
  });
}

// ── Stepper ────────────────────────────────────────────────────────────────────
const STEPS = ["Upload", "Parsing", "Confirm", "Questions", "Score", "Capture", "Done"];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function GOCTool() {
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [parsed, setParsed] = useState({ name: "", email: "", mobile: "", education: "bachelors", role: "", workExYears: 0, yearOfPassing: "" });
  const [questions, setQuestions] = useState({ germanLevel: "", englishLevel: "", age: "", prevGermanyStay: "" });
  const [result, setResult] = useState(null);
  const [lead, setLead] = useState({ name: "", email: "", mobile: "" });
  const [error, setError] = useState("");
  const fileRef = useRef();

  const processFile = useCallback(async (file) => {
    setError("");
    setStep(1);
    try {
      let text = "";
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        text = await extractTextFromPDF(file);
      } else if (file.name.endsWith(".docx")) {
        text = await extractTextFromDOCX(file);
      } else {
        setError("Please upload a PDF or DOCX file.");
        setStep(0); return;
      }
      const p = {
        name: extractName(text),
        email: extractEmail(text),
        mobile: extractPhone(text),
        education: extractEducation(text),
        role: extractRole(text),
        workExYears: extractWorkExYears(text),
        yearOfPassing: extractYearOfPassing(text),
      };
      setParsed(p);
      setLead({ name: p.name, email: p.email, mobile: p.mobile });
      setStep(2);
    } catch (e) {
      setError("Could not read file. Try a different PDF or DOCX.");
      setStep(0);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const calcAndShow = () => {
    const r = calcGOCScore({
      educationLevel: parsed.education,
      workExYears: parsed.workExYears,
      age: parseInt(questions.age) || 30,
      germanLevel: questions.germanLevel,
      englishLevel: questions.englishLevel,
      prevGermanyStay: questions.prevGermanyStay,
    });
    setResult(r);
    setStep(4);
  };

  const statusConfig = {
    eligible: { label: "Eligible", color: "#22c55e", bg: "#f0fdf4", desc: "Your profile qualifies for the Germany Opportunity Card." },
    potential: { label: "Potentially Eligible", color: "#f59e0b", bg: "#fffbeb", desc: "You are close. Minor improvements could qualify you." },
    not_eligible: { label: "Not Eligible Yet", color: "#ef4444", bg: "#fef2f2", desc: "Your profile needs strengthening before applying." },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #f8f9fb; }
        .shell { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 0 0 60px; }

        /* Header */
        .header { width: 100%; background: #0a1628; padding: 14px 24px; display: flex; align-items: center; gap: 12px; }
        .logo-mark { width: 32px; height: 32px; background: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #fff; }
        .logo-text { color: #fff; font-weight: 700; font-size: 15px; letter-spacing: -0.3px; }
        .logo-sub { color: #64748b; font-size: 12px; margin-left: 4px; }

        /* Progress */
        .progress-bar { width: 100%; background: #0a1628; padding: 0 24px 16px; display: flex; gap: 4px; max-width: 680px; margin: 0 auto; }
        .progress-wrap { width: 100%; display: flex; justify-content: center; background: #0a1628; }
        .prog-seg { flex: 1; height: 3px; border-radius: 99px; background: #1e2d45; transition: background 0.3s; }
        .prog-seg.done { background: #3b82f6; }

        /* Card */
        .card { width: 100%; max-width: 580px; background: #fff; border-radius: 16px; padding: 32px 28px; margin: 28px 16px 0; box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05); }
        .card-title { font-size: 22px; font-weight: 800; color: #0a1628; letter-spacing: -0.5px; margin-bottom: 6px; }
        .card-sub { font-size: 14px; color: #64748b; line-height: 1.5; margin-bottom: 24px; }

        /* Upload zone */
        .upload-zone { border: 2px dashed #cbd5e1; border-radius: 12px; padding: 40px 24px; text-align: center; cursor: pointer; transition: all 0.2s; background: #f8fafc; }
        .upload-zone:hover, .upload-zone.drag { border-color: #3b82f6; background: #eff6ff; }
        .upload-icon { font-size: 36px; margin-bottom: 12px; }
        .upload-label { font-size: 15px; font-weight: 600; color: #0a1628; margin-bottom: 4px; }
        .upload-hint { font-size: 13px; color: #94a3b8; }

        /* Parsing loader */
        .loader-wrap { display: flex; flex-direction: column; align-items: center; padding: 20px 0; gap: 16px; }
        .spinner { width: 44px; height: 44px; border: 3px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loader-text { font-size: 14px; color: #475569; font-weight: 500; }

        /* Field rows */
        .field-row { margin-bottom: 16px; }
        .field-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
        .field-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; font-size: 14px; font-family: 'Inter', sans-serif; color: #0a1628; outline: none; transition: border 0.2s; }
        .field-input:focus { border-color: #3b82f6; }
        select.field-input { background: #fff; cursor: pointer; }

        /* Edu badges */
        .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .edu-btn { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 10px; text-align: center; font-size: 13px; font-weight: 600; cursor: pointer; background: #fff; color: #475569; transition: all 0.2s; }
        .edu-btn.sel { border-color: #3b82f6; background: #eff6ff; color: #1d4ed8; }

        /* Option cards (Q step) */
        .opt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .opt-btn { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600; cursor: pointer; background: #fff; color: #475569; transition: all 0.2s; }
        .opt-btn.sel { border-color: #3b82f6; background: #eff6ff; color: #1d4ed8; }
        .opt-btn:hover { border-color: #93c5fd; }

        /* Score */
        .score-ring { width: 120px; height: 120px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto 20px; border: 6px solid; font-weight: 800; }
        .score-num { font-size: 36px; line-height: 1; }
        .score-of { font-size: 12px; color: #94a3b8; }
        .status-badge { border-radius: 8px; padding: 10px 16px; text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 16px; }
        .breakdown-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .breakdown-row:last-child { border-bottom: none; }
        .pts-pill { background: #eff6ff; color: #1d4ed8; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 99px; }

        /* Buttons */
        .btn-primary { width: 100%; background: #1d4ed8; color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.2s; margin-top: 8px; }
        .btn-primary:hover { background: #1e40af; }
        .btn-secondary { width: 100%; background: #f1f5f9; color: #0a1628; border: none; border-radius: 10px; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; margin-top: 8px; }

        /* Thank you */
        .thank-icon { font-size: 56px; text-align: center; margin-bottom: 12px; }
        .cta-row { display: flex; gap: 10px; flex-direction: column; margin-top: 20px; }
        .cta-whatsapp { display: flex; align-items: center; justify-content: center; gap: 8px; background: #25d366; color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none; font-family: 'Inter', sans-serif; }
        .cta-call { display: flex; align-items: center; justify-content: center; gap: 8px; background: #0a1628; color: #fff; border: none; border-radius: 10px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; text-decoration: none; font-family: 'Inter', sans-serif; }

        .error-msg { color: #ef4444; font-size: 13px; margin-top: 8px; text-align: center; }
        .divider { height: 1px; background: #f1f5f9; margin: 16px 0; }
        .q-label { font-size: 15px; font-weight: 700; color: #0a1628; margin-bottom: 10px; margin-top: 18px; }
        .q-label:first-child { margin-top: 0; }

        @media (max-width: 480px) {
          .card { padding: 24px 18px; margin: 20px 12px 0; }
          .edu-grid { grid-template-columns: 1fr 1fr; }
          .card-title { font-size: 19px; }
        }
      `}</style>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js" />

      <div className="shell">
        {/* Header */}
        <div style={{ width: "100%", background: "#0a1628" }}>
          <div className="header" style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="logo-mark">T</div>
            <div>
              <span className="logo-text">TerraTern</span>
              <span className="logo-sub">GOC Eligibility Check</span>
            </div>
          </div>
          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-bar">
              {STEPS.map((_, i) => (
                <div key={i} className={`prog-seg ${i <= step ? "done" : ""}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ── STEP 0: Upload ── */}
        {step === 0 && (
          <div className="card">
            <div className="card-title">Check Your GOC Eligibility</div>
            <div className="card-sub">Upload your CV and get your Germany Opportunity Card score in under 2 minutes. No forms. Just upload.</div>
            <div
              className={`upload-zone ${dragging ? "drag" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              <div className="upload-icon">📄</div>
              <div className="upload-label">Drop your CV here</div>
              <div className="upload-hint">PDF or DOCX supported</div>
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: "none" }} onChange={e => e.target.files[0] && processFile(e.target.files[0])} />
            {error && <div className="error-msg">{error}</div>}
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => fileRef.current.click()}>Upload CV / Resume</button>
          </div>
        )}

        {/* ── STEP 1: Parsing ── */}
        {step === 1 && (
          <div className="card">
            <div className="card-title">Reading Your CV</div>
            <div className="card-sub">Extracting your profile information...</div>
            <div className="loader-wrap">
              <div className="spinner" />
              <div className="loader-text">Analysing your CV...</div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Confirm Parsed Data ── */}
        {step === 2 && (
          <div className="card">
            <div className="card-title">We Found This</div>
            <div className="card-sub">Correct anything that looks off before we calculate your score.</div>

            <div className="field-row">
              <div className="field-label">Full Name</div>
              <input className="field-input" value={parsed.name} onChange={e => setParsed(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
            </div>
            <div className="field-row">
              <div className="field-label">Email</div>
              <input className="field-input" value={parsed.email} onChange={e => setParsed(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
            </div>
            <div className="field-row">
              <div className="field-label">Mobile</div>
              <input className="field-input" value={parsed.mobile} onChange={e => setParsed(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 00000 00000" />
            </div>

            <div className="divider" />

            <div className="field-row">
              <div className="field-label">Current / Recent Role</div>
              <input className="field-input" value={parsed.role} onChange={e => setParsed(p => ({ ...p, role: e.target.value }))} placeholder="e.g. Software Engineer" />
            </div>
            <div className="field-row">
              <div className="field-label">Total Work Experience (years)</div>
              <input className="field-input" type="number" min="0" max="40" value={parsed.workExYears} onChange={e => setParsed(p => ({ ...p, workExYears: parseInt(e.target.value) || 0 }))} />
            </div>
            <div className="field-row">
              <div className="field-label">Year of Passing (highest degree)</div>
              <input className="field-input" value={parsed.yearOfPassing} onChange={e => setParsed(p => ({ ...p, yearOfPassing: e.target.value }))} placeholder="e.g. 2019" />
            </div>

            <div className="divider" />

            <div className="field-label" style={{ marginBottom: 10 }}>Highest Qualification</div>
            <div className="edu-grid">
              {[["phd", "PhD / Doctorate"], ["masters", "Masters / MBA"], ["bachelors", "Bachelors / B.Tech"], ["diploma", "Diploma"]].map(([val, lbl]) => (
                <button key={val} className={`edu-btn ${parsed.education === val ? "sel" : ""}`} onClick={() => setParsed(p => ({ ...p, education: val }))}>{lbl}</button>
              ))}
            </div>

            <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setStep(3)}>Confirm & Continue →</button>
          </div>
        )}

        {/* ── STEP 3: Gap-Fill Questions ── */}
        {step === 3 && (
          <div className="card">
            <div className="card-title">2 Quick Questions</div>
            <div className="card-sub">These directly affect your GOC score. Takes 30 seconds.</div>

            <div className="q-label">What is your German language level?</div>
            <div className="opt-grid">
              {[["none", "None / A1"], ["a2_b1", "A2 / B1"], ["b2_c1", "B2 / C1+"], ["learning", "Currently Learning"]].map(([val, lbl]) => (
                <button key={val} className={`opt-btn ${questions.germanLevel === val ? "sel" : ""}`} onClick={() => setQuestions(q => ({ ...q, germanLevel: val }))}>{lbl}</button>
              ))}
            </div>

            <div className="q-label">English proficiency?</div>
            <div className="opt-grid">
              {[["basic", "Basic"], ["b2", "B2 / Upper Intermediate"], ["c1", "C1 / Advanced"], ["native", "Native"]].map(([val, lbl]) => (
                <button key={val} className={`opt-btn ${questions.englishLevel === val ? "sel" : ""}`} onClick={() => setQuestions(q => ({ ...q, englishLevel: val }))}>{lbl}</button>
              ))}
            </div>

            <div className="q-label">Your current age</div>
            <input className="field-input" type="number" min="18" max="65" value={questions.age} onChange={e => setQuestions(q => ({ ...q, age: e.target.value }))} placeholder="e.g. 28" />

            <div className="q-label">Have you stayed in Germany before?</div>
            <div className="opt-grid">
              <button className={`opt-btn ${questions.prevGermanyStay === "yes" ? "sel" : ""}`} onClick={() => setQuestions(q => ({ ...q, prevGermanyStay: "yes" }))}>Yes</button>
              <button className={`opt-btn ${questions.prevGermanyStay === "no" ? "sel" : ""}`} onClick={() => setQuestions(q => ({ ...q, prevGermanyStay: "no" }))}>No</button>
            </div>

            <button
              className="btn-primary"
              style={{ marginTop: 20 }}
              disabled={!questions.germanLevel || !questions.englishLevel || !questions.age || !questions.prevGermanyStay}
              onClick={calcAndShow}
            >Calculate My Score →</button>
          </div>
        )}

        {/* ── STEP 4: Score ── */}
        {step === 4 && result && (() => {
          const sc = statusConfig[result.status];
          const ringColor = result.status === "eligible" ? "#22c55e" : result.status === "potential" ? "#f59e0b" : "#ef4444";
          return (
            <div className="card">
              <div className="card-title" style={{ textAlign: "center" }}>Your GOC Score</div>
              <div style={{ height: 12 }} />
              <div className="score-ring" style={{ borderColor: ringColor }}>
                <div className="score-num" style={{ color: ringColor }}>{result.score}</div>
                <div className="score-of">/ {result.total} pts</div>
              </div>
              <div className="status-badge" style={{ color: sc.color, background: sc.bg }}>{sc.label}</div>
              <p style={{ fontSize: 14, color: "#475569", textAlign: "center", marginBottom: 20 }}>{sc.desc}</p>

              <div className="divider" />
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Score Breakdown</div>
              {result.breakdown.map(row => (
                <div key={row.label} className="breakdown-row">
                  <span style={{ color: "#334155" }}>{row.label}</span>
                  <span className="pts-pill">{row.points} / {row.max}</span>
                </div>
              ))}
              <div className="divider" />
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Enter your details to receive a personalised GOC assessment and next steps from our Germany experts.</p>
              <button className="btn-primary" onClick={() => setStep(5)}>Get My Full Assessment →</button>
            </div>
          );
        })()}

        {/* ── STEP 5: Lead Capture ── */}
        {step === 5 && (
          <div className="card">
            <div className="card-title">Almost There</div>
            <div className="card-sub">Confirm your details to receive your GOC assessment report.</div>

            <div className="field-row">
              <div className="field-label">Name</div>
              <input className="field-input" value={lead.name} onChange={e => setLead(l => ({ ...l, name: e.target.value }))} placeholder="Full Name" />
            </div>
            <div className="field-row">
              <div className="field-label">Email</div>
              <input className="field-input" value={lead.email} onChange={e => setLead(l => ({ ...l, email: e.target.value }))} placeholder="your@email.com" />
            </div>
            <div className="field-row">
              <div className="field-label">WhatsApp / Mobile</div>
              <input className="field-input" value={lead.mobile} onChange={e => setLead(l => ({ ...l, mobile: e.target.value }))} placeholder="+91 00000 00000" />
            </div>

            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 8, lineHeight: 1.6 }}>
              ✓ Your GOC score will be shared with you via email<br />
              ✓ A TerraTern expert will reach out to guide your next steps
            </div>

            <button
              className="btn-primary"
              style={{ marginTop: 16 }}
              disabled={!lead.name || !lead.email || !lead.mobile}
              onClick={() => {
                // CRM push placeholder
                console.log("CRM Lead:", { ...lead, ...parsed, ...questions, score: result?.score, status: result?.status });
                setStep(6);
              }}
            >Submit & Get My Report →</button>
          </div>
        )}

        {/* ── STEP 6: Thank You ── */}
        {step === 6 && result && (() => {
          const sc = statusConfig[result.status];
          return (
            <div className="card">
              <div className="thank-icon">🎉</div>
              <div className="card-title" style={{ textAlign: "center" }}>You're Submitted!</div>
              <div className="card-sub" style={{ textAlign: "center" }}>
                Your GOC score is <strong style={{ color: sc.color }}>{result.score} / {result.total}</strong> — <strong>{sc.label}</strong>.<br />
                Our team will reach out to {lead.email} shortly.
              </div>
              <div className="divider" />
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginBottom: 12 }}>Speak to a Germany Expert Now</div>
              <div className="cta-row">
                <a href="https://wa.me/917094956963" target="_blank" rel="noreferrer" className="cta-whatsapp">
                  💬 Chat on WhatsApp
                </a>
                <a href="tel:+917094956963" className="cta-call">
                  📞 Call Us Now
                </a>
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}
