import React from 'react'

import CurrencyInput from 'react-currency-input-field'
import { useForm } from "react-hook-form";

import useAuth from '../hooks/useAuthHook';
import { useMedicamentos } from "../hooks/useMedicamentosHook"

import { Button, FormGroup, Modal, Row, Col, Form } from 'react-bootstrap'

const NuevoMedicamento = ({ handleClose }) => {
    const { handlePostNuevoMedicamento } = useMedicamentos()
    const { token } = useAuth()


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm()
    /* Validar los datos */
    const onSubmit = async (data) => {

        if (Object.values(data).includes('')) {
            toast.error('Todos los campos son obligatorios')
            return
        }

        /*eliminar prefijo de costo y precio  */
        data.costo = data.costo.replace('$', '')
        data.precioVenta = data.precioVenta.replace('$', '')

        data.costo = parseInt(data.costo)
        data.precioVenta = parseInt(data.precioVenta)

        const response = await handlePostNuevoMedicamento({ token, data })

        if (response) {
            /* Cerrar el modal */
            handleClose()
        }
    }

    const validateNoSingleSpace = (value) => {
        return value.trim() !== ""; // Devuelve true si el valor después de quitar los espacios en blanco al inicio y al final no es una cadena vacía.
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo Medicamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Row>
                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Nombre</Form.Label>
                                <Form.Control {...register("nombre", { required: true, validate: validateNoSingleSpace })} type="text" placeholder="Nombre" />

                                {
                                    errors?.nombre?.type === 'required' && <span className='text-danger block'>El nombre es obligatorio</span>

                                }
                                {
                                    errors?.nombre?.type === "validate" && <span className='text-danger block'>No se permiten espacios en blanco.</span>
                                }

                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Proveedor</Form.Label>
                                <Form.Control {...register("proveedor", { required: true, validate: validateNoSingleSpace })} type="text" placeholder="Proveedor" />
                                {
                                    errors?.proveedor?.type === 'required' && <span className='text-danger'>El Proveedor es obligatorio</span>
                                }
                                {
                                    errors?.proveedor?.type === "validate" && <span className='text-danger'>No se permiten espacios en blanco.</span>
                                }
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Costo</Form.Label>
                                <CurrencyInput
                                    {...register("costo", { required: true, validate: validateNoSingleSpace })}
                                    className='form-control'
                                    placeholder="Costo"
                                    decimalsLimit={0}
                                    prefix='$'

                                />

                                {
                                    errors?.costo?.type === 'required' && <span className='text-danger'>El Costo es obligatorio</span>
                                }
                                {
                                    errors?.costo?.type === "validate" && <span className='text-danger'>No se permiten espacios en blanco.</span>
                                }
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Precio de venta</Form.Label>
                                <CurrencyInput
                                    {...register("precioVenta", { required: true, validate: validateNoSingleSpace })}
                                    className='form-control'
                                    placeholder="Precio de venta"
                                    decimalsLimit={0}
                                    prefix='$'

                                />
                                {
                                    errors?.precioVenta?.type === 'required' && <span className='text-danger'>El Precio de venta es obligatorio</span>
                                }
                                {
                                    errors?.precioVenta?.type === "validate" && <span className='text-danger'>No se permiten espacios en blanco.</span>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar Medicamento
                        </Button>
                    </Modal.Footer>

                </Form>

            </Modal.Body>
        </>
    )

}
export default NuevoMedicamento