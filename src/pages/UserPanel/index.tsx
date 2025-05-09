import { useNavigate } from "react-router-dom";
import { BiCategory, BiCategoryAlt, BiListUl, BiLogOut, BiSubdirectoryRight } from "react-icons/bi";
import styles from "./styles.module.css";
import { CirclePlus, Info} from "lucide-react";
import viteLogo from '/money.svg'
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { act, useState } from "react";
import { Dashboard } from "../../components/Dashbord";

function UserPanel(){

    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");  

    const [activeSection, setActiveSection] = useState<string>("Dashbord"); // saber qual a opção que vai ficar ativa
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/user");
    };

    if (!isLoggedIn) {
        setTimeout(() => {
            navigate("/user");
        }, 100);
        return null;
    }

    
    const img = localStorage.getItem(`savedImage_${userId}`);
    const name = localStorage.getItem('UserName');

    return(
        <main>
            {isLoggedIn && (
                <div>
                    <div className={styles.header}>
                        <button className={styles.buttonShowProfile}
                            onClick={() => navigate("/profileUser")}
                        >
                            {img ? (
                                <Avatar sx={{ bgcolor: blueGrey[200]}} src={img}/>
                            ) : (
                                <Avatar sx={{ bgcolor: blueGrey[200]}}>{name}</Avatar>
                            )}
                        </button>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.section}>
                            <div className={styles.sidebar}>
                                <div className={styles.SidebarItems}>
                                    <div className={styles.SidebarItemGroup}>
                                        <div>
                                            <p className={styles.logoName}>
                                                <>Finoro</>
                                                <img src={viteLogo} className={styles.logo} alt="Vite logo" />
                                            </p>
                                             <a onClick={() => setActiveSection("Dashbord")}
                                                className={activeSection === "Dashbord" ? styles.active : ""}
                                                >
                                                <BiListUl className={styles.icon} />
                                                <span>Dashbord</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Transactions")}
                                                className={activeSection === "Transactions" ? styles.active : ""}
                                                >
                                                <BiCategory className={styles.icon} />
                                                <span>Transactions</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Cards")}
                                                className={activeSection === "Cards" ? styles.active : ""}
                                                >
                                                <BiSubdirectoryRight className={styles.icon} />
                                                <span>Cards</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Learn More")}
                                                className={activeSection === "Learn More" ? styles.active : ""}
                                                >
                                                <CirclePlus className={styles.icon} />
                                                <span> Learn More </span>
                                            </a>
                                        </div>
                                        <div className={styles.logout}>
                                            <a onClick={() => setActiveSection("Help Center")}
                                                className={activeSection === "Help Center" ? styles.active : ""}
                                                >
                                                <Info className={styles.icon} />
                                                <span> Help Center </span>
                                            </a>
                                            <a onClick={handleLogout}>
                                                <BiLogOut className={styles.icon} />
                                                <span>Log-out</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sectionContent}>
                            <div className={styles.itemList}>
                                {activeSection === "Dashbord" && (
                                    <>
                                        <Dashboard/>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Transactions" && (
                                    <>
                                        <p>Transactions</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Cards" && (
                                    <>
                                        <p>Cards</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Learn More" && (
                                    <>
                                        <p>Learn More</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Help Center" && (
                                    <>
                                        <p>Help Center</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </main>
    )
}

export default UserPanel;