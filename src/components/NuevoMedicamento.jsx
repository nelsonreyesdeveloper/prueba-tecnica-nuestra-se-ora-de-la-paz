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

        data.costo = parseInt(data.costo)
        data.precioVenta = parseInt(data.precioVenta)

        const response = await handlePostNuevoMedicamento({ token, data })

        if (response) {
            /* Cerrar el modal */
            handleClose()
        }
    }



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
                                <Form.Control {...register("nombre", { required: true })} type="text" placeholder="Nombre" />
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Proveedor</Form.Label>
                                <Form.Control {...register("proveedor", { required: true })} type="text" placeholder="Proveedor" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Costo</Form.Label>
                                <CurrencyInput

                                    className='form-control'
                                    id="costo-label"
                                    name="costo-name"
                                    placeholder="Costo"
                                    decimalsLimit={0}
                                    prefix='$'
                                    onValueChange={(value, name, values) => {
                                        setValue('costo', value)
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Precio de venta</Form.Label>
                                <CurrencyInput
                                    className='form-control'
                                    id="precio-venta-label"
                                    name="precio-venta-name"
                                    placeholder="Precio de venta"
                                    decimalsLimit={0}
                                    prefix='$'
                                    onValueChange={(value, name, values) => setValue('precioVenta', value)}
                                />
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