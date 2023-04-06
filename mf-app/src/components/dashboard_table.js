import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Finance } from 'financejs';


import styles from '@/styles/Dashboard.module.css';


function DashboardTable({ investments }) {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();

    
    const finance = new Finance();

    let payment = finance.AM(330000, 5.27, 360, 1);

    console.log(payment);


    // Push un-Authorized Users off the page
    useEffect(() => {
        if (user === null) {
            //router.push('/');
        }
    }, [user]);
  
    if (investments) {
        return (
            <div className={styles.tableContainer}>
                <div className="dashboard-list">
                  {investments.map((option) => (
                  <div key={option.id} className="options">
                      <div className="option-amount">{option.amount}</div>
                      <div className="email-apr">{option.apr}</div>
                      <div className="email-description">{option.description}</div>
                      <div className="option-loanLength">{option.loanLength}</div>
                      <div className="email-paymentFrequency">{option.paymentFrequency}</div>
                      <div className="email-description">{option.description}</div>
                </div>
              ))}
            </div>
            </div>
        );
    }

    else {
        return (
            <div className={styles.tableContainer}>
                <h1>Error Loading...</h1>
            </div>
        );
    }
};
  
  export default DashboardTable;