import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Hem from "./pages/Hem"
import Boende from "./pages/Boende"
import Upplevelser from "./pages/Upplevelser"
import LogIn from "./pages/Login"
import Favoriter from "./pages/Favoriter"
import CardSlider from './components/CardSlider'
import Layout from "./layout/Layout"
import BoendeDetailPage from "./pages/BoendeDetailPage"

function AppWrapper() {
  const location = useLocation()

  // Visa sökfältet bara på start och boende
  const showSearch = location.pathname === '/' || location.pathname === '/boende'

  return (
    <Layout showSearch={showSearch}>
      <Routes>
        <Route path="/" element={<Hem />} />
        <Route path="/boende" element={<Boende />} />
        <Route path="/boende/:id" element={<BoendeDetailPage />} />
        <Route path="/upplevelser" element={<Upplevelser />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/favoriter" element={<Favoriter />} />
      </Routes>
      <CardSlider />
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  )
}

export default App
