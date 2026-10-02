import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Storefront from './StoreFront'
import PrintPage from './PrintPage'
import CalculatorsCategory from './CalculatorsCategory'
import RegistersCategory from './RegistersCategory'
import Cart from './Cart'
import TrackOrder from './TrackOrder'
import AdminDashboard from './AdminDashboard'
import { Printer, MessageCircle, Linkedin, ShoppingCart } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"
import { CartProvider, useCart } from './CartContext'

function Navbar() {
  const { cartItems } = useCart();
  
  return (
    <nav className="border-b border-[#d4cebd]/10 bg-[#1a1917]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-[#d4cebd] hover:text-white">
          <div className="bg-[#d4cebd] text-[#1a1917] p-1.5 rounded-lg">
            <Printer size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Print Studio</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/track" className="text-sm text-[#d4cebd] hover:text-white transition-colors font-medium">
            Track Order
          </Link>
          <Link to="/cart" className="relative text-[#d4cebd] hover:text-white transition-colors flex items-center gap-1">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c25134] text-[#d4cebd] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/admin" className="text-sm text-[#d4cebd] hover:text-white transition-colors font-medium">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#1a1917] text-[#d4cebd] font-sans flex flex-col">
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Storefront />} />
              <Route path="/print" element={<PrintPage />} />
              <Route path="/calculators" element={<CalculatorsCategory />} />
              <Route path="/registers" element={<RegistersCategory />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>

          <footer className="border-t border-[#d4cebd]/10 bg-[#1a1917] py-10 text-sm text-[#a09c91] w-full mt-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col items-center md:items-start space-y-2">
                  <span className="text-[#d4cebd] font-semibold text-base">Anant Thakkur</span>
                  <span className="text-xs text-[#a09c91] uppercase tracking-wider font-semibold">Developer & Co-Founder</span>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://wa.me/917982350793" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#a09c91] hover:text-[#d4cebd] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>7982350793</span>
                    </a>
                    <a href="https://www.linkedin.com/in/anant-thakkur-4b970437a/?utm_source=gemini" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#a09c91] hover:text-[#d4cebd] transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end space-y-2">
                  <span className="text-[#d4cebd] font-semibold text-base">Sribendu Prasad Muduli</span>
                  <span className="text-xs text-[#a09c91] uppercase tracking-wider font-semibold">Business Partner</span>
                  <div className="flex items-center gap-4 pt-2">
                    <a href="https://wa.me/918929470101" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#a09c91] hover:text-[#d4cebd] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>8929470101</span>
                    </a>
                    <a href="https://www.linkedin.com/in/sribendu-prasad-muduli-8bb4a3366/?utm_source=gemini" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#a09c91] hover:text-[#d4cebd] transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center pt-8 border-t border-[#d4cebd]/10">
                <p className="text-[#a09c91] font-medium tracking-wide">Built by Students, for Students.</p>
              </div>
            </div>
          </footer>
          <Analytics />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App