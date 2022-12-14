import React, { useState } from "react";
import styles from '../../styles/ContactPage.module.css'
import CusAlert from "../../components/CusAlert";

interface FormData {
  name: { value: string };
  email: { value: string };
  message: { value: string };
}

const ContactPage = () => {
  const [status, setStatus] = useState<string>("Submit");
  const [alertStatus, setAlertStatus] = useState<string>();
  const closeAlert: Function = () => setAlertStatus('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target as typeof e.target & FormData
    const response = await sendEmail({name, email, message})
    setStatus("Submit");
    setAlertStatus(response.status);
  };

  const sendEmail = async ({ name, email, message }: FormData ) => {
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    const config = {
      method: "POST",
      headers: {"Content-Type": "application/json;charset=utf-8"},
      body: JSON.stringify(details)
    }
    return await fetch("api/sendEmail", config).then(res=>res.json());
  }

  const message = {
    title:'Message Sendt!',
    description:'Thanks for contacting us. Our team will get back to you soon.'
  }
  
  return (
    <div className={styles.container}> 
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={message} />}
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" id="name" placeholder="Name"  required />
      <input className={styles.input} type="email" id="email" placeholder="Email" required />
      <textarea className={styles.comment} id="message" placeholder="Comment"  required />
      <button className={styles.submit} type="submit">{status}</button>
      </form>
    </div>
  );
};

export default ContactPage;
