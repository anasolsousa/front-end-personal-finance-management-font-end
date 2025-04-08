import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SubEntityAndEntity = {

    id: string;
    name: string;
    entity: {

        id: string,
        name: string,
        icon: string
    };
}

export function useSubEntities() {

    const [subEntity, setSubEntity] = useState<SubEntityAndEntity[]>([]);
    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!isLoggedIn) {
        setTimeout(() => {
            navigate("/admin");
        }, 100);
        return null;
    }

    useEffect(() => {
        fetchSubEntity();
    }, []);

   async function fetchSubEntity() {
          try {
              const response = await fetch("http://localhost:8000/api/auth/subEntity", {
                  headers: { "Authorization": `Bearer ${token}` }
              });
              if (response.ok) {
                  setSubEntity(await response.json());
              } else {
                  console.error("Erro ao buscar subentidades");
              }
          } catch (error) {
              console.error(error);
          }
      }

    return subEntity;
}