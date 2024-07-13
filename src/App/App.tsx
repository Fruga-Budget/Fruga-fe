import './App.css'
import { BudgetInfo } from '../Interfaces'; 
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import genericPieData from '../Pie/Mock';
import Form from '../Form/Form';
import Results from '../Results/Results';
import LoginForm from '../Login/LogIn';

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
        <Route path='/log-in'  element={<LoginForm />} />
        {/* <Route path='/:id/saved'  element={} />
        <Route path='/log-in'  element={} /> */}
      </Routes>
    </>
  )
}

export default App;
