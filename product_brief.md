# Product Brief — Job Analyzer

## A · Problem Statement

Job seekers in competitive markets spend hours applying to positions without understanding their actual fit. They rely on vague intuition or surface-level keyword matching, leading to:
- Low interview conversion rates (often <5% for unsolicited applications)
- Wasted time on underqualified positions
- Missed opportunities in roles they could have secured with proper preparation
- Anxiety and uncertainty throughout the job search process

**Who experiences this?** Career changers, fresh graduates, and mid-level professionals seeking new roles — particularly those applying to positions that require a mix of technical and soft skills.

**Consequence:** Each failed application costs 2-4 hours of effort (resume tailoring, cover letter writing, follow-ups) and compounds emotional discouragement. Candidates often receive no feedback, leaving them unable to improve their approach.

---

## B · Solution

Job Analyzer is a web application that takes a candidate's background and a job description, then produces a comprehensive structured report with:

1. **Match Scoring** — Quantified fit scores (0-100) across skills, experience, and education dimensions
2. **Gap Diagnosis** — Specific skill gaps and experience mismatches with concrete examples
3. **Work Simulation** — A realistic "day in the life" description for the target role
4. **Improvement Plan** — Prioritized learning resources and actionable 3-day/1-month plans
5. **Job Strategy** — Direct job matches, related transition paths, and application tips

**User Flow:**
1. User pastes their background into a text area (resume highlights, experience summary)
2. User pastes a job description into another text area
3. User clicks "Analyze" → sees animated progress indicator
4. Report renders with collapsible sections

**Connection to problem:** Instead of guessing fit, users get AI-generated evidence showing exactly why they match or don't match, what to improve, and which other roles to target.

---

## C · Target Users

**Primary user:**
- Role: Mid-career professionals, career changers, or advanced job seekers
- Industry: Technology, consulting, and knowledge work sectors
- Behavior: Actively applying to 5+ positions simultaneously
- Pain trigger: Low interview callback rates despite qualifications

**Secondary user:**
- Fresh graduates using it to validate career direction before committing applications
- HR recruiters using it to quickly assess candidate fit for internal positions

**Usage scenario:**
Sarah, a software engineer with 3 years of experience at a fintech startup, is considering applying to a Senior Full-Stack Engineer role at a larger company. She copies her LinkedIn summary and the job description into Job Analyzer. Within 30 seconds, she sees she's a 72% match — the gap analysis reveals she lacks distributed systems experience mentioned in the JD, and the work simulation helps her understand the team's oncall rotation. She uses the improvement plan to identify a specific Coursera course and adjusts her application strategy accordingly.

---

## D · Core Value Proposition

**One-sentence value proposition:**
For job seekers who want to apply strategically, Job Analyzer provides AI-powered fit assessment and actionable improvement guidance, so that users can focus their effort on positions where they have genuine competitive advantage and know exactly what to work on — unlike generic resume scanners or intuition-based applications.

**Brief explanation:**
Traditional job application is a black box — candidates throw applications into the void and hope. Job Analyzer demystifies the process by showing the specific evidence behind every match or gap. Unlike ATS keyword scanners that just check boxes, we explain the *why* behind each assessment. The improvement plan is not generic career advice but tailored to the exact skills the target role demands.

---

## E · AI & Technical Approach

**AI / model type(s) used:**
- MiniMax M2.7 LLM (latest generation of their chat model)
- PDF parsing via pdf.js for resume/Doc upload (future feature)
- Text embedding for semantic similarity (future enhancement)

**Role of AI in the product:**
The LLM serves as the core reasoning engine. Given a candidate's free-text background and a job description, it:
1. Extracts structured profiles (skills, experience, education) from unstructured text
2. Computes semantic match scores (not just keyword overlap)
3. Generates realistic work simulations based on domain knowledge
4. Curates specific learning resources relevant to identified gaps

**Why AI is the right approach here:**
The problem requires deep semantic understanding of both a person's career trajectory and a job's隐性 requirements. Rule-based systems would fail because:
- Job descriptions often omit crucial context (team culture, unspoken priorities)
- Candidate backgrounds are diverse and non-standardized
- Fit assessment requires weighing multiple dimensions holistically

An LLM can make nuanced judgments like "your experience leading a 3-person team suggests readiness for this role's people management component, though the scale differs."

---

## F · Key Assumptions

**Assumption 1:**
We assume that MiniMax M2.7 can reliably extract structured information from free-form candidate backgrounds, because the model has strong instruction-following capabilities. This has been partially validated — internal tests show 85%+ accuracy on profile extraction for well-structured input, but degrades with highly irregular resume formats.

**Assumption 2:**
We assume that the "match score" (0-100) provides actionable signal rather than false precision — users will interpret 75% as meaningfully different from 65% and adjust behavior accordingly. We have not yet validated this with user research. The score should be treated as a relative benchmark, not an absolute predictor.

**Assumption 3:**
We assume users have a reasonable threshold of effort tolerance (5-10 minutes of input preparation) and will not be frustrated by the current single-session workflow. If users expect one-click LinkedIn import, the current text-paste approach may create friction. We plan to add LinkedIn URL parsing in v2.

---

## G · Differentiation

**Current alternatives or common approaches:**
- **Resume ATS scanners** (e.g., Jobscan): Check keyword overlap, provide no context on why or how to improve
- **Career coaching**: Expert but expensive ($150-500/session), inaccessible for volume applications
- **LinkedIn's "Open to Work"**: Passive matching with no personalized insights
- **Generic AI resume builders**: Focus on formatting/tailoring, not strategic fit assessment

**What makes our approach different:**
Job Analyzer is the only solution that combines **automated fit scoring + gap diagnosis + work simulation + improvement planning** in a single free, instant session. We don't just tell users if they match — we explain the specific evidence and give them a concrete path forward. The Monetization layer (job search links, learning resource referrals) keeps the product free while creating sustainable revenue.
