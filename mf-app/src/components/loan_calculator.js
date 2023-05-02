import { useRef, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';


import AmortizationTable from "./amortization_table";


import styles from "@/styles/Calculator.module.css";


export default function LoanCalculator() {
    const amountSeekingRef = useRef(null);
    const aprRef = useRef(null);
    const loanLengthRef = useRef(null);

    const [showAmort, setShowAmort] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const amountSeeking = parseFloat(amountSeekingRef.current.value);
        const apr = parseFloat(aprRef.current.value);
        const loanLengthInYears = parseInt(loanLengthRef.current.value);

        if (
            isNaN(amountSeeking) ||
            isNaN(apr) ||
            isNaN(loanLengthInYears)
        ) {
            alert('Please enter valid input values.');
            return;
        }

        setShowAmort(true);
    };

    return (
        <Container className={styles.container}>
            <h1>
                <FontAwesomeIcon
                    icon={faCalculator}
                    size="lg"
                />
                &nbsp;&nbsp;Loan Calculator&nbsp;&nbsp;
                <FontAwesomeIcon
                    icon={faCalculator}
                    size="lg"
                />
                
                
                
            </h1>

            <Form onSubmit={handleSubmit} className={styles.calculatorForm}>
                <Form.Group className={styles.inputGroup}>
                <Form.Label>Amount Seeking:</Form.Label>
                <Form.Control
                    type="number"
                    ref={amountSeekingRef}
                    step="0.01"
                    min="1"
                    max="1000000000"
                    required
                />
                </Form.Group>

                <div className={styles.doubleInput}>
                    <Form.Group className={styles.inputGroup}>
                    <Form.Label>APR:</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="100"
                        ref={aprRef}
                        required
                    />
                    </Form.Group>
                    <Form.Group className={styles.inputGroup} id="end">
                    <Form.Label>Loan Length (years):</Form.Label>
                    <Form.Control
                        type="number"
                        ref={loanLengthRef}
                        step="0.25"
                        min="1"
                        max="100"
                        required
                    />
                    </Form.Group>
                </div>
                <Button className={styles.calcButton} type="submit">Calculate Loan Payment</Button>
            </Form>



            {showAmort && 
                
                <AmortizationTable
                    amount={amountSeekingRef.current.value}
                    interest_rate={aprRef.current.value}
                    num_payments={loanLengthRef.current.value * 12}
                    show_amort={showAmort}
                    set_show_amort={setShowAmort}
                />
            }





        </Container>
    );
}
