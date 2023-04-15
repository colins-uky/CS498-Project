import React from 'react';
import Topbar from './topbar';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import LoginModule from './login';
import DashboardForm from './dashboard_form';
import DashboardTable from './dashboard_table';

import styles from "@/styles/Dashboard.module.css";

function DashboardModule() {
    const user = useUser();
    const supabase = useSupabaseClient();

    const [showDashForm, setShowDashForm] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggleDashForm = () => {
        setShowDashForm(!showDashForm);
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
            <div className={styles.container}>
                <Topbar
                    pageTitle={"Dashboard"}
                />

                <div className={styles.dashboardContainer}>
                    <div className={styles.dashboardHeader}>

                    </div>


                    <button className={styles.button} onClick={toggleDashForm}>Create New Listing</button>

                    <div className={styles.dashboardFormContainer}>
                        
                            {showDashForm && (
                            <div className={styles.dashFormContainer}>
                                <div className={styles.dashFormHeader}>
                                    <span className={styles.closeIcon} onClick={toggleDashForm}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                        />
                                    </span>
                                </div>
                                
                                <DashboardForm
                                    toggleDashForm={toggleDashForm}
                                />

                            </div>
                        )}
                    </div>

                    <div className={styles.dashboardTableContainer}>
                        <DashboardTable/>
                    </div>

                </div>
            </div>
        );
    }
};

export default DashboardModule;