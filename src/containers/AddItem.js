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
import { IoMdAddCircleOutline } from "react-icons/io";
import { handleFireBaseUpload, CreateNewDoc } from "../Api/Api";

const AddItem = (props) => {
  const { className, refresh, setRefresh, id } = props;

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
    name: "",
    url: "",
  });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div
        className="collapseButton"
        onClick={toggle}
        style={{
          color: "#6bd098",
          display: "flex",
          flex: 2,

          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: "15px",
            marginRight: "5px",
            marginBottom: "2px",
          }}
        >
          Ajouter
        </div>
        <IoMdAddCircleOutline
          style={{
            flex: 1,
            fontSize: "x-large",
            cursor: "pointer",
          }}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Ajouter un produit</ModalHeader>
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
                    src={imageAsUrl.imgUrl}
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
            <tr>
              <th>Url</th>
              <td>
                {" "}
                <Input
                  value={imageAsUrl.imgUrl}
                  type="text"
                  name="meaning"
                  id="meaning"
                  onChange={(e) => handeChange(e, "url")}
                />
              </td>
            </tr>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={form.Name === "" || form.signification === ""}
            color="primary"
            onClick={() => {
              const data = {
                ...form,
                image: imageAsUrl.imgUrl,
                url: imageAsUrl.imgUrl,
              };

              CreateNewDoc(`products/${id}/items`, data);

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

export default AddItem;
