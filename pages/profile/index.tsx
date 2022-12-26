import Reat, { useState,useEffect } from 'react'
import { UserI } from '../../interfaces'
import styles from '../../styles/ProfilePage.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import ImgUpload from '../../components/profilePage/ImgUpload'
import Input from '../../components/profilePage/Input'
import Edit from '../../components/profilePage/Edit'
import Profile from '../../components/profilePage/Profile'
import photoUpload from '../../utils/uploadImage'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateUser, getUser } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';
import Orders from '../../components/profilePage/Orders';
import CusAlert from '../../components/CusAlert';
import ClockLoader from "react-spinners/ClockLoader";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useUser().user
  const {user,isLoading} = useSelector((state: RootState) => state.user)

  const closeAlert: Function = () => setAlertStatus('')
  const [alertStatus, setAlertStatus] = useState<string | { error: string }>();

  const [isEditing, setIsEditing] = useState<boolean>(false) 
  const [formData, setFormData] = useState<UserI>() 

  useEffect(() => { dispatch(getUser(authUser))}, [authUser])
  useEffect(() => { setFormData(user)}, [user])

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'phone'
      ? Number(e.target.value)
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(prev=>!prev)
    isEditing && dispatch(updateUser({...user,...formData}))
  }

  const message = {
    title: 'Image uploaded!',
    description: ''
  }

  if (isLoading) return <ClockLoader color={'#4A90E2'} loading={isLoading} size={100} cssOverride={{ margin: "20% auto" }} />
  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={message} />}
      {user && isEditing ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={(e: any) => photoUpload(e, user, dispatch, setAlertStatus)} src={formData?.image} />
          <Input onChange={editInput} value={formData?.name || ''} id ='name' type='name' />
          <Input onChange={editInput} value={formData?.address || ''} id='address' type='address'  />
          <Input onChange={editInput} value={formData?.phone || ''} id='phone' type='number'/>
        </Edit>
      ) : (
        <Profile
          onSubmit={handleSubmit}
          src={formData?.image}
          />)}
      </div>
      <Orders/>
      
    </div>
  )
}

export default ProfilePage;

// export const getServerSideProps = withPageAuthRequired({
//   getServerSideProps: async ({ req, res }) => {
//     const auth0User = getSession(req, res);
//     const prisma = new PrismaClient();
//     let user = await prisma.user.findUnique({ where: { email: auth0User?.user.email}})
//     if (!user) user = await prisma.user.create({ data: { email: auth0User?.user.email } })
    
//     return {props: {user: user}};
//   },
// });
