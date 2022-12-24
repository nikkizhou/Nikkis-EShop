import React from 'react'
import styles from '../../styles/ProfilePage.module.css'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { UserI } from '../../global.d.';

const Profile = ({ onSubmit, src }) => {
  const user : UserI = useSelector((state: RootState) => state.user.user)
  const { name, address, email, phone } = user || {}

  return (
    <div className={styles.card}>
      <form onSubmit={onSubmit}>
        <h2>My Profile</h2>
        <label className={styles.fileUpload}>
          <div className={styles.imgWrap} >
            <img src={src} />
          </div>
        </label>
        <h2 className={styles.name}>Name: {name}</h2>
        <h3 className={styles.details}>Phone: {phone}</h3>
        <h3 className={styles.details}>Email: {email}</h3>
        <h3 className={styles.details}>Address: {address}</h3>
        <button type="submit" className={styles.edit}>Edit Profile </button>
      </form>
    </div>)
}

export default Profile
