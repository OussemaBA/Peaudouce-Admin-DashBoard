import React, { useState, useEffect } from "react";
import ToggleButton from "react-toggle-button";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";
import _ from "lodash";
import "./style.css";
import { AiFillEdit } from "react-icons/ai";
import { GrClose, GrCheckmark } from "react-icons/gr";

import { handleFireBaseUpload, fetchData } from "../Api/Api";
const EditArticle = (props) => {
  const {
    buttonLabel,
    className,
    el,
    pathToFireBase,
    refresh,
    setRefresh,
  } = props;
  const [shortdescription, setShortDescription] = useState(
    el[1]?.shortdescription
  );
  const [name, setName] = useState(el[1]?.name);
  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [data, setData] = useState();

  const [categorie, setCategorie] = useState(undefined);
  const [weeks, setWeeks] = useState(el[1]?.week);
  const [content, setContent] = useState(el[1]?.content);
  const [image, setImage] = useState(allInputs);
  const [feature, setFeature] = useState(el[1].featured == 1 ? true : false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  useEffect(() => {
    fetchData("/categorys").then((data) => {
      setData(data);
    });

    setImage({ imgUrl: el[1]?.image });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h5 className="articles-icons" onClick={toggle}>
        <AiFillEdit />
      </h5>
      <Modal isOpen={modal} toggle={toggle} className={className}>
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
                Article spécial
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
            onChange={(e) => setName(e.target.value)}
            className="textarea"
            style={{ width: "100%" }}
            id="name"
            name="name"
            rows="2"
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
              <Badge
                style={{ fontSize: "x-small", marginLeft: "5px" }}
                color="light"
              >
                entre 1 et 40
              </Badge>
              <FormGroup style={{ marginTop: "5px" }}>
                <Input
                  type="number"
                  name="number"
                  id="number"
                  value={weeks}
                  max={40}
                  min={1}
                  onChange={(e) =>
                    e.target.value <= 40
                      ? setWeeks(e.target.value)
                      : setWeeks(1)
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
                  {_.map(data, (el, key) => (
                    <option key={key} value={el.name}>
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
                style={{ width: "100px", margin: "15px" }}
                className="choosefile"
                type="file"
                name="file"
                id="exampleFile"
                onChange={handleImageAsFile}
              />
              <img
                src={image.imgUrl}
                style={{
                  padding: "0 15px 15px 15px",
                  width: "100px",
                  height: "100px",
                }}
              />
              <button
                style={{ margin: " 15px" }}
                onClick={(e) => {
                  handleFireBaseUpload(e, imageAsFile).then((data) => {
                    setImage(data);
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
            disabled={categorie === undefined}
            color="primary"
            onClick={() => {
              const data = {
                name,
                categorie,
                weeks,
                shortdescription,
                content,
                featured: feature,
                image: image.imgUrl,
              };

              //  UpdateDoc(pathToFireBase, el[0], data);
              // toggle();

              // setRefresh(!refresh);
            }}
          >
            Modifier
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditArticle;
