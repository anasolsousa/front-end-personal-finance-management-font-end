import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { BiCategory, BiListUl, BiSubdirectoryRight, BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";

type category = {
    id: string,
    name: string,
    icon: string
}

type Subcategory = {
    id: string;
    name: string;
    category_id: string;
};

type Entity = {
    id: string;
    name: string;
    icon: string;
};

type SubEntity = {
    id: string;
    name: string;
    entity_id: string;
};

export function HomePageAdmin(){

    const [category, setCategory] = useState<category[]>([]);
    const [subCategory, setSubCategory] = useState<Subcategory[]>([]);
    const [entity, setEntity] = useState<Entity[]>([]);
    const [subEntity, setSubEntity] = useState<SubEntity[]>([]);

    const isLoggedIn = !!localStorage.getItem("token"); 
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (!isLoggedIn) {
        setTimeout(() => {
            navigate("/admin");
        }, 100);
        return null;
    }

    useEffect(() => {
        console.log("Token atual:", token); // Adicione este log
        fetchCategory();
        fetchEntity();
        fetchSubCategory();
        fetchSubEntity();
    }, [])

    async function fetchCategory() {
        try{
          const response = await fetch("http://localhost:8000/api/auth/categories", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json" // Adicione este cabeçalho
            }
          });
  
          if(response.ok){
            const data = await response.json();
            console.log("Dados recebidos:", data);
            setCategory(data);
          }
          else{
            const errorText = await response.text();
            console.error("Erro na requisição:", response.status, errorText);
          }
        } catch (error) {
            console.error("Erro de fetch:", error);
        }
      }

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

    return(
        <main>
        {isLoggedIn && (
            <div>
                <button className={styles.buttonBack} onClick={() => navigate("/")}>Back</button>
                    <div className={styles.sidebar}>
                        <div className={styles.SidebarItems}>
                            <div className={styles.SidebarItemGroup}>
                                <div>
                                    <a>
                                        <BiListUl className={styles.icon} />
                                        <span>All</span>
                                    </a>
                                    <a>
                                        <BiCategory className={styles.icon} />
                                        <span>Category</span>
                                    </a>
                                    <a>
                                        <BiSubdirectoryRight className={styles.icon} />
                                        <span>Subcategory</span>
                                    </a>
                                    <a>
                                        <BiCategoryAlt className={styles.icon} />
                                        <span>Entity</span>
                                    </a>
                                    <a>
                                        <BiSubdirectoryRight className={styles.icon} />
                                        <span>SubEntity</span>
                                    </a>
                                </div>
                                    <div className={styles.logout}>
                                        <a onClick={handleLogout}>
                                            <BiLogOut className={styles.icon} />
                                            <span>Log-out</span>
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        {category.map((categoria) => {
                            return <p key={categoria.id}> {categoria.name}</p>
                        })}
                    </div>
                    <div>
                        {subCategory.map((categoria) => {
                            return <p key={categoria.id}> {categoria.name}</p>
                        })}
                    </div>
                    <div>
                        {entity.map((categoria) => {
                            return <p key={categoria.id}> {categoria.name}</p>
                        })}
                    </div>
                    <div>
                        {subEntity.map((categoria) => {
                            return <p key={categoria.id}> {categoria.name}</p>
                        })}
                    </div>
            </div>
        )}
    </main>
    )

}

export default HomePageAdmin;