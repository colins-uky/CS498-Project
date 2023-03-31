import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


import styles from '@/styles/Dashboard.module.css';


function DashboardTable() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();

    


    // Push un-Authorized Users off the page
    useEffect(() => {
        if (user === null) {
            router.push('/');
        }
    }, [user]);
  
    
  
    return (
      <div className={styles.tableContainer}>
        
      </div>
    );
  };
  
  export default DashboardTable;