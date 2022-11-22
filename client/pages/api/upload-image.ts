import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import aws from "aws-sdk";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res);

  aws.config.update({
    region: "eu-west-2",
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY
  });

  const s3Bucket = process.env.AWS_S3_BUCKET_NAME;

  const s3 = new aws.S3(); // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  console.log(fileName,'filename in api');
  console.log(fileType, 'fileType in api');

  const s3Params = {
    Bucket: s3Bucket,
    Key: fileName,
    ContentType: fileType,
    ACL: "public-read"
  };

  try {
    s3.getSignedUrl("putObject", s3Params, async (err, data) => {
      if (err) {
        return res.json({ success: false, error: err });
      }
      const prisma = new PrismaClient();
      const returnData = {
        signedRequest: data,
        url: `https://${s3Bucket}.s3.eu-north-1.amazonaws.com/${fileName}`
      };
      
      await prisma.user.update({
        where: { email: session.user.email },
        data: { image: returnData.url }
      });

      console.log(returnData.url);
      
      return res.status(200).json(returnData);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
}
