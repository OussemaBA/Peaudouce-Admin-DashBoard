import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from "reactstrap";
import { RiPlayListAddLine } from "react-icons/ri";
import { CreateNewDoc } from "../Api/Api";

const ModalExample = (props) => {
  const { className, refresh, setRefresh } = props;
  const [NewColor, setNewColor] = useState("#fff");

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({ name: "", signification: "" });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div
        onClick={toggle}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px",
          alignItems: "center",
        }}
      >
        <div
          className="collapseButton"
          style={{ color: "#007bff", marginRight: "15px" }}
        >
          {" "}
          Ajouter gamme produit
        </div>
        <div
          className="collapseButton"
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "x-large",
            color: "#007bff",
          }}
        >
          <RiPlayListAddLine />
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Ajoute d'un nouveau nom</ModalHeader>
        <ModalBody>
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Nom</th>
              <td>
                {" "}
                <Input
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "name")}
                />
              </td>
            </tr>
            <tr>
              <th>Color</th>
              <td>
                <input
                  onChange={(e) => {
                    setNewColor(e.target.value);
                  }}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    flex: 1,
                    color: "black",
                    whiteSpace: "nowrap",
                  }}
                  type="color"
                  id="favcolor"
                  name="favcolor"
                  value={NewColor}
                />
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              const prod = {
                color: NewColor,
                items: {},
                name: form.name,
              };

              CreateNewDoc("/products", prod);
              setRefresh(!refresh);
              toggle();
            }}
          >
            Ajouter
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
