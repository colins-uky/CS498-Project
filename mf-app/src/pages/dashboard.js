import Head from 'next/head'

import DashboardTable from '@/components/dashboard_table.js'

import styles from '@/styles/Home.module.css'

import logo from '@/images/cash-in-hand-icon.png';






export default function Dashboard() {
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={logo} />
        </Head>
        <main className={styles.dashboardMain}>
  
            <DashboardTable/>
  
        </main>
      </>
    )
}