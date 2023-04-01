import { useState } from 'react';

import styles from "@/styles/Dashboard.module.css";

function DashboardForm() {
    const [formValues, setFormValues] = useState({
        amount: '',
        apr: '',
        description: '',
        loanLength: '',
        paymentFrequency: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Do something with the form values
        console.log(formValues);
    };

    const { amount, apr, description, loanLength, paymentFrequency } = formValues;

    return (
        <form onSubmit={handleSubmit} className={styles.blank}>
            <div className={styles.field}>
                <label htmlFor="amount">Amount:</label>
                <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleInputChange}
                className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="apr">APR:</label>
                <input
                type="number"
                id="apr"
                name="apr"
                value={apr}
                onChange={handleInputChange}
                className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Description:</label>
                <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleInputChange}
                className={styles.textarea}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="loanLength">Length of loan (in years):</label>
                <input
                type="number"
                id="loanLength"
                name="loanLength"
                value={loanLength}
                onChange={handleInputChange}
                className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="paymentFrequency">Payment frequency:</label>
                <select
                id="paymentFrequency"
                name="paymentFrequency"
                value={paymentFrequency}
                onChange={handleInputChange}
                className={styles.select}
                >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                </select>
            </div>
            
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    );
}

export default DashboardForm;