import React, { useState } from "react";
import styles from '../../styles/ContactPage.module.css'
import CusAlert from "../../components/CusAlert";
import sendEmail from '../../utils/sendEmail'
import { contactFormMsg } from '../../utils/alertMessage'

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
    const details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    const response = await sendEmail(details)
    setStatus("Submit");
    setAlertStatus(response.status);
  };

  
  return (
    <div className={styles.container}> 
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} message={contactFormMsg} />}
    <form className={styles.form} onSubmit={handleSubmit}>
      <input  type="text" id="name" placeholder="Name"  required />
      <input  type="email" id="email" placeholder="Email" required />
      <textarea className={styles.comment} id="message" placeholder="Comment"  required />
      <button className='buttonS' type="submit">{status}</button>
      </form>
    </div>
  );
};

export default ContactPage;
