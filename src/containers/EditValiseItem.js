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

const EditValiseItem = (props) => {
  const { className, refresh, setRefresh, valiseID, el, itemID } = props;

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    Name: el.Name,
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
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Produit</th>
              <td>
                <Input
                  value={form.Name}
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "Name")}
                />
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={form.Name === ""}
            color="primary"
            onClick={() => {
              UpdateDoc(`valisematernite/${valiseID}/items/`, itemID, form);
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

export default EditValiseItem;
