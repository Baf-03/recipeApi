"use client";

import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onClick }) => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col justify-between border rounded-lg shadow-md bg-white p-4 transition-transform transform hover:scale-105 cursor-pointer"
      style={{ height: "100%" }} // Ensures cards maintain equal height
    >
      {/* Image Section */}
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      {/* Product Title */}
      <h2 className="text-lg font-semibold text-black mb-4 line-clamp-2">
        {product.title}
      </h2>

      {/* Button Section */}
      <div className="flex justify-between mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(); // Navigate to product details
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          More Info
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
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
