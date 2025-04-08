import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { BiCategory, BiListUl, BiSubdirectoryRight, BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import * as LucideIcons from 'lucide-react';
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEntities } from "../../hooks/useEntities";
import { useSubEntities } from "../../hooks/useSubEntities";

// Função para buscar o componente do ícone
const getIconComponent = (iconName) => {
    // Tenta transformar o nome do ícone para a forma compatível com o pacote `lucide-react`
    try {
        // Transforma o nome do ícone para CamelCase, removendo hífens
        const formattedIconName = iconName
            .split('-')
            .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.charAt(0).toUpperCase() + word.slice(1))
            .join('');

        // Verifica se o ícone existe no pacote `LucideIcons`
        const Icon = LucideIcons[formattedIconName];
        if (Icon) {
            return <Icon />;
        } else {
            console.warn(`Ícone ${iconName} não encontrado no pacote Lucide.`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao tentar acessar o ícone:", error);
        return null;
    }
};


export function HomePageAdmin() {
    const [activeSection, setActiveSection] = useState<string>("all"); // saber qual a opção que vai ficar ativa
 
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
 
    // hooks com fetch
    const category = useCategories();
    const subCategory = useSubCategories();
    const entity = useEntities();
    const subEntity = useSubEntities();

    // ordenar por categoria
    const subCategoriasOrdenadas = [...subCategory].sort((a,b) => 
        a.category.name.localeCompare(b.category.name)
    );
    // ordenar por entidade
    const subEntitiesOrdenadas = [...subEntity].sort((a,b) =>
        a.entity.name.localeCompare(b.entity.name)
    );

 
    return (
        <main>
            {isLoggedIn && (
                <div className={styles.container}>
                    <header>
                        <div>
                            <button className={styles.buttonBack}
                                onClick={() => navigate("/")}
                            >
                                Back
                            </button>
                        </div>
                        <div>
                            <button className={styles.buttonShowProfile}
                                onClick={() => navigate("#")}
                            >
                                Profile
                            </button>
                        </div>
                    </header>

                    <div className={styles.grid}>
                        {/* parte 1 */}
                        <div className={styles.section}>
                            <div className={styles.sidebar}>
                                <div className={styles.SidebarItems}>
                                    <div className={styles.SidebarItemGroup}>
                                        <div>
                                            <a onClick={() => setActiveSection("all")}>
                                                <BiListUl className={styles.icon} />
                                                <span>All</span>
                                            </a>
                                            <a onClick={() => setActiveSection("category")}>
                                                <BiCategory className={styles.icon} />
                                                <span>Category</span>
                                            </a>
                                            <a onClick={() => setActiveSection("subcategory")}>
                                                <BiSubdirectoryRight className={styles.icon} />
                                                <span>Subcategory</span>
                                            </a>
                                            <a onClick={() => setActiveSection("entity")}>
                                                <BiCategoryAlt className={styles.icon} />
                                                <span>Entity</span>
                                            </a>
                                            <a onClick={() => setActiveSection("subentity")}>
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
                        </div>
                        {/* parte 2 */}
                        <div className={styles.section}>
                            <div className={styles.itemList}>
                                {activeSection === "all" && (
                                    <>
                                        <div>
                                            <h1>All</h1>
                                            <h3> Pode editar ou apagar qualquer categoria </h3>
                                        </div>
                                        <div className={styles.table}>
                                            {category.map((categoria) => (
                                                <div className={styles.row} key={categoria.id}>
                                                    <div>{categoria.name}</div>
                                                    {getIconComponent(categoria.icon)}
                                                </div>
                                            ))}
                                          {subCategoriasOrdenadas.map((item) => (
                                                <div className={styles.row}  key={item.id}>
                                                    <div>{item.name}</div>
                                                    {getIconComponent(item.category.icon)}
                                                </div>
                                            ))}
                                            {entity.map((entity) => (
                                               <div className={styles.row} key={entity.id}>
                                                    <div>{entity.name}</div>
                                                    {getIconComponent(entity.icon)}
                                                </div>
                                            ))}
                                            {subEntitiesOrdenadas.map((item) => (
                                                <div className={styles.row} key={item.id}>
                                                    <div>{item.name}</div>
                                                    {getIconComponent(item.entity.icon)}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {activeSection === "category" && (
                                <>
                                    <h1>Category list</h1>
                                    <h3> Pode editar ou apagar qualquer categoria </h3>
                                    <div className={styles.table}>
                                        {category.map((categoria) => (
                                             <div className={styles.row} key={categoria.id}>
                                                <div>{categoria.name}</div>
                                                {getIconComponent(categoria.icon)}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeSection === "subcategory" && (
                                <>
                                    <h1>Sub-Category list</h1>
                                    <h3> Pode editar ou apagar qualquer categoria </h3>
                                    <div className={styles.table}>
                                        {subCategoriasOrdenadas.map((item) => (
                                             <div className={styles.row} key={item.id}>
                                                <div>{item.name}</div>
                                                {getIconComponent(item.category.icon)}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeSection === "entity" && (
                                <>
                                    <h1>Entity list</h1>
                                    <h3> Pode editar ou apagar qualquer categoria </h3>
                                    <div className={styles.table}>
                                        {entity.map((entity) => (
                                             <div className={styles.row} key={entity.id}>
                                                <div>{entity.name}</div>
                                                {getIconComponent(entity.icon)}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeSection === "subentity" && (
                                <>
                                    <h1>Sub-Entity list</h1>
                                    <h3> Pode editar ou apagar qualquer categoria </h3>
                                    <div className={styles.table}>
                                        {subEntitiesOrdenadas.map((item) => (
                                             <div className={styles.row} key={item.id}>
                                                <div>{item.name}</div>
                                                {getIconComponent(item.entity.icon)}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default HomePageAdmin;
