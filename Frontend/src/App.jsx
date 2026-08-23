import { BrowserRouter } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import AppRouter from "./Router/AppRouter";

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 100,
      offset: 100,
      once: false
    })
  }, [])
  return (
    <BrowserRouter>
      <ToastContainer />
      <AppRouter />
    </BrowserRouter>
  )
}