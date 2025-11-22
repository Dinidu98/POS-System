import './App.css'
import MainPage from './pages/MainPage'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <div >
      <ToastContainer />
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route/>
          </Routes>
        </Router>
        
        </Provider>
    </div>
  )
}

export default App
