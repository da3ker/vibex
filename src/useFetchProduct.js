import axios from "axios";
import { useEffect, useState } from "react";

const useFetchProduct = (category) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `https://vibexshop.herokuapp.com/api/products?category=${category}`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          `https://vibexshop.herokuapp.com/api/products`
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (category === "all") {
      getAllProducts();
    } else if (category) {
      getProducts();
    }
  }, [category]);

  return { products };
};

export default useFetchProduct;
