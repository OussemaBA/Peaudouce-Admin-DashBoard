import React, { useEffect, useState } from "react";
import "./style.css";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardFooter,
  Container,
  Spinner,
} from "reactstrap";
import { fetchData, deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import ArticleViewer from "./ArticleViewer";
import EditArticle from "./EditArticle";
import _ from "lodash";
import CreateNewArticle from "./CreateNewArticle";

import { v4 as uuidv4 } from "uuid";
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/articles").then((data) => {
      setArticles(data);
    });
  }, [refresh]);

  const renderArticles = () =>
    articles === undefined ? (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner color="primary" />
      </div>
    ) : (
      <>
        {Object.entries(articles).map((el, i) => (
          <Col key={i} style={{ padding: "10px", margin: 0 }}>
            <Card
              className="card-user"
              style={{ maxWidth: "190px", height: "250px" }}
            >
              <div className="image">
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="..."
                  src={el[1].image}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "5px 10px",
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <h6
                    className="title"
                    style={{ color: "#48BADA", minHeight: "80px" }}
                  >
                    {el[1].name.length < 39
                      ? el[1].name.slice(0, 39)
                      : el[1].name.slice(0, 40) + "..."}
                  </h6>
                </div>
              </div>
              <hr style={{ margin: 0 }} />
              <CardFooter>
                <Row className="justify-content-md-center">
                  <Col>
                    <ArticleViewer el={el[1]} />
                  </Col>

                  <Col>
                    <h5 className="articles-icons ">
                      <EditArticle
                        el={el}
                        pathToFireBase={"articles"}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    </h5>
                  </Col>

                  <Col>
                    <h5 className="articles-icons deleteIcons">
                      <AiOutlineDelete
                        onClick={() => {
                          // const articlesWithID = data.articles.map((el) => {
                          //   const key = uuidv4();
                          //   return { [key]: { el } };
                          // });
                          // data.articles = articlesWithID;
                          // var dataStr =
                          //   "data:text/json;charset=utf-8," +
                          //   encodeURIComponent(JSON.stringify(data));
                          // var downloadAnchorNode = document.createElement("a");
                          // downloadAnchorNode.setAttribute("href", dataStr);
                          // downloadAnchorNode.setAttribute(
                          //   "download",
                          //   "eezz" + ".json"
                          // );
                          // document.body.appendChild(downloadAnchorNode); // required for firefox
                          // downloadAnchorNode.click();
                          // downloadAnchorNode.remove();

                          deleteDoc("articles", el[0]);
                          setRefresh(!refresh);
                        }}
                      />
                    </h5>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </>
    );

  return (
    <div className="content">
      <Row>
        <Col style={{ flex: 1, margin: "10px 0px 0px 15px" }}>
          <CreateNewArticle
            pathToFireBase={"articles"}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Col>
      </Row>
      <div style={{ display: "block" }}>
        <Row xs="2" sm="3" md="5">
          {renderArticles()}
        </Row>
      </div>
    </div>
  );
};

export default Articles;