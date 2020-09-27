import React, { useEffect, useState } from "react";
import "./style.css";
import { Card, Row, Col, CardFooter, Spinner } from "reactstrap";
import { fetchData, deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";
import ArticleViewer from "./ArticleViewer";
import EditArticle from "./EditArticle";
import CreateNewArticle from "./CreateNewArticle";
import { RibbonContainer, RightRibbon } from "react-ribbons";

const ArticlesPostBorn = () => {
  const [articles, setArticles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/articlespostborn").then((data) => {
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
            <RibbonContainer className="custom-class">
              <Card
                className="card-user"
                style={{ maxWidth: "190px", height: "250px" }}
              >
                <div className="image">
                  <img
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
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
                  <div style={{ display: "block", marginTop: "10px" }}>
                    <h6
                      className="title"
                      style={{ color: "#48BADA", minHeight: "80px" }}
                    >
                      {el[1].name.length < 39
                        ? el[1].name.slice(0, 39)
                        : el[1].name.slice(0, 40) + "..."}
                    </h6>
                    <div style={{ fontSize: "10px" }}>
                      Numero de semaine : {el[1].week}
                    </div>
                  </div>
                  {el[1].featured === "1" ? (
                    <RightRibbon
                      backgroundColor="#cc0000"
                      color="#f0f0f0"
                      fontFamily="Arial"
                    >
                      Spéciale
                    </RightRibbon>
                  ) : (
                    <></>
                  )}
                </div>{" "}
                <hr style={{ margin: 0 }} />
                <CardFooter>
                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <ArticleViewer el={el[1]} />

                    <h5 className="articles-icons ">
                      <EditArticle
                        el={el}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        pathToFireBase={"/articlespostborn"}
                      />
                    </h5>

                    <h5 className="articles-icons deleteIcons">
                      <AiOutlineDelete
                        onClick={() => {
                          deleteDoc("/articlespostborn", el[0]);
                          setRefresh(!refresh);
                        }}
                      />
                    </h5>
                  </Row>
                </CardFooter>
              </Card>
            </RibbonContainer>
          </Col>
        ))}
      </>
    );

  return (
    <div className="content">
      <Row>
        <Col style={{ flex: 1, margin: "10px 0px 0px 15px" }}>
          <CreateNewArticle
            pathToFireBase={"/articlespostborn"}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Col>
      </Row>
      {console.log(articles)}

      <div style={{ display: "block" }}>
        <Row xs="2" sm="3" md="5">
          {renderArticles()}
        </Row>
      </div>
    </div>
  );
};

export default ArticlesPostBorn;
