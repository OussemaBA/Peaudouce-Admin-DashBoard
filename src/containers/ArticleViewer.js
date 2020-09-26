import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { GrView } from "react-icons/gr";
import "./style.css";

const ArticleViewer = (props) => {
  const { buttonLabel, className, el } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div style={{ width: "100%" }}>
      <h5 className="articles-icons" onClick={toggle}>
        <GrView />
      </h5>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <div style={{ display: "block" }}>
            <div>{el.name}</div>

            <div style={{ display: "flex" }}>
              <div
                style={{
                  color: "#FBC658",
                  padding: 0,
                  margin: 0,
                  fontSize: "15px",
                }}
              >
                Semaine : {el.week}
              </div>
              <div
                style={{
                  color: "#4ACCCD",
                  padding: 0,

                  margin: 0,
                  marginLeft: "15px",
                  fontSize: "15px",
                }}
              >
                Categorie : {el.categorie}
              </div>
            </div>
          </div>
        </ModalHeader>

        <div style={{ display: "flex" }}>
          <img
            className={"articleImg"}
            style={{
              padding: "15px",
              height: "280px",
              width: "280px",
              flex: 1,
            }}
            src={el.image}
          />

          <div className="articleDescription">
            <div className="typography-line" style={{ paddingLeft: 0 }}>
              <h5 style={{ marginBottom: 0 }}>Description :</h5>
              <p className="text-primary shortdescription">
                {el.shortdescription}
              </p>
            </div>
          </div>
        </div>

        <ModalBody>{el.content}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Fermer
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ArticleViewer;
