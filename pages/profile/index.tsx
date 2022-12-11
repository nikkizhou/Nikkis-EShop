import Reat, { useState,useEffect } from 'react'
import { UserI } from '../../interfaces'
import styles from '../../styles/ProfilePage.module.css'
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ImgUpload from '../../components/profile/ImgUpload'
import Input from '../../components/profile/Input'
import Edit from '../../components/profile/Edit'
import Profile from '../../components/profile/Profile'
import photoUpload from '../../utils/uploadImage'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUser } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';

//CardProfile = ({ dbUser }: { dbUser: UserI })
const CardProfile = () => {
  const dispatch = useDispatch();
  const authUser = useUser().user
  const dbUser = useSelector((state: RootState) => state.user.user)

  const [isEditing, setIsEditing] = useState<boolean>(false) 
  const [formData, setFormData] = useState<UserI>() 
  console.log(dbUser, 'dbUser index line 22');
 
  useEffect(() => { dispatch(getUser(authUser))}, [authUser])
  useEffect(() => { setFormData(dbUser)}, [dbUser])

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.name === 'phone'
      ? Number(e.target.value)
      : e.target.value;
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(prev=>!prev)
    isEditing && dispatch(updateUser({...dbUser,...formData}))
  }

  
  return (
    <div className={styles.container}>
      {dbUser && isEditing ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={(e: any) => photoUpload(e, dbUser, dispatch)} src={formData?.image} />
          <Input onChange={editInput} value={formData?.name || ''} id ='name' type='name' />
          <Input onChange={editInput} value={formData?.address || ''} id='address' type='address'  />
          <Input onChange={editInput} value={formData?.phone || ''} id='phone' type='number'/>
        </Edit>
      ) : (
        <Profile
          onSubmit={handleSubmit}
            src={formData?.image}
          user={dbUser} />)}
    </div>
  )
}

export default CardProfile;

// export const getServerSideProps = withPageAuthRequired({
//   getServerSideProps: async ({ req, res }) => {
//     const auth0User = getSession(req, res);
//     const prisma = new PrismaClient();
//     let user = await prisma.user.findUnique({ where: { email: auth0User?.user.email}})
//     if (!user) user = await prisma.user.create({ data: { email: auth0User?.user.email } })
    
//     return {props: {dbUser: user}};
//   },
// });
