import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { Search, Loader2, ArrowLeft, Clock, Package, Printer, BookOpen, Calculator } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OrderTracking() {
  const [rollNumber, setRollNumber] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!rollNumber.trim()) return

    setLoading(true)
    setError('')
    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .ilike('roll_number', rollNumber.trim())
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      
      setOrders(data || [])
      setSearched(true)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      case 'Accepted': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'Printed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700'
    }
  }

  const getItemIcon = (type) => {
    switch(type) {
      case 'Print': return <Printer className="w-4 h-4" />
      case 'Register': return <BookOpen className="w-4 h-4" />
      case 'Calculator': return <Calculator className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 py-4">
      <div className="max-w-2xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Order Form
        </Link>
        
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Track Your Order</h1>
          <p className="text-zinc-400 text-sm mb-6">Enter your Roll Number to see the status of your orders.</p>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                required
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-zinc-600"
                placeholder="e.g. 2023CS01"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !rollNumber.trim()}
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching
                </>
              ) : (
                'Track Order'
              )}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
        </div>

        {searched && !loading && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                <p className="text-zinc-400">No orders found for this Roll Number.</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                      <span className="text-zinc-500 text-sm flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                      ₹{order.total_price}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-medium text-white">
                      {getItemIcon(order.item_type)}
                      {order.item_type}
                    </div>
                    <p className="text-sm text-zinc-400">
                      {order.item_details} 
                      {order.item_type === 'Print' && order.print_type ? ` • ${order.print_type} • ${order.sides}` : ''}
                      {` • Qty: ${order.copies}`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
