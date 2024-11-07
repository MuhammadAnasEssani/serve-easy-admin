import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import './assets/css/default.scss'
import './assets/css/colors.scss'
// Routes
import RouteConfig from './app/utils/RouteConfig'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </div>
  )
}

export default App
