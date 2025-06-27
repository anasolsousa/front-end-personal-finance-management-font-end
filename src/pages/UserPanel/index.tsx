import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import styles from "./styles.module.css";
import { Info, LayoutDashboard, ArrowRightLeft, CreditCard, LibraryBig} from "lucide-react";
import viteLogo from '/money.svg'
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { useState } from "react";
import { Dashboard } from "../../components/Dashboard";
import { Transactions } from "../../components/Transactions";
import { Wallets } from "../../components/Wallets";
import { LearnMore } from "../../components/LearnMore";
import { HelpCenter } from "../../components/HelpCenter";


function UserPanel(){

    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");  

    const [activeSection, setActiveSection] = useState<string>("Dashboard"); // saber qual a opção que vai ficar ativa
    

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
                <div>
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
                                             <a onClick={() => setActiveSection("Dashboard")}
                                                className={activeSection === "Dashboard" ? styles.active : ""}
                                                >
                                                <LayoutDashboard size={16}/>
                                                <span>Dashboard</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Transactions")}
                                                className={activeSection === "Transactions" ? styles.active : ""}
                                                >
                                                <ArrowRightLeft size={16}/>
                                                <span>Transactions</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Wallets")}
                                                className={activeSection === "Wallets" ? styles.active : ""}
                                                >
                                                <CreditCard size={16}/>
                                                <span>Wallet</span>
                                            </a>
                                            <a onClick={() => setActiveSection("Learn More")}
                                                className={activeSection === "Learn More" ? styles.active : ""}
                                                >
                                                <LibraryBig size={16}/>
                                                <span> Learn More </span>
                                            </a>
                                        </div>
                                        <div className={styles.logout}>
                                            <a onClick={() => setActiveSection("Help Center")}
                                                className={activeSection === "Help Center" ? styles.active : ""}
                                                >
                                                <Info size={16}/>
                                                <span> Help Center </span>
                                            </a>
                                            <a onClick={handleLogout}>
                                                <BiLogOut size={16}/>
                                                <span>Log-out</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sectionContent}>
                            <div className={styles.itemList}>
                                {activeSection === "Dashboard" && (
                                    <>
                                        <Dashboard/>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Transactions" && (
                                    <>
                                        <Transactions/>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Wallets" && (
                                    <>
                                        <Wallets/>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Learn More" && (
                                    <>
                                        <LearnMore/>
                                    </>
                                )}
                            </div>
                            <div className={styles.itemList}>
                                {activeSection === "Help Center" && (
                                    <>
                                        <HelpCenter/>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                )}
        </main>
    )
}

export default UserPanel;