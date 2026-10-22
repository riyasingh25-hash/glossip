import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Banknote,
  Smartphone,
  Truck,
  ArrowRight,
  Package,
  Receipt
} from 'lucide-react';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'upi' | 'card' | 'cod' | 'netbanking';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedDiscount,
    clearCart,
    addToast,
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    date: string;
    items: typeof cart;
    total: number;
    shippingFee: number;
    discount: number;
    paymentMethod: string;
    shippingAddress: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !pinCode) {
      addToast('Please fill out all delivery fields', 'info');
      return;
    }
    if (!/^\d{6}$/.test(pinCode.trim())) {
      addToast('Please enter a valid 6-digit Indian PIN code', 'info');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `GLS-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSummary = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items: [...cart],
        total,
        shippingFee,
        discount: discountAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: `${address}, ${city} - ${pinCode}`,
      };
      setCompletedOrder(orderSummary);
      setIsProcessing(false);
      setStep('confirmation');
      clearCart();
      addToast(`Order ${orderId} confirmed! Check your email for tracking. 📦`);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    // Reset state after closing if finished
    if (step === 'confirmation') {
      setStep('details');
      setCompletedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FFF4F0] rounded-3xl border border-[#242124]/10 shadow-2xl max-w-2xl w-full my-auto overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#242124]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#C91636] text-white flex items-center justify-center text-xs">
              💋
            </div>
            <h3 className="font-display text-lg font-bold text-[#242124]">
              {step === 'confirmation' ? 'Order Confirmation' : 'GLOSSIP Express Checkout'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-2 text-[#242124]/60 hover:text-[#242124] hover:bg-neutral-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice for Demo Mode Transparency */}
        <div className="bg-[#FFF0F4] px-5 py-2 border-b border-[#FFB7C9]/40 text-xs flex items-center justify-between text-[#C91636]">
          <span className="font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GLOSSIP Storefront • Demo Mode Active (No live bank deductions)</span>
          </span>
          <span className="font-mono font-bold text-xs">₹{total}</span>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: DELIVERY DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-sm text-[#242124] uppercase tracking-wider">
                  1. Shipping Information
                </h4>
                <span className="text-xs text-[#242124]/50">Deliveries across India</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                    Phone Number (for SMS Tracking) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Email Address (for Receipt & Updates) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="diya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                  Street Address & Apartment *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat 402, Sunshine Heights, MG Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#242124]/70 mb-1">
                    6-Digit PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="400050"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 bg-white text-xs focus:outline-none focus:border-[#C91636]"
                  />
                </div>
              </div>

              {/* Order Mini Breakdown */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#242124]/10 text-xs space-y-1">
                <div className="flex justify-between text-[#242124]/70">
                  <span>Items ({cart.length})</span>
                  <span className="font-mono tabular-nums">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedDiscount?.code})</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#242124]/70">
                  <span>Shipping</span>
                  <span className="font-mono tabular-nums">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#242124] border-t border-[#242124]/10 pt-1.5">
                  <span>Total Due</span>
                  <span className="font-mono text-[#C91636]">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>CONTINUE TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#242124] uppercase tracking-wider">
                  2. Select Indian Payment Method
                </h4>
                <button
                  onClick={() => setStep('details')}
                  className="text-xs text-[#C91636] font-bold hover:underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-2.5">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                    paymentMethod === 'upi'
                      ? 'border-[#C91636] ring-1 ring-[#C91636] shadow-xs'
                      : 'border-[#242124]/10 hover:border-[#242124]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFF0F4] text-[#C91636] flex items-center justify-center">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-[#242124]">UPI Instant Payment</p>
                        <p className="text-[11px] text-[#242124]/60">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                      FASTEST
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-[#242124]/10 space-y-2">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. mobile@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#242124]/20 text-xs focus:outline-none focus:border-[#C91636]"
                      />
                      <p className="text-[10px] text-[#242124]/50">
                        Or scan GLOSSIP dynamic QR code in the next simulated step.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cards Option */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                    paymentMethod === 'card'
                      ? 'border-[#C91636] ring-1 ring-[#C91636] shadow-xs'
                      : 'border-[#242124]/10 hover:border-[#242124]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF0F4] text-[#C91636] flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#242124]">Credit / Debit Card</p>
                      <p className="text-[11px] text-[#242124]/60">Visa, MasterCard, RuPay, Maestro</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-[#242124]/10 text-xs text-[#242124]/70">
                      <p className="text-[11px]">Demo Gateway: 256-bit SSL simulated tokenization.</p>
                    </div>
                  )}
                </div>

                {/* COD Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                    paymentMethod === 'cod'
                      ? 'border-[#C91636] ring-1 ring-[#C91636] shadow-xs'
                      : 'border-[#242124]/10 hover:border-[#242124]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFF0F4] text-[#C91636] flex items-center justify-center">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#242124]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-[#242124]/60">Pay cash or UPI to the delivery courier</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>AUTHORIZING DEMO TRANSACTION...</span>
                ) : (
                  <span>CONFIRM & PLACE ORDER • ₹{total}</span>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
          {step === 'confirmation' && completedOrder && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display text-2xl font-extrabold text-[#242124]">
                  Yay! Order Confirmed 💋
                </h4>
                <p className="text-xs text-[#242124]/70 mt-1">
                  We've received your order. The lab is packing your juicy lip goodies!
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-white rounded-2xl p-5 border border-[#242124]/10 text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#242124]/10 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#242124]/50 block font-bold">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-[#C91636]">
                      #{completedOrder.orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#242124]/50 block font-bold">
                      Date & Time
                    </span>
                    <span className="text-[#242124]/80">{completedOrder.date}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2 py-1">
                  <span className="text-[10px] uppercase text-[#242124]/50 font-bold block">
                    Ordered Formulas:
                  </span>
                  {completedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-xs">
                      <div>
                        <span className="font-semibold text-[#242124]">{it.product.name}</span>{' '}
                        <span className="text-[#242124]/50">({it.selectedShade}) × {it.quantity}</span>
                      </div>
                      <span className="font-mono tabular-nums font-semibold">
                        ₹{it.product.price * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t border-[#242124]/10 pt-2 text-xs space-y-1">
                  <div className="flex justify-between text-[#242124]/70">
                    <span>Payment Method:</span>
                    <span className="font-bold">{completedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-[#242124]/70">
                    <span>Delivering to:</span>
                    <span className="text-right truncate max-w-[220px]">{completedOrder.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#242124] pt-2 border-t border-[#242124]/10">
                    <span>Total Paid:</span>
                    <span className="font-mono text-[#C91636]">₹{completedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Simulated Delivery Tracking Timeline */}
              <div className="bg-[#FFF0F4] rounded-2xl p-4 border border-[#FFB7C9]/40 text-left">
                <span className="text-[10px] uppercase font-bold text-[#C91636] block mb-2">
                  Live Dispatch Status:
                </span>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#242124]">
                  <span className="text-[#C91636]">● Order Placed</span>
                  <span className="text-[#242124]/50">→ Packed in Mumbai</span>
                  <span className="text-[#242124]/50">→ Out for Delivery</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#242124] hover:bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Back To Store
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
