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
import { UpdateDoc, handleFireBaseUpload } from "../Api/Api";
import { AiOutlineEdit } from "react-icons/ai";

const ModalExample = (props) => {
  const {
    className,
    refresh,
    setRefresh,
    id,
    name,
    image,
    color,
    description,
  } = props;
  const [NewColor, setNewColor] = useState(`${color}`);
  const [modal, setModal] = useState(false);
  const allInputs = { imgUrl: undefined };
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [imageAsFile, setImageAsFile] = useState();

  const [form, setForm] = useState({ name: name, description: description });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  return (
    <div>
      <div
        onClick={toggle}
        style={{
          marginRight: "15px",
          cursor: "pointer",
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

            color: "#007bff",
          }}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier la categorie</ModalHeader>
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
              <th>Color</th>
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
                    src={imageAsUrl.imgUrl || image}
                    style={{
                      margin: "15px",
                      height: "250px",
                      width: "250px",
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
            disabled={
              form.name === "" ||
              (imageAsUrl.imgUrl === "" && image === "") ||
              form.description === ""
            }
            color="primary"
            onClick={() => {
              const data = {
                ...form,
                image:
                  imageAsUrl.imgUrl === undefined ? image : imageAsUrl.imgUrl,
              };
              console.log(data);
              UpdateDoc(`categorys`, id, data);

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
