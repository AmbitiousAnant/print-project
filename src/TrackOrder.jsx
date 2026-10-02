import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { Search, Package, Printer, Truck, CheckCircle2, Loader2 } from 'lucide-react'

export default function TrackOrder() {
  const [rollNumber, setRollNumber] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!rollNumber.trim()) return
    
    setLoading(true)
    setError('')
    setSearched(true)
    
    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('roll_number', rollNumber.trim())
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setOrders(data || [])
    } catch (err) {
      console.error(err)
      setError('Could not fetch orders. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Progress bar logic mapping
  const steps = [
    { id: 'Pending', label: 'Order Received', icon: Package },
    { id: 'Printing', label: 'Printing', icon: Printer },
    { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
    { id: 'Completed', label: 'Completed', icon: CheckCircle2 }
  ];

  const getStepIndex = (status) => {
    if (status === 'Pending') return 0;
    if (status === 'Accepted') return 1; // Maps to Printing
    if (status === 'Printed') return 2; // Maps to Out for Delivery
    if (status === 'Completed') return 3;
    return -1;
  }

  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-4 pt-16 space-y-12">
        
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
            Track Your Order
          </h2>
          <p className="text-[#5a5750] font-medium text-lg">Enter your Roll Number to see the real-time status of your items.</p>
        </div>

        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#1a1917]/50" />
            </div>
            <input 
              required 
              type="text" 
              value={rollNumber} 
              onChange={(e) => setRollNumber(e.target.value)} 
              className="w-full bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] border-none rounded-2xl py-4 pl-12 pr-32 text-lg font-bold text-[#1a1917] focus:outline-none focus:ring-2 focus:ring-[#c25134] transition-all placeholder:text-[#1a1917]/40 uppercase tracking-widest" 
              placeholder="e.g. 2023CS01" 
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-2.5 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Track'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] text-center font-bold">
            {error}
          </div>
        )}

        {searched && !loading && orders.length === 0 && !error && (
          <div className="text-center p-8 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl">
            <p className="text-[#3a3832] font-bold text-lg">No orders found for this Roll Number.</p>
          </div>
        )}

        <div className="space-y-8">
          {orders.map((order) => {
            const currentStep = getStepIndex(order.status);
            
            return (
              <div key={order.id} className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-6 sm:p-10 border border-black/5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-black/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#1a1917] font-serif [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
                      {order.item_type}
                    </h3>
                    <p className="text-[#5a5750] font-bold mt-1 text-sm uppercase tracking-wider">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-bold text-[#5a5750] uppercase tracking-wider">Total Amount</p>
                    <p className="text-3xl font-black text-[#c25134]">₹{order.total_price}</p>
                  </div>
                </div>

                {/* Progress Bar UI */}
                <div className="relative pt-4 pb-2">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-black/10 -translate-y-1/2 rounded-full z-0"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-[#c25134] -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                    style={{ width: `${(Math.max(0, currentStep) / (steps.length - 1)) * 100}%` }}
                  ></div>

                  <div className="relative z-10 flex justify-between">
                    {steps.map((step, index) => {
                      const isActive = index <= currentStep;
                      const Icon = step.icon;
                      
                      return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-[#cbc4b1]">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#cbc4b1] transition-colors duration-300 ${isActive ? 'bg-[#c25134] text-[#d4cebd]' : 'bg-[#a09c91] text-[#cbc4b1]'}`}>
                            <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                          </div>
                          <span className={`text-xs sm:text-sm font-bold absolute -bottom-8 whitespace-nowrap ${isActive ? 'text-[#1a1917]' : 'text-[#a09c91]'}`}>
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}