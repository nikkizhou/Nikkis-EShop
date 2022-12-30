
import aws from "aws-sdk";
import { UserI } from '../interfaces';
import { getImgURL } from'../utils/apiCalls'


const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>, user: UserI,  dispatch,setAlertStatus:Function) => {
  e.preventDefault();
  const reader = new FileReader();
  const file = e.target.files[0];
  file && reader.readAsDataURL(file);
  const fileName = encodeURIComponent(file.name)
  await uploadToAWS(fileName, file, setAlertStatus)
  await getImgURL(file.type, fileName, user, dispatch)
}



const uploadToAWS = async (fileName: string, file: File, setAlertStatus: Function) => {
  aws.config.update({
    region: process.env.NEXT_PUBLIC_APP_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_KEY
  });

  const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
  const photoKey = "users /" + fileName;
  const upload = new aws.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: photoKey,
      Body: file,
      ContentType: file.type,
    }
  });

  upload.promise()
    .then(data => setAlertStatus("Success"))
    .catch(err => setAlertStatus({error:err.message}))
}

export default photoUpload
