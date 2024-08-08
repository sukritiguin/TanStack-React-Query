import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return data.products;
};

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 15000,
  });

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchProduct = async () => {
    //   try {
    //     setError(null);
    //     setIsLoading(true);
    //     const response = await fetch("https://dummyjson.com/products");
    //     const data = await response.json();
    //     setProducts(data.products);
    //     setIsLoading(false);
    //   } catch (err) {
    //     setError(err);
    //     setIsLoading(false);
    //   }
    // };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`} element={<Product />}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
