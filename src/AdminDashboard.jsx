import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, fetchError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err.message || 'Failed to fetch orders from the database.')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id)

      if (updateError) throw updateError
      
      // Optimistic UI update
      setOrders(prevOrders => 
        prevOrders?.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        )
      )
    } catch (err) {
      alert('Failed to update order status: ' + err.message)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (err) {
      console.error('Failed to log out:', err)
      navigate('/') // Force redirect anyway as fallback
    }
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1917] text-[#d4cebd] p-8 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#d4cebd]/20 border-t-[#c25134] rounded-full animate-spin"></div>
          <p className="text-2xl font-serif font-bold italic opacity-80 tracking-wide text-[#d4cebd]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1917] text-[#d4cebd] p-8 flex items-center justify-center font-sans">
        <div className="bg-[#c25134]/10 border border-[#c25134]/40 p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl">
          <h2 className="text-3xl font-black font-serif text-[#c25134] mb-4">Connection Error</h2>
          <p className="text-[#a09c91] font-medium leading-relaxed">{error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-8 bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Data Filtering
  const activeOrders = orders?.filter(order => {
    const s = (order.status || '').toUpperCase()
    return s !== 'COMPLETED' && s !== 'REJECTED'
  }) || []

  const historyOrders = orders?.filter(order => {
    const s = (order.status || '').toUpperCase()
    return s === 'COMPLETED' || s === 'REJECTED'
  }) || []

  // Reusable Table Generator to keep code clean and maintain separation
  const renderOrderTable = (title, dataList) => {
    return (
      <div className="mb-16">
        <h2 className="text-3xl font-black font-serif text-[#d4cebd] mb-6 border-b border-[#d4cebd]/10 pb-4 [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.5)]">
          {title} <span className="text-lg font-medium text-[#a09c91] ml-3">({dataList.length})</span>
        </h2>
        
        <div className="overflow-x-auto bg-[#1a1917] border border-[#d4cebd]/10 rounded-3xl shadow-2xl">
          <table className="w-full text-left border-collapse min-w-max">
            <thead className="bg-[#d4cebd] text-[#1a1917]">
              <tr>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">S.NO.</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Date</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Student</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Roll Number</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Contact</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Order Details</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Total</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-6 font-black uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d4cebd]/5">
              
              {dataList.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-16 text-center text-[#a09c91] font-medium text-lg">
                    No orders found in this section.
                  </td>
                </tr>
              ) : (
                dataList.map((order, index) => {
                  const s = (order.status || 'Pending').toUpperCase()
                  
                  // Brand color determination for badges
                  let badgeStyle = 'bg-blue-900/30 text-blue-400 border-blue-900/50'
                  if (s === 'PENDING') badgeStyle = 'bg-yellow-900/30 text-yellow-500 border-yellow-900/50'
                  else if (s === 'COMPLETED') badgeStyle = 'bg-green-900/30 text-green-500 border-green-900/50'
                  else if (s === 'REJECTED') badgeStyle = 'bg-red-900/30 text-red-500 border-red-900/50'

                  return (
                    <tr key={order.id} className="hover:bg-[#d4cebd]/5 transition-colors">
                      <td className="py-5 px-6 font-bold text-[#a09c91]">{index + 1}</td>
                      
                      <td className="py-5 px-6 text-sm text-[#a09c91] font-medium whitespace-nowrap">
                        {new Date(order.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      
                      <td className="py-5 px-6 font-bold text-white whitespace-nowrap">
                        {order.student_name}
                      </td>
                      
                      <td className="py-5 px-6 text-[#a09c91] font-medium tracking-wide">
                        {order.roll_number}
                      </td>
                      
                      <td className="py-5 px-6 text-sm font-medium">
                        {order.whatsapp_number}
                      </td>
                      
                      <td className="py-5 px-6 max-w-xs">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="bg-[#c25134]/20 text-[#c25134] border border-[#c25134]/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                            {order.item_type}
                          </span>
                          {order.copies > 1 && (
                            <span className="text-xs text-[#a09c91] font-bold">QTY: {order.copies}</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-[#d4cebd] truncate" title={order.item_details}>
                          {order.item_details}
                        </p>
                        {order.document_url && (
                          <a 
                            href={order.document_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="inline-block text-[#c25134] text-xs font-bold mt-2 hover:underline hover:text-[#d4cebd] transition-colors"
                          >
                            View Document &rarr;
                          </a>
                        )}
                      </td>
                      
                      <td className="py-5 px-6 font-black font-serif text-[#c25134] text-lg">
                        ₹{order.total_price}
                      </td>
                      
                      <td className="py-5 px-6 whitespace-nowrap">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeStyle}`}>
                          {order.status || 'Pending'}
                        </span>
                      </td>
                      
                      <td className="py-5 px-6 text-right whitespace-nowrap">
                        <select 
                          value={order.status || 'Pending'}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="bg-[#1a1917] border border-[#d4cebd]/20 text-[#d4cebd] text-sm font-medium rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#c25134] cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Printed">Printed</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Main Dashboard Return
  return (
    <div className="min-h-screen bg-[#1a1917] text-[#d4cebd] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-[#d4cebd]/10 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-[#d4cebd] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.5)]">
              Admin Portal
            </h1>
            <p className="text-[#a09c91] font-medium mt-2">Manage incoming orders and delivery statuses.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchOrders}
              className="bg-[#d4cebd]/10 hover:bg-[#d4cebd]/20 border border-[#d4cebd]/20 text-[#d4cebd] font-bold py-3 px-6 rounded-xl transition-all text-sm shadow-sm"
            >
              Refresh Data
            </button>
            <button 
              onClick={handleLogout}
              className="bg-[#c25134] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm shadow-lg shadow-black/20"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Active Orders Section */}
        {renderOrderTable("Active Orders", activeOrders)}

        {/* Order History Section */}
        {renderOrderTable("Order History", historyOrders)}

      </div>
    </div>
  )
}