import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { ExternalLink, Printer, CheckCircle, Clock, LogOut, Package, BookOpen, Calculator } from 'lucide-react'

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  const [filter, setFilter] = useState('Active') // Active, Completed
  
  useEffect(() => {
    checkSession()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setLoginError('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setLoginError(error.message)
    } else {
      setIsAuthenticated(true)
    }
    setIsLoggingIn(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) {
      console.error('Error fetching orders:', error)
    } else {
      setOrders(data || [])
    }
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id)
      
    if (!error) {
      setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-amber-400'
      case 'Accepted': return 'text-green-500'
      case 'Rejected': return 'text-red-500'
      case 'Printed': return 'text-blue-400'
      case 'Completed': return 'text-emerald-400'
      default: return 'text-zinc-400'
    }
  }

  if (loading && !isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Admin Login</h2>
          {loginError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                placeholder="admin@printstudio.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-2.5 px-4 rounded-xl transition-all disabled:opacity-50"
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const filteredOrders = orders.filter(order => 
    filter === 'Active' 
      ? !['Completed', 'Rejected'].includes(order.status)
      : ['Completed', 'Rejected'].includes(order.status)
  )

  const getItemIcon = (type) => {
    switch(type) {
      case 'Print': return <Printer className="w-4 h-4" />
      case 'Register': return <BookOpen className="w-4 h-4" />
      case 'Calculator': return <Calculator className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage all incoming requests.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex bg-zinc-900 rounded-xl border border-zinc-800 p-1">
            {['Active', 'Completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-sm py-1.5 px-4 rounded-lg font-medium transition-all ${
                  filter === f
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-zinc-800 border-t-white rounded-full"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No {filter.toLowerCase()} orders</h3>
          <p className="text-zinc-500">You're all caught up!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col lg:flex-row gap-6 lg:items-center">
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between sm:items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-white text-lg">{order.student_name}</h3>
                    <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md">
                      {order.roll_number}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                    ₹{order.total_price