import { useContext } from "react";
import { MedicamentosContext } from "../context/MedicamentosProvider";

export const useMedicamentos = () => {
    return useContext(MedicamentosContext);
}