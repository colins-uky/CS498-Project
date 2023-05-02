import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faInbox } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPaperPlane } from "@fortawesome/free-regular-svg-icons";


import React from 'react';
import EmailForm from './email_form';
import MailTable from './mail_table';
import LoginModule from './login';
import Topbar from './topbar';
import { Email } from './email';

import Button from "react-bootstrap/Button";

import styles from '@/styles/Inbox.module.css';



function Inbox() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();
    
    const [mailData, setMailData] = useState(null);
    const [showForm, setShowForm] = useState(false);
    

    const [userMail, setUserMail] = useState(null);


    const [displayInbox, setDisplayInbox] = useState('incoming-mail');
    

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    useEffect(() => { // Only calls getUserInfo once when user is not null
        if (userMail !== null || !user) {
            return;
        }
        
    }, [user])



    function handleInboxChange(inbox) {
        setDisplayInbox(inbox);
    }

    const handleDataFromChild = (data) => {
        setMailData(data);
    }




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
    



                <div className={styles.mailColumnContainer}>

                    <div className={styles.leftColumn}>
                        <div className={styles.mailMenu}>

                            <button className={styles.button} onClick={handleButtonClick}>New Email</button>


                            <a onClick={() => {handleInboxChange('incoming-mail')}} className={displayInbox === "incoming-mail" ? styles.a1 : ""}>
                                <FontAwesomeIcon
                                    icon={faInbox}
                                />
                                Inbox
                            </a>

                            <a onClick={() => {handleInboxChange('sent-mail')}} className={displayInbox === "sent-mail" ? styles.a1 : ""}>
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                />
                                Sent Mail
                            </a>


                        </div>
                    </div>

                    <div className={styles.middleColumn}>
                        <MailTable
                            inbox={displayInbox}
                            sendMailDataToParent={handleDataFromChild}
                        />
                    </div>

                    <div className={styles.rightColumn}>
                        <Email
                            emailData={mailData}
                        
                        />
                        
                    </div>
                    

                    {showForm && (
                        <div className={styles.emailFormContainer}>
                            <div className={styles.emailFormHeader}>
                                <span className={styles.closeIcon} onClick={handleButtonClick}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                    />
                                </span>
                            </div>
                            <EmailForm 
                                toggleMailForm={handleButtonClick}
                            />
                        </div>
                    )}


                    
                </div>
            </div>
    
        );
    }
    
    
}
  
export default Inbox;