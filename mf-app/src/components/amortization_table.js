import React, { useState } from 'react';


function AmortizationTable(props) {
    const [showTable, setShowTable] = useState(false);
    const [tableData, setTableData] = useState([]);



    let amount = props.amount;
    let interest_rate = props.interest_rate;
    let num_payments = props.num_payments;


    let decimalMonthlyInterestRate = interest_rate / 100 / 12;
    let payment = amount * (decimalMonthlyInterestRate * Math.pow((1 + decimalMonthlyInterestRate), num_payments)) / (Math.pow((1 + decimalMonthlyInterestRate), num_payments) - 1)

    payment = Number((payment).toFixed(2));

    
    if (payment) { 
        // payment is not null
        // show table
        //setShowTable(true);
        console.log(payment)
        



    }

    
    function bankersRound(n, d=2) {
        let x = n * Math.pow(10, d);
        let r = Math.round(x);
        let br = Math.abs(x) % 1 === 0.5 ? (r % 2 === 0 ? r : r-1) : r;

        return br / Math.pow(10, d);
    }







    const handleGenerateTable = (event) => {
        event.preventDefault();

        let totalAmount = props.amount;
        let annual_interest_rate = props.interest_rate;
        let monthly_interest_rate = annual_interest_rate / 12;
        let num_payments = props.num_payments;

        let payment = finance.AM(principal, annual_interest_rate, num_payments, 1);

        const data = [];

        for (let i = 1; i <= loanTerm; i++) {
            const interest = remainingBalance * interestRate;
            const principal = monthlyPayment - interest;
            remainingBalance = remainingBalance - principal;

            totalInterestPaid += interest;

            const row = {
                month: i,
                monthlyPayment: monthlyPayment.toFixed(2),
                principal: principal.toFixed(2),
                interest: interest.toFixed(2),
                remainingBalance: remainingBalance.toFixed(2),
            };

            data.push(row);
        }

        setTableData(data);

    };

  return (
    <div>
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Monthly Payment</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>${row.monthlyPayment}</td>
                <td>${row.principal}</td>
                <td>${row.interest}</td>
                <td>${row.remainingBalance}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td></td>
              <td></td>
              <td>${totalInterestPaid.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AmortizationTable;