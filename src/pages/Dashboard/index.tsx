import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import styles from "./styles.module.css";

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
                    <h1>OI</h1>
                    <button className={styles.logout}>
                        <a onClick={handleLogout}>
                            <BiLogOut className={styles.icon} />
                            <span>Log-out</span>
                        </a>
                    </button>
                </div>
            )}
        </main>
    )
}

export default Dashboard;