import React from 'react'
import styles from '../../styles/ProfilePage.module.css'

const Edit = ({ onSubmit, children}) =>
  <div className={styles.card}>
    <form onSubmit={onSubmit}>
      <h2>Edit Profile</h2>
      {children}
      <button type="submit" className={styles.save}>Save </button>
    </form>
  </div>

export default Edit
