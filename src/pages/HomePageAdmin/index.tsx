import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import styles from "./styles.module.css";
import {useNavigate} from 'react-router-dom';
import { HiLogout } from "react-icons/hi";


function HomePageAdmin() {

    const navigate = useNavigate();

    return(
        <main>

            <button className={styles.buttonBack}
                onClick={() => {
                navigate("");
                }}
                >Back
            </button>

            <Sidebar className={styles.sidebar}>
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="#">
                            All
                        </SidebarItem>
                        <SidebarItem href="#">
                            Category
                        </SidebarItem>
                        <SidebarItem href="#">
                            Subcategory
                        </SidebarItem>
                        <SidebarItem href="#">
                            Entity
                        </SidebarItem>
                        <SidebarItem href="#">
                            SubEnity
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiLogout}>
                            Log-out
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </main>
    )
}

export default HomePageAdmin