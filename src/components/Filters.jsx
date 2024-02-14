import React from 'react'
import { Form, Row, Col, Container, InputGroup } from 'react-bootstrap'

import { useMedicamentos } from '../hooks/useMedicamentosHook'

const Filters = () => {

    const { setFiltro, setLimite, filtro } = useMedicamentos()

    /* Cambiando cuantos registros mostrar 10, 25 o 100 */
    const handleChangeLimite = (e) => {
        const selectElement = e.target;
        const selectedIndex = selectElement.selectedIndex;
        const selectedOption = selectElement.options[selectedIndex];
        const selectedText = selectedOption.innerText;

        setLimite(selectedText)
    }

    /* Filtrando por coincidencias */
    const handleChangeFiltro = (e) => {
        setFiltro(e.target.value)
    }

    return (
        <>
            <div className='d-flex flex-column gap-3 flex-sm-row justify-content-between mb-3'>
                <div className="d-flex flex-column gap-1 flex-sm-row align-items-center ">
                    <p className="fw-bold">Mostrar</p>
                    <Form.Select onChange={handleChangeLimite} style={{ width: '100px' }} aria-label="Default select example" className="mb-2 mb-md-0">
                        <option value="1">10</option>
                        <option value="2">25</option>
                        <option value="3">100</option>
                    </Form.Select>
                    <p className="fw-bold">Registros</p>
                </div>

                <div>
                    <Form.Label className="fw-bold" htmlFor="filtros">Buscar por Filtros</Form.Label>
                    <Form.Control
                        type="text"
                        id="filtros"
                        name="filtros"
                        onChange={handleChangeFiltro}
                        value={filtro}

                    />

                    <Form.Text onClick={() => setFiltro('')} style={{ cursor: 'pointer' }} className="text-muted pe-auto text-decoration-underline cursor-pointer"> Borrar el filtro</Form.Text>
                </div>

            </div>
        </>
    )
}

export default Filters