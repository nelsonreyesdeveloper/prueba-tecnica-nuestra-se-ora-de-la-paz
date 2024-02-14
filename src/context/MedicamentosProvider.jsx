import React from 'react'
import { createContext, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuthHook'
import { toast } from 'react-toastify'


export const MedicamentosContext = createContext()


const MedicamentosProvider = ({ children }) => {

    /*por defecto el filtro es vacío  */
    const [filtro, setFiltro] = useState('');
    /* Por defecto el limite es 10 */
    const [limite, setLimite] = useState(10);

    /* Guardar los medicamentos */
    const [medicamentos, setMedicamentos] = useState([]);
    /*Total paginas y total registros  */
    const [params, setParams] = useState(null);
    /*Pagina activa por defecto 1  */
    const [pageActive, setPageActive] = useState(1);

    const [change, setChange] = useState(false);



    /*Obtener Medicamentos  */
    const getMedicamentos = async (token) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/medicamentos?limit=${limite}&filter=${filtro}&page=${pageActive === 0 ? 1 : pageActive}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })

            const data = await response.json()

            setMedicamentos(data.medicamento)
            setParams(data.params)

            // Ajustar la página activa si es mayor que el número total de páginas
            if (pageActive > data.params.pages) {
                setPageActive(data.params.pages === 0 ? 1 : data.params.pages);
            }
        } catch (error) {
            console.log(error)
        }
    }

    /* Nuevo medicamento */
    const handlePostNuevoMedicamento = async ({ token, data }) => {

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/medicamentos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            })

            const dataresponse = await response.json()

            if (response.ok) {
                toast.success("Medicamento creado con exito")
                setChange(!change)
                return true
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePutUpdateMedicamento = async ({ token, data, id }) => {
        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            })

            const dataresponse = await response.json()

            if (response.ok) {
                setChange(!change)
             
                return true
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    /* Eliminar Medicamento */
    const handleDeleteMedicamento = async ({ token, id }) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/medicamentos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

            const data = await response.json()

            if (response.ok) {
                toast.success("Medicamento eliminado con exito")
                setChange(!change)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const exportar = {
        filtro, change,handlePutUpdateMedicamento, handleDeleteMedicamento, setFiltro, setLimite, medicamentos, params, pageActive, setPageActive, getMedicamentos, limite, handlePostNuevoMedicamento
    }

    return (
        <MedicamentosContext.Provider value={exportar}>
            {children}
        </MedicamentosContext.Provider>
    )
}

export default MedicamentosProvider