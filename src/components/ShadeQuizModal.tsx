import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface QuizQuestion {
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    points: { [productId: string]: number };
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    title: 'What is your current makeup vibe?',
    subtitle: 'Choose your default aesthetic when stepping out.',
    options: [
      {
        label: 'Clean Girl Soft Aesthetic',
        description: 'Dewy skin, brushed brows, sheer baby pink lips.',
        points: { 'soft-launch': 3, 'love-bomb': 2 },
      },
      {
        label: 'Main Character Drama',
        description: 'Noticeable cherry red or vampy lips that command the room.',
        points: { 'tea-spiller': 3, 'cherry-on-top': 2 },
      },
      {
        label: '90s Supermodel Neutral',
        description: 'Rosy-brown contour, muted spices, iconic retro glamour.',
        points: { 'situationship': 3, 'main-character': 1 },
      },
      {
        label: 'Glazed & Galactic',
        description: 'Reflective micro-diamond shimmer that catches every flash.',
        points: { 'delulu': 3, 'no-comments': 2 },
      },
    ],
  },
  {
    title: 'How do you like your lip finish?',
    subtitle: 'Texture is everything — which feeling do you crave?',
    options: [
      {
        label: 'Glass Vinyl Mirror Shine',
        description: 'Ultra-reflective wet look, completely smooth and non-tacky.',
        points: { 'soft-launch': 2, 'tea-spiller': 2, 'no-comments': 3 },
      },
      {
        label: 'Plush Hydrating Oil Cushion',
        description: 'Rich botanical oils that drench lips and soften dryness.',
        points: { 'main-character': 3, 'cherry-on-top': 3, 'love-bomb': 2 },
      },
      {
        label: 'Multi-Prism Diamond Sparkle',
        description: 'Light-catching fine mineral pearls with holographic sheen.',
        points: { 'delulu': 3, 'soft-launch': 1 },
      },
      {
        label: 'Smart pH Bitten-Lip Bloom',
        description: 'Dewy tint that reacts to your skin temperature for a custom stain.',
        points: { 'cherry-on-top': 3, 'love-bomb': 2 },
      },
    ],
  },
  {
    title: 'If your lip shade was a friendship role, which one are you?',
    subtitle: 'The brand is GLOSSIP — spill your gossip personality.',
    options: [
      {
        label: 'The Gatekeeper-Turned-Sharer',
        description: '"I wasn\'t gonna spill, but you HAVE to see this shade."',
        points: { 'tea-spiller': 3, 'situationship': 2 },
      },
      {
        label: 'The Low-Key Soft Launcher',
        description: 'Posting subtle hints without ever showing their full face.',
        points: { 'soft-launch': 3, 'no-comments': 2 },
      },
      {
        label: 'The Sweet Hype Bestie',
        description: 'Sending voice notes yelling "YOU LOOK GORGEOUS" at 2 AM.',
        points: { 'love-bomb': 3, 'main-character': 2 },
      },
      {
        label: 'The Hopelessly Delusional Icon',
        description: '"He definitely stared at my lips for 0.4 seconds, we\'re getting married."',
        points: { 'delulu': 3, 'main-character': 1 },
      },
    ],
  },
];

export const ShadeQuizModal: React.FC = () => {
  const { isQuizOpen, setIsQuizOpen, products, addToCart, openProductModal } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{ [productId: string]: number }>({});
  const [recommendedId, setRecommendedId] = useState<string | null>(null);

  if (!isQuizOpen) return null;

  const handleSelectOption = (points: { [productId: string]: number }) => {
    const updated = { ...scores };
    Object.entries(points).forEach(([id, val]) => {
      updated[id] = (updated[id] || 0) + val;
    });
    setScores(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate winner
      let highestId = 'soft-launch';
      let highestScore = -1;
      Object.entries(updated).forEach(([id, score]) => {
        if (score > highestScore) {
          highestScore = score;
          highestId = id;
        }
      });
      setRecommendedId(highestId);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({});
    setRecommendedId(null);
  };

  const recommendedProduct = recommendedId
    ? products.find((p) => p.id === recommendedId) || products[0]
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFF4F0] rounded-3xl border border-[#242124]/10 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          aria-label="Close shade quiz"
          className="absolute top-5 right-5 p-2 rounded-full text-[#242124]/60 hover:text-[#242124] hover:bg-[#FFB7C9]/40 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Quiz In Progress */}
        {!recommendedProduct ? (
          <div>
            {/* Step Counter */}
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#C91636] mb-4">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SHADE MATCH DIAGNOSTIC</span>
              </span>
              <span>
                STEP {currentStep + 1} OF {QUESTIONS.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#FFB7C9]/40 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-[#C91636] h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Heading */}
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#242124] tracking-tight mb-2">
              {QUESTIONS[currentStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#242124]/70 mb-6">
              {QUESTIONS[currentStep].subtitle}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.points)}
                  className="w-full text-left p-4 rounded-2xl bg-white border border-[#242124]/10 hover:border-[#C91636] hover:bg-[#FFF8F6] transition-all duration-200 flex items-center justify-between group shadow-xs hover:shadow cursor-pointer"
                >
                  <div className="pr-4">
                    <p className="font-bold text-sm sm:text-base text-[#242124] group-hover:text-[#C91636] transition-colors">
                      {option.label}
                    </p>
                    <p className="text-xs text-[#242124]/60 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#242124]/30 group-hover:text-[#C91636] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Recommended Result Screen */
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB7C9]/50 text-[#C91636] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR SOUL-SHADE MATCH</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#242124]">
              Meet "{recommendedProduct.name}"
            </h3>

            <p className="text-sm text-[#242124]/75 max-w-md mx-auto">
              Based on your answers, your ultimate signature formula is{' '}
              <strong className="text-[#C91636]">{recommendedProduct.name}</strong> in{' '}
              <strong>{recommendedProduct.shadeName}</strong>.
            </p>

            {/* Product Card Showcase */}
            <div className="bg-white rounded-3xl p-5 border border-[#242124]/10 max-w-sm mx-auto shadow-md text-left">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF4F0] mb-4 relative">
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-white/80"
                    style={{ backgroundColor: recommendedProduct.shadeHex }}
                  />
                  <span>{recommendedProduct.shadeName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#242124]/60">
                  {recommendedProduct.productType} · {recommendedProduct.finish}
                </span>
                <span className="font-mono font-bold text-base text-[#242124]">
                  ₹{recommendedProduct.price}
                </span>
              </div>

              <p className="text-xs text-[#242124]/70 mb-4 line-clamp-2">
                {recommendedProduct.tagline}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    addToCart(recommendedProduct);
                    setIsQuizOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => {
                    setIsQuizOpen(false);
                    openProductModal(recommendedProduct);
                  }}
                  className="w-full py-2.5 bg-[#FFF4F0] hover:bg-[#FFB7C9]/30 text-[#242124] border border-[#242124]/15 rounded-full font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW DETAILS</span>
                </button>
              </div>
            </div>

            {/* Disclaimer required by user brief */}
            <p className="text-[11px] text-[#242124]/50 italic max-w-sm mx-auto">
              * Shade matching is a curated aesthetic suggestion tailored for your vibe. Natural undertones and individual lip pigmentation may subtly nuance the final finish.
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#242124]/70 hover:text-[#C91636] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Shade Quiz</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
