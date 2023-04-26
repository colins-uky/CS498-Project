
import styles from "../styles/Output.module.css";





export default function turtorialOutput({ mode }) {

    switch (mode) {

        case "Tutorial":
            return (
                <div className={styles.outputContainer}>
                    <h1> Hello World!</h1>
                </div>
            );

        case "About":
            return (
                <div className={styles.outputContainer}>

                    <div className={styles.textContainer}>
                        <h3>What We're About.</h3>
                        <p>Here at ModernFunding we envision a world where small businesses don’t need to go to a bank to get funding for projects and startups, and individual investors have easy access to diversifying their portfolios as venture capitalists.</p>
                    </div>

                    <div className={styles.textContainer}>
                        <h3>Mission Statement.</h3>
                        <p>Our mission is to bring individual investors and small businesses in need of capital looking to invest as venture capitalists together, in a way that is more efficient and beneficial than any alternatives, to all parties.</p>
                    </div>

                    <div className={styles.textContainer}>
                        <h3>What We Offer.</h3>
                        <p>As a member of our site, you will be given opportunities to either seek or lend out funds at rates and timetables convenient for both parties.</p>
                        <p> Sign up to create an account with us and get started!</p>
                    </div>
                </div>
            );

        case "What is Modern Funding?":
            return (
                <div className={styles.outputContainer}>
                    
                </div>
            );

        case "News":
            return (
                <div className={styles.outputContainer}>
                    
                </div>
            );

        default:
            return (
                <div className={styles.outputContainer}>
                    <h1> Error... </h1>
                </div>
            );

    }




}