'use client';

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../images/cash-in-hand-icon.png';

import login_svg from '../images/profile-circle.svg';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


import Sidebar from './sidebar';

import React from 'react';

import { useState, useEffect } from 'react';

import styles from '@/styles/Topbar.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';






export default function Topbar() {
    const supabase = useSupabaseClient();
    const user = useUser();
    // Initialize useStates
    const [showSideNav, setShowSideNav] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)

    }, []);

    useEffect(() => {
        console.log(user);
    })




    // function to show or hide the side navbar.
    function handleClick() {
        setShowSideNav(!showSideNav);
    }

    

    if (!user) { // NEW USER PAGE
        return (
            <div className='Navbar'>
                <Navbar className={styles.navContainer} bg="mainColor" variant="dark" expand="md" fixed="top">


                    <div className={styles.logo} onClick={() => {router.push('/')}} >
                        <Image src={logo} alt="logo" />
                        <h3> {isMobile ? 'MF' : 'ModernFunding'} </h3>
                    </div>

                    <Navbar.Toggle id="mobile-collapse-btn" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className={styles.middleNav} id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link className={styles.navLink} href="#home">Home</Nav.Link>
                        
                        <Link href="/login">
                            <Button className={styles.signUpBtn} id="sign-up-btn">Sign In/Up</Button>
                        </Link>

                        
                    </Nav>

                        
                    </Navbar.Collapse>

                    <div className={styles.loginContainer}>
                        <div className={styles.loginButton} onClick={() => handleClick()}>
                            <Image src={login_svg} alt="logo"/>
                        </div>
                    </div>
                </Navbar>


                <Sidebar
                    showSideNav={showSideNav}
                    
                />
            </div>
        );
    }
    else { // USER LOGGED IN 
        return (
            <div className='Navbar'>
                <Navbar className={styles.navContainer} bg="mainColor" variant="dark" expand="md" fixed="top">


                    <div className={styles.logo} onClick={() => {router.push('/')}} >
                        <Image src={logo} alt="logo" />
                        <h3> {isMobile ? 'MF' : 'ModernFunding'} </h3>
                    </div>

                    <Navbar.Toggle id="mobile-collapse-btn" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className={styles.middleNav} id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link className={styles.navLink} href="#home">Home</Nav.Link>
                        
                        <Link href="/">
                            <Button className={styles.signUpBtn} id="sign-up-btn"
                            onClick={() => supabase.auth.signOut()}
                            >Log out</Button>
                        </Link>

                        
                    </Nav>

                        
                    </Navbar.Collapse>

                    <div className={styles.loginContainer}>
                        <div className={styles.loginButton} onClick={() => handleClick()}>
                            <Image src={login_svg} alt="logo"/>
                        </div>
                    </div>
                </Navbar>


                <Sidebar
                    showSideNav={showSideNav}
                    
                />
            </div>
        );
    }
    
}




