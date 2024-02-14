import React from 'react'

const Footer = () => {
    return (
        <div className='bg-dark mt-5 p-3'>
            <div className="container">
                <p className='text-center text-white'>©{new Date().getFullYear()} Farmacia Nuestra Señora de la Paz - Nelson Reyes</p>
            </div>
        </div>
    )
}

export default Footer