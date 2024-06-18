import React from 'react'

const showError = (errorsArray:string[]) => {
  return (
    <ul>
        {errorsArray.map((err)=>
            <li className='text-left'>{err}</li>
        )}
    </ul>
  )
}

export default showError