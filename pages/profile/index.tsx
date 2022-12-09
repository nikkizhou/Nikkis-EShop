import Reat, { useState,useEffect } from 'react'
import { UserI } from '../../interfaces'
import styles from '../../styles/ProfilePage.module.css'
import { PrismaClient } from '@prisma/client';
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ImgUpload from '../../components/profile/ImgUpload'
import Input from '../../components/profile/Input'
import Edit from '../../components/profile/Edit'
import Profile from '../../components/profile/Profile'
import photoUpload from '../../utils/uploadImage'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../redux/actions/userAction';
import { RootState } from '../../redux/store';

//CardProfile = ({ dbUser }: { dbUser: UserI })
const CardProfile = () => {
  const dispatch = useDispatch();
  const dbUser = useSelector((state: RootState) => state.user.user)

  const [userProfile, setUserProfile] = useState<UserI>() 
  const [isEditing, setIsEditing] = useState<boolean>(false) 

  console.log(dbUser, 'dbUser index line 27');
  console.log(userProfile,'userProfile');
  
  const { user } = useUser()
  useEffect(() => {
    dispatch(getUser(user))
    dbUser && setUserProfile(dbUser)
  }, [user])

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserProfile({ ...userProfile, [e.target.name]: value });
  }

  // const updateDBUser = async (newUser: UserI) => {
  //   //const { id, name, address, email, phone, image } = newUser
  //   dispatch(updateUser(newUser))

  //   // const res = await fetch(`/api/profile/${id}`, {
  //   //   method: 'PUT',
  //   //   body: JSON.stringify({ id, name, address, email, phone, image })
  //   // })
  //   // return res.json();
  // }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(prev=>!prev)
    dispatch(updateUser(userProfile))
  }

  
  if (userProfile) var { phone, image, name, address } = userProfile
  return (
    <div className={styles.container}>
      {dbUser && isEditing ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={(e)=>photoUpload(e,userProfile,setUserProfile)} src={image} />
          <Input onChange={editInput} value={name || ''} id ='name' type='name' />
          <Input onChange={editInput} value={address || ''} id='address' type='address'  />
          <Input onChange={editInput} value={phone || ''} id='phone' type='number'/>
        </Edit>
      ) : (
        <Profile
          onSubmit={handleSubmit}
          src={image}
          user={userProfile} />)}
    </div>
  )
}

export default CardProfile;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    const auth0User = getSession(req, res);
    const prisma = new PrismaClient();
    let user = await prisma.user.findUnique({ where: { email: auth0User?.user.email}})
    if (!user) user = await prisma.user.create({ data: { email: auth0User?.user.email } })
    
    return {props: {dbUser: user}};
  },
});
