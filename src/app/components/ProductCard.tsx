"use client";

import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    image: string;
  };
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onDelete }: ProductCardProps) => {
  const router = useRouter(); // Use Next.js router for navigation

  return (
    <div className="flex flex-col justify-between border rounded-lg overflow-hidden shadow-md bg-white p-4 transition-transform transform hover:scale-105">
      {/* Product Image */}
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="h-48 w-full object-cover mb-4 rounded-lg"
      />

      {/* Product Title */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 line-clamp-2">
        {product.title}
      </h2>

      {/* Button Section */}
      <div className="flex justify-between mt-auto">
        <button
          onClick={() => router.push(`/product/${product.id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          More Info
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onDelete(product.id);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
