# Project Plan & Delegation Analysis

> **Course Exercise:** AI Fluency — Project Planning & Delegation  
> **Prepared for:** Jehosue Biscarra (`AITrainingField`)  
> **Estimated Execution Time:** ~60 minutes  
> **Saved for Future Course Modules:** Description, Discernment, and Diligence  

---

## Step 1: Chosen Project

**Project Title:** *Zero-Leakage Machine Learning: A Practical 1-Hour Starter Guide, Working Code Comparison, and Pre-Training Audit Checklist*

- **Course Category:** **Learning Project** (*"Develop a tutorial or guide for a process you understand well"*) + **Communication Project** (*"Explain a complex topic clearly to a general technical audience"*)
- **Why This Project Fits the Criteria:**
  - **Substantial & Multi-Step:** Spans six distinct types of work—audience scoping, technical taxonomy/fact-checking, reproducible Python experimentation, technical writing + diagramming, reusable checklist synthesis, and adversarial quality assurance.
  - **Manageable in ~1 Hour:** Tightly scoped to the **top 3 data leakage traps** in tabular ML, one compact `scikit-learn` before/after script, one visual flow diagram, and a 10-item checklist (~1,200–1,500 words total).
  - **Genuinely Meaningful:** Connects directly to your personal ML sandbox (`AITrainingField`, where Zero Data Leakage is Rule #1), produces a reusable artifact for your Obsidian Second Brain or portfolio, and creates an ideal testbed for practicing **Description**, **Discernment**, and **Diligence** later in the course.

---

## Step 2: Project Vision & Goals

### Core Vision Statement
Create a concise, jargon-light, hands-on starter guide that teaches CS students and early ML practitioners **how to spot, prove, and prevent the 3 most common forms of data leakage in tabular machine learning**, backed by a real runnable `scikit-learn` before/after comparison and a printable 1-page audit checklist.

### Key Vision-Setting Decisions (Clarifying Trade-Offs)
*These reflect the key questions and assumptions resolved during vision planning:*

| Question Explored | Decision Made | Rationale |
|---|---|---|
| **Who is the target reader?** | CS/IT students and beginners who know basic Python/`pandas` and have trained a model or two, not PhD researchers. | Keeps explanations intuitive and focused on practical coding mistakes rather than heavy math proofs. |
| **How broad should the scope be?** | Strictly **3 leakage types**: (1) preprocessing before splitting, (2) target/feature leakage from post-outcome columns, and (3) random splitting on time-ordered data. | Attempting to cover NLP, vision, and complex nested CV would blow past the 1-hour budget and dilute clarity. |
| **Illustrative pseudo-code or real executed numbers?** | **Real executed Python (`scikit-learn`) output** on a small, deterministic dataset. | Proves the metric inflation honestly and gives a concrete artifact to verify during **Discernment** & **Diligence**. |
| **Final format?** | One self-contained Markdown guide (with a Mermaid diagram + 10-point audit checklist) usable in GitHub, a blog post, or Obsidian. | Fast to draft, easy to version-control, zero formatting overhead. |

### What Success Looks Like
1. **Clarity:** A reader who has never heard of "data leakage" can explain *why* fitting a scaler before `train_test_split` cheats evaluation within 5 minutes of reading.
2. **Evidence Over Theory:** The runnable code snippet reproduces a measurable, verified gap between a leaky pipeline and a proper `scikit-learn` `Pipeline`/`ColumnTransformer` setup.
3. **Actionability:** The final 10-point **Zero-Leakage Audit Checklist** can be applied immediately to any tabular ML notebook or script before training.
4. **Honest Scope:** The entire deliverable can realistically be completed and verified in **~60 minutes** without sacrificing accuracy.

### Why This Project Is Valuable & Meaningful
- Reinforces a foundational ML habit that separates toy notebooks from trustworthy engineering.
- Produces a lasting study & portfolio asset aligned directly with `AITrainingField`.
- Intentionally creates rich failure modes (subtle AI code mistakes, fabricated benchmarks, vague prose) that make future **Description**, **Discernment**, and **Diligence** exercises genuinely worthwhile.

---

## Step 3: Task Breakdown & Delegation Analysis

Each task below is evaluated using three delegation modes:
- **Human-Led (Agency):** Human owns core decisions, judgment, execution, or accountability; AI acts only as a sounding board.
- **Collaborative (Augmentation):** Human and AI iterate back-and-forth, combining human context/judgment with AI speed/breadth.
- **AI-Assisted (Automation with Oversight):** AI generates the heavy first draft or formatting; human curates, verifies, and signs off.

---

### Task 1: Scope, Audience & Learning Objectives *(8 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Empathy for beginner confusion points, pedagogical prioritization, scope discipline; AI brainstorming and structured constraint checking.
- **Uniquely Human Strengths:** Knowing *your* personal intent, the real gaps CS students run into, and deciding what to cut so the guide stays sharp instead of encyclopedic.
- **Where AI Helps Well:** Stress-testing learning objectives, asking probing questions to uncover unstated assumptions, and flagging scope creep against the 60-minute limit.
- **Highest-Impact Collaboration:** You state your rough audience and goals; AI challenges vague objectives ("Are readers expected to know cross-validation already?") and proposes a crisp 3-outcome outline that you accept or trim.
- **Assumption Challenged:** *Initial assumption:* "Scoping is quick—just ask AI for an outline." *Insight:* Letting AI pick the scope usually creates a generic textbook outline covering 10 topics shallowly. Human prioritization upfront prevents wasted effort downstream.
- **Delegation Decision:** **Human-Led (with AI Sparring)**

---

### Task 2: Technical Taxonomy & Leakage Trap Verification *(8 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Accurate `scikit-learn` mechanics (`train_test_split`, `Pipeline`, `ColumnTransformer`, `TimeSeriesSplit`), awareness of subtle traps (e.g., feature selection or SMOTE before CV folds).
- **Uniquely Human Strengths:** Deciding which edge cases matter for beginners vs. distract them, and spotting when an AI explanation sounds fluent but subtly glosses over a real statistical flaw.
- **Where AI Helps Well:** Rapidly mapping each trap into a consistent structure (*What it looks like → Why it inflates metrics → Real-world failure mode → Exact fix*) and surfacing blind spots (like leaking via target encoding or duplicate IDs).
- **Highest-Impact Collaboration:** AI builds a structured 3-trap comparison table; you interrogate each row ("Does this actually apply to tree models too, or mostly distance/linear models?") to refine accuracy before writing prose.
- **Assumption Challenged:** *Initial assumption:* "StandardScaler leakage always causes massive metric inflation." *Insight:* On clean, large i.i.d. datasets, scaling leakage alone can look tiny—whereas **imputation/feature-selection leakage on high-dimensional or small data** or **target/temporal leakage** shows a dramatic, unmistakable gap. Catching this now ensures Task 3's demo actually works!
- **Delegation Decision:** **Collaborative (Augmentation)**

---

### Task 3: Build & Run the "Leaky vs. Leak-Free" Code Demo *(14 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Clean Python + `scikit-learn` pipeline engineering, deterministic seeding, local code execution, interpreting classification/regression metrics honestly.
- **Uniquely Human Strengths:** Running the code in a real environment, verifying that no *accidental secondary leakage* sneaks into the "fixed" example, and confirming the demonstrated effect is real rather than cherry-picked or invented.
- **Where AI Helps Well:** Writing clean boilerplate for both the leaky and `Pipeline`-wrapped versions quickly, suggesting a small self-contained dataset/synthetic setup that clearly illustrates the gap without external downloads.
- **Highest-Impact Collaboration:** AI drafts the side-by-side script based on your exact constraints → you run it locally, inspect real stdout metrics, and feed actual numbers back into the guide. If the gap is unclear or noisy, you and AI iterate on the demo design transparently.
- **Assumption Challenged:** *Initial assumption:* "AI can just write the example and include expected output." *Insight:* Never trust AI-guessed metrics. Running the script locally is a non-negotiable human checkpoint—otherwise you risk publishing fabricated numbers.
- **Delegation Decision:** **Collaborative (AI Drafts → Human Executes & Verifies)**

---

### Task 4: Draft the Guide Narrative & Visual Data-Flow Diagram *(15 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Clear instructional writing, intuitive real-world analogies (e.g., "studying with the answer key before an exam"), Markdown formatting, and Mermaid flowchart syntax.
- **Uniquely Human Strengths:** Authentic voice, deciding which analogy actually clicks, trimming robotic filler, and ensuring the narrative flow builds intuition rather than dumping wall-of-text theory.
- **Where AI Helps Well:** Turning the approved outline + verified code/metrics into a cohesive first draft rapidly, generating alternative analogies on demand, and authoring the Mermaid diagram comparing leaky vs. safe data flows.
- **Highest-Impact Collaboration:** You provide the locked outline, tone rules, and *real* Task 3 numbers → AI generates Section-by-Section drafts + Mermaid diagram → you edit actively for clarity, conciseness, and authentic voice.
- **Assumption Challenged:** *Initial assumption:* "Human writes from scratch, AI only proofreads." *Insight:* In a 60-minute project, collaborating with AI on structural drafting and diagram syntax frees human time for higher-value explanation tweaks and technical verification.
- **Delegation Decision:** **Collaborative (AI-Accelerated Drafting, Human Editorial Direction)**

---

### Task 5: Synthesize the 1-Page "Zero-Leakage Audit Checklist" *(7 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Information synthesis, distilling narrative concepts into crisp binary yes/no checks grouped by workflow stage (*Data Split → Preprocessing → Feature Engineering → Validation*).
- **Uniquely Human Strengths:** Curation—cutting redundant checklist items so it stays genuinely scannable (max 10 items) and aligned with real project habits (`AITrainingField` guardrails).
- **Where AI Helps Well:** Extracting all rules already covered in Tasks 2–4 into a clean, parallel-phrased Markdown checklist in seconds without missing details.
- **Highest-Impact Collaboration:** AI drafts a 12–15 item candidate list directly from the guide; you prune, merge, and sharpen it to the 10 sharpest "must-check" gates.
- **Delegation Decision:** **AI-Assisted (Automation with Human Curation)**

---

### Task 6: Adversarial Technical Review, Readability Audit & Final Polish *(8 min)*
- **Skills, Knowledge & AI Capabilities Needed:** Critical reading, technical skepticism, code-to-prose consistency checking, transparent AI-use documentation.
- **Uniquely Human Strengths:** Final accountability—confirming every claim is defensible, every metric matches actual code output, the tone matches your standard, and taking genuine ownership of the published work.
- **Where AI Helps Well:** Acting as a simulated "skeptical peer reviewer" or "confused beginner" to flag jargon, logical jumps, formatting glitches, or inconsistencies between the code and explanation.
- **Highest-Impact Collaboration:** You ask AI to critique the completed guide from two personas (*Strict ML Engineer* + *First-Time Student*), then **you** decide which critiques are valid, apply fixes, and add a brief transparency note on how AI assisted.
- **Assumption Challenged:** *Initial assumption:* "If AI helped write it, AI reviewing it is pointless." *Insight:* Prompting AI with a *different role and explicit adversarial criteria* catches formatting slips and unexplained jargon surprisingly well—**provided** the human remains the final judge and verifies facts independently.
- **Delegation Decision:** **Human-Led Verification (with Adversarial AI Critique)**

---

## Master Project Plan & Delegation Matrix

| # | Major Task | Deliverable | Est. Time | Delegation Mode | Human Owns | AI Owns | Key Risk to Watch |
|---|---|---|---|---|---|---|---|
| 1 | Scope, Audience & Objectives | 1-paragraph vision + 3 learning goals + scope limits | 8 min | Human-Led (+ AI Sparring) | Audience, priorities, scope cuts | Probing questions, scope stress-test | Scope creep beyond 60 min |
| 2 | Leakage Trap Taxonomy | Structured 3-trap breakdown & fixes table | 8 min | Collaborative (Augmentation) | Relevance judgment, technical sanity check | Structured matrix, edge-case surfacing | Over-simplifying subtle traps (e.g., scaling vs. feature-selection leakage) |
| 3 | "Leaky vs. Leak-Free" Code Demo | Runnable `scikit-learn` script + verified output | 14 min | Collaborative (AI Draft → Human Verify) | Running code, verifying real metrics & zero secondary leakage | Boilerplate script, synthetic/demo setup | Fabricated/unverified numbers or weak demo signal |
| 4 | Guide Narrative & Visual Diagram | ~1,200–1,500 word guide + Mermaid flow diagram | 15 min | Collaborative (Augmentation) | Voice, clarity edits, analogy selection | First-draft prose, Mermaid syntax, formatting | Generic AI tone or mismatched code/prose |
| 5 | Zero-Leakage Audit Checklist | 10-point pre-training Markdown checklist | 7 min | AI-Assisted (Automation + Curation) | Pruning to top 10 actionable gates | Rapid extraction & parallel phrasing | Bloated or vague checklist items |
| 6 | Adversarial QA & Final Polish | Verified, publication-ready guide + AI transparency note | 8 min | Human-Led (+ AI Critique) | Final accuracy check, ownership, sign-off | Dual-persona critique (*Engineer* + *Beginner*) | Rubber-stamping AI text without independent verification |
| | **Total** | **Complete Starter Guide + Demo + Checklist** | **60 min** | **Balanced 4D Mix** | **Direction, Execution, Judgment, Accountability** | **Sparring, Scaffolding, Drafting, Critique** | |

---

## Ready-Made Hooks for Upcoming Course Modules

When you return to this saved plan later in the course, each task maps directly to the remaining **4D skills**:
- **Description:** Practice writing crisp, structured prompts for Tasks 3, 4, and 5 (specifying exact audience level, `scikit-learn` APIs, non-goals, output format, and concrete examples).
- **Discernment:** Evaluate Task 2's technical claims and Task 3's code for hidden leakage, overstated effects, or generic filler in Task 4's draft.
- **Diligence:** Execute Task 3's code yourself to verify every number, check official `scikit-learn` documentation for API accuracy, and include a clear note explaining how you used AI while taking full responsibility for the final guide.

---

## Reflection

### 1. What insights emerged from this planning conversation?
- **Delegation isn't binary ("human does X, AI does Y").** Almost every high-value task in a knowledge/technical project falls into *Augmentation*—the real skill is defining the **exact handoff boundary** inside each task (e.g., AI drafts the script and Mermaid diagram, while the human runs the code and verifies the numbers).
- **Challenging assumptions early prevents wasted work.** Testing the assumption that "scaling before splitting always shows dramatic metric inflation" caught a subtle technical trap during planning rather than halfway through coding.
- **Time-boxing forces sharper delegation.** With a strict 60-minute budget, spending human effort on direction, real execution, and editorial judgment—while delegating structural scaffolding and checklist extraction to AI—maximizes quality per minute.

### 2. What do you anticipate will be the most challenging aspect of this delegation plan?
- **Resisting passive acceptance ("automation bias") during Tasks 3 and 4.** When AI generates fluent technical prose and clean-looking Python code quickly, it is tempting to skim instead of deeply testing whether the code truly isolates the leakage mechanism or whether a beginner would actually follow the explanation.
- **Maintaining a tight 60-minute pace during iteration.** Back-and-forth refinement in collaborative tasks can easily expand if prompts aren't specific enough upfront—making strong **Description** skills critical to keep the plan on schedule.

### 3. What additional information or skills might help you delegate more effectively to AI?
- **Stronger *Description* habits:** Providing explicit context upfront (target persona, exact `scikit-learn` version/APIs, length caps, and explicit "do not do" guardrails like *"never invent metric outputs"*).
- **Faster *Discernment* verification checklists:** Knowing in advance *what* to inspect in AI outputs (e.g., checking train/test split order, verifying deterministic random seeds, testing Mermaid syntax) so review takes minutes rather than guesswork.
- **Domain awareness of where LLMs struggle:** Recognizing that AI excels at pattern recall, structure, and analogies, while remaining weak at verifying empirical runtime results or judging what personally matters to a specific reader without guidance.
