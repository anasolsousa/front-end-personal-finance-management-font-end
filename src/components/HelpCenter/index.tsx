import styles from "./styles.module.css"
import { LayoutDashboard, TrendingUp, TrendingDown, ChartNoAxesCombined, PiggyBank, LibraryBig} from "lucide-react";

export function HelpCenter(){
    return (
        <main className={styles.container}>
            <p className={styles.indice}>Help Center</p>
                <div className={styles.content}>
                    <h2>Hello, how can we heldp?</h2>
                    <p className={styles.text}>
                        Finoro is your personal finance management app. Here's everything you need to know to get started.
                    </p>
                    <div className={styles.infoPrincipal}>
                        <div className={styles.dashboard}>
                            <p className={styles.alineIcons}>
                                <p><LayoutDashboard size={16}/></p>
                                <h3>Dashboard</h3>  
                            </p>
                           <p>
                                View your current balance, recent transactions, and spending trends all in one place. 
                                Apply filters and export reports when needed.
                            </p>   
                        </div>
                        <div className={styles.rendi}>
                            <p className={styles.alineIcons}>
                                <p><TrendingUp size={16}/> </p>
                                <h3>Incomes</h3>
                            </p>
                            <p>
                                Record and track all your sources of income. Analyze progress through charts and export data for external analysis.
                            </p>
                        </div>

                        <div className={styles.gastos}>
                            <p className={styles.alineIcons}>
                                <p><TrendingDown size={16}/></p>
                                <h3>Expenses</h3>
                            </p>
                            <p>
                                Add your expenses and categorize them automatically (food, transport, leisure, etc.). View spending distribution through charts and manage your budget.
                            </p>
                        </div>

                        <div className={styles.invest}>
                            <p className={styles.alineIcons}>
                                <p><ChartNoAxesCombined size={16}/> </p>
                                <h3>Investments</h3>
                            </p>
                            <p>
                                Manage your investment portfolio, analyze performance through charts, and access educational content on the topic.
                            </p>
                        </div>

                        <div className={styles.poupa}>
                            <p className={styles.alineIcons}>
                                <p><PiggyBank size={16}/> </p>
                                <h3>Savings</h3>
                            </p>
                            <p>
                                Track the growth of your savings and set financial goals. Compare different products and export reports.
                            </p>
                        </div>

                        <div className={styles.form}>
                            <p className={styles.alineIcons}>
                                <p><LibraryBig size={16}/></p>
                                <h3>Learn More</h3>
                            </p>
                            <p>
                                Improve your financial knowledge with tips, podcasts, and regularly updated educational information.
                            </p>
                        </div>
                    </div>
                </div>
        </main>
    )
}