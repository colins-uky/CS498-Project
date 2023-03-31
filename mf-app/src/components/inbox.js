import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import React from 'react';
import EmailForm from './email_form';

import styles from '@/styles/Inbox.module.css';


function Inbox() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();
    const didMount = React.useRef(false);
    

    const [showForm, setShowForm] = useState(false);
    

    const [userMail, setUserMail] = useState(null);
    
    const [sentMail, setSentMail] = useState(null);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    useEffect(() => { // Only calls getUserInfo once when user is not null
        if (userMail !== null || !user) {
            return;
        }
        getIncomingMessages();
        getOutgoingMessages();
    }, [user])


    // Push un-Authorized Users off the page
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            
            if (user === null) {
                //router.push('/');
                console.log(user);
            }
        }

        console.log(user);
    }, [user]);


    async function getIncomingMessages() {
        let { data, error } = await supabase
            .from('Messages')
            .select('*')

            // Filters
            .filter('recipient_id', 'eq', user.id)
            .single();
        if (error) {
            console.log(error);
        }
        console.log(data);
        setUserMail(data);
    }

    async function getOutgoingMessages() {
        let { data, error } = await supabase
            .from('Messages')
            .select('*')

            // Filters
            .filter('recipient_id', 'eq', user.id)
            .single();
        if (error) {
            console.log(error);
        }
        console.log(data);
        setUserMail(data);
    }

    async function createMessage(sender_id, recipient_email, subject, message) {
        let { data, error } = await supabase
            .from('Messages')
            .insert([
                {   subject: subject, 
                    message: message,
                    sender_id: sender_id,
                    recipient_id: ""
                },
            ])

        if (error) {
            console.log(error);
        }
        console.log(data);
        setUserMail(data);
    }

    
  
    if (userMail === null) {
        return (
            <div className={styles.inboxContainer}>
                <div className={styles.titleContainer}>
                    <h1>Mail</h1>
                    <ul className={styles.unorderdList}>
                        <li>You have no mail! </li>
                    </ul>
                </div>



                <button onClick={handleButtonClick}>New Email</button>
                    {showForm && (
                    <div className={styles.emailFormContainer}>
                        <div className={styles.emailFormHeader}>
                            <span className={styles.closeIcon} onClick={handleButtonClick}>
                                &times;
                            </span>
                        </div>
                        <EmailForm />
                    </div>
                )}

            </div>

        );
    }
  
    return (
      <div className={styles.inboxContainer}>
        <div>
            <h1>Mail</h1>
            <ul>
                {userMail.map((email) => (
                <li key={email.id}>
                    <div>From: {email.sender}</div>
                    <div>To: {email.recipient}</div>
                    <div>Subject: {email.subject}</div>
                    <div>Body: {email.body}</div>
                    <div>Timestamp: {formatDate(email.timestamp)}</div>
                </li>
                ))}
            </ul>
        </div>
      </div>
    );
  };
  
  export default Inbox;