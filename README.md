## 👉[Live Deomo](https://products-blue-beta.vercel.app/)  

## Motivation
The motivation for this classical ecommerce app is to build a bigger project where I get to practice what I've learnt and in the same time add new techs (docker, AWS, prisma...) I've been interested in. 

## Tech stack: 

**Typescript,  Nextjs,  React,  ReduxToolKit,  Auth0,  Prisma,  PostgreSQL,**  
**Docker**: Containerizing the app, easier for development  
**AWS RDS**: Running postgresSQL  
**AWS s3**: Storing Users' profile photos     
**Nodemailer**: Sending user feedback from contact page & Sending order info to user from cart page

<br>

## Features
### Product Page:
&emsp;✔️ Search products by keyword  
&emsp;✔️ Filter products by categories   
&emsp;✔️ Add product to cart    
&emsp;✔️ Check reviews for one product    

### Cart Page:
&emsp;✔️ Remove product or change quantity  
|                                               | **For logged in users**    |**For unauthenticated users**|
| :-------------------------------------------  | :------------------------- |:----------------------------|
|✔️ Cart items are stored in:                   | Database                   |  Local Storage              |
|✔️ After checking out, the order info will be: |Added to user's profile page| Sent to user's email        |


### Contact Page:
&emsp;✔️ The user feedback will be sent to an email  
  
### Profile Page:
&emsp;✔️ View and modify user profile   
&emsp;✔️ View shopping history (orders)  
&emsp;✔️ Rate/add review for a specific product in the user's orders  
 
<br>

## Learnings:
- **See the big picture**:   
In the planning stage of the project, it's wise to think about which techs/frameworks would fit better considering the size and other aspects of the project. For example if to use statemanagement tools like redux or useContext 
- **Think out of the box**:  
Sometimes when a problem shows up it could be tricky to check only the error message. Sometimes the cause of the error could be something totally irrelavent to the error message. 

## Future Features:     
⬜ Business side   
⬜ CMS - contentful  
⬜ Stripe for simulating payment  
⬜ Upgrade to Nextjs 13  
 
