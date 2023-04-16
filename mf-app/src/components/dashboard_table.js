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

    
    const [investments, setInvestments] = useState([]);

  
    useEffect(() => {
        async function fetchInvestments() {
            const { data, error } = await supabase.from('Investments').select('*');
            if (error) {
                console.error('Error fetching investments:', error);
            } 
            else {
                setInvestments(data);
            }
        };

    
        fetchInvestments();

    }, []);
    
    useEffect(() => {
        console.log(investments);
    }, [investments]);

    return (
        <div>
          <h1>Investments List</h1>
          <ul>
            {investments.map((investment) => (
              <li key={investment.id}>{investment.description}</li>
            ))}
          </ul>
        </div>
    );
};
  
export default DashboardTable;