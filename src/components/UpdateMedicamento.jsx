import React, { useEffect } from 'react'

import CurrencyInput from 'react-currency-input-field'
import { useForm } from "react-hook-form";

import useAuth from '../hooks/useAuthHook';
import { useMedicamentos } from "../hooks/useMedicamentosHook"

import { Button, FormGroup, Modal, Row, Col, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';

const UpdateMedicamento = ({ handleClose, medicamento }) => {

    const { handlePutUpdateMedicamento } = useMedicamentos()
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
        console.log(data)

        /* Eliminar todas las comas */
        data.costo = data.costo.replace(/,/g, '');
        data.precioVenta = data.precioVenta.replace(/,/g, '');

        /* Pasar a enteros */
        data.costo = parseInt(data.costo)
        data.precioVenta = parseInt(data.precioVenta)

        const response = await handlePutUpdateMedicamento({ token, data, id: medicamento.id })

        if (response) {
            handleClose()
            toast.success("Medicamento actualizado con exito")
        }
    }
    const validateNoSingleSpace = (value) => {
        return value.trim() !== ""; // Devuelve true si el valor después de quitar los espacios en blanco al inicio y al final no es una cadena vacía.
    };

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Editar Medicamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Row>
                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Nombre</Form.Label>
                                <Form.Control {...register("nombre", { required: true, validate: validateNoSingleSpace })} type="text" placeholder="Nombre" defaultValue={medicamento.nombre} />
                                {
                                    errors?.nombre?.type === 'required' && <span className='text-danger'>El nombre es obligatorio</span>
                                }
                                {
                                    errors?.nombre?.type === 'validate' && <span className='text-danger'>El nombre no debe contener espacios en blanco</span>
                                }
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Proveedor</Form.Label>
                                <Form.Control {...register("proveedor", { required: true, validate: validateNoSingleSpace })} type="text" placeholder="Proveedor" defaultValue={medicamento.proveedor} />
                                {
                                    errors?.proveedor?.type === 'required' && <span className='text-danger'>El proveedor es obligatorio</span>
                                }
                                {
                                    errors?.proveedor?.type === 'validate' && <span className='text-danger'>El proveedor no debe contener espacios en blanco</span>
                                }
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Costo</Form.Label>
                                <CurrencyInput
                                    defaultValue={medicamento.costo}
                                    className='form-control'
                                    placeholder="Costo"
                                    decimalsLimit={0}
                                    prefix='$'
                                    {...register("costo", { required: true, validate: validateNoSingleSpace })}
                                />
                                {
                                    errors?.costo?.type === 'required' && <span className='text-danger'>El costo es obligatorio</span>
                                }
                                {
                                    errors?.costo?.type === 'validate' && <span className='text-danger'>El costo no debe contener espacios en blanco</span>
                                }
                            </FormGroup>
                        </Col>

                        <Col md={6} className="mb-2">
                            <FormGroup>
                                <Form.Label className='fw-bold'>Precio de venta</Form.Label>
                                <CurrencyInput
                                    defaultValue={medicamento.precio_venta} // Establece el valor por defecto aquí
                                    className='form-control'
                                    placeholder="Precio de venta"
                                    decimalsLimit={0}
                                    prefix='$'
                                    {...register("precioVenta", { required: true, validate: validateNoSingleSpace })}
                                />
                                {
                                    errors?.precioVenta?.type === 'required' && <span className='text-danger'>El precio de venta es obligatorio</span>
                                }
                                {
                                    errors?.precioVenta?.type === 'validate' && <span className='text-danger'>El precio de venta no debe contener espacios en blanco</span>
                                }
                            </FormGroup>
                        </Col>
                    </Row>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit">
                            Actualizar Medicamento
                        </Button>
                    </Modal.Footer>

                </Form>

            </Modal.Body>

        </>
    )

}
export default UpdateMedicamento