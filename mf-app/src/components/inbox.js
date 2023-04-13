import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import React from 'react';
import EmailForm from './email_form';
import MailTable from './mail_table';
import LoginModule from './login';
import Topbar from './topbar';

import styles from '@/styles/Inbox.module.css';



function Inbox() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();
    const didMount = React.useRef(false);

    const [userInfo, setUserInfo] = useState(null);
    

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
        
    }, [user])


    useEffect(() => {
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

        if (user) getUserInfo()
        console.log(user);
    }, [user]);

    /*
    
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

    */


    if (!user) { // UNAUTHORIZED USER, show login panel
        return (
            <LoginModule/>
        )
    }
    else { // USER LOGGED IN, RETURNING USER
        return (
            <div className={styles.inboxContainer}>

                <Topbar
                    pageTitle="Inbox"
                />

                <div className={styles.titleContainer}>
                    
                </div>
    



                <div className={styles.mailContainer}>
                    <button className={styles.button} onClick={handleButtonClick}>New Email</button>
                        {showForm && (
                        <div className={styles.emailFormContainer}>
                            <div className={styles.emailFormHeader}>
                                <span className={styles.closeIcon} onClick={handleButtonClick}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                    />
                                </span>
                            </div>
                            <EmailForm />
                        </div>
                    )}




                    <div className={styles.mailTableContainer}>
                        <MailTable/>
                    </div>
                </div>
            </div>
    
        );
    }
    
    
}
  
export default Inbox;