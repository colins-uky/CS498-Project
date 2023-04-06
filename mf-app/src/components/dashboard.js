import React from 'react';
import Topbar from './topbar';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import LoginModule from './login';
import DashboardForm from './dashboard_form';
import DashboardTable from './dashboard_table';

import styles from "@/styles/Dashboard.module.css";

function DashboardModule() {
    const user = useUser();
    const supabase = useSupabaseClient();

    const [showDashForm, setShowDashForm] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const handleShowDashForm = () => {
        setShowDashForm(true);
    };
    
    const handleCloseDashForm = () => {
        setShowDashForm(false);
    };

    useEffect(() => {
        if (user && userInfo === null) {
            getUserInfo();
        }
    }, [user])

    async function getUserInfo() {
        let { data, error } = await supabase
            .from('profiles')
            .select('*')

            // Filters
            .filter('id', 'eq', user.id)
            .single();
        if (error) {
            console.log(error);
        }
        console.log(data);
        setUserInfo(data);
    }

    if (!user) { // UNAUTHORIZED USER, show login panel
        return (
            <LoginModule/>
        )
    }
    else { // USER LOGGED IN, RETURNING USER

        if (userInfo === null) {
            return (
                <div className={styles.dashboardContainer}>
                    Loading...
                </div>
            )
        }


        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardHeader}>
                    <h1>Welcome back, {userInfo.first_name}</h1>
                </div>
                
                <Topbar/>




                <div className="loan-page-content">
                    <button onClick={handleShowDashForm}>Add Loan</button>
                        {showDashForm && <DashboardForm onClose={handleCloseDashForm} />}
                </div>

                <div className={styles.dashboardTableContainer}>
                    <DashboardTable/>
                </div>
            </div>
        );
    }
};

export default DashboardModule;