import nodemailer from "nodemailer";
import AWS from "aws-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";

import emailTemplate from "@/template/emailTemplate";

dotenv.config();

type Config = {
  emailUser: string;
  emailPassword: string;
};

const fetchConfigFromSSM = async (parameterName: string) => {
  const credentials = new AWS.Credentials({
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  });

  AWS.config.credentials = credentials;
  AWS.config.update({ region: "eu-west-2" });

  const ssm = new AWS.SSM();

  const params = {
    Name: parameterName,
    WithDecryption: true,
  };

  try {
    const data = await ssm.getParameter(params).promise();
    if (data.Parameter) {
      return data.Parameter.Value;
    }
    throw new Error("No parameter found");
  } catch (error) {
    console.error(`Error fetching ${parameterName} from SSM:`, error);
    throw error;
  }
};

const fetchAllConfigurations = async (): Promise<Config> => {
  const emailUser = await fetchConfigFromSSM("emailUser");
  const emailPassword = await fetchConfigFromSSM("emailPass");

  if (!emailUser || !emailPassword) {
    throw new Error("Failed to fetch all configurations from SSM");
  }

  return {
    emailUser,
    emailPassword,
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body;

  const config = await fetchAllConfigurations();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: email,
    to: config.emailUser,
    subject: `Message from ${name}`,
    html: emailTemplate.html(name, email, message),
    headers: {
      Priority: "high",
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "High",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
};
