import Reat, { useEffect, useState } from 'react'
import { UserI } from '../../interfaces'
import styles from '../../styles/ProfilePage.module.css'
import { FaUpload } from "react-icons/fa";
import { useAuth0 } from '@auth0/auth0-react';
import { PrismaClient } from '@prisma/client';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';


const ImgUpload = ({ onChange, src }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  return (
    <label htmlFor="photo-upload" className={styles.fileUpload} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`${styles.imgWrap} ${styles.imgUpload}`}>
        {isHovering &&<FaUpload className={styles.uploadIcon} />}
        <img src={src} />
      </div>
      <input id="photo-upload" type="file" onChange={onChange} className={styles.hide} />
    </label>
  )}

const Input = ({ onChange, value, type }) =>
  <div className={styles.field}>
    <label htmlFor={type}>{type}</label>
    <input
      id={type}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={value}
      name={type}
    />
  </div>


const Profile = ({ onSubmit, src, user }) => {
  const { name, address, email,phone } = user
  
  return(
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
    </div>)}


const Edit = ({ onSubmit, children, }) =>
  <div className={styles.card}>
    <form onSubmit={onSubmit}>
      <h2>Edit Profile</h2>
      {children}
      <button type="submit" className={styles.save}>Save </button>
    </form>
  </div>


const CardProfile = ({ dbUser }: { dbUser: UserI }) => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const [state, setState] = useState<UserI>(dbUser) 

  dbUser && console.log(dbUser,"dbUser");
  

  // console.log(user?.email);
  // useEffect(() => {
  //   user && setState({...state, email:user.email})
  // },[]);

  const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => setState({ ...state, file, imagePreviewUrl: reader.result })
    reader.readAsDataURL(file);
  }

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value});
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let activeP = state.active == 'edit' ? 'profile' : 'edit';
    setState({ ...state, active: activeP,})
  }

  const { phone,email,imagePreviewUrl,name,address,active} = state
  return (
    <div className={styles.container}>
      {user&& (active == 'edit') ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
          <Input onChange={editInput} value={name} type='name' />
          <Input onChange={editInput} value={address} type='address'  />
          <Input onChange={editInput} value={email} type='email'  />
          <Input onChange={editInput} value={phone} type='phone'/>
        </Edit>
      ) : (
        <Profile
          onSubmit={handleSubmit}
          src={imagePreviewUrl}
          user={state} />)}
    </div>
  )
}

export default CardProfile;


export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);

    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({
      where: { email: auth0User?.user.email}})

    if (!user) user = await prisma.user.create({data:{email: auth0User?.user.email}} )

    return {props: {dbUser: user}};
  },
});
