import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
  CustomInput,
} from "reactstrap";
import { deleteDoc, UpdateDoc } from "../Api/Api";
import { IoMdAddCircleOutline } from "react-icons/io";
import { handleFireBaseUpload, CreateNewDoc } from "../Api/Api";
import { AiOutlineEdit } from "react-icons/ai";

const AddItem = (props) => {
  const {
    className,
    refresh,
    setRefresh,
    items,
    valiseID,
    image,
    name,
  } = props;

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const [modal, setModal] = useState(false);
  const allInputs = { imgUrl: undefined };

  const [imageAsFile, setImageAsFile] = useState();
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [form, setForm] = useState({
    image: "",
    name: name,
    url: "",
  });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div
        onClick={(e) => {
          toggle();
        }}
        style={{
          flex: 1,
          fontSize: "12px",
          whiteSpace: "nowrap",
          margin: "10px 15px 5px 5px",
        }}
      >
        Modifier valise
        <AiOutlineEdit
          style={{
            cursor: "pointer",
            flex: 1,
            fontSize: "large",
            marginRight: "10px",
          }}
        />
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier le nom</ModalHeader>
        <ModalBody>
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Nom</th>
              <td>
                <Input
                  value={form.name}
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "name")}
                />
              </td>
            </tr>
            <tr>
              <th>image</th>
              <td
                className={"productImg"}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  style={{
                    padding: "20px 30px 30px 30px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      margin: "0px 30px 0px 30px",
                      width: "80%",
                      overflow: "hidden",
                    }}
                  >
                    <CustomInput
                      className="choosefile upload"
                      type="file"
                      id="exampleCustomFileBrowser"
                      name="customFile"
                      label="Choisir un fichier"
                      onChange={handleImageAsFile}
                    />
                  </div>
                  <img
                    src={
                      imageAsUrl.imgUrl === undefined
                        ? image
                        : imageAsUrl.imgUrl
                    }
                    style={{
                      margin: "15px",
                      height: "200px",
                      width: "200px",
                    }}
                  />
                  <button
                    style={{ margin: "0 30px 0px 30px", width: " 80%" }}
                    onClick={(e) => {
                      handleFireBaseUpload(e, imageAsFile).then((data) => {
                        setImageAsUrl(data);
                      });
                    }}
                  >
                    télécharger
                  </button>
                </div>
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={form.name === ""}
            color="primary"
            onClick={() => {
              const doc = {
                name: form.name,
                items: items === undefined ? {} : items,
                image:
                  imageAsUrl.imgUrl === undefined ? image : imageAsUrl.imgUrl,
              };
              console.log("doc:", doc);
              UpdateDoc(`valisematernite`, valiseID, doc);

              setRefresh(!refresh);
              toggle();
            }}
          >
            Enregister
          </Button>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => {
              deleteDoc(`valisematernite`, valiseID);

              setRefresh(!refresh);
              toggle();
            }}
          >
            Supprimer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddItem;
