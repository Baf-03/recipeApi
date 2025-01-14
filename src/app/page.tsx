"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";

interface Product {
  id: number;
  title: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const API_KEY = "a45e2d90be474410afb0d4dd9f518529"; // Embedded API Key

  const fetchProducts = async (query: string = "honey") => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/food/products/search`,
        {
          params: { query, apiKey: API_KEY },
        }
      );
      console.log("Fetched Products:", response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching products:", error.response);
        alert(
          `Error fetching products: ${
            error.response?.data.message || error.message
          }`
        );
      } else {
        console.error("Unexpected error:", error);
        alert(`Unexpected error: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    fetchProducts(query); // Fetch products with the user’s query
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const deleteProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  useEffect(() => {
    fetchProducts(); // Fetch default products on page load
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar onSearch={handleSearch} onAddClick={() => setIsModalOpen(true)} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Spoonacular Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      onDelete={deleteProduct}
      onClick={() => router.push(`/product/${product.id}`)} // Navigate to product details
    />
  ))}
</div>
      </div>
      {isModalOpen && (
        <ProductModal
          onAddProduct={addProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
