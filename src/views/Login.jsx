import React, { useEffect } from 'react'
/* Componentes de bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/*Funcion que genera el title */
import { generateTitle } from '../utils/functions';

/* Manejar Formularios  */
import { useForm } from "react-hook-form";

/* Toast para alertas bonitas :)*/
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Local Storage */
import useAuth from '../hooks/useAuthHook';

/* REDIRECCION */
import { useNavigate } from "react-router-dom";
const Login = () => {
    generateTitle('Farmacia - Login')

    const navigate = useNavigate();

    const { token, setToken } = useAuth();

    useEffect(() => {

        if (token) {
            navigate('/dashboard');
        }

    }, [token])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        /* Validar los datos */
        if (!data.usuario || !data.password) {
            alert('Todos los campos son obligatorios')
            return
        }

        /* Envia los datos */
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })


            if (response.ok) {
                const { token } = await response.json()
                setToken(token)
                localStorage.setItem('token', token)

            } else {
                const { message } = await response.json()
                toast.error(message)
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <h1 className='text-center mt-0 fw-bold text-uppercase'>Inicia sesión</h1>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className='text-uppercase fw-bold' >Usuario</Form.Label>
                    <Form.Control {...register("usuario", { required: true })} type="text" placeholder="Introduce el usuario" />
                    {
                        errors.usuario && <p className='text-danger'>El usuario es obligatorio</p>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className='text-uppercase fw-bold'>Contraseña</Form.Label>
                    <Form.Control {...register("password", { required: true })} type="password" placeholder="Contraseña" />
                    {
                        errors.password && <p className='text-danger'>La contraseña es obligatoria</p>
                    }
                </Form.Group>

                <div className='w-100 d-flex justify-content-end'>
                    <Button className='w-md-50' size="md" variant="primary" type="submit">
                        Entrar
                    </Button>

                </div>


            </Form>

            <ToastContainer />

        </>
    )
}

export default Login