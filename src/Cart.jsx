import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { useCart } from './CartContext'
import { Trash2, ShoppingCart, Loader2, CheckCircle2, ArrowRight, Tag, Check, X } from 'lucide-react'

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Referral code state
  const [referralInput, setReferralInput] = useState('')
  const [validatingCode, setValidatingCode] = useState(false)
  const [appliedReferral, setAppliedReferral] = useState(null)
  const [referralError, setReferralError] = useState('')

  // --- Validate & Apply Referral Code ---
  const handleApplyReferral = async (e) => {
    e.preventDefault()
    setReferralError('')
    const normalized = referralInput.trim().toUpperCase()

    if (!normalized || normalized.length !== 6) {
      setReferralError('Please enter a valid 6-character referral code.')
      return
    }

    setValidatingCode(true)
    try {
      const { data, error: fetchErr } = await supabase
        .from('distributors')
        .select('referral_code, owner_name')
        .eq('referral_code', normalized)
        .maybeSingle()

      if (fetchErr) throw fetchErr

      if (!data) {
        setReferralError(`Code "${normalized}" is invalid. Please check with your campus partner.`)
      } else {
        setAppliedReferral({
          code: data.referral_code,
          owner_name: data.owner_name
        })
        setReferralInput('')
        setReferralError('')
      }
    } catch (err) {
      console.error('Error applying referral code:', err)
      setReferralError('Could not verify referral code. Please try again.')
    } finally {
      setValidatingCode(false)
    }
  }

  const handleRemoveReferral = () => {
    setAppliedReferral(null)
    setReferralError('')
  }

  // --- Checkout Handler ---
  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    setLoading(true)
    setError('')
    
    try {
      // 1. Verify they don't have an active order (using Roll Number from first item)
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

      // 2. Map and insert all cart items into Supabase with referral attribution
      const ordersToInsert = cartItems.map(item => {
        const itemPrintPages = item.print_pages || 0
        const itemCommission = (item.item_type === 'Print' && appliedReferral)
          ? Math.floor(itemPrintPages / 20) * 5
          : 0

        return {
          student_name: item.student_name,
          roll_number: item.roll_number,
          whatsapp_number: item.whatsapp_number,
          item_type: item.item_type,
          item_details: item.item_details,
          document_url: item.document_url,
          print_type: item.print_type,
          sides: item.sides,
          copies: item.copies,
          total_price: item.total_price,
          referral_code: appliedReferral ? appliedReferral.code : null,
          print_pages: itemPrintPages,
          referral_commission: itemCommission,
          commission_paid: false
        }
      })

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
                    {item.print_type} • {item.sides} • {item.copies} Copies {item.print_pages ? `(${item.print_pages} Total Pages)` : ''}
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

        {/* REDEEM REFERRAL CODE BOX */}
        <div className="bg-[#cbc4b1] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),_inset_-1px_-1px_2px_rgba(255,255,255,0.7)] rounded-2xl p-6 border border-black/5">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-[#c25134]" />
            <h3 className="text-base font-bold text-[#1a1917] uppercase tracking-wider">
              Have a Referral / Redeem Code?
            </h3>
          </div>

          {appliedReferral ? (
            <div className="flex items-center justify-between bg-green-900/15 border border-green-800/30 p-4 rounded-xl text-green-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-800 text-white flex items-center justify-center font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    ✓ Code Applied: <strong className="font-mono tracking-wider">{appliedReferral.code}</strong>
                  </p>
                  <p className="text-xs text-green-800/80 font-medium">
                    Supporting Campus Partner: <strong className="text-green-950">{appliedReferral.owner_name}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveReferral}
                className="text-xs bg-black/10 hover:bg-black/20 text-green-950 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyReferral} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength="6"
                  value={referralInput}
                  onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                  placeholder="ENTER 6-CHAR CODE"
                  className="flex-1 bg-[#d4cebd] border-none rounded-xl py-2.5 px-4 font-mono font-bold text-sm tracking-wider focus:ring-2 focus:ring-[#c25134] outline-none shadow-sm uppercase placeholder:font-sans placeholder:tracking-normal placeholder:font-normal"
                />
                <button
                  type="submit"
                  disabled={validatingCode}
                  className="bg-[#1a1917] hover:bg-[#2a2927] text-[#d4cebd] font-bold px-5 py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {validatingCode ? 'Checking...' : 'Apply Code'}
                </button>
              </div>
              {referralError && (
                <p className="text-xs font-bold text-red-700 pl-1">{referralError}</p>
              )}
            </form>
          )}
        </div>

        {/* CHECKOUT BAR */}
        <div className="bg-[#1a1917] rounded-3xl p-8 mt-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-[#a09c91] uppercase tracking-wider">Subtotal ({cartItems.length} items)</p>
            <p className="text-4xl font-black text-[#d4cebd] font-serif mt-1">₹{cartTotal}</p>
            {appliedReferral && (
              <p className="text-xs text-green-400 font-medium mt-1">
                ✓ Partner referral code active ({appliedReferral.code})
              </p>
            )}
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