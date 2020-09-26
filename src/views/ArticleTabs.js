import React, { useState, useEffect } from "react";
import { fetchData } from "../Api/Api";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import ArticlesPostBorn from "../containers/ArticlesPostBorn";
import classnames from "classnames";
import Articles from "../containers/Articles";

const Example = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [art, setArticles] = useState([]);
  const [artPost, setArticlesPost] = useState([]);
  const [loading, setLoading] = useState();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setLoading(true);
    fetchData("/articles").then((data) => {
      setArticles(data);
    });

    fetchData("/articlespostborn").then((data) => setArticlesPost(data));

    setLoading(false);
  }, []);

  return (
    <div className="content">
      <Nav tabs>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <div style={{ display: "flex" }}>
              Articles :
              <div style={{ marginLeft: "5px", flex: 1, color: "#51cbce" }}>
                {Object.keys(art)?.length}
              </div>
            </div>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <div style={{ display: "flex" }}>
              Articles post born :
              <div style={{ marginLeft: "5px", flex: 1, color: "#51cbce" }}>
                {Object.keys(artPost)?.length}
              </div>
            </div>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Articles />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <ArticlesPostBorn />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Example;
