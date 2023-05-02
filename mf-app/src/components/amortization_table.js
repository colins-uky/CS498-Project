
import { useState, useEffect } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from "@/styles/Amortization.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';




function AmortizationTable(props) {
    const [showTable, setShowTable] = useState(false);    
    const [rows, setRows] = useState([]);
    const [totals, setTotals] = useState(0);



    const [open, setOpen] = useState(false);

    const togglePopup = () => {
        props.set_show_amort(!props.show_amort);
    };
    
    function bankersRound(n, d=2) {
        let x = n * Math.pow(10, d);
        let r = Math.round(x);

        return r / Math.pow(10, d);
    }



    // Calculates a constant payment for a loan over a period of n payments
    function calculateAmortizationPayment(total_amount, interest_rate, num_payments) {
        // Calculate amortization payment
        let payment = total_amount * (interest_rate * Math.pow((1 + interest_rate), num_payments)) / (Math.pow((1 + interest_rate), num_payments) - 1)

        
        // Check for Null values from missing inputs
        if (payment == Infinity || isNaN(payment) || payment == 0) {
            return null;
        }

        payment = Number((payment).toFixed(2));
        return payment;
    }




    function returnTableRows() {
        

        // Input error checking
        if (props.amount == '' || props.interest_rate == '' || props.num_payments == 0) {
            return [[], []];
        }

        let totalAmount = parseFloat(props.amount);
        let annual_interest_rate = parseFloat(props.interest_rate);
        let num_payments = parseInt(props.num_payments);

        let decimalMonthlyInterestRate = annual_interest_rate / 100 / 12;

        let payment = calculateAmortizationPayment(totalAmount, decimalMonthlyInterestRate, num_payments);

        
        

        const data = [];

        let beginning_balance = totalAmount;
        let total_interest = 0;

        for (let i = 1; i <= num_payments; i++) {

            let interest_payment = beginning_balance * decimalMonthlyInterestRate;
            total_interest += interest_payment;
            let principal_payment = payment - interest_payment;


            let ending_balance = beginning_balance - principal_payment;



            const row = {
                month: i,
                beginningBalance: beginning_balance.toFixed(2),
                principal: principal_payment.toFixed(2),
                interest: interest_payment.toFixed(2),
                endingBalance: ending_balance.toFixed(2),
            };

            data.push(row);

            beginning_balance = ending_balance;
        }

        // Correct rounding errors
        data[data.length - 1].endingBalance = 0;


        // Calculate Totals Data
        let totals = {
            amountSeeking: totalAmount.toFixed(2),
            loanLength: (num_payments / 12),
            totalLoanPrice: (totalAmount + total_interest).toFixed(2),
            totalInterestPaid: total_interest.toFixed(2),
            monthlyPayment: payment.toFixed(2),
            percentPrincipal: ((totalAmount / (totalAmount + total_interest)) * 100).toFixed(1),
            percentInterest: ((total_interest / (totalAmount + total_interest)) * 100).toFixed(1)
        };

        return [data, totals];
    };




    useEffect(() => {
        let [newRows, totals] = returnTableRows();

        setRows(newRows);
        setTotals(totals);

    }, [props]);





    const popupContentStyle = {
        border: '1px solid #ccc',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        width: '90%',
        maxWidth: '800px',
        marginTop: '77px',
        maxHeight: '85vh',
        overflowY: 'auto'
    };



    

    
    return (
        <Popup  
            open={props.show_amort} 
            onClose={togglePopup} 
            modal
            contentStyle={popupContentStyle}
        >
            <div>
                <h1 className={styles.monthlyPayment}>Your monthly payment: &nbsp;${totals.monthlyPayment}</h1>
                
                <div className={styles.border}/>

                <h3 className={styles.tableTitle}>Loan Amortization</h3>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Beginning Balance</th>
                                <th>Principal Payment</th>
                                <th>Interest Payment</th>
                                <th>Ending Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.month}</td>
                                    <td>${row.beginningBalance}</td>
                                    <td>${row.principal}</td>
                                    <td>${row.interest}</td>
                                    <td>${row.endingBalance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className={styles.border2}/>

                <h3 className={styles.tableTitle}>Loan Totals</h3>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount Seeking</th>
                                <th>Loan Term</th>
                                <th>Total Loan Price</th>
                                <th>Total Interest Paid</th>
                                <th>Monthly Payment</th>
                                <th>% Principal</th>
                                <th>% Interest</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${totals.amountSeeking}</td>
                                <td>{totals.loanLength} years</td>
                                <td>${totals.totalLoanPrice}</td>
                                <td>${totals.totalInterestPaid}</td>
                                <td>${totals.monthlyPayment}</td>
                                <td>{totals.percentPrincipal}%</td>
                                <td>{totals.percentInterest}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <span className={styles.closeIcon} onClick={togglePopup}>
                    <FontAwesomeIcon
                        icon={faXmark}
                    />
                </span>
            </div>
        </Popup>
    );



    
}

export default AmortizationTable;