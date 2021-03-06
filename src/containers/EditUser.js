import React, { useState, useEffect } from "react";
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
import { AiFillEdit } from "react-icons/ai";
import { fetchOne, handleFireBaseUpload, UpdateDoc } from "../Api/Api";
import firebase from "../firebase";
import defaultProfilePhoto from "../photos/Profile";

const ModalExample = (props) => {
  const { className, el, setRefresh, refresh } = props;
  const storage = firebase.storage();
  const [loading, setLoading] = useState(false);
  const allInputs = { imgUrl: "" };
  const [UserimageAsFile, setUserimageAsFile] = useState("");
  const [UserImageAsUrl, setUserImageAsUrl] = useState({
    imgUrl: el[1].photoUser,
  });

  const [BabyImageAsFile, setBabyImageAsFile] = useState("");
  const [BabyImageAsUrl, setBabyImageAsUrl] = useState({
    imgUrl: el[1].photoBaby,
  });

  const [formValues, setFormValue] = useState({
    babyName: "",
    email: "",
    name: "",
    poid: "",
    nTel: "",
    dateDeNaiss: "",
    dateTerme: "",
    region: "",
    photoBaby: "",
    photoUser: "",
    sexBaby: "n",
  });

  const handleUserImageAsFile = (e) => {
    const image = e.target.files[0];
    setUserimageAsFile((imageFile) => image);
  };

  const BabyhandleImageAsFile = (e) => {
    const image = e.target.files[0];
    setBabyImageAsFile((imageFile) => image);
  };

  useEffect(() => {
    fetchOne("users", el[0]).then((data) => {
      const {
        babyName,
        email,

        name,
        poid,
        nTel,
        dateDeNaiss,
        dateTerme,
        region,
        photoBaby,
        photoUser,
        sexBaby,
      } = data;

      setFormValue({
        babyName: babyName === undefined ? "" : babyName,
        email,
        name,
        poid,
        nTel,
        dateDeNaiss: dateDeNaiss === undefined ? "" : dateDeNaiss,
        dateTerme,
        region,
        sexBaby: sexBaby === undefined ? "n" : sexBaby,
        photoBaby,
        photoUser,
      });
    });
  }, [el[0]]);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handeChange = (e, field) => {
    setFormValue({ ...formValues, [field]: e.target.value });
  };

  return (
    <div>
      <div
        style={{
          cursor: "pointer",
          fontSize: "large",
          marginRight: "30px",
        }}
      >
        <AiFillEdit onClick={toggle} />
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modifier un utilisateur</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                value={formValues.email}
                type="email"
                name="email"
                id="exampleEmail"
                onChange={(e) => handeChange(e, "email")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Région</Label>
              <Input
                value={formValues.region}
                type="text"
                name="region"
                id="region"
                onChange={(e) => handeChange(e, "region")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Nom du bébé</Label>
              <Input
                value={formValues.babyName}
                type="text"
                name="babyName"
                id="babyName"
                onChange={(e) => handeChange(e, "babyName")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Nom</Label>
              <Input
                value={formValues.name}
                type="text"
                name="name"
                id="name"
                onChange={(e) => handeChange(e, "name")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Poid</Label>
              <Input
                value={formValues.poid}
                type="number"
                name="poid"
                id="poid"
                onChange={(e) => handeChange(e, "poid")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">N° DE TELEPHONE</Label>
              <Input
                value={formValues.nTel}
                type="number"
                name="phone"
                id="phone"
                onChange={(e) => handeChange(e, "nTel")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date de naissance</Label>
              <Input
                value={formValues.dateDeNaiss}
                type="date"
                name="date"
                id="exampleDate"
                onChange={(e) => handeChange(e, "dateDeNaiss")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date d'accouchement</Label>
              <Input
                value={formValues.dateTerme}
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
                <option value="n">choisir un sex</option>
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
                      onChange={BabyhandleImageAsFile}
                    />
                  </div>

                  <img
                    src={
                      UserImageAsUrl.imgUrl === undefined
                        ? formValues.photoUser
                        : UserImageAsUrl.imgUrl
                    }
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
                    src={
                      BabyImageAsUrl.imgUrl === undefined
                        ? formValues.photoBaby
                        : BabyImageAsUrl.imgUrl
                    }
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
                      handleFireBaseUpload(e, BabyImageAsFile).then((data) => {
                        setBabyImageAsUrl(data);
                      });
                    }}
                  >
                    télécharger
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ width: "fit-content" }}
            type="submit"
            color="primary"
            disabled={
              formValues.email === "" ||
              formValues.name === "" ||
              formValues.poid === "" ||
              formValues.nTel === "" ||
              formValues.dateDeNaiss === "" ||
              formValues.dateTerme === "" ||
              formValues.region === "" ||
              formValues.sexBaby === ""
            }
            onClick={() => {
              const user = {
                ...formValues,
                photoBaby: BabyImageAsUrl.imgUrl || defaultProfilePhoto,
                photoUser: UserImageAsUrl.imgUrl || defaultProfilePhoto,
              };
              UpdateDoc("users", el[0], user);
              toggle();
              setRefresh(!refresh);
            }}
          >
            Modifier
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
