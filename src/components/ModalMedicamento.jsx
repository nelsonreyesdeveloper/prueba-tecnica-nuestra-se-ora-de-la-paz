import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalMedicamento = ({ children, show, handleClose }) => {


    return (
        <Modal show={show} onHide={handleClose}>
            {
                children
            }
        </Modal>
    )
}

export default ModalMedicamento