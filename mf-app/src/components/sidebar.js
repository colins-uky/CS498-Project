'use client';
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../images/cash-in-hand-icon.png";
import login_svg from '../images/profile-circle.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBorderAll, faHouse, faRightFromBracket, faRightToBracket, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";


import Link from 'next/link';
import Image from 'next/image';

import { useState } from "react";

import styles from '@/styles/Sidebar.module.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaBorderAll } from "react-icons/fa";



function Sidebar(props) {
    const user = useUser();
    const supabase = useSupabaseClient();

    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {setIsHovering(true);}
    
    const handleMouseLeave = () => {setIsHovering(false);}

    const computedClassName = props.showSideNav ? styles.navContainer : styles.navContainerHidden;
    const userInfo = props.userInfo;

    

    if (userInfo !== null) { // RETURNING USER
        return (
            <div className={computedClassName}>
                <div className={styles.navUpper}>
                    <div className={styles.navHeading}>
                        <div className={styles.navBrand}>
                            <Image src={logo} alt="Logo"/>
                            <h1>{userInfo.first_name}</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.listContainer}>
                    <div className={styles.sideNavList}>
    
                        <Link className={styles.topLink} href="/">
                            <FontAwesomeIcon
                                icon={faHouse}
                                size="lg"
                            />
                            Home
                        </Link>

                        <Link href="/inbox">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                size="lg"
                            />

                            Inbox 
                        </Link>

                        <Link href="/dashboard">
                            <FontAwesomeIcon
                                icon={faBorderAll}
                                size="lg"
                            />
                            Dashboard 
                        </Link>

                        <Link href="/loan-calculator">
                            <FontAwesomeIcon
                                icon={faCalculator}
                                size="lg"
                            />
                            Loan Calculator
                        </Link>

                        <Link href="/settings"> 
                            <FontAwesomeIcon
                                id="cog-icon"
                                className={styles.cogIcon} 
                                icon={faGear}
                                size="lg"
                            />
                            Settings 
                        </Link>

                        <Link href="/" onClick={() => {supabase.auth.signOut(); localStorage.removeItem('user');}}>
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                size="lg"
                            />
                            Log out
                        </Link>
                        
                    </div>
                </div>
    
    
                
            </div>
        );

    }

    // NEW USER
    return (
        <div className={computedClassName}>
            <div className={styles.navUpper}>
                <div className={styles.navHeading}>
                    <div className={styles.navBrand}>
                        <Image src={logo} alt="Logo"/>
                        <h1>Profile</h1>
                    </div>
                </div>
            </div>
            <div className={styles.listContainer}>
                <div className={styles.sideNavList}>

                    <Link className={styles.topLink} href="/login">
                        <FontAwesomeIcon
                            icon={faRightToBracket}
                            size="lg"
                        />
                        Log in
                    </Link>

                    <Link className={styles.topLink} href="/">
                        <FontAwesomeIcon
                            icon={faHouse}
                            size="lg"
                        />
                        Home
                    </Link>

                    <Link href="/loan-calculator">
                        <FontAwesomeIcon
                            icon={faCalculator}
                            size="lg"
                        />
                        Loan Calculator
                    </Link>

                    <Link href="/inbox">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            size="lg"
                        />

                        Inbox 
                    </Link>

                    <Link href="/dashboard">
                        <FontAwesomeIcon
                            icon={faBorderAll}
                            size="lg"
                        />
                        Dashboard 
                    </Link>

                    <Link href="/settings"> 
                        <FontAwesomeIcon
                            id="cog-icon"
                            className={styles.cogIcon} 
                            icon={faGear}
                            size="lg"
                        />
                        Settings 
                    </Link>

                </div>
            </div>


            
        </div>
    );


    


}

export default Sidebar;
