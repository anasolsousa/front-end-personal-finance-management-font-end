import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import styles from "./styles.module.css";
import { CirclePlus, Info} from "lucide-react";
import viteLogo from '/money.svg'
import Avatar from '@mui/material/Avatar';
import { blueGrey } from '@mui/material/colors';
import { ClassNames } from "@emotion/react";

function Dashboard(){

    const isLoggedIn = !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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

    return(
        <main>
            {isLoggedIn && (
                <div>
                    <div className={styles.header}>
                        <button className={styles.buttonShowProfile}
                            onClick={() => navigate("/profileUser")}
                        >
                            <Avatar sx={{ bgcolor: blueGrey[200] }}>A</Avatar>
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
                                            <a>
                                            {/* <a onClick={() => setActiveSection("all")}>
                                                <BiListUl className={styles.icon} /> */}
                                                <span>Dashbord</span>
                                            </a>
                                            <a>
                                            {/* <a onClick={() => setActiveSection("category")}>
                                                <BiCategory className={styles.icon} /> */}
                                                <span>Transactions</span>
                                            </a>
                                            <a>
                                            {/* <a onClick={() => setActiveSection("subcategory")}>
                                                <BiSubdirectoryRight className={styles.icon} /> */}
                                                <span>Cards</span>
                                            </a>
                                            <a>
                                            {/* <a onClick={() => setActiveSection("entity")}>
                                                <BiCategoryAlt className={styles.icon} /> */}
                                                <span className={styles.especialSpan}>
                                                    <>Learn More</>
                                                    <><CirclePlus/></>
                                                </span>
                                            </a>
                                        </div>
                                        <div className={styles.logout}>
                                            <a>
                                            {/* <a onClick={() => setActiveSection("subentity")}>
                                                <BiSubdirectoryRight className={styles.icon} /> */}
                                                <span className={styles.especialSpan}>
                                                    <><Info/></>
                                                    <>Help Center</>
                                                </span>
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
                    </div>
                </div>
                )}
        </main>
    )
}

export default Dashboard;