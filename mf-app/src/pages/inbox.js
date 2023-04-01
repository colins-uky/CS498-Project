import Head from 'next/head'

import Inbox from '@/components/inbox.js'

import styles from '@/styles/Home.module.css'







export default function InboxPage() {
    return (
      <>
        <Head>
          <title>Inbox</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href='favicon.png' />
        </Head>
        <main className={styles.inboxMain}>
  
          <Inbox/>
  
        </main>
      </>
    )
}