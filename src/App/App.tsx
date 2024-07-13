import './App.css'
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import genericPieData from '../Pie/Mock';
import Form from '../Form/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Results from '../Results/Results';
import { BudgetInfo } from '../Interfaces'; 

function App() {
  const navigate = useNavigate();

  const handleFormSubmit = (budgetInfo: BudgetInfo) => { 
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    navigate('/results');
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage data={genericPieData} />} />
        <Route path='/getting-started' element={<Form onSubmit={handleFormSubmit} />} />
        <Route path='/results' element={<Results />} />
        {/* <Route path='/log-in'  element={} /> */}
        {/* <Route path='/log-in'  element={} />
        <Route path='/log-in'  element={} /> */}
      </Routes>
    </>
  )
}

export default App;
