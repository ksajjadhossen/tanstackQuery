import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=5`
  );
  return response.data;
};

export default function ProductList() {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  if (isLoading) return <h5>Loading...</h5>;
  if (error) return <h5>Error loading products: {error.message}</h5>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.data.map((product) => (
            <li
              key={product.id}
              className=" flex flex-col items-center m-2 border rounded-sm"
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <p className="text-xl my-3">{product.title}</p>
            </li>
          ))}
      </ul>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 border bg-gray-100 cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Previous
          </button>
        )}

        {products.next && (
          <button
            className="p-1 mx-1 border bg-gray-100 cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
