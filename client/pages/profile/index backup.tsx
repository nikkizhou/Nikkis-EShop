import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../../styles/Profile.module.css'

function Profile() {
  const { user } = useAuth0();
  if (user) var {email } = user;
  
  return (
    <div className={styles.container}>
      <h2>{email }</h2>
    </div>
  )
}

export default Profile



