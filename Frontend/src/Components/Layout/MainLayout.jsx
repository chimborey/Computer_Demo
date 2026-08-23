import { Outlet } from 'react-router-dom'
import Header from '../../Pages/Pages/Header'
import Footer from '../../Pages/Pages/Footer'
export default function MainLayout() {
      return (
            <>
                  {/* ------------------ header page ---------------- */}
                  <Header />
                  {/* ------------------ main page ------------------ */}
                  <Outlet />
                  {/* ------------------ Footer page ---------------- */}
                  <Footer />
            </>
      )
}