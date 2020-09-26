import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Badge,
} from "reactstrap";
import "./style.css";
import { handleFireBaseUpload, CreateNewDoc, fetchData } from "../Api/Api";
import _ from "lodash";
import { GrClose, GrCheckmark } from "react-icons/gr";
import ToggleButton from "react-toggle-button";

const ArticleViewer = (props) => {
  const { className, refresh, setRefresh, pathToFireBase } = props;
  const [shortdescription, setShortDescription] = useState();
  const [name, setName] = useState();
  const allInputs = { imgUrl: undefined };

  const [imageAsFile, setImageAsFile] = useState();
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [categorie, setCategorie] = useState(undefined);
  const [week, setWeek] = useState(undefined);
  const [content, setContent] = useState();
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [feature, setFeature] = useState(false);

  const toggle = () => {
    setModal(!modal);
    setRefresh(!refresh);
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  useEffect(() => {
    fetchData("/categorys").then((data) => {
      setData(data);
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Button style={{ float: "right" }} color="primary" onClick={toggle}>
        Nouveau article
      </Button>

      <Modal
        isOpen={modal}
        toggle={() => {
          toggle();
        }}
        className={className}
      >
        <ModalHeader toggle={toggle}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 3,
                color: "#FBC658",
                padding: 0,
                margin: 0,
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              nom de l'article
            </div>
            {pathToFireBase === "/articlespostborn" ? (
              <div
                style={{
                  fontSize: "12px",
                  marginTop: "2px",
                  marginRight: "2px",
                  flex: 1,
                }}
              >
                Article en premier
              </div>
            ) : (
              <></>
            )}

            <div>
              {pathToFireBase === "/articlespostborn" ? (
                <ToggleButton
                  inactiveLabel={<GrClose />}
                  activeLabel={<GrCheckmark />}
                  value={feature}
                  colors={{
                    activeThumb: {
                      base: "rgb(250,250,250)",
                    },
                    inactiveThumb: {
                      base: "rgb(62,130,247)",
                    },
                    active: {
                      base: "rgb(240, 66, 60)",
                      hover: "rgb(240, 66, 60)",
                    },
                    inactive: {
                      base: "rgb(207,221,245)",
                      hover: "rgb(207,221,245)",
                    },
                  }}
                  onToggle={(value) => {
                    setFeature(!feature);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <textarea
            placeholder={"nom de l'article"}
            onChange={(e) => setName(e.target.value)}
            className="textarea"
            style={{ width: "100%" }}
            id="name"
            name="name"
            rows="1"
            cols="66"
          >
            {name}
          </textarea>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                color: "#4ACCCD",
                padding: 0,
                margin: "8px 0px 5px 15px",
                fontSize: "15px",
              }}
            >
              Semaine :
              <Badge style={{ fontSize: "x-small" }} color="light">
                entre 1 et 40
              </Badge>
              <FormGroup style={{ marginTop: "5px" }}>
                <Input
                  placeholder={"nombre du semaine"}
                  type="number"
                  name="number"
                  id="number"
                  value={week}
                  max={40}
                  min={1}
                  onChange={(e) =>
                    e.target.value <= 40 ? setWeek(e.target.value) : setWeek(1)
                  }
                />
              </FormGroup>
            </div>
            <div
              style={{
                flex: 1,
                color: "#4ACCCD",
                padding: 0,
                margin: "8px 0px 5px 15px",

                fontSize: "15px",
              }}
            >
              Catégorie :
              <FormGroup style={{ marginTop: "5px" }}>
                <Input
                  type="select"
                  name="babysex"
                  id="babysex"
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option value={undefined}>{"choisir une catégorie"}</option>
                  {_.map(data, (el) => (
                    <option key={el.name} value={el.name}>
                      {el.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            <div style={{ marginLeft: "10px" }}></div>
          </div>
        </ModalHeader>

        <div style={{ display: "flex" }}>
          <FormGroup>
            <div
              style={{ padding: "20px 30px 30px 30px", display: "inline-grid" }}
            >
              <div
                style={{
                  color: "#FBC658",
                  padding: 0,
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                Photo de l'article
              </div>
              <Input
                style={{ width: "100px", margin: "15px", marginLeft: "25px" }}
                className="choosefile"
                type="file"
                name="file"
                id="exampleFile"
                onChange={handleImageAsFile}
              />
              <img
                src={imageAsUrl.imgUrl}
                style={{
                  height: "150px",
                  width: "150px",
                }}
              />
              <button
                style={{ margin: " 15px" }}
                onClick={(e) => {
                  handleFireBaseUpload(e, imageAsFile).then((data) => {
                    setImageAsUrl(data);
                  });
                }}
              >
                télécharger
              </button>
            </div>
          </FormGroup>

          <div className="articleDescription">
            <div className="typography-line" style={{ paddingLeft: 0 }}>
              <div
                style={{
                  color: "#FBC658",
                  padding: 0,
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                Description{" "}
              </div>

              <p className="text-primary shortdescription">
                <textarea
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="textarea"
                  placeholder={"petit description"}
                  style={{ width: "100%" }}
                  id="story"
                  name="story"
                  rows="10"
                >
                  {shortdescription}
                </textarea>
              </p>
            </div>
          </div>
        </div>

        <ModalBody>
          <textarea
            placeholder={"Description"}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            style={{ width: "100%" }}
            id="story"
            name="story"
            rows="25"
          >
            {content}
          </textarea>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={
              categorie === undefined ||
              week === undefined ||
              imageAsUrl.imgUrl === undefined ||
              content === undefined
            }
            color="primary"
            onClick={() => {
              const data =
                pathToFireBase === "/articlespostborn"
                  ? {
                      name,
                      categorie,
                      week,
                      shortdescription,
                      content,
                      image: imageAsUrl.imgUrl,
                      featured: feature === true ? "1" : "0",
                    }
                  : {
                      name,
                      categorie,
                      week,
                      shortdescription,
                      content,
                      image: imageAsUrl.imgUrl,
                    };
              console.log("pathToFireBase", data);
              CreateNewDoc(pathToFireBase, data);
              setRefresh(!refresh);
              toggle();
            }}
          >
            Créer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ArticleViewer;
