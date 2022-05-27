import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { useSelector } from "react-redux";

//Components~~~
import Product from "./Product";
import useFetchProduct from "../useFetchProduct";
import Loading from "./Loading";

const Container = styled.div`
  ${tw`w-full flex justify-center gap-x-20 flex-wrap gap-y-32 mt-5 mb-40`}
`;

const Products = ({ category, filter, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { searchInput } = useSelector((state) => state.search);
  const { products } = useFetchProduct(category);

  //[START]=*=*=*=*=*=FILTERING PRODUCTS=*=*=*=*=*=//
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filter]);
  //=*=*=*=*=*=FILTERING PRODUCTS=*=*=*=*=*=[END]//

  //[START]=*=*=*=*=*=SORTING PRODUCTS=*=*=*=*=*=//
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === "oldest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [products, category, sort]);
  //=*=*=*=*=*=SORTING PRODUCTS=*=*=*=*=*=[END]//

  return (
    <Container>
      {filteredProducts
        .filter(
          (i) =>
            i.name.toLowerCase().includes(searchInput) ||
            i.categories.join().toLowerCase().includes(searchInput) ||
            i.colors.join().toLowerCase().includes(searchInput) ||
            i.sizes.join().toLowerCase().includes(searchInput)
        )
        .map((item) => (
          <Product item={item} key={item._id} />
        ))}
      {products.length < 1 && <Loading />}
    </Container>
  );
};

export default Products;
