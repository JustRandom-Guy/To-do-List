import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'
import './App.css'

/**
 * Root of the application.
 *
 * App only wires things together - the shared task state lives in
 * Home so that the statistics page can receive the same list as a prop.
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="app__footer">
          <p>
            TaskFlow &mdash; built with React for the React course project. Data is
            saved in your browser.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
