import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  /*

  The line if (!product) { return <h1>Product not found</h1>; } is necessary to handle the initial state when product is null. This ensures that the component does not try to access properties of product before it is set to the fetched data.
  
  Without this line, the component tries to access properties like product.thumbnail while product is still null, causing the error Cannot read properties of null (reading 'thumbnail').

  Setting the initial state of product to an empty object {} can prevent the TypeError when accessing properties of product before the fetch completes. However, it's important to ensure that all the expected properties exist on the product object to avoid undefined values.
  */

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
      <img
        className="w-full h-48 object-cover"
        src={product.thumbnail}
        alt={product.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-700 text-base mb-4">{product.description}</p>
        <div className="mb-2">
          <span className="text-gray-700 font-semibold">Price: </span>
          <span className="text-green-600">${product.price}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-700 font-semibold">Rating: </span>
          <span className="text-yellow-500">{product.rating} ⭐</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-700 font-semibold">Brand: </span>
          <span>{product.brand}</span>
        </div>
        <div>
          <span className="text-gray-700 font-semibold">Availability: </span>
          <span
            className={`font-semibold ${
              product.availabilityStatus === "Low Stock"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {product.availabilityStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
