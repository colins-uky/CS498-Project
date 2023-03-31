'use client';
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../images/cash-in-hand-icon.png";
import login_svg from '../images/profile-circle.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import Link from 'next/link';
import Image from 'next/image';

import { useState } from "react";

import styles from '@/styles/Sidebar.module.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";



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
    
                        <Link className={styles.topLink} href="/">Home</Link>
                        <Link href="/inbox"> Inbox </Link>
                        <Link href="/dashboard"> Dashboard </Link>
                        <a id="settings" href="#settings"> 
                            Settings&nbsp;&nbsp;
                            <FontAwesomeIcon
                                id="cog-icon"
                                className={styles.cogIcon} 
                                icon={faCog}
                                size="lg"
                                />
                        </a>
                        <Link href="/" onClick={() => {supabase.auth.signOut(); localStorage.removeItem('user');}}>Log out</Link>
                        
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
                    <Link href="/login">Login</Link>
                    <Link className={styles.topLink} href="/">Home</Link>
                    <Link href="/"> Inbox </Link>
                    <Link href="/dashboard"> Dashboard </Link>
                    <a id="settings" href="#settings"> 
                        Settings&nbsp;&nbsp;
                        <FontAwesomeIcon
                            id="cog-icon"
                            className={styles.cogIcon} 
                            icon={faCog}
                            size="lg"
                            />
                    </a>
                    
                </div>
            </div>


            
        </div>
    );


    


}

export default Sidebar;
