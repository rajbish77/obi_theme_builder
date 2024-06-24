import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface TProps {
    icon: any;
    color: string;
    title: string | undefined;
}

const SwalTitleComponent = (props: TProps) => {
  return (
    <>
      <div className='row'>
        <div className='col-1 me-4'>
          <FontAwesomeIcon
            icon={props?.icon}
            size="lg"
            className={`me-3 text-${props?.color}`}
          />
        </div>
        <div className='col-8 ps-2 ps-sm-0 px-0 d-flex justify-content-start align-items-center'>
            <h3 className='fw-bold'>{props?.title}</h3>
        </div>
      </div>
    </>
  )
}

export default SwalTitleComponent