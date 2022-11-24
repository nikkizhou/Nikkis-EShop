import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import styles from '../styles/CusAlert.module.css'

interface Props {
  status: string
  closeAlert: Function
}

function CusAlert({ status, closeAlert }: Props) {
  const errorAlert: ReactElement =
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Your browser is outdated!</AlertTitle>
      <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
    </Alert>
  
  return (
    <div className={styles.main}>
    {status == "ERROR"
    ? errorAlert
    : <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Message Sendt!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Thanks for contacting us. Our team will get back to you soon.
      </AlertDescription>
      <button onClick={()=>closeAlert()}> X </button>
      </Alert>}
    </div>
  )
}

export default CusAlert
