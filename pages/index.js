import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Home ({ initialContacts }) {
  console.log(initialContacts);
  const [contacts, setContacts] = useState(initialContacts);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      avatar: avatar
    }
    console.log(data);
    try {
      await saveContact(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form 
        onSubmit={handleSubmit} 
        className={styles.addContacts}
      >
        <h2>Add a Contact</h2>
        <input 
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          placeholder="First name"
        />
        <input 
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          placeholder="Last name"
        />
        <input 
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <input 
          type="text"
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
          placeholder="Image url"
        />
        <button>Submit</button>
      </form>
      {/* https://avatars.githubusercontent.com/u/31804757?v=4 */}
      <div className="display-contacts">
        {contacts.map(contact => {
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

async function saveContact(contact) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contact)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const getServerSideProps = async () => {
  const contacts = await prisma.contact.findMany();
  
  return {
    props: {
      initialContacts: contacts
    }
  }
}