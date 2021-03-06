import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Home ({ initialContacts }) {
  console.log(initialContacts);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="display-contacts">
        {initialContacts.map(contact => {
          const { avatar, email, firstName, lastName, id } = contact;
          return (
            <div 
              className="contact"
              key={id}  
            >
              <img src={avatar} alt={`Picture of ${firstName}`} />
              <p>Email: {email}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const contacts = await prisma.contact.findMany();
  
  return {
    props: {
      initialContacts: contacts
    }
  }
}