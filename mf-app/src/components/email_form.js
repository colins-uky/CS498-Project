import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import styles from '@/styles/Inbox.module.css';

function EmailForm() {

    const recipientRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();

    const user = useUser();
    const supabase = useSupabaseClient();

    async function handleSubmit(event) {
        event.preventDefault();



        console.log('Recipient:', recipientRef.current.value);
        console.log('Subject:', subjectRef.current.value);
        console.log('Message:', messageRef.current.value);
        // You can do further processing with the form data here, such as sending an email




        const { data, error } = await supabase
            .from('Messages')
            .insert([{ 
                recipient_email: recipientRef.current.value,
                subject: subjectRef.current.value,
                message: messageRef.current.value,
                sender_id: user.id
                },
            ])

        if (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>

            <h1 className={styles.composeTitle}> Compose Email </h1>

            <InputGroup className={styles.topInput}>
                <InputGroup.Text id="basic-addon1">To:</InputGroup.Text>
                <Form.Control
                placeholder="example@email.com"
                aria-label="Username"
                aria-describedby="basic-addon1"
                ref={recipientRef}
                />
            </InputGroup>

            <InputGroup className={styles.inputGroup}>

                <Form.Control 
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder='Add a subject' 
                ref={subjectRef}
                />
            </InputGroup>

            <InputGroup className={styles.inputGroup}>
                <Form.Control
                as="textarea" 
                aria-label="With textarea"
                placeholder='Your message here...'
                ref={messageRef} 
                />
            </InputGroup>

            <Button className={styles.emailButton} variant="primary" type="submit">
                Send Email
            </Button>

        </Form>
    );
}

export default EmailForm;