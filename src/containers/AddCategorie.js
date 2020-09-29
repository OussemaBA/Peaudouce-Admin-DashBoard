import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  CustomInput,
} from "reactstrap";
import { RiPlayListAddLine } from "react-icons/ri";
import { handleFireBaseUpload, CreateNewDoc } from "../Api/Api";

const AddCategorie = (props) => {
  const { className, refresh, setRefresh, id } = props;

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const [modal, setModal] = useState(false);
  const allInputs = { imgUrl: undefined };
  const [color, setColor] = useState("#ffffff");
  const [imageAsFile, setImageAsFile] = useState();
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [form, setForm] = useState({
    image: "",
    name: "",
    description: "",
    color: "",
  });
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
          Ajouter une categorie
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
        <ModalHeader toggle={toggle}>Ajouter une categorie</ModalHeader>
        <ModalBody>
          <Table bordered className={"BordedTable"}>
            <tr>
              <th>Nom </th>
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
              <th>description </th>
              <td>
                <Input
                  value={form.description}
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "description")}
                />
              </td>
            </tr>
            <tr>
              <th>Couleur</th>
              <td>
                <input
                  onChange={(e) => handeChange(e, "color")}
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
                  value={form.color}
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
                    src={imageAsUrl.imgUrl}
                    style={{
                      margin: "15px",
                      height: "250px",
                      width: "250px",
                    }}
                  />
                  <Button
                    style={{ margin: "0 30px 0px 30px", width: "fit-content" }}
                    onClick={(e) => {
                      handleFireBaseUpload(e, imageAsFile).then((data) => {
                        setImageAsUrl(data);
                      });
                    }}
                  >
                    télécharger
                  </Button>
                </div>
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ width: "fit-content" }}
            disabled={
              form.name === "" ||
              imageAsUrl.imgUrl === "" ||
              form.description === ""
            }
            color="primary"
            onClick={() => {
              const data = {
                ...form,
                image: imageAsUrl.imgUrl,
              };
              CreateNewDoc(`categorys`, data);

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

export default AddCategorie;
