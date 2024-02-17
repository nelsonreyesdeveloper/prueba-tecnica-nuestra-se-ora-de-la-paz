import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useAuth from '../hooks/useAuthHook';
import { useMedicamentos } from '../hooks/useMedicamentosHook';



function OffcanvasExample() {
    const expand = 'lg';
    const navigate = useNavigate();
    const { setPageActive, setLimite, setFiltro} = useMedicamentos()
    const { token, setToken } = useAuth()


    useEffect(() => {

        if (!token) {
            navigate('/')
        }

    }, [token])
    return (
        <>

            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container >
                    <Navbar.Brand href="#">Farmacia Nuestra Señora de la Paz</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {
                                    token && (
                                        <Nav.Link onClick={() => { localStorage.removeItem('token'), setToken(null), setPageActive(1), setLimite(10), setFiltro('') }} >Cerrar sesión</Nav.Link>
                                    )
                                }

                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    );
}

export default OffcanvasExample;