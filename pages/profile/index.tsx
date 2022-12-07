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
import aws from "aws-sdk";

const CardProfile = ({ dbUser }: { dbUser: UserI }) => {
  const [state, setState] = useState<UserI>(dbUser) 
  const [isEditing, setIsEditing] = useState<boolean>(false) 

  const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    file && reader.readAsDataURL(file);
    const fileName = encodeURIComponent(file.name)
    await uploadToAWS(fileName, file) 
    await getURL(file.type,fileName)
  }

  const getURL = async (fileType:string,fileName:string) => {
    axios
      .post("/api/upload-image", {
        fileName: fileName,
        fileType: fileType,
        id: state.id
      })
      .then(res => setState({ ...state, image: res.data.url }))
      .catch(error => console.log("Error on uploading image: "+error.message));
  }

  const uploadToAWS = async (fileName: string, file: File) => {
    aws.config.update({
      region: process.env.NEXT_PUBLIC_APP_AWS_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_KEY
    });

    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
    var photoKey = "users /" + fileName;
    var upload = new aws.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: photoKey,
        Body: file,
        ContentType: file.type,
      }
    });

    upload.promise()
      .then(data => alert("Successfully uploaded photo."))
      .catch(err => alert("There was an error uploading your photo: " + err.message))
  }

  const editInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  }

  const updateDBUser = async (newUser: UserI) => {
    const { id, name, address, email, phone, image } = newUser
    const res = await fetch(`/api/profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, name, address, email, phone, image })
    })
    return res.json();
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsEditing(prev=>!prev)
    await updateDBUser(state)
  }

  const { phone,image,name,address} = state
  return (
    <div className={styles.container}>
      {dbUser && isEditing ? (
        <Edit onSubmit={handleSubmit}>
          <ImgUpload onChange={photoUpload} src={image} />
          <Input onChange={editInput} value={name || ''} id ='name' type='name' />
          <Input onChange={editInput} value={address || ''} id='address' type='address'  />
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
    let user = await prisma.user.findUnique({ where: { email: auth0User?.user.email}})
    if (!user) user = await prisma.user.create({ data: { email: auth0User?.user.email } })
    
    return {props: {dbUser: user}};
  },
});
