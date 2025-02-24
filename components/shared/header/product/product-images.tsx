// Make it a client component so we can use useState hook
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div className="space-y-4">
        <Image
          src={images[currentImage]}
          className="min-h-[300] object-cover object-center"
          alt="Product Image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex gap-4">
        {images.map((image, index) => (
          // List of images. Index is the key for each image so we can set the current image to the one that is clicked

          <div
            key={image}
            onClick={() => setCurrentImage(index)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              currentImage === index && 'border-orange-500'
            )}
          >
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
