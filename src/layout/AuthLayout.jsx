import React from 'react'
import { Outlet } from 'react-router-dom'
import imagenFarmacia from '../assets/img/imagen-farmacia.jpg'
import { Row, Col, Container } from 'react-bootstrap'
import Footer from './Footer'

const AuthLayout = () => {

    return (
        <div className='d-flex flex-column justify-content-between min-vh-100'>
            <div>
                <Col className="col-md-6 imagen-overlay-movil">
                    <img className='w-100 h-100 hover-img-login-movil' src={imagenFarmacia} alt="" />
                    <div className="overlay"></div>
                </Col>
                <Container className='mt-5'>

                    <Row xs={1} md={2} className='d-flex justify-content-center'>
                        <Col className="col-md-6 ">
                            <div className="imagen-overlay">
                                <img className='w-100 h-100 hover-img-login' loading='lazy' src={imagenFarmacia} alt="" />
                                <div className="overlay"></div>
                            </div>
                        </Col>

                        <Col className='col-md-6 d-flex flex-column justify-content-center'>
                            <Outlet />
                        </Col>
                    </Row>

                </Container>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default AuthLayout