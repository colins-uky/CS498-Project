import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import styles from "@/styles/Inbox.module.css";






function MailTable(props) {
    const user = useUser();
    const supabase = useSupabaseClient();



    const [emails, setEmails] = useState([]);




    async function handleDeleteMail(email) {


        const confirmDeletion = window.confirm('Are you sure you want to delete this email?');
        if (!confirmDeletion) {
            return; // If the user doesn't confirm, exit the function
        }

        const { data, error } = await supabase
                .from('Messages')
                .delete()
                .eq('id', email.id);

        if (error) {
            console.error('Error deleting email:', error);
        } 
        else {
            setEmails(emails.filter(item => item.id !== email.id)); // Update the state after deletion
        }
    }


    function handleShowEmail(email) {
        props.sendMailDataToParent(email);
    }




    // Long useEffect only fires on page mount
    useEffect(() => {
        async function fetchEmails(filter) {
            let mail = [];
            try {
                
                if (filter == "incoming-mail") {
                    const { data, error } = await supabase
                        .from('Messages')
                        .select('id, sender_email, recipient_email, subject, message, time_sent')
                        .eq('recipient_email', user.email)
                        .order('time_sent', { ascending: false })
                        .limit(10);
        
                    if (error) {
                        throw error;
                    }
                    mail = data;
                }
                else if (filter == "sent-mail") {
                    const { data, error } = await supabase
                        .from('Messages')
                        .select('id, sender_email, recipient_email, subject, message, time_sent')
                        .eq('sender_email', user.email)
                        .order('time_sent', { ascending: false })
                        .limit(10);
        
                    if (error) {
                        throw error;
                    }
                    mail = data;
                }
                else {
                    return;
                }
                

                mail.forEach(item => {
                    let date = new Date(item["time_sent"])
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let seconds = date.getSeconds();

                    let formattedDate = '';
                    let formattedTime = '';


                    
                    if (minutes < 10) {
                        minutes = minutes.toString().padStart(2, "0");
                    }
                    if (seconds < 10) {
                        seconds = seconds.toString().padStart(2, "0");
                    }

                    // Modulate hours to 12 hour clock
                    if (hours > 12) {
                        hours = hours % 12;
                        formattedDate = `${month}/${day}/${year}`;
                        formattedTime = `${hours}:${minutes}:${seconds} PM`;
                    }
                    else {
                        formattedDate = `${month}/${day}/${year}`;
                        formattedTime = `${hours}:${minutes}:${seconds} AM`;
                    }

                    
                    
                    item["time_sent"] = [formattedDate, formattedTime];
                });
                    
            
                setEmails(mail);
            } 
            catch (error) {
                console.error(error);
            }
        }
    
        fetchEmails(props.inbox);
    }, [props.inbox]);

    
    return (
        <div className={styles.mailPreviewContainer}>
            {emails.map((email) => (
                <div key={email.id} className={styles.mailPreviewColumn}>
                    <div className={styles.mailDiv} onClick={() => {handleShowEmail(email)}}>

                        <h1>{email.sender_email}</h1>

                        <div className={styles.mailDivRow}>
                            <h2 className={styles.noWrap}>{email.subject}</h2>
                            
                            <div className={styles.timeColumn}>
                                <p>{email.time_sent[0]}</p>
                                <p>{email.time_sent[1]}</p>
                            </div>
                        </div>


                        <p className={styles.noWrap}>{email.message}</p>

                       
                    
                    </div>

                    <div className={styles.deleteDiv} onClick={() => {handleDeleteMail(email)}}>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className={styles.deleteIcon}
                            size='xl'
                        />
                    </div>
                    


                </div>
            ))}






        </div>
    );
}

export default MailTable;