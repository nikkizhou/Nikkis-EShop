import Reat, { useState } from 'react'
import { UserI } from '../../interfaces'
import styles from '../../styles/ProfilePage.module.css'
import { PrismaClient } from '@prisma/client';
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import ImgUpload from '../../components/profile/ImgUpload'
import Input from '../../components/profile/Input'
import Edit from '../../components/profile/Edit'
import Profile from '../../components/profile/Profile'
import axios from 'axios'

const CardProfile = ({ dbUser }: { dbUser: UserI }) => {
  const { user, error, isLoading } = useUser();
  const [state, setState] = useState<UserI>(dbUser) 
  const [isEditing, setIsEditing] = useState<boolean>(false) 

  dbUser && console.log(dbUser,"dbUser");
  

  const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    // reader.onloadend = () => setState({ ...state, file, image: reader.result })
    reader.readAsDataURL(file);

    axios
      .post("/api/upload-image", {
        fileName: encodeURIComponent(file.name),
        fileType: file.type
      })
      .then(res => {
        const signedRequest = res.data.signedRequest;
        const url = res.data.url;
        setState({ ...state, image: url });

        // var options = {headers: {"Content-Type": file.type}};
        // axios
        //   .put(signedRequest, file, options)
        //   .then(_ => {
        //     setUploadState({ ...uploadState, success: true });
        //     mutate();
        //   })
        //   .catch(_ => {
        //     toast("error", "We could not upload your image");
        //   });
      })
      .catch(error => {
        console.log("error", "We could not upload your image");
      });


  }

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  }

  const updateUser = async (newUser: UserI) => {
    const { id, name, address, email, phone, image } = newUser
    console.log(id,"id!!");
    
    const res = await fetch(`/api/profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, name, address, email, phone, image })
    })
    return res.json();
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(prev=>!prev)
    await updateUser(state)
  }

  const { phone,email,image,name,address} = state
  return (
    <div className={styles.container}>
      {user&& (isEditing) ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={photoUpload} src={image} />
          <Input onChange={editInput} value={name || ''} id ='name' type='name' />
          <Input onChange={editInput} value={address || ''} id='address' type='address'  />
          <Input onChange={editInput} value={email || ''} id='email' type='email'  />
          <Input onChange={editInput} value={phone || ''} id='phone' type='number'/>
        </Edit>
      ) : (
        <Profile
          onSubmit={handleSubmit}
          src={image}
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

    if (!user) user = await prisma.user.create({ data: { email: auth0User?.user.email } })

    return {props: {dbUser: user}};
  },
});
