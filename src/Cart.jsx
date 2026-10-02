import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { useCart } from './CartContext'
import { Trash2, ShoppingCart, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    setLoading(true)
    setError('')
    
    try {
      // 1. Verify they don't have an active order (using the Roll Number from the first item)
      const roll_number = cartItems[0].roll_number.trim()
      const { data: activeOrders, error: checkError } = await supabase
        .from('orders')
        .select('id')
        .eq('roll_number', roll_number)
        .in('status', ['Pending', 'Accepted', 'Printed'])

      if (checkError) throw checkError

      if (activeOrders && activeOrders.length > 0) {
        throw new Error("You already have an active order. Please wait for it to complete before placing a new one.")
      }

      // 2. Map and insert all cart items into Supabase
      const ordersToInsert = cartItems.map(item => ({
        student_name: item.student_name,
        roll_number: item.roll_number,
        whatsapp_number: item.whatsapp_number,
        item_type: item.item_type,
        item_details: item.item_details,
        document_url: item.document_url,
        print_type: item.print_type,
        sides: item.sides,
        copies: item.copies,
        total_price: item.total_price
      }))

      const { error: submitError } = await supabase
        .from('orders')
        .insert(ordersToInsert)

      if (submitError) throw submitError
      
      setSuccess(true)
      clearCart()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to complete checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // --- SUCCESS SCREEN ---
  if (success) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-[#d4cebd] p-4 font-sans min-h-[60vh]">
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 border border-black/5">
          <div className="mx-auto w-20 h-20 bg-[#1a1917] rounded-full flex items-center justify-center shadow-xl">
            <CheckCircle2 className="w-10 h-10 text-[#d4cebd]" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Order Placed!</h2>
          <p className="text-[#3a3832] font-medium text-lg leading-relaxed">
            We've received your batch order. You can track its progress using your Roll Number.
          </p>
          <Link
            to="/track"
            className="mt-8 block w-full bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-6 rounded-xl transition-all shadow-lg tracking-wide"
          >
            Track Order
          </Link>
        </div>
      </div>
    )
  }

  // --- EMPTY CART SCREEN ---
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 w-full flex items-center justify-center bg-[#d4cebd] p-4 font-sans min-h-[60vh]">
        <div className="text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-full flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-[#a09c91]" />
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">Your cart is empty</h2>
          <p className="text-[#5a5750] font-medium">Looks like you haven't added any items yet.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold py-3 px-8 rounded-xl transition-all shadow-lg mt-4"
          >
            Start Browsing <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  // --- CART VIEW ---
  return (
    <div className="flex-1 w-full bg-[#d4cebd] text-[#1a1917] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-8">
        
        <div className="flex items-center gap-4 border-b-2 border-black/10 pb-6">
          <ShoppingCart className="w-8 h-8 text-[#c25134]" />
          <h1 className="text-3xl font-bold font-serif text-[#1a1917] [text-shadow:-1px_-1px_1px_rgba(0,0,0,0.2),_1px_1px_1px_rgba(255,255,255,0.8)]">
            Review Your Cart
          </h1>
        </div>

        {error && (
          <div className="p-4 bg-[#c25134]/10 border border-[#c25134]/30 rounded-xl text-[#c25134] text-center font-bold">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-black/5">
              <div>
                <h3 className="text-xl font-bold text-[#1a1917] font-serif">{item.item_type}</h3>
                <p className="text-[#5a5750] font-medium mt-1">{item.item_details}</p>
                {item.item_type === 'Print' && (
                  <p className="text-xs text-[#a09c91] mt-1 font-bold tracking-wide uppercase">
                    {item.print_type} • {item.sides} • {item.copies} Copies
                  </p>
                )}
              </div>
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-black/10 pt-4 sm:pt-0 mt-2 sm:mt-0">
                <span className="text-2xl font-black text-[#c25134]">₹{item.total_price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-[#a09c91] hover:text-[#c25134] hover:bg-[#c25134]/10 rounded-lg transition-colors"
                  title="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CHECKOUT BAR */}
        <div className="bg-[#1a1917] rounded-3xl p-8 mt-12 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-[#a09c91] uppercase tracking-wider">Subtotal ({cartItems.length} items)</p>
            <p className="text-4xl font-black text-[#d4cebd] font-serif mt-1">₹{cartTotal}</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full sm:w-auto bg-[#c25134] hover:bg-[#a6432a] text-[#d4cebd] font-bold py-4 px-10 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-lg tracking-wide"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              'Finalize Checkout'
            )}
          </button>
        </div>

      </div>
    </div>
  )
}