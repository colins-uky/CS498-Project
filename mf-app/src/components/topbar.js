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
    const [showSideNav, setShowSideNav] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [userInfo, setUserInfo] = useState(null);




    const router = useRouter();

    useEffect(() => { // Handles smaller screen widths
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize)

    }, []);

    useEffect(() => { // Only calls getUserInfo once when user is not null
        if (userInfo !== null || !user) {
            return;
        }
        console.log(user);
        getUserInfo();
    }, [user])

    useEffect(() => {
        if (userInfo == null) {
            return;
        } 
        console.log('User Info :');
        console.log(userInfo);
        setPersonalizedPage(userInfo);
    }, [userInfo])


    async function getUserInfo() {
        let { data, error } = await supabase
            .from('profiles')
            .select('*')

            // Filters
            .filter('id', 'eq', user.id)
            .single();
        if (error) {
            console.log(error);
        }

        setUserInfo(data);
    }

    // function to show or hide the side navbar.
    function handleClick() {
        setShowSideNav(!showSideNav);
    }


    function setPersonalizedPage(userInfo) {
        
        document.getElementById('username').innerText = userInfo.username;
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

                    <div className={styles.containerLeft}>
                        


                        <div className={styles.loginButton} onClick={() => handleClick()}>
                            <Image src={login_svg} alt="logo"/>
                        </div>
                    </div>
                </Navbar>


                <Sidebar
                    showSideNav={showSideNav}
                    userInfo={null}
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
                            onClick={() => {supabase.auth.signOut(); localStorage.removeItem('user');}}
                            >Log out</Button>
                        </Link>

                        
                    </Nav>

                        
                    </Navbar.Collapse>

                    <div className={styles.containerLeft}>
                        <div className={styles.username}>
                            <h2 id='username'></h2>
                        </div>



                        <div className={styles.loginButton} onClick={() => handleClick()}>
                            <Image src={login_svg} alt="logo"/>
                        </div>
                    </div>
                </Navbar>


                <Sidebar
                    showSideNav={showSideNav}
                    userInfo={userInfo}
                />
            </div>
        );
    }
    
}




