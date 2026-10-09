import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader";
import SiteFooter from "./components/siteFooter";
import BackToTop from "./components/backToTop";
import FlashcardStudyTool from "./components/flashcardStudyTool";

const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className={styles["app-shell"]} id="top">
            <SiteHeader title="Recall" mark="R" navItems={[["Study deck", "#dashboard"], ["Your cards", "#workspace"]]} repoUrl="https://github.com/a2rp/flashcard-study-tool" />
            <main className={styles.pageContent}>
                <FlashcardStudyTool />
            </main>
            <SiteFooter repoUrl="https://github.com/a2rp/flashcard-study-tool" />
            <BackToTop visible={showBackToTop} />
        </div>
    );
};

export default App;
