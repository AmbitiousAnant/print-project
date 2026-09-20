import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import OrderForm from './OrderForm'
import AdminDashboard from './AdminDashboard'
import OrderTracking from './OrderTracking'
import { Printer } from 'lucide-react'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col">
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-white text-zinc-950 p-1.5 rounded-lg">
                <Printer size={20} className="stroke-[2.5]" />
              </div>
              <span className="font-semibold text-lg tracking-tight">Print Studio ABES</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/track" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
                Track Order
              </Link>
              <Link to="/admin" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium">
                Admin
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <Routes>
            <Route path="/" element={<OrderForm />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md py-4 text-center text-sm text-zinc-400 fixed bottom-0 w-full z-40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <span>Built by <strong>Anant Thakkur</strong></span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span>WhatsApp: <a href="https://wa.me/917982350793" target="_blank" rel="noreferrer" className="text-white hover:underline">7982350793</a></span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a href="https://www.linkedin.com/in/anant-thakkur-4b970437a/" target="_blank" rel="noreferrer" className="text-white hover:underline">LinkedIn</a>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
