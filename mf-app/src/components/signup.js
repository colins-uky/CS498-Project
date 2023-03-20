import React from "react";
import { FaEye } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Link from 'next/link';
import { supabase } from './../lib/supabaseClient';
import { useRouter } from 'next/router';



import styles from '@/styles/SignUp.module.css';




function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const usernameRef = useRef();
    const phoneRef = useRef();
    const dobRef = useRef();
    const accountTypeRef = useRef();



    
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);



    async function handleSubmit(event) {
      event.preventDefault();

      /*
      console.log({
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          phoneNum: phoneRef.current.value,
          DOB: dobRef.current.value,
          accountType: accountTypeRef.current.value

      });
      */

      const firstName = firstNameRef.current.value;
      const lastName = lastNameRef.current.value;
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      const phoneNum = phoneRef.current.value;
      const DOB = dobRef.current.value;
      const accountType = accountTypeRef.current.value;

      
      
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });


      //Sign up failed... push to failed sign up page/popup
      if (error) {
        console.error('Error creating account: ', error.message);

        router.push({
          pathname: '/',
          state: data.user
        });

        return;
      }


      // Account creation successful
      // Add user to Users Table here with unverified account, 
      // change to verified once they verify email

      
      const { data2, error2 } = await supabase
        .from('Users')
        .insert([
          { email: email, 
            username: username,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNum,
            dob: DOB,
            account_type: accountType,
            account_status: "unverified" },
      ])

      if (error2) {
        console.error('Error inserting data into DB: ', error2.message);
      }


      router.push({
          pathname: '/',
          query: data.user
      }, '/');
    }

    function togglePasswordVisibility() {
      setShowPassword(!showPassword);
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


            {/*            Email            */}
            <div className={styles.inputGroup}>

              <label htmlFor="email">Email*</label>
              <input name="email"
                type="text" 
                id="email" 
                ref={emailRef}
                placeholder="example@email.com"
                required
                />

            </div>
            {/*            Password            */}
            <div className={styles.doubleInput}>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password*</label>
                <input name="password"
                  type={showPassword ? 'text' : 'password'} 
                  id="password" ref={passwordRef}
                  required
                  placeholder="Password"
                  />
                <i onClick={togglePasswordVisibility} ><FaEye size={25}/></i>
              </div>

              {/*      Confirm   Password     */}
              <div className={styles.inputGroup} id="end">
                <label htmlFor="confirm-password">Confirm Password*</label>
                <input name="confirm-password"
                  type={showPassword ? 'text' : 'password'} 
                  id="confirm-password" ref={confirmPasswordRef}
                  required
                  placeholder="Confirm Password"
                  />
                <i onClick={togglePasswordVisibility} ><FaEye size={25}/></i>
              </div>
            </div>
            
            {/*         Phone Number        */}
            <div className={styles.inputGroup}>

              <label htmlFor="phone">Phone #</label>
              <input name="phone"
                type="text" 
                id="username" 
                ref={phoneRef}
                placeholder="(808)-080-8080"
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