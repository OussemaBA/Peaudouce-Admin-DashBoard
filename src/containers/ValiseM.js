import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  FormGroup,
  Input,
  CustomInput,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import AddValiseItem from "../containers/AddValiseItem";
import EditValiseItem from "../containers/EditValiseItem";
import EditValise from "../containers/EditValise";
import _ from "lodash";

import { deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";

const ProductType = (props) => {
  const { el, refresh, setRefresh, valiseID, imageItem, name } = props;
  const { items } = el;
  const allInputs = { imgUrl: "" };

  const [image, setImage] = useState(allInputs);

  return (
    <div className="content">
      <Card>
        <div
          style={{
            padding: "15px",
          }}
        >
          <div style={{ display: "flex" }}>
            <FormGroup>
              <div
                style={{
                  padding: "20px 30px 30px 30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    flex: 1,
                    color: "#FBC658",
                    padding: 0,
                    margin: "20px",
                    fontSize: "15px",
                  }}
                >
                  {el.name}
                </div>

                <div className="imgValise">
                  <img
                    src={image.imgUrl === "" ? imageItem : image.imgUrl}
                    style={{
                      flex: 1,
                      maxWidth: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </div>
              </div>
            </FormGroup>
            <div style={{ width: "100%", marginLeft: "20px" }}>
              <Table hover className="flags-table" height="400">
                <thead style={{ width: "100%" }}>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th></th>
                    <th>Nom du Produit</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items === undefined ? (
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        {" "}
                        pas de produit
                      </div>
                    </div>
                  ) : (
                    <>
                      {_.map(items, (el, i) => (
                        <tr style={{ width: "100%" }}>
                          <td>
                            <div
                              style={{
                                cursor: "pointer",
                                color: "red",
                                fontSize: "large",
                                marginRight: "5px",
                              }}
                            >
                              <AiOutlineDelete
                                onClick={() => {
                                  deleteDoc(
                                    `valisematernite/${valiseID}/items`,
                                    i
                                  );
                                  setRefresh(!refresh);
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <EditValiseItem
                              refresh={refresh}
                              setRefresh={setRefresh}
                              itemName={items[i]}
                              valiseID={valiseID}
                              itemID={i}
                            />
                          </td>

                          <td style={{ width: "100%" }}>{items[i]}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="collapseButton"
              style={{
                alignItems: "center",
                display: "flex",
                fontSize: "x-large",
                color: "#6bd098",
              }}
            >
              <div
                style={{ color: "red", display: "flex", alignItems: "center" }}
              >
                <EditValise
                  refresh={refresh}
                  setRefresh={setRefresh}
                  valiseID={valiseID}
                  items={items}
                  image={el.image}
                  name={el.name}
                />
              </div>
              <AddValiseItem
                valiseID={valiseID}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductType;
