import './App.css'
import Header from '../Header/Header'
import LandingPage from '../LandingPage/LandingPage'
import genericPieData from '../Pie/Mock';
import Form from '../Form/Form';
import { Routes, Route } from 'react-router-dom';
import Results from '../Results/Results';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage data={genericPieData} />}/>
        <Route path='/getting-started' element={<Form/>} />
        <Route path='/results' element={<Results/>} />
        {/* <Route path='/saved' element={} /> */}
      </Routes>
    </>
  )
}

export default App
