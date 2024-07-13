import "./LandingPage.css"
import PieChart from "../Pie/Pie"
import genericPieData from "../Pie/Mock"
import { Link } from "react-router-dom"
import {LandingPageProps} from "../Interfaces"


const LandingPage: React.FC<LandingPageProps> = ({ data }) => {
    data = genericPieData;
    return (
        <>
            <main>
                <div className="content">
                    <div className="landing-info">
                        <div className="budget">
                            <h2>Why Budget?</h2>
                            <p> Budgeting is an essential building block to financial security and stability. It allows you to plan for big expenses and have peace of mind in the instance of an emergency. With changes in inflation and cost of living constantly rising, budgeting is still one of the most vital tools to obtaining financial freedom. learn more below!</p>
                            <a href="https://www.investopedia.com/financial-edge/1109/6-reasons-why-you-need-a-budget.aspx">Purpose of Budgeting</a>
                        </div>
                        <div className="fruga">
                            <h2>Why Fruga?</h2>
                            <p>Fruga was created with people in mind. Budgeting takes a lot of mental capacity, let us do it for you and offer suggestions in making your budget better. Learn more below!</p>
                            <a href="https://www.nerdwallet.com/article/finance/how-to-budget">How to Budget</a>
                        </div>
                    </div>
                    <aside className="pie-chart">
                        <PieChart data={data} />
                    </aside>
                </div>
                <div className="button">
                    <Link to={'/log-in'}>
                        <button>Let's Get Started!</button>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default LandingPage;