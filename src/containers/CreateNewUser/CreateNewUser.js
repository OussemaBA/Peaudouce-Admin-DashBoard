import React, { useState } from "react";
import firebase from "../../firebase";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { CreateNewDoc, handleFireBaseUpload } from "../../Api/Api";

import "./CreateNewUser.css";
const ModalExample = (props) => {
  const { className, setRefresh, refresh } = props;

  const allInputs = { imgUrl: "" };
  const [UserimageAsFile, setUserimageAsFile] = useState("");
  const [UserImageAsUrl, setUserImageAsUrl] = useState(allInputs);

  const [BabyImageAsFile, setBabyImageAsFile] = useState("");
  const [BabyImageAsUrl, setBabyImageAsUrl] = useState(allInputs);

  const [modal, setModal] = useState(false);
  const [formValues, setFormValue] = useState({
    babyName: "",
    email: "",
    name: "",
    poid: "",
    nTel: "",
    dateDeNaiss: "",
    dateTerme: "",
    region: "",
    sexBaby: {},
  });

  const handeChange = (e, field) => {
    setFormValue({ ...formValues, [field]: e.target.value });
  };

  const handleUserImageAsFile = (e) => {
    const image = e.target.files[0];
    setUserimageAsFile((imageFile) => image);
  };

  const BabyhandleImageAsFile = (e) => {
    const image = e.target.files[0];
    setBabyImageAsFile((imageFile) => image);
  };
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        style={{ float: "right", width: "fit-content" }}
        color="primary"
        onClick={toggle}
      >
        ajouter nouveau utilisateur
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Creér nouvel utilisateur</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                onChange={(e) => handeChange(e, "email")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Région</Label>
              <Input
                type="text"
                name="region"
                id="region"
                onChange={(e) => handeChange(e, "region")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Nom du bébé</Label>
              <Input
                type="text"
                name="region"
                id="region"
                onChange={(e) => handeChange(e, "babyName")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Nom</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={(e) => handeChange(e, "name")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Poid</Label>
              <Input
                type="number"
                name="poid"
                id="poid"
                onChange={(e) => handeChange(e, "poid")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">N° DE TELEPHONE</Label>
              <Input
                type="number"
                name="phone"
                id="phone"
                onChange={(e) => handeChange(e, "nTel")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date de naissance</Label>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                onChange={(e) => handeChange(e, "dateDeNaiss")}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleDate">Date d'accouchement</Label>
              <Input
                type="date"
                name="dateacc"
                id="exampleDateacc"
                onChange={(e) => handeChange(e, "dateTerme")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="babysex">Sex du bébé</Label>
              <Input
                type="select"
                name="babysex"
                id="babysex"
                onChange={(e) => handeChange(e, "sexBaby")}
              >
                <option value="Garçon">Garçon</option>
                <option value="fille">Fille</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  margin: "15px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Label for="exampleFile">Photo de l'utilisateur</Label>
                  <div style={{ margin: "5px" }}>
                    <Input
                      className="choosefile"
                      type="file"
                      name="file"
                      id="exampleFile"
                      onChange={handleUserImageAsFile}
                    />
                  </div>

                  <img
                    src={UserImageAsUrl.imgUrl}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                </div>
                <div
                  style={{
                    width: "fit-content",
                    alignItems: "center",
                    marginTop: "60px",
                    marginRight: "50px",
                  }}
                >
                  <Button
                    onClick={(e) => {
                      handleFireBaseUpload(e, UserimageAsFile).then((data) => {
                        setUserImageAsUrl(data);
                      });
                    }}
                  >
                    télécharger
                  </Button>
                </div>
              </div>
            </FormGroup>
            <hr />
            <FormGroup>
              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "15px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Label for="exampleFile">Photo de Bébé</Label>
                    <div style={{ margin: "5px" }}>
                      <Input
                        className="choosefile"
                        type="file"
                        name="file"
                        id="exampleFile"
                        onChange={BabyhandleImageAsFile}
                      />
                    </div>

                    <img
                      src={BabyImageAsUrl.imgUrl}
                      style={{ width: "100px", height: "100px", margin: "5px" }}
                    />
                  </div>
                  <div
                    style={{
                      width: "fit-content",
                      alignItems: "center",
                      marginTop: "60px",
                      marginRight: "50px",
                    }}
                  >
                    <Button
                      onClick={(e) => {
                        handleFireBaseUpload(e, BabyImageAsFile).then(
                          (data) => {
                            setBabyImageAsUrl(data);
                          }
                        );
                      }}
                    >
                      télécharger
                    </Button>
                  </div>
                </div>
              </FormGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ width: "fit-content" }}
            color="primary"
            type="submit"
            disabled={
              formValues.email === "" ||
              formValues.name === "" ||
              formValues.poid === "" ||
              formValues.nTel === "" ||
              formValues.dateDeNaiss === "" ||
              formValues.dateTerme === "" ||
              formValues.region === ""
            }
            onClick={() => {
              toggle();

              const user = {
                ...formValues,
                photoBaby: BabyImageAsUrl.imgUrl,
                photoUser: UserImageAsUrl.imgUrl,
              };
              CreateNewDoc("users", user);
              setRefresh(!refresh);
            }}
          >
            Creér
          </Button>{" "}
          <Button
            color="info"
            style={{ width: "fit-content" }}
            onClick={toggle}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
