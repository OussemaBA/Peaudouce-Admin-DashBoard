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

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({ Name: "", signification: "" });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div
        onClick={toggle}
        style={{
          cursor: "pointer",
          display: "flex",
          color: "#51cbce ",

          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "auto", marginRight: "5px" }}>
          Ajouter un nouveau nom
        </div>
        <div
          style={{
            fontSize: "x-large",
            marginRight: "10px",
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
                  onChange={(e) => handeChange(e, "Name")}
                />
              </td>
            </tr>
            <tr>
              <th>Signification</th>
              <td>
                {" "}
                <Input
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "signification")}
                />
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              CreateNewDoc(props.pathFireBase, form);
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
