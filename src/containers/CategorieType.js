import React, { useState } from "react";
import { Collapse, Card } from "reactstrap";
import CategorieItem from "./CategorieItem";
import EditCategorie from "./EditCategorie";
import ViewCatergoryDescription from "./ViewCatergoryDescription";
import _ from "lodash";
import { IoIosArrowDropright, IoIosArrowDropdown } from "react-icons/io";
import { UpdateDoc, deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";

const CategorieType = (props) => {
  const { refresh, setRefresh, id, item } = props;
  const { image, description, color, name } = item;
  const toggle = () => setIsOpen(!isOpen);
  const [NewColor, setNewColor] = useState(`${color}`);
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
                    flex: 0,
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
                    flex: 4,
                    width: "100%",
                    margin: "auto",
                    fontSize: "125%%",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    display: "inline",
                    marginRight: "15px",
                  }}
                >
                  Couleur
                  <input
                    onChange={(e) => {
                      setNewColor(e.target.value);
                      const category = {
                        color: NewColor,
                        name,
                      };

                      UpdateDoc(`/categorys`, id, category);
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

                <EditCategorie
                  color={NewColor}
                  name={name}
                  id={id}
                  description={description}
                  image={image}
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
                      deleteDoc("/categorys", id);
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
          <CategorieItem
            item={item}
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
            <ViewCatergoryDescription description={description} />
          </div>
        </Card>
      </Collapse>
    </div>
  );
};

export default CategorieType;
