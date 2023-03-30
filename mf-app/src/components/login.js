import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import styles from '@/styles/Login.module.css';


function Login() {
    const router = useRouter();
    const user = useUser();
    const supabase = useSupabaseClient();
  
    useEffect(() => {
      if (user) {
        router.replace('/');
      }
    }, [user]);


    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session.user) {
                const isReturningUser = session.user.user_metadata.isReturningUser;

                if (isReturningUser) {
                    router.push('/') // Redirect returning users to the dashboard page
                } 
                else {
                    router.push('/sign-up') // Redirect new users to the onboarding page
                }
            } 

            return () => {
                authListener.unsubscribe()
            }
        })
    });
  
    if (!user)
      return (
        <div className={styles.loginContainer}>
            <div className={styles.loginPanel}>
              <Auth
                supabaseClient={supabase}
                providers={['github']}
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