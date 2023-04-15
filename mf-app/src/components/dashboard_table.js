import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


import styles from '@/styles/Dashboard.module.css';


function DashboardTable({ investments }) {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();

    
    

  
    if (investments) {
        return (
            <div className={styles.tableContainer}>
                <div className="dashboard-list">
                  {investments.map((investment) => (
                  <div key={investment.id} className="investments">
                      <div className="investment-amount">{investment.amount}</div>
                      <div className="email-apr">{investment.apr}</div>
                      <div className="email-description">{investment.description}</div>
                      <div className="investment-loanLength">{investment.loanLength}</div>
                      <div className="email-paymentFrequency">{investment.paymentFrequency}</div>
                      <div className="email-description">{investment.description}</div>
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