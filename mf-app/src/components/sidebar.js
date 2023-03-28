'use client';
import ListGroup from "react-bootstrap/ListGroup";
import logo from "../images/cash-in-hand-icon.png";
import login_svg from '../images/profile-circle.svg';

import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Sidebar.module.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";



function Sidebar(props, { session }) {

    const computedClassName = props.showSideNav ? styles.navContainer : styles.navContainerHidden;
    

    return (
        <div className={computedClassName}>
            <div className={styles.navUpper}>
                <div className={styles.navHeading}>
                    <div className={styles.navBrand}>
                        <Image src={logo} alt="Logo"/>
                        <h2>Profile</h2>
                    </div>
                </div>
            </div>
            <div className={styles.listContainer}>
                <div className={styles.sideNavList}>

                    <Link className={styles.topLink} href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <a href="#inbox"> Inbox </a>
                    <a href="#dashboard"> Dashboard </a>
                    <a href="#investers"> Investers </a>
                    <a href="#borrowers"> Borrowers </a>

                </div>
            </div>


            
        </div>
    );


}

export default Sidebar;
