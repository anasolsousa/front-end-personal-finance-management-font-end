import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SubCategoryAndCategory = {

    id: string;
    name: string;
    category: {

        id: string,
        name: string,
        icon: string
    };
}

export function useSubCategories() {

    const [subCategory, setSubCategory] = useState<SubCategoryAndCategory[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // mudar esta parte
    useEffect(() => {
        if(!isLoggedIn) {
            navigate("/admin");
        } else{
            fetchSubCategory();
        }
    },[]);

    async function fetchSubCategory() {
        try {
            const response = await fetch("http://localhost:8000/api/auth/subcategories", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                setSubCategory(await response.json());
            } else {
                console.error("Erro ao buscar subcategorias");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        subCategory,
        refetchSub: fetchSubCategory, // aqui tambem 
    };
}