import React from 'react'
import styles from '../../styles/ProfilePage.module.css'

const Input = ({ onChange, value, type,id }) =>
  <div className={styles.field}>
    <label htmlFor={id}>{id}</label>
    <input
      id={id}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={value}
      name={id}
    />
  </div>

export default Input
