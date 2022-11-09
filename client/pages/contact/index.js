import React, { useState } from "react";
import styles from '../../styles/Contact.module.css'

const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
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
    alert(result.status);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="text" id="name" placeholder="Name"  required />
      <input className={styles.input} type="email" id="email" placeholder="Email" required />
      <textarea className={styles.comment} id="message" placeholder="Comment"  required />
     
      <button className={styles.submit} type="submit">{status}</button>
    </form>
  );
};

export default ContactForm;
