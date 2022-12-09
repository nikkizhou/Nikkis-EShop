
import axios from 'axios'
import aws from "aws-sdk";
import { UserI } from '../interfaces';

const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>, user: UserI, setUser: Function) => {
  e.preventDefault();
  const reader = new FileReader();
  const file = e.target.files[0];
  file && reader.readAsDataURL(file);
  const fileName = encodeURIComponent(file.name)
  await uploadToAWS(fileName, file)
  await getURL(file.type, fileName, user, setUser)
}

const getURL = async (fileType: string, fileName: string, user:UserI, setState:Function) => {
  axios
    .post("/api/upload-image", {
      fileName: fileName,
      fileType: fileType,
      id: user.id
    })
    .then(res => setState({ ...user, image: res.data.url }))
    .catch(error => console.log("Error on uploading image: " + error.message));
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

export default photoUpload