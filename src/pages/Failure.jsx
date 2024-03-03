import React from 'react'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h1>Payment Failure!</h1>
        <p>Oops! something went wrong with your payment, <span onClick={()=> {navigate('/')}} className='text-primary cursor-pointer'>return to home page?</span></p>
    </div>
  )
}

export default Failure