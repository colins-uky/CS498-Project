import { useState, useEffect } from 'react';

import TutorialOutput from "./tutorial_output";

import styles from '../styles/Tutorial.module.css';

export default function Tutorial() {


    const [tutorialMode, setTutorialMode] = useState("About");


    function handleTutClick(mode) {

        setTutorialMode(mode);
    }

    useEffect(() => {
        
    }, [tutorialMode])

    return (
        <div className={styles.tutorialContainer}>
            
            
            <div className={styles.tutorialMenu}>
                <h1 className={styles.greeting}>{tutorialMode}</h1>
                
                <div className={styles.border}/>

                <div className={styles.outputContainer}>
                    <TutorialOutput mode={tutorialMode} />
                </div>


                <div className={styles.border2}/>


                <div className={styles.tutorialRow}>
                    <div className={tutorialMode === "About" ? styles.rowItemA : styles.rowItem} onClick={() => {handleTutClick("About")}}>
                        <h3>About</h3>
                    </div>

                    <div className={tutorialMode === "Tutorial" ? styles.rowItemA : styles.rowItem} onClick={() => {handleTutClick("Tutorial")}}>
                        <h3>Tutorial</h3>
                    </div>

                    <div className={tutorialMode === "CS 498" ? styles.rowItemA : styles.rowItem} onClick={() => {handleTutClick("CS 498")}}>
                        <h3>CS 498</h3>
                    </div>

                    

                </div>
            </div>

        </div>
    );
};
