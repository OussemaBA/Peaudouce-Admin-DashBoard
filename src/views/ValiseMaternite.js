import React, { useState, useEffect } from "react";
import ValiseM from "../containers/ValiseM";
import { fetchData } from "../Api/Api";
import AddValise from "../containers/AddValise";

import _ from "lodash";

const Products = () => {
  const [products, setProducts] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/valisematernite").then((data) => {
      setProducts(data);
    });
  }, [refresh]);

  return (
    <div className="content">
      {_.map(products, (el, i) => (
        <>
          <ValiseM
            refresh={refresh}
            setRefresh={setRefresh}
            el={el}
            valiseID={i}
            imageItem={el.image}
          />
        </>
      ))}

      <div>
        <AddValise
          refresh={refresh}
          setRefresh={setRefresh}
          style={{
            cursor: "pointer",
            flex: 1,
            fontSize: "large",
            marginRight: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default Products;
