import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Entity = {
    id: string;
    name: string;
    icon: string;
};


export function useEntities() {

    const [entity, setEntity] = useState<Entity[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // para nao retoranar null
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/admin");
        } else {
            fetchEntity();
        }
    }, []);

    useEffect(() => {
        fetchEntity();
    }, []);

    async function fetchEntity() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/entities", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setEntity(await response.json());
            } else {
                console.error("Erro ao buscar entidades");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return entity;
}