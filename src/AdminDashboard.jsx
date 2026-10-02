import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Loader2, RefreshCw, Check, Printer, Truck, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', id)
      
      if (error) throw error
      
      // Update local state to reflect change instantly
      setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Failed to update order status.')
    }
  }

  return (
    <div className="w-full text-zinc-300 bg-zinc-950 font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
            <p className="text-zinc-500 font-medium mt-1">Manage and update active student orders.</p>
          </div>
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-800 transition-colors text-sm font-semibold"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh Data
          </button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/30 transition-colors">
                    
                    <td className="px-6 py-4">
                      <p className="text-white font-bold">{order.student_name}</p>
                      <p className="text-zinc-400 font-mono text-xs mt-1">{order.roll_number}</p>
                      <a href={`https://wa.me/${order.whatsapp_number?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs mt-1 block">
                        {order.whatsapp_number}
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-zinc-800 text-zinc-300 rounded text-xs font-bold mb-2">
                        {order.item_type}
                      </span>
                      <p className="text-zinc-300 text-sm">{order.item_details}</p>
                      {order.item_type === 'Print' && (
                        <div className="text-xs text-zinc-500 mt-1 flex flex-col gap-0.5">
                          <span>{order.print_type} • {order.sides} • {order.copies} Copies</span>
                          <a href={order.document_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1 mt-1">
                            <LinkIcon size={12} /> View Document
                          </a>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-white font-black text-lg">₹{order.total_price}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                        order.status === 'Printed' ? 'bg-orange-500/10 text-orange-400' :
                        order.status === 'Accepted' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      {order.status === 'Pending' && (
                        <button onClick={() => updateStatus(order.id, 'Accepted')} className="inline-flex items-center justify-center p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors" title="Start Printing">
                          <Printer size={16} />
                        </button>
                      )}
                      {order.status === 'Accepted' && (
                        <button onClick={() => updateStatus(order.id, 'Printed')} className="inline-flex items-center justify-center p-2 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 rounded-lg transition-colors" title="Mark Out for Delivery">
                          <Truck size={16} />
                        </button>
                      )}
                      {order.status === 'Printed' && (
                        <button onClick={() => updateStatus(order.id, 'Completed')} className="inline-flex items-center justify-center p-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors" title="Mark Completed">
                          <Check size={16} />
                        </button>
                      )}
                      {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                         <button onClick={() => updateStatus(order.id, 'Cancelled')} className="inline-flex items-center justify-center p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors" title="Cancel Order">
                         <XCircle size={16} />
                       </button>
                      )}
                    </td>

                  </tr>
                ))}
                
                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-zinc-500">
                      No orders found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}