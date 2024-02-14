import React, { useEffect, useState } from 'react'
import { Button, Pagination, Table } from 'react-bootstrap'
import { useMedicamentos } from '../hooks/useMedicamentosHook'

import { Pencil, Trash } from 'react-bootstrap-icons'
import formatearDinero from '../utils/formatearDinero'
import useAuth from '../hooks/useAuthHook'
import Swal from 'sweetalert2'
import ModalMedicamento from './ModalMedicamento'
import { ToastContainer, toast } from 'react-toastify'
import UpdateMedicamento from './UpdateMedicamento'

const TableMedicamentos = () => {

    /* Objeto Medicamento */
    const [medicamento, setMedicamento] = useState({})
    /* Hooks de medicamentos */
    const { token, isAuthenticated } = useAuth();

    const { params, change, setPageActive, medicamentos, getMedicamentos, pageActive, filtro, limite, handleDeleteMedicamento } = useMedicamentos()

    useEffect(() => {
        if (isAuthenticated) {
            getMedicamentos(token);

        }
    }, [isAuthenticated, token, filtro, limite, pageActive, change]);


    const header = medicamentos.length > 0 ? medicamentos.map((heading) => {
        return {
            Id: heading.id,
            Nombre: heading.nombre,
            Costo: heading.costo,
            "Precio de Venta": heading.precio_venta,
            Proveedor: heading.proveedor
        }
    }) : null


    /*lOGICA DE PAGINACION  */
    let active = pageActive;
    let items = [];
    const pages = params !== null ? params.pages : 0

    if (pages !== null) {
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === active}
                    onClick={() => handlePageChange(number)} // Aquí puedes llamar a una función que maneje el cambio de página
                >
                    {number}
                </Pagination.Item>,
            );
        }
    }

    const handlePageChange = (number) => {
        setPageActive(number)
    }

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar?',
            text: "No podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteMedicamento({ token, id })
              
            }
        })

    }



    /*Update Medicamento Modal    */
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>

                        {header !== null && (
                            <>
                                {Object.keys(header[0]).map((heading) => {
                                    return <th key={heading}>{heading}</th>;
                                })}
                                <th>Opciones</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.length > 0 ? (
                        medicamentos.map((medicamento) => {
                            return (
                                <tr key={medicamento.id}>
                                    <td> {medicamento.id} </td>
                                    <td> {medicamento.nombre} </td>
                                    <td> {formatearDinero(medicamento.costo)} </td>
                                    <td> {formatearDinero(medicamento.precio_venta)} </td>
                                    <td> {medicamento.proveedor} </td>
                                    <td className='d-flex flex-column gap-2'>

                                        <Button onClick={() => handleDeleteClick(medicamento.id)} variant="danger fw-bold">Eliminar
                                            <Trash className='ms-2' />
                                        </Button>
                                        <Button onClick={() => { setMedicamento(medicamento); handleShow() }} variant="primary  fw-bold">Editar
                                            <Pencil className='ms-2' />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6">Sin resultados...</td>
                        </tr>
                    )}

                </tbody>

            </Table>

            {
                params !== null && (
                    <Pagination className="justify-content-center">
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={pages <= 1 || active === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(active - 1)} disabled={pages <= 1 || active === 1} />
                        {items}
                        <Pagination.Next onClick={() => handlePageChange(active + 1)} disabled={pages <= 1 || active === pages} />
                        <Pagination.Last onClick={() => handlePageChange(pages)} disabled={pages <= 1 || active === pages} />
                    </Pagination>
                )
            }

            <ModalMedicamento show={show} handleClose={handleClose} >
                <UpdateMedicamento handleClose={handleClose} medicamento={medicamento}></UpdateMedicamento>
            </ModalMedicamento>

            <ToastContainer />

        </>

    )
}

export default TableMedicamentos