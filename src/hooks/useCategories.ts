import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Category = {
    id: string,
    name: string,
    icon: string
}

export function useCategories() {

    const [category, setCategory] = useState<Category[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/admin");
        } else {
            fetchCategory();
        }
    }, []);


    async function fetchCategory() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/categories", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json" // Adiciona cabeçalho para aceitar JSON
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Dados recebidos:", data);
                setCategory(data);
                localStorage.setItem("categories", JSON.stringify(data));
            } else {
                const errorText = await response.text();
                console.error("Erro na requisição:", response.status, errorText);
            }
        } catch (error) {
            console.error("Erro de fetch:", error);
        }
    }

    // Função para salvar categorias atualizadas no localStorage
    const saveCategories = (updatedCategories: Category[]) => {
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        setCategory(updatedCategories);
    };

    return {
        category,
        refetch: fetchCategory, // aqui está a função para ser usada fora do hook
        saveCategories // Nova função para salvar no localStorage
        
    };
}