import React, { useState, useEffect } from "react";
import CategorieType from "../containers/CategorieType";
import { fetchData } from "../Api/Api";
import AddCategorie from "../containers/AddCategorie";

import _ from "lodash";
const Products = () => {
  const [categories, setCategories] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/categorys").then((data) => {
      setCategories(data);
    });
  }, [refresh]);

  return (
    <div className="content">
      {_.map(categories, (el, i) => (
        <>
          <CategorieType
            refresh={refresh}
            setRefresh={setRefresh}
            item={el}
            id={i}
          />
        </>
      ))}
      <div>
        <AddCategorie refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default Products;
