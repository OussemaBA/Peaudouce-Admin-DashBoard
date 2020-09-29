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
import { GrFormView } from "react-icons/gr";

const ModalExample = (props) => {
  const { className, refresh, setRefresh, description } = props;

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

          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "auto", marginRight: "5px" }}>
          description
        </div>
        <div
          style={{
            fontSize: "x-large",
            marginRight: "10px",
          }}
        >
          <GrFormView />
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Description</ModalHeader>
        <ModalBody>
          <div>{description}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ width: "fit-content" }}
            color="primary"
            onClick={() => {
              setRefresh(!refresh);
              toggle();
            }}
          >
            Fermer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
