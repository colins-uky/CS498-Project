import Head from 'next/head'


import styles from '@/styles/Home.module.css'


import Topbar from '@/components/topbar'

import LoanCalculator from '@/components/loan_calculator'



export default function LoanCalculatorPage() {
    return (
      <>
        <Head>
            <title>Loan Calculator</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href='favicon.png' />
        </Head>
        <main className={styles.calculatorMain}>
            <Topbar pageTitle="Loan Calculator"/>
          
            <LoanCalculator/>
        </main>
      </>
    )
}