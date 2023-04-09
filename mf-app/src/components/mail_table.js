import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


import styles from "@/styles/Inbox.module.css";






function MailTable() {
    const user = useUser();
    const supabase = useSupabaseClient();



    const [emails, setEmails] = useState([]);


    useEffect(() => {
        async function fetchEmails() {
          try {
            const { data, error } = await supabase
                .from('Messages')
                .select('sender_id, recipient_email, subject, message, time_sent')
                .order('time_sent', { ascending: false })
                .limit(10);
    
            if (error) {
                throw error;
            }
    
            setEmails(data);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchEmails();
    }, []);

    
    return (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              <h3>{email.subject}</h3>
              <p>from: {email.sender_id}</p>
              <p>to: {email.recipient_email}</p>
              <p>{email.message}</p>
              <p>time sent: {email.time_sent}</p>
            </li>
          ))}
        </ul>
      
    );
}

export default MailTable;