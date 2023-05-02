import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import AmortizationTable from './amortization_table';

import styles from '@/styles/Dashboard.module.css';

function DashboardForm(props) {

    

    const titleRef = useRef();
    const amountRef = useRef();
    const interestRef = useRef();
    const loanLengthRef = useRef();
    const messageRef = useRef();

    const [showAmort, setShowAmort] = useState(false);

    const user = useUser();
    const supabase = useSupabaseClient();


    const toggleAmortTable = () => {
        setShowAmort(!showAmort);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const numPayments = loanLengthRef.current.value * 12;


        

        
        const { data, error } = await supabase
            .from('Investments')
            .insert([{ 
                owner_id: user.id,
                title: titleRef.current.value,
                amount_seeking: amountRef.current.value,
                interest_rate: interestRef.current.value,
                num_payments: numPayments,
                description: messageRef.current.value
                },
            ])

        if (error) {
            console.log(error);
        }
        
        




        // Close the dashboard form after submit logic
        props.toggleDashForm();
    };


    return (
        <div>
            <Form  className={styles.formContainer} onSubmit={handleSubmit}>

                <h1 className={styles.composeTitle}> Create Listing </h1>
                <Form.Label>Title</Form.Label>
                <InputGroup className={styles.inputGroup}>
                    <Form.Control
                        placeholder="Loan title"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        ref={titleRef}
                        required
                    />
                </InputGroup>


                <Form.Label>Amount & Interest</Form.Label>
                <div className={styles.doubleInput}>

                    <InputGroup className={styles.inputGroup}>

                        <Form.Control 
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            placeholder='Amount seeking' 
                            ref={amountRef}
                            type='number'
                            step='0.01'
                            min="0"
                            max="1000000"
                            required

                        />
                    </InputGroup>


                    
                    <InputGroup className={styles.inputGroup} id='end'>
                        
                        <Form.Control 
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            placeholder='Annual interest rate' 
                            ref={interestRef}
                            type='number'
                            step='0.01'
                            min="0.01"
                            max="100"
                            required
                            
                        />
                    </InputGroup>


                </div>

                <Form.Label>Loan Length (Years)</Form.Label>
                <div className={styles.doubleInput}>
                    
                    <InputGroup className={styles.inputGroup} id='single'>

                        <Form.Control 
                            id="basic-url"
                            aria-describedby="basic-addon3"
                            placeholder='Loan length' 
                            ref={loanLengthRef}
                            type='number'
                            step="0.25"
                            min="1"
                            max="50"
                            required
                        />

                    </InputGroup>




                </div>



                <Form.Label>Other information...   Why do you want/need this loan?</Form.Label>
                <InputGroup className={styles.inputGroup}>
                    
                    <Form.Control
                        as="textarea" 
                        aria-label="With textarea"
                        placeholder='Your message here...'
                        ref={messageRef} 
                        required
                    />
                </InputGroup>

                <Button className={styles.emailButton} variant="primary" type="submit">
                    Create Listing
                </Button>

                <Button className={styles.amortButton} onClick={toggleAmortTable} variant="primary">
                    View Amortization Table
                </Button>

                {showAmort && 
                
                    <AmortizationTable
                        amount={amountRef.current.value}
                        interest_rate={interestRef.current.value}
                        num_payments={loanLengthRef.current.value * 12}
                        show_amort={showAmort}
                        set_show_amort={setShowAmort}
                    />
                }   
                

            </Form>




            
        </div>
    );
}

export default DashboardForm;