/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// reactstrap components

import { fetchData, deleteDoc } from "../Api/Api";
import _ from "lodash";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Spinner,
  Col,
} from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";
import defaultProfilePhoto from "../photos/Profile";
import NewBabyDev from "../containers/AddBabyDev";
import EditBabyDev from "../containers/EditBabyDev";

const BabyDevelopment = (props) => {
  const [baby, setBaby] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/baby").then((data) => setBaby(data));
  }, [refresh]);

  const renderBabyDev = () =>
    baby === undefined ? (
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
      <Row>
        <div>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag="h4">Profile Bébé</CardTitle>
                </Col>
                <Col>
                  <NewBabyDev refresh={refresh} setRefresh={setRefresh} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ width: "fit-content" }}>
              <Table hover height="400">
                <thead className="text-primary">
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th></th>
                    <th></th>
                    <th>Semaine</th>

                    <th>Titre</th>
                    <th>Description</th>
                    <th>Article image</th>
                    <th>Circle image</th>
                    <th>Petit description</th>
                    <th>Taille</th>
                    <th>Poid</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(baby).map((el, i) => (
                    <tr key={i} className={"tableTr"}>
                      <td>
                        <div
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "large",
                            marginRight: "5px",
                          }}
                        >
                          <AiOutlineDelete
                            onClick={() => {
                              deleteDoc("baby", el[0]);
                              setRefresh(!refresh);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <EditBabyDev
                          refresh={refresh}
                          setRefresh={setRefresh}
                          el={el}
                        />
                      </td>
                      <td>
                        {" "}
                        <div style={{ width: "50px" }}>{el[1].week}</div>
                      </td>

                      <td>{el[1].titre}</td>
                      <td>
                        <div style={{ width: "200px" }}>
                          {el[1].description}
                        </div>
                      </td>
                      <td>
                        <img src={el[1]?.articleimage || defaultProfilePhoto} />
                      </td>
                      <td>
                        <img
                          src={el[1]?.circleimage || defaultProfilePhoto}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td>{el[1].shortdescription}</td>
                      <td>{el[1].taille}</td>
                      <td>{el[1].poid}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </Row>
    );
  return (
    <>
      <div className="content">{renderBabyDev()}</div>
    </>
  );
};

export default withRouter(BabyDevelopment);
