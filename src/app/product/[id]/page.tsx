import axios from "axios";

interface ProductDetailsProps {
  params: { id: string };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const API_KEY = "a45e2d90be474410afb0d4dd9f518529";
  const { id } = params;

  let product;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/food/products/${id}`,
      { params: { apiKey: API_KEY } }
    );
    product = response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return (
      <div className="container mx-auto p-6">
        <p className="text-center text-red-500">
          Error fetching product details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-lg p-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.title}
            className="rounded-lg shadow-md object-cover w-full h-96"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            {product.description || "No description available."}
          </p>
          {product.instructionsUrl ? (
            <a
              href={product.instructionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Full Instructions
            </a>
          ) : (
            <p className="text-gray-500 italic">
              No instructions available for this product.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
