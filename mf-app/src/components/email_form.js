import { useState } from 'react';

function EmailForm() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Code to send email goes here
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            To:
            <input
            type="email"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            required
            />
        </label>
        <label>
            Subject:
            <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
            />
        </label>
        <label>
            Body:
            <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            />
        </label>
        <button type="submit">Send</button>
        </form>
  );
}

export default EmailForm;