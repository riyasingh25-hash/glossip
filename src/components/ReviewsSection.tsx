import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ReviewsSection: React.FC = () => {
  const { products, addToast } = useCart();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filterShade, setFilterShade] = useState<string>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(products[0]?.id || 'tea-spiller');
  const [selectedShade, setSelectedShade] = useState(products[0]?.shadeName || 'Spicy Cherry Red');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleProductChange = (prodId: string) => {
    setSelectedProduct(prodId);
    const prod = products.find((p) => p.id === prodId);
    if (prod && prod.availableShades.length > 0) {
      setSelectedShade(prod.availableShades[0].name);
    }
  };

  const handleHelpfulClick = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    addToast('Marked as helpful! Thank you ✨');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !content.trim()) {
      addToast('Please fill out all fields before submitting', 'info');
      return;
    }

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId: selectedProduct,
      author: author.trim(),
      date: 'Just now',
      rating,
      shadePurchased: selectedShade,
      title: title.trim(),
      content: content.trim(),
      verifiedPurchase: true,
      helpfulCount: 0,
    };

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setAuthor('');
    setTitle('');
    setContent('');
    addToast('Your review has been submitted and verified! 💋');
  };

  const allShadeNames = Array.from(new Set(reviews.map((r) => r.shadePurchased)));

  const filteredReviews = reviews.filter((r) => {
    if (filterShade === 'all') return true;
    return r.shadePurchased === filterShade;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FFF4F0] border-b border-[#242124]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C91636] mb-2 flex items-center gap-2">
              <span>✦ UNFILTERED OPINIONS</span>
              <span>·</span>
              <span>100% VERIFIED PURCHASES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#242124] tracking-tight">
              WHAT THE BESTIES ARE SAYING
            </h2>
            <p className="text-sm sm:text-base text-[#242124]/70 mt-2 max-w-xl">
              Real wear tests, shade impressions, and honest shine reviews from verified customers across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-2.5 bg-white hover:bg-[#FFF4F0] text-[#242124] border border-[#242124]/20 rounded-full font-bold text-xs tracking-wider transition-all shadow-xs hover:shadow flex items-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-[#C91636]" />
              <span>LEAVE A REVIEW</span>
            </button>
          </div>
        </div>

        {/* Filter by Shade */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-medium scrollbar-none">
          <span className="text-[#242124]/50 shrink-0">Filter by shade:</span>
          <button
            onClick={() => setFilterShade('all')}
            className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
              filterShade === 'all'
                ? 'bg-[#C91636] text-white font-bold'
                : 'bg-white text-[#242124]/70 hover:text-[#242124] border border-[#242124]/10'
            }`}
          >
            All Shades ({reviews.length})
          </button>
          {allShadeNames.map((shade) => (
            <button
              key={shade}
              onClick={() => setFilterShade(shade)}
              className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                filterShade === shade
                  ? 'bg-[#C91636] text-white font-bold'
                  : 'bg-white text-[#242124]/70 hover:text-[#242124] border border-[#242124]/10'
              }`}
            >
              {shade}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#242124]/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C91636]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-current text-[#C91636]' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#242124]/40">{rev.date}</span>
                </div>

                <h3 className="font-bold text-base text-[#242124] mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#242124]/80 leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#242124]/10 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#242124]">
                    <span>{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#242124]/50">
                    Shade: {rev.shadePurchased}
                  </p>
                </div>

                <button
                  onClick={() => handleHelpfulClick(rev.id)}
                  className="flex items-center gap-1.5 text-[#242124]/60 hover:text-[#C91636] transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums font-mono text-[11px]">{rev.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a review modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#242124]/10 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#242124]/60 hover:text-[#242124] hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-2xl font-bold text-[#242124] mb-1">
              Spill The Tea: Leave a Review
            </h3>
            <p className="text-xs text-[#242124]/70 mb-6">
              Share your honest wear experience, finish, and shade payoff with the community.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya M."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 text-sm focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                    Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => handleProductChange(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#242124]/20 text-xs bg-white focus:outline-none focus:border-[#C91636]"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                    Shade
                  </label>
                  <select
                    value={selectedShade}
                    onChange={(e) => setSelectedShade(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#242124]/20 text-xs bg-white focus:outline-none focus:border-[#C91636]"
                  >
                    {products
                      .find((p) => p.id === selectedProduct)
                      ?.availableShades.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-current text-[#C91636]'
                            : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#242124] ml-2">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The shiniest gloss I own!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 text-sm focus:outline-none focus:border-[#C91636]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#242124]/70 mb-1">
                  Review Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How does it feel? Sticky or smooth? How does it look over liner?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#242124]/20 text-sm focus:outline-none focus:border-[#C91636] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#C91636] hover:bg-[#a5122b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
