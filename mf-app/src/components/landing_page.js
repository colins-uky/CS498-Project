

import { useState, useEffect } from "react";

import styles from "../styles/LandingPage.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTwitter, FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";

import Tutorial from "./tutorial";

export default function LandingPage() {




    return (

        <div className={styles.landingContainer}>
            
            <div className={styles.tutorialContainer}>
                <Tutorial />
            </div>
            



            <div className={styles.contactContainer}>
                <div className={styles.socialDiv}>
                    <FaTwitter
                        className={styles.socialIcon} 
                        size="lg"
                    />
                </div>
                <div className={styles.socialDiv}>
                    <FaInstagram
                        className={styles.socialIcon} 
                        size="lg"
                    />
                </div>
                <div className={styles.socialDiv}>
                    <FaFacebookSquare
                        className={styles.socialIcon} 
                        size="lg"
                    />
                </div>
                <div className={styles.socialDiv}>
                    <FaLinkedin
                        className={styles.socialIcon} 
                        size="lg"
                    />
                </div>
            </div>
        </div>
    );
};