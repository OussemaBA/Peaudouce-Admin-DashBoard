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
import {
  Card,
  Button,
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
import { fetchData, deleteDoc } from "../Api/Api";
import CreateNewUser from "../containers/CreateNewUser/CreateNewUser";
import EditUser from "../containers/EditUser";

const Tables = (props) => {
  const [users, setUsers] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData("/users").then((data) => setUsers(data));
  }, [refresh]);

  const renderUsers = () =>
    users === undefined ? (
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
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <CardTitle tag="h4">liste des utilisateurs</CardTitle>
                </Col>
                <Col>
                  <CreateNewUser refresh={refresh} setRefresh={setRefresh} />
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr style={{ whiteSpace: "nowrap" }}>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Nom</th>
                    <th>Nom du bébé</th>
                    <th>image du bébé</th>
                    <th>image de l'utilisateur</th>
                    <th>sex du bébé</th>
                    <th>Date de naissance</th>
                    <th>N° de telephone</th>
                    <th>Email</th>
                    <th>Date terme</th>
                    <th>Poid</th>
                    <th>Region</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(users).map((el, i) => (
                    <tr key={i} className={"tableTr"}>
                      <td>{i + 1}</td>
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
                              deleteDoc("users", el[0]);
                              setRefresh(!refresh);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <EditUser
                          refresh={refresh}
                          setRefresh={setRefresh}
                          el={el}
                        />
                      </td>

                      <td>{el[1].name}</td>
                      <td>{el[1]?.babyName}</td>
                      <td>
                        <img
                          src={el[1]?.photoBaby || defaultProfilePhoto}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>
                        <img
                          src={el[1]?.photoUser || defaultProfilePhoto}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </td>
                      <td>{el[1]?.sexBaby}</td>
                      <td>{el[1].dateDeNaiss}</td>
                      <td>{el[1].nTel}</td>
                      <td>{el[1].email}</td>
                      <td>{el[1].dateTerme}</td>
                      <td>{el[1].poid}</td>
                      <td>{el[1].region}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  return (
    <>
      <div className="content">{renderUsers()}</div>
    </>
  );
};

export default withRouter(Tables);
