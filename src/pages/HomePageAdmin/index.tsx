import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { BiCategory, BiListUl, BiSubdirectoryRight, BiCategoryAlt, BiLogOut } from "react-icons/bi";
import { useState } from "react";
import * as LucideIcons from 'lucide-react';
import { Pencil } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { useEntities } from "../../hooks/useEntities";
import { useSubEntities } from "../../hooks/useSubEntities";
import { CirclePlus } from "lucide-react";
import { AddCategoryModal } from "../../components/AddSubAndCategory/AddCategoryModal";
import { AddSubCategoryModal } from "../../components/AddSubAndCategory/AddSubCategoryModal";
import { AddEntityModal } from "../../components/AddEntity/AddEntityModal";
import { AddSubEntityModal } from "../../components/AddEntity/AddSubEnityModal";
import { DeleteCategories } from "../../components/Delete/deleteCategories";
import { DeleteSubCategories } from "../../components/Delete/deleteSubCategories";
import { DeleteSubEnities } from "../../components/Delete/deleteSubEntities";
import { DeleteEnities } from "../../components/Delete/deleteEntities";
import { EditCategories } from "../../components/Edit/EditCategories";
import { EditSubCategories } from "../../components/Edit/EditSubCategories";
import { EditEntity } from "../../components/Edit/EditEntity";
import { EditSubEntities } from "../../components/Edit/EditSubEntity";

import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';

// Função capturar o componente do ícone
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

    const [showModal, setShowModal] = useState<boolean>(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    // category
    const [editingCategoryId, setEditingCategoryId] = useState<string | number | null>(null);
    const openEditModal = (id: string | number) => setEditingCategoryId(id);
    const closeEditModal = () => setEditingCategoryId(null);

    // subcategory
    const [editingSubCategoryId, setEditingSubCategoryId] = useState<string | number | null>(null);
    const openEditSubCategoryModal = (id: string | number) => setEditingSubCategoryId(id);
    const closeEditSubCategoryModal = () => setEditingSubCategoryId(null);

    // Entity
    const [editingEntityId, setEditingEntityId] = useState<string | number | null>(null);
    const openEditEntiyModal = (id: string | number) => setEditingEntityId(id);
    const closeEditEntityModal = () => setEditingEntityId(null);

    // SubEntity
    const [editingSubEntityId, setEditingSubEntityId] = useState<string | number | null>(null);
    const openEditSubEntiyModal = (id: string | number) => setEditingSubEntityId(id);
    const closeEditSubEntityModal = () => setEditingSubEntityId(null);

     
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
    const {category, refetch} = useCategories();
    const {subCategory, refetchSub}  = useSubCategories();
    const {entity, refetchEnity} = useEntities();
    const {subEntity, refetchSubEnity} = useSubEntities();

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
                        <button className={styles.buttonShowProfile}
                            onClick={() => navigate("/profileAdmin")}
                        >
                            <Avatar sx={{ bgcolor: blueGrey[200] }}>A</Avatar>
                        </button>
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
                                            <h3>View all application records here. This page offers a complete overview of all data entered in the system, making monitoring and management easier.</h3>
                                        </div>
                                        <div className={styles.table}>
                                            {category.map((categoria) => (
                                                <div className={styles.rowAll} key={categoria.id}>
                                                    <div>{categoria.name}</div>
                                                    {getIconComponent(categoria.icon)}
                                                </div>
                                            ))}
                                          {subCategoriasOrdenadas.map((item) => (
                                                <div className={styles.rowAll}  key={item.id}>
                                                    <div>{item.name}</div>
                                                    {getIconComponent(item.category.icon)}
                                                </div>
                                            ))}
                                            {entity.map((entity) => (
                                               <div className={styles.rowAll} key={entity.id}>
                                                    <div>{entity.name}</div>
                                                    {getIconComponent(entity.icon)}
                                                </div>
                                            ))}
                                            {subEntitiesOrdenadas.map((item) => (
                                                <div className={styles.rowAll} key={item.id}>
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
                                    <div>
                                        <h1>Category</h1>
                                        <h3>Category management page. Create, edit or delete the main categories that structure the organization of your information and services</h3>
                                    </div>
                                    <div>
                                        <button className={styles.buttonAddData}
                                            onClick={openModal}
                                        >
                                            <CirclePlus/> 
                                            <p>Add</p>
                                        </button>
                                    </div>
                                    <AddCategoryModal 
                                        token={token}
                                        refetch={refetch}
                                        closeModal={closeModal}
                                        isOpen={showModal}
                                    />
                                    <div className={styles.table}>
                                        {category.map((categoria) => (
                                            <div className={styles.row} key={categoria.id}>
                                                
                                                <div className={styles.buttonAction}>
                                                    {/* botao para apagar */}
                                                    <DeleteCategories 
                                                        id={categoria.id} 
                                                        token={token} 
                                                        refetch={refetch} 
                                                    />
                                                    <div>
                                                        <button onClick={() => openEditModal(categoria.id)} className={styles.pencilButton}>
                                                            <Pencil className={styles.pencilButton2}/>
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* Botao de Editar */}
                                                <EditCategories 
                                                    id={categoria.id}
                                                    name={categoria.name}
                                                    icon={categoria.icon}
                                                    token={token} 
                                                    refetch={refetch}
                                                    isCloseModalEdit={closeEditModal}
                                                    isOpenModalEdit={editingCategoryId === categoria.id}
                                                    openEditModal={openEditModal}
                                                />

                                                <div className={styles.gap_label_Modal}>
                                                    <div>{categoria.name}</div>
                                                    {getIconComponent(categoria.icon)} {/* icon */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeSection === "subcategory" && (
                                <>
                                <div>
                                    <h1>SubCategory</h1>
                                    <h3>Manage subcategories associated with each main category. A well-defined subcategory structure improves navigation and user experience.</h3>
                                </div>
                                <div>
                                    <button className={styles.buttonAddData}
                                        onClick={openModal}
                                    >
                                        <CirclePlus/> 
                                        <p>Add</p>
                                    </button>
                                </div>
                                <AddSubCategoryModal
                                    token={token}
                                    refetch={refetchSub}
                                    closeModal={closeModal}
                                    isOpen={showModal}
                                />
                                <div className={styles.table}>
                                    {subCategoriasOrdenadas.map((subCategoria) => (
                                        <div className={styles.row} key={subCategoria.id}>

                                            <div className={styles.buttonAction}>
                                                {/* botao para apagar */}
                                                <DeleteSubCategories 
                                                    id={subCategoria.id} 
                                                    token={token} 
                                                    refetch={refetchSub} 
                                                />

                                                {/* botao de editar */}
                                                <div>
                                                    <button onClick={() => openEditSubCategoryModal(subCategoria.id)} className={styles.pencilButton}>
                                                        <Pencil className={styles.pencilButton2}/>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* passar as props*/}
                                            <EditSubCategories
                                                id={subCategoria.id}
                                                name={subCategoria.name}
                                                category_id={subCategoria.category.id}
                                                category_name={subCategoria.category.name}
                                                token={token} 
                                                refetch={refetchSub}
                                                isCloseModalEdit={closeEditSubCategoryModal}
                                                isOpenModalEdit={editingSubCategoryId === subCategoria.id} // abre o modal do id correspondente
                                                openEditModal={openEditSubCategoryModal}
                                            />

                                            <div className={styles.gap_label_Modal}>
                                                <div>{subCategoria.name}</div>
                                                {getIconComponent(subCategoria.category.icon)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </>
                            )}

                            {activeSection === "entity" && (
                                <>
                                <div>
                                    <h1>Entity</h1>
                                    <h3>Configure the main entities of the system. This area allows you to define the fundamental components that interact in your application, controlling their properties and relationships.</h3>
                                </div>
                                <div>
                                    <button className={styles.buttonAddData}
                                        onClick={openModal}
                                    >
                                        <CirclePlus/> 
                                        <p>Add</p>
                                    </button>
                                </div>
                                    <AddEntityModal 
                                        token={token}
                                        refetch={refetchEnity}
                                        closeModal={closeModal}
                                        isOpen={showModal}
                                    />
                                    <div className={styles.table}>
                                        {entity.map((entity) => (
                                            <div className={styles.row} key={entity.id}>
                                                {/* botao para apagar */}
                                                <div className={styles.buttonAction}>
                                                    <DeleteEnities
                                                        id={entity.id} 
                                                        token={token} 
                                                        refetch={refetchEnity} 
                                                    />
                                                    <div>
                                                        <button onClick={() => openEditEntiyModal(entity.id)} className={styles.pencilButton}>
                                                            <Pencil className={styles.pencilButton2}/>
                                                        </button>
                                                    </div>
                                                </div>
                                               <EditEntity
                                                    id={entity.id}
                                                    name={entity.name}
                                                    icon={entity.icon}
                                                    token={token} 
                                                    refetch={refetchEnity}
                                                    isCloseModalEdit={closeEditEntityModal}
                                                    isOpenModalEdit={editingEntityId === entity.id}
                                                    openEditModal={openEditEntiyModal}
                                               />

                                                <div className={styles.gap_label_Modal}>
                                                    <div>{entity.name}</div>
                                                    {getIconComponent(entity.icon)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                            {activeSection === "subentity" && (
                                <>
                                <div>
                                    <h1>SubEntity</h1>
                                    <h3>Subentity administration area. Define the secondary elements that complement the main entities, allowing for a more refined organization of your data.</h3>
                                </div>
                                <div>
                                    <button className={styles.buttonAddData}
                                            onClick={openModal}
                                        >
                                            <CirclePlus/> 
                                            <p>Add</p>
                                        </button>
                                    </div>
                                        <AddSubEntityModal 
                                            token={token}
                                            refetch={refetchSubEnity}
                                            closeModal={closeModal}
                                            isOpen={showModal}
                                        />
                                <div className={styles.table}>
                                    {subEntitiesOrdenadas.map((subEntities) => (
                                        <div className={styles.row} key={subEntities.id}>
                                            <div className={styles.buttonAction}>
                                            {/* botao para apagar */}
                                                <DeleteSubEnities 
                                                    id={subEntities.id} 
                                                    token={token} 
                                                    refetch={refetchSubEnity} 
                                                />
                                                {/* botao de editar */}
                                                <div>
                                                    <button onClick={() => openEditSubEntiyModal(subEntities.id)} className={styles.pencilButton}>
                                                        <Pencil className={styles.pencilButton2}/>
                                                    </button>
                                                </div>
                                            </div>

                                             {/* passar as props*/}
                                             <EditSubEntities
                                                id={subEntities.id}
                                                name={subEntities.name}
                                                entity_id={subEntities.entity.id}
                                                entity_name={subEntities.entity.name}
                                                token={token} 
                                                refetch={refetchSub}
                                                isCloseModalEdit={closeEditSubEntityModal}
                                                isOpenModalEdit={editingSubEntityId === subEntities.id} // abre o modal do id correspondente
                                                openEditModal={openEditSubEntiyModal}
                                            />
                                           
                                            <div className={styles.gap_label_Modal}>
                                                <div>{subEntities.name}</div>
                                                {getIconComponent(subEntities.entity.icon)}
                                            </div>
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

