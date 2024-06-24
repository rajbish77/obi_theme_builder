import React from 'react'


interface TProps {
    message: string | undefined;
}

const SwalHtmlComponent = (props: TProps) => {
    return (
        <>
            <div className='text-start'>
                {props?.message}
            </div>
        </>
    )
}

export default SwalHtmlComponent 