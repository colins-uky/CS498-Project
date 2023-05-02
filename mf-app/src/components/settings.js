import { useState, useEffect } from "react";

import Topbar from "./topbar";
import Login from "./login";

import { Form, Button, InputGroup } from "react-bootstrap";

import styles from "../styles/Settings.module.css";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Settings() {



    const supabase = useSupabaseClient();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);

    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [phone_number, setPhoneNum] = useState(null);
    const [account_type, setAccountType] = useState(null);

    const [website, setWebsite] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, first_name, last_name, phone_number, account_type`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);

                setFirstName(data.first_name);
                setLastName(data.last_name);
                setPhoneNum(data.phone_number);
                setAccountType(data.account_type);
            }
        } 
        catch (error) {
            alert('Error loading user data!')
            console.log(error)
        } 
        finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url, first_name, last_name, phone_number, account_type }) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                first_name,
                last_name,
                phone_number,
                account_type,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) throw error
                alert('Profile updated!')
        } 
        catch (error) {
            alert('Error updating the data!')
            console.log(error)
        } 
        finally {
            setLoading(false)
        }
    }


    if (user) {
        return (

            <div className={styles.settingsContainer}>
                <Topbar
                    pageTitle={"Settings"}
                />


                <div className={styles.settingsFormContainer}>
                    <Form className={styles.settingsForm} onSubmit={() => updateProfile({ username, website, avatar_url, first_name, last_name, phone_number, account_type })}>

                        <h1 className={styles.composeTitle}> Update Profile </h1>


                        <InputGroup className={styles.inputGroup}>
                            <div className={styles.columnEmail}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    className={styles.input}
                                    id="email"
                                    value={user.email}
                                    type="text"
                                    disabled
                                    
                                />
                            </div>
                            
                        </InputGroup>


                        <div className={styles.border}/>

                        <div className={styles.doubleInput}>
                            <InputGroup className={styles.inputGroup}>
                                <div className={styles.column}>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        id="email"
                                        value={username}
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                
                            </InputGroup>



                            <InputGroup className={styles.inputGroup}>
                                <div className={styles.column}>
                                    <Form.Label>Account Type:</Form.Label>
                                    <Form.Select onChange={(e) => setAccountType(e.target.value)}>
                                        <option value="" selected disabled >{account_type}</option>
                                        <option value="investor">Investor</option>
                                        <option value="borrower">Borrower</option>
                                        <option value="both">Both</option>
                                        <option value="admin">Admin</option>
                                    </Form.Select>
                                </div>
                            
                            </InputGroup>
                        </div>



                        <div className={styles.doubleInput}>
                            <InputGroup className={styles.inputGroup}>
                                <div className={styles.column}>
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        id="email"
                                        value={first_name}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                
                            </InputGroup>



                            <InputGroup className={styles.inputGroup}>
                                <div className={styles.column}>
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        id="email"
                                        value={last_name}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                
                            </InputGroup>
                        </div>
                        
                        
                        <InputGroup className={styles.inputGroup}>
                            <div className={styles.column}>
                                <Form.Label>Phone number:</Form.Label>
                                <Form.Control
                                    id="email"
                                    value={phone_number}
                                    type="number"
                                    onChange={(e) => setPhoneNum(e.target.value)}
                                />
                            </div>
                                
                        </InputGroup>


                        <Button className={styles.updateButton} variant="primary" type="submit">
                            Update
                        </Button>

                    </Form>
            
                </div>
                
            </div>
        );
    }
    else {
        return (
            <Login />
        );
    }
    
}