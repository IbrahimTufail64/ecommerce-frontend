import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h>Payment Success!</h>
        <p>You can now safely return to <span onClick={()=> {navigate('/')}} className='text-primary cursor-pointer'>home page</span></p>
    </div>
  )
}

export default Success