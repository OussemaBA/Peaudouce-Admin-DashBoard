import React, { useState, useEffect } from "react";
import ProductType from "../containers/ProductType";
import { fetchData } from "../Api/Api";
import AddProduct from "../containers/AddProduct";

import _ from "lodash";
const Products = () => {
  const [products, setProducts] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/products").then((data) => {
      setProducts(data);
    });
  }, [refresh]);

  return (
    <div className="content">
      {_.map(products, (el, i) => (
        <>
          <ProductType
            refresh={refresh}
            setRefresh={setRefresh}
            name={el.name}
            items={el.items}
            color={el.color}
            id={i}
          />
        </>
      ))}
      <div>
        <AddProduct refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default Products;
