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
import { handleFireBaseUpload, CreateNewDoc } from "../Api/Api";

const ModalExample = (props) => {
  const { className, setRefresh, refresh } = props;

  const [UserimageAsFile, setUserimageAsFile] = useState("");
  const [UserImageAsUrl, setUserImageAsUrl] = useState({
    imgUrl: "",
  });

  const [BabyImageAsFile, setBabyImageAsFile] = useState("");
  const [BabyImageAsUrl, setBabyImageAsUrl] = useState({
    imgUrl: "",
  });

  //	WEEK	TITRE	DESCRIPTION	ARTICLEIMAGE	CIRCLEIMAGE	SHORTDESCRIPTION	TAILLE	POID

  const initinalState = {
    week: "",
    description: "",
    articleimage: "",
    circleimage: "",
    shortdescription: "",
    taille: "",
    titre: "",
    poid: "",
  };

  const [formValues, setFormValue] = useState(initinalState);

  const handleUserImageAsFile = (e) => {
    const image = e.target.files[0];
    setUserimageAsFile((imageFile) => image);
  };

  const BabyhandleImageAsFile = (e) => {
    const image = e.target.files[0];
    setBabyImageAsFile((imageFile) => image);
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handeChange = (e, field) => {
    setFormValue({ ...formValues, [field]: e.target.value });
  };

  return (
    <div>
      <Button
        style={{ float: "right", width: "fit-content" }}
        color="primary"
        onClick={toggle}
      >
        ajouter
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Ajouter profile Bébé</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleNumber">Semaine</Label>
              <Input
                value={formValues.week}
                type="number"
                name="week"
                id="week"
                onChange={(e) => handeChange(e, "week")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Titre</Label>
              <Input
                value={formValues.titre}
                type="text"
                name="titre"
                id="titre"
                onChange={(e) => handeChange(e, "titre")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Description</Label>
              <textarea
                value={formValues.description}
                type="text"
                cols={60}
                rows={4}
                name="description"
                id="description"
                onChange={(e) => handeChange(e, "description")}
              ></textarea>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Shortdescription</Label>
              <textarea
                value={formValues.shortdescription}
                type="text"
                cols={60}
                rows={3}
                name="shortdescription"
                id="shortdescription"
                onChange={(e) => handeChange(e, "shortdescription")}
              ></textarea>
            </FormGroup>

            <FormGroup>
              <Label for="exampleNumber">Poid</Label>
              <Input
                value={formValues.poid}
                type="text"
                name="poid"
                id="poid"
                onChange={(e) => handeChange(e, "poid")}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">Taille</Label>
              <Input
                value={formValues.taille}
                type="text"
                name="taille"
                id="taille"
                onChange={(e) => handeChange(e, "taille")}
              />
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
                  <Label for="articleimage">Article image</Label>
                  <div style={{ margin: "5px" }}>
                    <Input
                      className="choosefile"
                      type="file"
                      name="articleimage"
                      id="articleimage"
                      onChange={handleUserImageAsFile}
                    />
                  </div>
                  <img
                    src={UserImageAsUrl.imgUrl || formValues.articleimage}
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
                  <Label for="exampleFile">Image du bébé</Label>
                  <div style={{ margin: "5px" }}>
                    <Input
                      className="choosefile"
                      type="file"
                      name="articleimage"
                      id="articleimage"
                      onChange={BabyhandleImageAsFile}
                    />
                  </div>
                  <img
                    src={BabyImageAsUrl.imgUrl || formValues.circleimage}
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
              formValues.week === "" ||
              formValues.poid === "" ||
              formValues.description === "" ||
              formValues.shortdescription === "" ||
              formValues.taille === "" ||
              formValues.titre === "" ||
              BabyImageAsUrl.imgUrl === "" ||
              UserImageAsUrl.imgUrl === ""
            }
            onClick={() => {
              const data = {
                ...formValues,
                articleimage: BabyImageAsUrl.imgUrl,
                circleimage: UserImageAsUrl.imgUrl,
              };

              CreateNewDoc("baby", data);
              toggle();
              setRefresh(!refresh);
            }}
          >
            Ajouter
          </Button>{" "}
          <Button
            style={{ width: "fit-content" }}
            color="info"
            onClick={() => {
              toggle();
              setFormValue(initinalState);
            }}
          >
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
