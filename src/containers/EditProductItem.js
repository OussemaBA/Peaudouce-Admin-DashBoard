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
import { handleFireBaseUpload, UpdateDoc } from "../Api/Api";
import { AiOutlineEdit } from "react-icons/ai";

const EditItem = (props) => {
  const { className, refresh, setRefresh, itemID, id, item } = props;

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const [modal, setModal] = useState(false);
  const allInputs = { imgUrl: undefined };

  const [imageAsFile, setImageAsFile] = useState();
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [form, setForm] = useState({
    image: item.image,
    name: item.name,
    url: item.url,
  });
  const handeChange = (e, field) =>
    setForm({ ...form, [field]: e.target.value });
  const toggle = () => setModal(!modal);

  return (
    <div>
      <AiOutlineEdit onClick={toggle} />
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
                    src={imageAsUrl.imgUrl || form.image}
                    alt={"..."}
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
                  value={form.url}
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
                image: imageAsUrl.imgUrl || form.image,
                url: imageAsUrl.imgUrl || form.image,
              };

              UpdateDoc(`products/${id}/items`, itemID, data);

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

export default EditItem;
