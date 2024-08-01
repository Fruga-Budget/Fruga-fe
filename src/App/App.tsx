import './App.css'
import { APIData, BudgetInfo } from '../Interfaces'; 
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import genericPieData from '../Pie/Mock';
import Form from '../Form/Form';
import Results from '../Results/Results';
import LoginForm from '../Login/LogIn';
import SavedBudgets from '../SavedBudgets/SavedBudgets';
import { getData } from '../API/APICalls'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState<APIData>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('userId'));

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
        console.log(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error has occured! Please try again."));
        }
      }
    }
    fetchData();
  }, []);

  const handleFormSubmit = (budgetInfo: BudgetInfo) => { 
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    navigate(`/results`);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userId');
    navigate('/log-in');
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<LandingPage data={genericPieData} />} />
        <Route path='/log-in' element={<LoginForm onLogin={handleLogin} />} />
        <Route path='/getting-started/:userId' element={<Form onSubmit={handleFormSubmit} />} />
        <Route path='/results' element={<Results />} />
        <Route path='/saved-budgets' element={<SavedBudgets />} />
      </Routes>
    </>
  )
}

export default App;
