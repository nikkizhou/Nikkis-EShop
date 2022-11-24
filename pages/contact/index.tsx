import React, { useState } from "react";
import styles from '../../styles/Contact.module.css'
import CusAlert from "../../components/CusAlert";

interface FormData {
  name: { value: string };
  email: { value: string };
  message: { value: string };
}

const ContactForm = () => {
  const [status, setStatus] = useState<string>("Submit");
  const [alertStatus, setAlertStatus] = useState<string>();

  const closeAlert:Function = () => setAlertStatus('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    
    const { name, email, message } = e.target as typeof e.target & FormData
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    setAlertStatus(result.status);
  };
  
  return (
    <div className={styles.container}>
      {alertStatus && <CusAlert status={alertStatus} closeAlert={closeAlert} />}
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" id="name" placeholder="Name"  required />
      <input className={styles.input} type="email" id="email" placeholder="Email" required />
      <textarea className={styles.comment} id="message" placeholder="Comment"  required />
      <button className={styles.submit} type="submit">{status}</button>
      </form>
    </div>
  );
};

export default ContactForm;
