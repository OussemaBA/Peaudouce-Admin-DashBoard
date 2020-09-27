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
import { deleteDoc, CreateNewDoc } from "../Api/Api";
import { AiOutlineEdit } from "react-icons/ai";

const EditValiseItem = (props) => {
  const {
    className,
    refresh,
    setRefresh,
    valiseID,
    el,
    itemID,
    itemName,
  } = props;

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    Name: itemName,
    //signification: el[1].signification,
  });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }} onClick={toggle}>
        <AiOutlineEdit
          style={{
            cursor: "pointer",
            flex: 1,
            fontSize: "large",
            marginRight: "7px",
          }}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier le nom</ModalHeader>
        <ModalBody>
          <Table striped bordered className={"BordedTable"}>
            <tr>
              <div style={{ display: "flex", alignItems: "center" }}>
                <th style={{ whiteSpace: "nowrap" }}>Nouveau nom</th>
                <div style={{ width: "100%", paddingLeft: "5px" }}>
                  <Input
                    value={form.Name}
                    type="text"
                    name="meaning"
                    id="meaning"
                    onChange={(e) => handeChange(e, "Name")}
                  />
                </div>
              </div>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={form.Name === ""}
            color="primary"
            onClick={() => {
              deleteDoc(`valisematernite/${valiseID}/items`, itemID);
              CreateNewDoc(`valisematernite/${valiseID}/items`, form.Name);
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

export default EditValiseItem;
