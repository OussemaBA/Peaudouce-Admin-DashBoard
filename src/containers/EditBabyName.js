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
import { AiFillEdit } from "react-icons/ai";
import { UpdateDoc } from "../Api/Api";

const ModalExample = (props) => {
  const { className, refresh, setRefresh, el } = props;

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    Name: el[1].Name,
    signification: el[1].signification === undefined ? "" : el[1].signification,
  });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <AiFillEdit
        style={{
          cursor: "pointer",

          fontSize: "large",
          marginRight: "5px",
        }}
        onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier le nom</ModalHeader>
        <ModalBody>
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Nom</th>
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
            <tr>
              <th>Signification</th>
              <td>
                {" "}
                <Input
                  value={form.signification}
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
            disabled={form.Name === ""}
            color="primary"
            onClick={() => {
              UpdateDoc(props.pathFireBase, el[0], form);
              setRefresh(!refresh);
              toggle();
            }}
          >
            Modifier
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
