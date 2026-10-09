import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCheck, FiPlus, FiRotateCcw } from "react-icons/fi";
import styles from "./styles.module.css";

const seedCards = [
    { id: "1", front: "What does CSS stand for?", back: "Cascading Style Sheets" },
    { id: "2", front: "Which array method creates a new array from matching items?", back: "filter()" },
    { id: "3", front: "What is the value of a promise before it settles?", back: "Pending" },
    { id: "4", front: "What does the DOM represent?", back: "The document structure as objects that scripts can read and change" },
];
const readCards = () => { try { return JSON.parse(localStorage.getItem("recall-cards")) || seedCards; } catch { return seedCards; } };
const FlashcardStudyTool = () => {
    const [cards, setCards] = useState(readCards); const [known, setKnown] = useState(() => { try { return JSON.parse(localStorage.getItem("recall-known")) || []; } catch { return []; } });
    const [index, setIndex] = useState(0); const [flipped, setFlipped] = useState(false); const [front, setFront] = useState(""); const [back, setBack] = useState("");
    useEffect(() => localStorage.setItem("recall-cards", JSON.stringify(cards)), [cards]);
    useEffect(() => localStorage.setItem("recall-known", JSON.stringify(known)), [known]);
    const card = cards[index];
    const move = (step) => { setIndex((current) => (current + step + cards.length) % cards.length); setFlipped(false); };
    const markKnown = () => { if (!card) return; setKnown((items) => [...new Set([...items, card.id])]); move(1); };
    const addCard = (event) => { event.preventDefault(); if (!front.trim() || !back.trim()) return; setCards((items) => [...items, { id: crypto.randomUUID(), front: front.trim(), back: back.trim() }]); setFront(""); setBack(""); };
    return <section className={styles.flashcardStudyTool} id="dashboard">
        <header className={styles.header}><div><p className={styles.label}>DAILY RECALL / FRONTEND BASICS</p><h1>Make it stick.</h1><p>One card at a time. Bring the answer to mind before you turn it over.</p></div><div className={styles.streak}><span>✳</span><strong>{known.length.toString().padStart(2, "0")}</strong><small>cards confident</small></div></header>
        <div className={styles.studyLayout} id="workspace">
            <aside className={styles.deckRail}><div className={styles.deckTitle}><span>01</span><div><b>Web foundations</b><small>{cards.length} cards · personal deck</small></div></div><p className={styles.railLabel}>TODAY’S REVIEW</p><div className={styles.reviewStat}><strong>{Math.max(cards.length - known.length, 0)}</strong><span>left to practice</span></div><div className={styles.progress}><span style={{ width: (cards.length ? Math.min(100, known.length / cards.length * 100) : 0) + "%" }} /></div><p className={styles.progressText}>{known.length} of {cards.length} marked confident</p><div className={styles.tip}><b>Try this</b><p>Say the answer out loud before you flip the card.</p></div></aside>
            <div className={styles.practice}>
                <div className={styles.cardMeta}><span>QUESTION {String(index + 1).padStart(2, "0")} <i>/ {String(cards.length).padStart(2, "0")}</i></span><button type="button" onClick={() => setFlipped((value) => !value)}><FiRotateCcw /> Flip card</button></div>
                {card ? <button type="button" className={styles.flashcard} onClick={() => setFlipped((value) => !value)} aria-label="Flip flashcard">
                    <span className={styles.cardCorner}>{flipped ? "ANSWER" : "PROMPT"}</span><span className={styles.cardText}>{flipped ? card.back : card.front}</span><span className={styles.tapHint}>{flipped ? "Click to see prompt" : "Click to reveal answer"}</span>
                </button> : <div className={styles.flashcard}><span className={styles.cardText}>Add your first card below</span></div>}
                <div className={styles.cardControls}><button type="button" onClick={() => move(-1)} aria-label="Previous card"><FiArrowLeft /></button><div>{cards.length ? index + 1 : 0}<span> / {cards.length}</span></div><button type="button" onClick={() => move(1)} aria-label="Next card"><FiArrowRight /></button></div>
                <div className={styles.ratings}><button type="button" className={styles.reviewButton} onClick={() => move(1)}>Need another look</button><button type="button" className={styles.knownButton} onClick={markKnown}><FiCheck /> I know this</button></div>
            </div>
        </div>
        <form className={styles.addCard} onSubmit={addCard}><div className={styles.addHeading}><FiPlus /><div><b>Add a flashcard</b><span>Build your own review deck</span></div></div><label>Prompt<input value={front} onChange={(event) => setFront(event.target.value)} placeholder="Question or term" required /></label><label>Answer<input value={back} onChange={(event) => setBack(event.target.value)} placeholder="Definition or explanation" required /></label><button type="submit">Add card <FiPlus /></button></form>
    </section>;
};
export default FlashcardStudyTool;
