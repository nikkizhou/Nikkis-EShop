import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import styles from '../styles/CusAlert.module.css'

interface Props {
  status: any
  closeAlert: Function
  message: {title:string, description: string}
}

function CusAlert({ status, closeAlert, message }: Props) {
  const errorAlert: ReactElement =
    <Alert status='error'>
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Something Went Wrong!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        {status.error}
      </AlertDescription>
      <button onClick={() => closeAlert()}> X </button>
    </Alert>
  
  return (
    <div className={styles.main}>
    {status.error
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
        {message.title}
      </AlertTitle>
          <AlertDescription maxWidth='sm'>{message.description}
       
      </AlertDescription>
      <button onClick={()=>closeAlert()}> X </button>
      </Alert>}
    </div>
  )
}

export default CusAlert
