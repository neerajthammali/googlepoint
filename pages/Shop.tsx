import React from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingCart, Star, Check } from 'lucide-react';

const Shop: React.FC = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-serif font-bold text-brand-darkBlue mb-6">The Emporium</h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-serif italic">
            Premium assets for the discerning builder.
          </p>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-none shadow-[4px_4px_0px_0px_rgba(30,58,138,0.1)] border border-stone-200 overflow-hidden flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(180,83,9,0.2)] transition-all duration-300 hover:-translate-y-1 group">
              <div className="h-52 bg-stone-100 relative overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover filter contrast-[0.9] sepia-[0.2] group-hover:sepia-0 transition-all duration-500" />
                <div className="absolute top-4 right-4 bg-brand-darkBlue text-brand-gold px-3 py-1 font-bold text-sm shadow-md border border-brand-gold">
                   ${product.price}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   <h3 className="text-2xl font-serif font-bold text-brand-darkBlue">{product.name}</h3>
                </div>
                <div className="flex items-center text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">
                     <Star size={12} fill="currentColor" className="mr-1" />
                     {product.rating} / 5.0 Rating
                </div>
                <p className="text-stone-500 text-sm mb-6 font-serif leading-relaxed">{product.description}</p>
                
                <div className="mb-8 space-y-3 flex-1 border-t border-stone-100 pt-6">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-xs text-stone-600 font-medium uppercase tracking-wide">
                      <Check size={12} className="text-brand-gold mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className="w-full bg-brand-darkBlue text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-darkBlue transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={14} />
                  Acquire Asset
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;