import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import aws from "aws-sdk";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  aws.config.update({
    region: process.env.APP_AWS_REGION,
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY
  });

  const s3 = new aws.S3(); 
  const s3Bucket = process.env.AWS_S3_BUCKET_NAME;
  const { fileName, fileType, id } = req.body;

  const s3Params = {
    Bucket: s3Bucket,
    Key: fileName,
    ContentType: fileType,
    ACL: "public-read"
  };
  

  try {
    s3.getSignedUrl("putObject", s3Params, async (err, data) => {
      if (err) return res.json({ success: false, error: err });
      
      const prisma = new PrismaClient();
      const returnData = {
        signedRequest: data,
        url: `https://${s3Bucket}.s3.eu-north-1.amazonaws.com/users+/${fileName}`
      };
      
      await prisma.user.update({
        where: {id:id },
        data: { image: returnData.url }
      });
      
      return res.status(200).json(returnData);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}
