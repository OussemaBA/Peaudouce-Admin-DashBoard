import React, { useEffect, useState } from "react";
import "./style.css";
import { Card, Row, Col, CardFooter, Spinner } from "reactstrap";
import { fetchData, deleteDoc } from "../Api/Api";
import { AiOutlineDelete } from "react-icons/ai";
import ArticleViewer from "./ArticleViewer";
import EditArticle from "./EditArticle";
import CreateNewArticle from "./AddArticle";

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
                <div style={{ fontSize: "10px" }}>
                  Numero de semaine : {el[1].week}
                </div>
              </div>
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
                      pathToFireBase={"articles"}
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
