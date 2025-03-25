import Link from 'next/link';
import Image from 'next/image';
import ProductPrice from './product-price';
import { Product } from '@/types';

const ProductCardLg = ({ product }: { product: Product }) => {
  // Define background colors for different product categories
  const getBgColor = (category?: string) => {
    const categoryColors: Record<string, string> = {
      Electronics: 'bg-blue-500',
      Clothing: 'bg-teal-500',
      Books: 'bg-purple-500',
      Home: 'bg-orange-500',
      default: 'bg-orange-500',
    };

    if (!category || !categoryColors[category]) {
      return categoryColors.default;
    }
    return categoryColors[category];
  };

  // Define text colors for price tags that match the card background
  const getTextColor = (category?: string) => {
    const categoryColors: Record<string, string> = {
      Electronics: 'text-blue-500',
      Clothing: 'text-teal-500',
      Books: 'text-purple-500',
      Home: 'text-orange-500',
      default: 'text-orange-500',
    };

    if (!category || !categoryColors[category]) {
      return categoryColors.default;
    }
    return categoryColors[category];
  };

  const bgColor = getBgColor(product.category);
  const textColor = getTextColor(product.category);

  return (
    <>
      <div className="p-1 px-4 gap-4 flex flex-wrap items-center justify-center">
        <div
          className={`flex-shrink-0 m-6 relative overflow-hidden ${bgColor} rounded-lg max-w-xs shadow-lg group gap-4`}
        >
          <svg
            className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
            viewBox="0 0 375 283"
            fill="none"
            style={{ opacity: 0.1 }}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <Link href={`/product/${product.slug}`}>
            <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div
                className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                style={{
                  background: 'radial-gradient(black, transparent 60%)',
                  transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                  opacity: 0.2,
                }}
              ></div>
              <Image
                className="relative w-40"
                src={product.images[0]}
                alt={product.name}
                width={160}
                height={160}
              />
            </div>
          </Link>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">
              {product.category || 'Product'}
            </span>
            <div className="flex justify-between">
              <span className="block font-semibold text-xl">
                {product.name}
              </span>
              {product.stock > 0 ? (
                <span
                  className={`block bg-white rounded-full ${textColor} text-xs font-bold px-3 py-2 leading-none flex items-center`}
                >
                  <ProductPrice value={Number(product.price)} />
                </span>
              ) : (
                <span className="bg-white rounded-full text-destructive text-xs font-bold px-3 py-2 leading-none flex items-center">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>

        {/* You can remove the additional hardcoded cards or keep them as placeholders if needed */}
        {/* Alternatively, you could map through an array of products to generate multiple cards */}
        {/* Example:
        {products.map((prod, index) => (
          <div key={prod.id} className={`flex-shrink-0 m-6 relative overflow-hidden ${getBgColor(index)} rounded-lg max-w-xs shadow-lg group`}>
            ...card content with prod data...
          </div>
        ))}
        */}
      </div>
    </>
  );
};

export default ProductCardLg;
