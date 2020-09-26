import React, { useState, useEffect } from "react";
// react plugin used to create charts
import { fetchData, CreateNewDoc, deleteDoc } from "../Api/Api";
import _ from "lodash";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { AiOutlineTeam } from "react-icons/ai";
import { RiArticleLine } from "react-icons/ri";
import { BiPurchaseTagAlt } from "react-icons/bi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(true);
  const [articles, setArticles] = useState([]);
  const [postArticles, setPostArticles] = useState([]);
  const [products, setProducts] = useState([]);
  const [femaleNames, setFemaleNames] = useState({});
  const [maleNames, setmaleNames] = useState({});

  useEffect(() => {
    //FETCH USERS

    setLoading(true);
    fetchData("/articles").then((data) => {
      setArticles(data);
    });
    fetchData("/articlespostborn").then((data) => {
      setPostArticles(data);
    });
    fetchData("/users").then((data) => {
      setUsers(data);
    });

    fetchData("/products").then((data) => setProducts(data));
    fetchData("/Namelist/female").then((data) => {
      setFemaleNames(data);
    });
    fetchData("/Namelist/male").then((data) => setmaleNames(data));

    setLoading(false);
  }, []);

  const renderDashboard = () =>
    loading === true ? (
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
        <div className="content">
          <Row>
            {/* <button
              onClick={() => {
                _.map(articles, (el, i) => {
                  _.map(el.items, (item, id) => {
                    console.log(item, id);
                    CreateNewDoc(`valisematernite/${i}/items`, item);
                    deleteDoc(`valisematernite/${i}/items`, id);
                  });
                });
              }}
            >
              {" "}
              test
            </button> */}

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <AiOutlineTeam style={{ color: "#007bff" }} />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Utilisateurs</p>
                        <CardTitle tag="p">
                          {Object.keys(users).length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Ajouter un utilisateur
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <RiArticleLine style={{ color: "#ff6529" }} />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Articles</p>
                        <CardTitle tag="p">
                          {Object.keys(articles).length +
                            Object.keys(postArticles).length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Ajouter
                  </div>
                </CardFooter>
              </Card>
            </Col>

            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <BiPurchaseTagAlt style={{ color: "#ffb742" }} />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category"> produits</p>
                        <CardTitle tag="p">
                          {Object.keys(products).length}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Ajouter
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>

                    <Col>
                      <div className="numbers">
                        <p className="card-category">NameList</p>
                        <div
                          style={{ textAlign: "left", fontSize: "large" }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <div style={{ fontSize: "15px", flex: 1 }}>
                            Filles :
                          </div>
                          <div style={{ flex: 1, fontSize: "15px" }}>
                            {Object.keys(femaleNames).length}
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div style={{ fontSize: "15px", flex: 1 }}>
                            garçons:
                          </div>
                          <div style={{ flex: 1, fontSize: "15px" }}>
                            {Object.keys(maleNames).length}
                          </div>
                        </div>

                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Ajouter
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
           */}
        </div>
      </>
    );

  return <>{renderDashboard()}</>;
};

export default Dashboard;
