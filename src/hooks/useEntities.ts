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

    async function fetchEntity() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/entities", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setEntity(data);
            } else {
                const errorText = await response.text();
                console.error("Erro na requisição:", response.status, errorText);
            }
        } catch (error) {
            console.error("Erro de fetch:", error);
        }
    }

    return {
        entity,
        refetchEnity: fetchEntity
    } 
}