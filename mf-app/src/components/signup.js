import React from "react";
import { FaEye } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { supabase } from './../lib/supabaseClient';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from 'next/router';
import { Auth } from "@supabase/auth-ui-react"


import styles from '@/styles/SignUp.module.css';




function SignUp() {
    const user = useUser();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();
    const accountTypeRef = useRef();


    const supabase = useSupabaseClient();
    
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

       
      
        const { error2 } = await supabase
            .from('profiles')
            .upsert([
            {
              id: user.id,
              username: usernameRef.current.value,
              first_name: firstNameRef.current.value,
              last_name: lastNameRef.current.value,
              phone_number: phoneRef.current.value,
              dob: dobRef.current.value,
              account_type: accountTypeRef.current.value,
              email: user.email
            }
        ])

        if (error2) {
            console.error('Error inserting data into DB: ', error2.message);
        }

        localStorage.setItem('user', JSON.stringify(user));
        router.push({
            pathname: '/',
        });
    }

    return (


      <div className={styles.loginContainer}>

        <div className={styles.signUpPanel}>

          <div className={styles.titleContainer}>
            <h2 className={styles.title} onClick={() => {router.push('/');}} > ModernFunding </h2>
          </div>

          <form className={styles.formContainer} onSubmit={handleSubmit}>

            <div className={styles.greeting}>
              <h2 id="welcome"> Welcome new user! </h2>
              <h2> Get started with your account. </h2>
            </div>
            
            <div className={styles.inputContainer}>
            
            <div className={styles.doubleInput}>
              
              <div className={styles.inputGroup}>
                {/*          First Name         */}

                <label htmlFor="First">First Name*</label>
                <input name="First"
                  type="text" 
                  id="username" 
                  ref={firstNameRef}
                  placeholder="John"
                  required
                  />
              </div>

              {/*          Last Name         */}
              <div className={styles.inputGroup} id="end" >
                <label htmlFor="Last">Last Name*</label>
                <input name="Last"
                  type="text" 
                  id="username" 
                  ref={lastNameRef}
                  placeholder="Doe"
                  required
                  />

              </div>

            </div>
            

            {/*           Username          */}
            <div className={styles.inputGroup}>

              <label htmlFor="username">Username*</label>
              <input name="username"
                type="text" 
                id="email" 
                ref={usernameRef}
                placeholder="JonDoe226"
                required
                />

            </div>
            
            {/*         Phone Number        */}
            <div className={styles.inputGroup}>

              <label htmlFor="phone">Phone #</label>
              <input name="phone"
                type="text" 
                id="username" 
                ref={phoneRef}
                placeholder="(808)-080-8080"
                pattern="^\d{10}$"
                />

            </div>

            <div className={styles.doubleInput}>
              {/*            D.O.B            */}
              <div className={styles.inputGroup}>

                <label htmlFor="DOB">Date of birth*</label>
                <input name="DOB"
                  type="date" 
                  id="username" 
                  ref={dobRef}
                  placeholder="Example@email.com"
                  required
                  />

              </div>


              {/*        Account Type        */}
              <div className={styles.inputGroup} id="end">

                <label htmlFor="account-type">Account Type*</label>
                <select id="account-type" name="account-type" ref={accountTypeRef}>
                  <option value="investor">Investor</option>
                  <option value="borrower">Borrower</option>
                  <option value="both">Both</option>
                  <option value="admin">Admin</option>
                </select>

              </div>
            </div>

            </div>
            <Link href="/login" className={styles.loginRedirect}>Already have an account?</Link>
            <button id="new-account" type="submit">Create Account</button>

            
          </form>

          
        </div>
      </div>
    );
}

export default SignUp;