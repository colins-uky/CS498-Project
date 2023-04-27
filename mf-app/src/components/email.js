


import styles from "@/styles/Email.module.css";


export function Email(props) {


    let mailData = props.emailData;

    if (mailData) {
        return (
            <div className={styles.emailContainer}>
                <h1 className={styles.senderName}>{mailData.sender_email}</h1>
                <p className={styles.recipient}>To: {mailData.recipient_email}</p>
                
                
                <div className={styles.fRow}>
                    <h2 className={styles.emailSubject}>{mailData.subject}</h2>
    
                    <div className={styles.timeColumn}>
                        <p>{mailData.time_sent[0]}</p>
                        <p>{mailData.time_sent[1]}</p>
                    </div>
                    
                </div>

                <div className={styles.messageContainer}>
                    <p className={styles.emailMessage}>{mailData.message}</p>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={styles.noSelection}>
                <div className={styles.overlay}>
                    <h1>Select an item to read</h1>
                    <h4>Nothing is selected</h4>
                    <h5>(Try sending an email to yourself.)</h5>
                </div>
            </div>
        );
    }
    
}