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
                .select('id, sender_email, recipient_email, subject, message, time_sent')
                .eq('recipient_email', user.email)
                .order('time_sent', { ascending: false })
                .limit(10);
    
            if (error) {
                throw error;
            }
            console.log(data)

            data.forEach(item => {
                let date = new Date(item["time_sent"])
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hours = date.getHours() - 4;
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

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
                    formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} PM`;
                }
                else {
                    formattedTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds} AM`;
                }

                
                
                item["time_sent"] = formattedTime;
            });
                
            
            setEmails(data);
          } catch (error) {
            console.error(error);
          }
        }
    
        fetchEmails();
    }, []);

    
    return (
        <table className={styles.mailTable}>
            <thead>
                <tr>
                    <th> From </th>
                    <th> Subject </th>
                    <th> Body </th>
                    <th> Time Sent</th>
                </tr>
            </thead>
            
            <tbody>
                {emails.map((email) => (
                    <tr key={email.id}>
                        <td>{email.sender_email}</td>
                        <td>{email.subject}</td>
                        <td>{email.message}</td>
                        <td>{email.time_sent}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    );
}

export default MailTable;