
import styles from "../styles/Output.module.css";

import login_svg from '../images/profile-circle.svg';
import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';


export default function turtorialOutput({ mode }) {

    switch (mode) {

        case "Tutorial":
            return (
                <div className={styles.outputContainer}>


                    <div className={styles.tutorialContainer}>
                        
                        <div className={styles.tutorialModule}>
                            <p>Click on the </p>
                            <Image className={styles.logo} src={login_svg} alt="logo"/>
                            <p>Icon or the  </p>

                            <Link href="/login">
                                <Button className={styles.signUpBtn} id="sign-up-btn">Sign In/Up</Button>
                            </Link>
                            <p>To create an account and get started.  </p>
                        </div>

                        <div className={styles.tutorialModule}>
                            <p>Navigate between pages using  </p>
                            <Image className={styles.logo} src={login_svg} alt="logo"/>

                            <p>and the sidebar.  </p>
                        </div>

                        <div className={styles.tutorialModule}>
                            <p>Change account details on the Settings  </p>
                            <FontAwesomeIcon
                                icon={faGear}
                                size="xl"
                                className={styles.faIcon}
                            />
                            <p>page. </p>
                        </div>

                        


                    </div>

                    
                </div>
            );

        case "About":
            return (
                <div className={styles.outputContainer}>

                    <div className={styles.textContainer}>
                        <h3>What We&apos;re About.</h3>
                        <p>Here at ModernFunding we envision a world where small businesses don&apos;t need to go to a bank to get funding for projects and startups, and individual investors have easy access to diversifying their portfolios as venture capitalists.</p>
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

        case "CS 498":
            return (
                <div className={styles.outputContainer}>
                    <div className={styles.textContainer}>
                        <h3>Information.</h3>
                        <p>This web application and all of its functionality including its back end was built and designed for the CS 498 course project at the University of Kentucky.</p>
                        <p>This application was built using the ReactJS and NextJS frameworks for JavaScript on top of NodeJS. It uses Supabase, a Firebase alternative, as its back end to store user data and inter-user data.</p>
                    </div>

                    <div className={styles.textContainer}>
                        <h3>Disclaimer.</h3>
                        <p>
                            This application was built and designed by computer science students at the University of Kentucky. 
                            We believe that we have followed every protocol to ensure the data entered here will be private and protected, but we cannot be 100% certain.
                        </p>

                        <p>With this information, we ask that you do not enter any real sensitive data, especially usernames & passwords that you use regularly, into any of the forms on the website.</p>

                        <p>With this in mind, we have made it so email addresses do not need to be verified when creating an account, so any pseudo email address will work just fine.</p>

                        <p>We do not think any of your data will be accessed by malicious parties, but it is always best to be safe when browsing the web.</p>
                    </div>
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