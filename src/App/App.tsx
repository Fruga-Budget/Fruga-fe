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
  const [data, setData] = useState<APIData>()
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setData(result);
      } catch (err: unknown) {
        if(err instanceof Error){
          setError(error);
        }else{
          setError(new Error("Unknown error has occured! Please try again."))
        }
      }
    }
    fetchData();
  }, []);

  const handleFormSubmit = (budgetInfo: BudgetInfo) => { 
    localStorage.setItem('budgetInfo', JSON.stringify(budgetInfo));
    //const userId = localStorage.getItem('userId')
    navigate(`/results`);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage data={genericPieData} />} />
        <Route path='/log-in'  element={<LoginForm />} />
        <Route path='/saved-budgets' element={<SavedBudgets />} />
        {/* <Route path='/:id/saved'  element={} />
        <Route path='/log-in'  element={} /> */}

        {/* <Route path='/:id/saved'  element={} />*/}


        <Route path='/getting-started/:userId' element={<Form onSubmit={handleFormSubmit} />} />
        <Route path='/results' element={<Results />} />
        {/* <Route path='/:id/saved'  element={} /> */}

      </Routes>
    </>
  )
}

export default App;
