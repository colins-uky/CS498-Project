import Head from 'next/head'

import DashboardModule from '@/components/dashboard'

import styles from '@/styles/Home.module.css'

import logo from '@/images/cash-in-hand-icon.png';






export default function Dashboard() {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href='favicon.png' />
        </Head>
        <main className={styles.dashboardMain}>
  
            <DashboardModule/>
  
        </main>
      </>
    )
}