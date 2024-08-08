import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${productId}`,
        newProduct
      );
    },
  });

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();
    return data;
  };

  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: fetchProduct,
    staleTime: 15000,
  });

  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       setError(null);
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `https://dummyjson.com/products/${productId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setProduct(data);
  //       setIsLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>Error: {error.message}</h3>;
  }

  if(mutation.isLoading){
    return <div>Loading...</div>;
  }

  if(mutation.error){
    return <div>Error: {mutation.error.message}</div>
  }

  /*

  The line if (!product) { return <h1>Product not found</h1>; } is necessary to handle the initial state when product is null. This ensures that the component does not try to access properties of product before it is set to the fetched data.
  
  Without this line, the component tries to access properties like product.thumbnail while product is still null, causing the error Cannot read properties of null (reading 'thumbnail').

  Setting the initial state of product to an empty object {} can prevent the TypeError when accessing properties of product before the fetch completes. However, it's important to ensure that all the expected properties exist on the product object to avoid undefined values.
  */

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-4 border border-gray-200 transition-transform transform hover:scale-105">
        <img
          className="w-full h-48 object-cover rounded-lg mb-4"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="px-4">
          <h2 className="font-semibold text-2xl text-gray-800 mb-2">
            {product.title}
          </h2>
          <p className="text-gray-600 text-base mb-4">{product.description}</p>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium text-sm">Price:</span>
            <span className="text-green-600 text-xl font-semibold ml-2">
              ${product.price}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium text-sm">Rating:</span>
            <span className="text-yellow-500 text-xl font-semibold ml-2">
              {product.rating} ⭐
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-700 font-medium text-sm">Brand:</span>
            <span className="text-gray-800 text-xl font-semibold ml-2">
              {product.brand}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 font-medium text-sm">
              Availability:
            </span>
            <span
              className={`ml-2 font-semibold ${
                product.availabilityStatus === "Low Stock"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {product.availabilityStatus}
            </span>
          </div>
        </div>

        <button
          className="bg-blue-900 text-white p-3 m-5 items-center flex-auto"
          onClick={() => {
            mutation.mutate({ title: "Updated product" });
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default Product;
