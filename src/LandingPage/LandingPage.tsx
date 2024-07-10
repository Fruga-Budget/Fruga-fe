import "./LandingPage.css"
function LandingPage (){
    return(
        <>
            <main>
                <div className="landing-info">
                    <div className="budget">
                        <h2>Why Budget?</h2>
                        <p> Budgeting is an essential building block to financial security and stability. It allows you to plan for big expenses and have peace of mind in the instance of an emergency. With changes in inflation and cost of living constantly rising, budgeting is still one of the most vital tools to obtaining financial freedom. learn more Below!</p>
                        <a href="https://www.investopedia.com/financial-edge/1109/6-reasons-why-you-need-a-budget.aspx">Purpose of Budgeting</a>
                    </div>
                    <div className="fruga">
                        <h2>Why Fruga?</h2>
                        <p>Fruga was created with people in mind. Budgeting takes a lot of mental capacity, let us do it for you and offer suggestions in making your budget better</p>
                        <a href="https://www.nerdwallet.com/article/finance/how-to-budget">How to Budget</a>
                    </div>
                </div>
                <div className="button">
                    <button>Let's Get Started!</button>
                </div>
            </main>
        </>
    )
}
export default LandingPage