import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Button from "react-bootstrap/Button";
import AmortizationTable from './amortization_table';


import styles from '@/styles/Dashboard.module.css';




export default function DashboardTable(props) {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();

    

    

    
    const [investments, setInvestments] = useState([]);
    const [showAmort, setShowAmort] = useState(false);
    const [amortData, setAmortData] = useState({
        amount: "0",
        apr: "0",
        numPayments: 0,
    });

  
    useEffect(() => {
        async function fetchInvestments() {

            if (props.all) {
                const { data, error } = await supabase.from('Investments').select('*');
                if (error) {
                    console.error('Error fetching investments:', error);
                } 
                else {
                    setInvestments(data);
                }
            }
            else if (props.owner_id) {
                const { data, error } = await supabase.from('Investments').select('*').eq('owner_id', props.owner_id);
                if (error) {
                    console.error('Error fetching investments:', error);
                } 
                else {
                    setInvestments(data);
                }
            }


            
        };

    
        fetchInvestments();

    }, []);
    


    function handleShowAmort(investment) {
        console.log(investment);


        setAmortData({
            amount: investment.amount_seeking,
            apr: investment.interest_rate,
            numPayments: investment.num_payments
        });

        


        setShowAmort(!showAmort);

    }

    async function handleDeleteInvestment(investment) {

        const confirmDeletion = window.confirm('Are you sure you want to delete this listing?');
        if (!confirmDeletion) {
            return; // If the user doesn't confirm, exit the function
        }

        const { data, error } = await supabase.from('Investments').delete().eq('id', investment.id);
        if (error) {
            console.error('Error deleting investments:', error);
        } 
        else {
            console.log('deletion successful!');
            setInvestments(investments.filter(item => item.id !== investment.id)); // Update the state after deletion
        }
    }

    if (props.owner_id) { // owner_id supplied, add a delete option to the table
        return (
            <>
                <h1 className={styles.dashTableTitle}>{props.tableTitle}</h1>
                <table className={styles.dashTable}>
                    
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Amount Seeking</th>
                    <th>Interest Rate</th>
                    <th>Loan Length</th>
                    <th>Description</th>
                    <th>Amortization</th>
                    <th>Delete Listing</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment) => (
                    <tr key={investment.id}>
                        <td>{investment.title}</td>
                        <td>${investment.amount_seeking}</td>
                        <td>{investment.interest_rate}%</td>
                        <td>{investment.num_payments / 12} years</td>
                        <td>{investment.description}</td>
                        <td>
                            <Button onClick={() => handleShowAmort(investment)} className={styles.showAmortButton}>
                                View
                            </Button>
                        </td>
                        <td>
                            <Button onClick={() => handleDeleteInvestment(investment)} className={styles.trashButton}>
                                <FontAwesomeIcon icon={faTrashCan} size='lg'/>
                            </Button>
                            
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

                


                {showAmort && 
                    
                    <AmortizationTable
                        amount={amortData.amount}
                        interest_rate={amortData.apr}
                        num_payments={amortData.numPayments}
                        show_amort={showAmort}
                        set_show_amort={setShowAmort}
                    />
                }
            </>
        );
    }
    else {
        return (
            <>
                <h1 className={styles.dashTableTitle}>{props.tableTitle}</h1>
                <table className={styles.dashTable}>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Amount Seeking</th>
                    <th>Interest Rate</th>
                    <th>Loan Length</th>
                    <th>Description</th>
                    <th>Amortization</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investment) => (
                    <tr key={investment.id}>
                        <td>{investment.title}</td>
                        <td>${investment.amount_seeking}</td>
                        <td>{investment.interest_rate}%</td>
                        <td>{investment.num_payments / 12} years</td>
                        <td>{investment.description}</td>
                        <td>
                            <Button onClick={() => handleShowAmort(investment)} className={styles.showAmortButton}>
                                View
                            </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>




                {showAmort && 
                    
                    <AmortizationTable
                        amount={amortData.amount}
                        interest_rate={amortData.apr}
                        num_payments={amortData.numPayments}
                        show_amort={showAmort}
                        set_show_amort={setShowAmort}
                    />
                }
            </>
        );
    }

    
};
  
