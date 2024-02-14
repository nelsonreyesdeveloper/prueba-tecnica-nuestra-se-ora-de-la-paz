import React, { useState } from 'react'
import Header from './Header'
import { Row, Col, Container, Button, Modal } from 'react-bootstrap'
import Footer from './Footer'
import { generateTitle } from '../utils/functions'
import TableMedicamentos from '../components/TableMedicamentos'
import Filters from '../components/Filters'
import ModalMedicamento from '../components/ModalMedicamento'
import NuevoMedicamento from '../components/NuevoMedicamento'


const AdminLayout = () => {
    generateTitle('Farmacia - Dashboard')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Header />
            <Container fluid="lg" className=' mat-5'>

                <Row xs={1} md={2} className='d-flex justify-content-center'>

                    <Col className="col-md-12">
                        <Button variant="primary w-md-50" onClick={handleShow}>
                            Nuevo Medicamento
                        </Button>

                        <Filters></Filters>


                        <TableMedicamentos></TableMedicamentos>
                    </Col>

                </Row>
                <ModalMedicamento show={show} handleClose={handleClose} >
                    <NuevoMedicamento handleClose={handleClose}></NuevoMedicamento>
                </ModalMedicamento>

            </Container >


            <Footer></Footer>


        </>
    )
}

export default AdminLayout