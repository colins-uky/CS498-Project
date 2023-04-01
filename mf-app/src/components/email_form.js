import { useState } from 'react';

import styles from "@/styles/Inbox.module.css"

function EmailForm() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send email logic goes here
        
    };

    return (
        <div className={styles.container}>

        <h1 className={styles.title}>Compose Email</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
            <label htmlFor="recipient" className={styles.label}>
                To:
            </label>
            <input
                type="email"
                id="recipient"
                className={styles.input}
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                required
            />
            </div>

            <div className={styles.inputGroup}>
            <label htmlFor="subject" className={styles.label}>
                Subject:
            </label>
            <input
                type="text"
                id="subject"
                className={styles.input}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
            />
            </div>

            <div className={styles.inputGroup}>
            <label htmlFor="message" className={styles.label}>
                Message:
            </label>
            <textarea
                id="message"
                className={styles.textarea}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
            />
            </div>

            <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
                Send Message
            </button>
            <button type="button" className={styles.button} onClick={() => {}}>
                Cancel
            </button>
            </div>
        </form>
        </div>
    );
    };

export default EmailForm;