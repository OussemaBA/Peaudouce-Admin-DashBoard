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
import { UpdateDoc } from "../Api/Api";
import { AiOutlineEdit } from "react-icons/ai";

const ModalExample = (props) => {
  const { className, refresh, setRefresh, id, name, items, color } = props;

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({ name: name });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div
        onClick={toggle}
        style={{
          marginRight: "15px",

          display: "flex",
          flex: 2,
          alignItems: "flex-end",
        }}
      >
        <div style={{ flex: 1 }}>Modifier</div>
        <AiOutlineEdit
          style={{
            flex: 1,
            fontSize: "x-large",
            cursor: "pointer",
            color: "#007bff",
          }}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier Gamme Produit</ModalHeader>
        <ModalBody>
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Nom</th>
              <td>
                {" "}
                <Input
                  value={form.name}
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "name")}
                />
              </td>
            </tr>
            {/* <tr>
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
            </tr> */}
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              const prod = {
                color: color,
                items: items === undefined ? {} : items,
                name: form.name,
              };
              UpdateDoc("/products", id, prod);
              setRefresh(!refresh);

              toggle();
            }}
          >
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
