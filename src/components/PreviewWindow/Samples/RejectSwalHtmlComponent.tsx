import React from 'react'

interface Tprops {
  editorName: string,
  affiliateName: string,
}

const RejectSwalHtmlComponent = (props: Tprops) => {

  return (
    <>
      <div className='row'>
        <div className='col-md-12 d-flex justify-content-start'>
          Affiliate: {props.affiliateName}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 d-flex justify-content-start'>
          Editor: {props.editorName}
        </div>
      </div>
    </>
  )
}

export default RejectSwalHtmlComponent