import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


import styles from '@/styles/Login.module.css';


function Login() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();


    async function fetchAccountType() {
        const { data, error } = await supabase
            .from('profiles')
            .select('account_type')
            .eq('id', user.id)
            .maybeSingle();

        if (error) {
            console.log(error);
        }
        
        if (data.account_type) { // account type not null, they've already signed up
            localStorage.setItem('user', JSON.stringify(user));
            router.push('/') // Redirect returning users to the home page
        } 
        else {
            router.push('/sign-up') // Redirect new users to the onboarding page
        }
    }



    useEffect(() => {

        if (user) {
            fetchAccountType();
        } 
    }, [user]);
  
    if (!user)
      return (
        <div className={styles.loginContainer}>
            <div className={styles.loginPanel}>
              <Auth
                supabaseClient={supabase}
                providers={[]}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#404040',
                        brandAccent: '#52525b'
                      }
                    }
                  }
                }}
                theme="dark"
              />
            </div>
        </div>
      );
  
    return (
      <div className="m-6">
      </div>
    );
  };
  
  export default Login;