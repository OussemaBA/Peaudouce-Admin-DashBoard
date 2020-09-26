import React, { useState } from "react";
import { Collapse, Button, Card } from "reactstrap";
import ProductItem from "./ProductItems";
import EditProduct from "../containers/EditProduct";
import AddItem from "../containers/AddItem";
import _ from "lodash";
import {
  IoIosArrowDropright,
  IoIosArrowDropdown,
  IoIosArrowDropup,
} from "react-icons/io";
import { UpdateDoc, deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";

const ProductType = (props) => {
  const { items, color, name, id, refresh, setRefresh } = props;

  const toggle = () => setIsOpen(!isOpen);
  const [NewColor, setNewColor] = useState(`#${color}`);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="content">
      <div className="main-wrapper">
        <div
          className="container main-container"
          style={{ border: `solid #f8f9fa 2px` }}
        >
          <div className="row main-row" style={{ margin: 0 }}>
            <div className="col-12">
              <div
                className="row"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  onClick={toggle}
                  className="collapseButton"
                  style={{
                    width: "100%",
                    margin: "auto",
                    flex: 1,
                    fontSize: "x-large",
                    color: "#007bff",
                  }}
                >
                  {isOpen === true ? (
                    <IoIosArrowDropdown style={{ margin: "15px" }} />
                  ) : (
                    <IoIosArrowDropright style={{ margin: "15px" }} />
                  )}
                </div>

                <div
                  style={{
                    flex: 5,
                    width: "100%",
                    margin: "auto",
                    fontSize: "125%%",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    flex: 2,
                    display: "inline",
                    marginRight: "15px",
                  }}
                >
                  Couleur
                  <input
                    onChange={(e) => {
                      setNewColor(e.target.value);
                      const prod = {
                        color: NewColor.substring(1),
                        items: items === undefined ? {} : items,
                        name,
                      };

                      UpdateDoc(`/products`, id, prod);
                    }}
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      flex: 1,
                      whiteSpace: "nowrap",
                    }}
                    type="color"
                    id="favcolor"
                    name="favcolor"
                    value={`${NewColor}`}
                  />
                </div>

                <EditProduct
                  color={NewColor}
                  name={name}
                  id={id}
                  items={items}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    cursor: "pointer",

                    marginRight: "5px",
                  }}
                >
                  <div
                    onClick={() => {
                      deleteDoc("/products", id);
                      setRefresh(!refresh);
                    }}
                    style={{
                      marginRight: "10px",

                      display: "flex",
                      flex: 2,
                      alignItems: "flex-end",
                    }}
                  >
                    <div style={{ flex: 1 }}>Supprimer</div>
                    <AiOutlineDelete
                      style={{
                        color: "red",
                        flex: 1,
                        fontSize: "x-large",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Collapse isOpen={isOpen} style={{ marginTop: "5px" }}>
        <Card style={{ padding: "15px" }}>
          {items !== undefined && Object.keys(items).length !== 0 ? (
            <div
              className="collapseButton"
              onClick={toggle}
              style={{
                color: "#007bff",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  marginBottom: "2px",
                  marginLeft: "5px",
                }}
              >
                réduire
              </div>
              <IoIosArrowDropup
                style={{
                  fontSize: "x-large",
                  cursor: "pointer",
                }}
              />
            </div>
          ) : (
            <></>
          )}
          <ProductItem
            items={items}
            id={id}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AddItem id={id} refresh={refresh} setRefresh={setRefresh} />
            <div
              className="collapseButton"
              onClick={toggle}
              style={{
                color: "#007bff",
                display: "flex",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  marginRight: "5px",
                  marginBottom: "2px",
                  marginLeft: "25px",
                }}
              >
                réduire
              </div>
              <IoIosArrowDropup
                style={{
                  flex: 1,
                  fontSize: "x-large",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </Card>
      </Collapse>
    </div>
  );
};

export default ProductType;
