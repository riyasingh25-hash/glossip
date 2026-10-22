import React, { useState } from 'react';
import { SlidersHorizontal, Heart, ShieldCheck, Mail, ArrowUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { setIsAdminOpen, setIsQuizOpen } = useCart();
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (id: string) => {
    if (id === 'shade-quiz') {
      setIsQuizOpen(true);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#242124] text-white pt-16 pb-12 border-t border-[#242124]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#C91636] flex items-center justify-center text-white text-base">
                  💋
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-white uppercase">
                  GLOSSIP
                </span>
              </div>

              <p className="font-serif italic text-[#FFB7C9] text-base">
                “Spill it. Gloss it.”
              </p>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                A Gen Z beauty collective obsessed with mirror glosses, peptide-infused lip oils, and high-shine confidence. Formulated and made with love in Mumbai, India.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-neutral-300">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFB7C9] transition-colors"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFB7C9] transition-colors"
                >
                  TikTok
                </a>
                <span>·</span>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FFB7C9] transition-colors"
                >
                  Pinterest
                </a>
              </div>
            </div>

            {/* Col 2: Shop Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFB7C9]">
                Collections
              </h4>
              <ul className="text-xs space-y-2 text-neutral-400 font-medium">
                <li>
                  <button
                    onClick={() => handleLink('catalog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Shop All Formulations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLink('catalog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    High-Shine Lip Gloss
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLink('catalog')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Nourishing Lip Oils
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="hover:text-[#FFB7C9] transition-colors cursor-pointer flex items-center gap-1 text-white"
                  >
                    <span>Find Your Shade Quiz</span>
                    <span className="text-[10px] text-[#C91636] bg-[#FFF0F4] px-1 rounded font-bold">NEW</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLink('the-gossip')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    The Gossip Room Combos
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Customer Care & Info */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFB7C9]">
                Customer Care & Policy
              </h4>
              <ul className="text-xs space-y-2 text-neutral-400 font-medium">
                <li>
                  <button
                    onClick={() => setActivePolicyModal('shipping')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Shipping & Delivery (India)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('returns')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Returns & Refunds Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('faqs')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Frequently Asked Questions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Privacy Policy & Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact Support & Creator PR
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Store Manager Admin Tool */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#FFB7C9]">
                Store Control
              </h4>
              <p className="text-[11px] text-neutral-400">
                Easily modify prices, stock counts & shades:
              </p>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFB7C9]" />
                <span>Price & Stock Editor</span>
              </button>
              <div className="pt-2 text-[10px] text-neutral-500">
                Authorized GLOSSIP Admin Panel
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>© {new Date().getFullYear()} GLOSSIP Beauty Inc. All rights reserved. Prices in INR (₹).</p>
            
            <div className="flex items-center gap-4">
              <span className="text-[11px]">Crafted for the glossy generation 💋</span>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Info / Policy Modals */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#242124] relative shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-black"
            >
              ✕
            </button>

            {activePolicyModal === 'shipping' && (
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold">Shipping & Delivery Information</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  We ship to 19,000+ PIN codes across India via Bluedart, Delhivery, and Express Air couriers.
                </p>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-neutral-700">
                  <li><strong>Standard Delivery:</strong> 2 to 4 business days.</li>
                  <li><strong>Free Shipping:</strong> Automatically applied to all orders ₹799 and above.</li>
                  <li><strong>Standard Fee:</strong> Flat ₹70 for orders below ₹799.</li>
                  <li><strong>Live Tracking:</strong> Real-time SMS and email updates sent upon dispatch.</li>
                </ul>
              </div>
            )}

            {activePolicyModal === 'returns' && (
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold">Returns & Refunds Policy</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Because cosmetics are personal care products, items once opened cannot be returned for hygiene reasons.
                </p>
                <ul className="text-xs space-y-1.5 list-disc pl-4 text-neutral-700">
                  <li>If your package arrives damaged or defective, we offer an instant replacement or 100% refund within 7 days of delivery.</li>
                  <li>Simply email photo evidence to support@glossip.in with your Order ID.</li>
                </ul>
              </div>
            )}

            {activePolicyModal === 'faqs' && (
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold">Frequently Asked Questions</h3>
                <div className="space-y-2 text-xs text-neutral-700">
                  <div>
                    <strong className="block text-[#242124]">Are GLOSSIP formulas sticky?</strong>
                    <span>No! We use light-weight non-stringy polymers and squalane that cushion without tackiness.</span>
                  </div>
                  <div>
                    <strong className="block text-[#242124]">Are your products 100% cruelty-free and vegan?</strong>
                    <span>Yes. We never test on animals and our formulations use zero animal by-products or carmine.</span>
                  </div>
                  <div>
                    <strong className="block text-[#242124]">How does the pH bloom tint work?</strong>
                    <span>Ingredients in "Cherry On Top" adapt to your natural lip warmth and pH for a bespoke berry flush.</span>
                  </div>
                </div>
              </div>
            )}

            {activePolicyModal === 'privacy' && (
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold">Privacy & Terms</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  GLOSSIP respects your digital confidentiality. We never sell your personal data or email to third parties. Customer payments are secured with end-to-end 256-bit encryption.
                </p>
              </div>
            )}

            {activePolicyModal === 'contact' && (
              <div className="space-y-3">
                <h3 className="font-display text-xl font-bold">Contact Support & PR</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Got a question, shade enquiry, or want to collaborate with GLOSSIP?
                </p>
                <div className="text-xs space-y-1.5 font-medium text-neutral-800">
                  <p>📧 Email: <a href="mailto:hello@glossipbeauty.in" className="text-[#C91636] underline">hello@glossipbeauty.in</a></p>
                  <p>💬 Creator PR: <a href="mailto:collabs@glossipbeauty.in" className="text-[#C91636] underline">collabs@glossipbeauty.in</a></p>
                  <p>📍 Studio: Unit 4B, Industrial Crescent, Mumbai 400093, MH, India</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setActivePolicyModal(null)}
              className="mt-6 w-full py-2.5 bg-[#242124] text-white rounded-full text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
