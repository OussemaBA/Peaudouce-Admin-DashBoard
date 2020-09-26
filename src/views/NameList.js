import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Spinner,
  Col,
} from "reactstrap";

import { fetchData, deleteDoc } from "../Api/Api";
import _ from "lodash";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.css";
import CreateNewNameList from "../containers/NewBabyName";
import EditBabyName from "../containers/EditBabyName";

const NameList = () => {
  const [femaleNames, setFemaleNames] = useState({});
  const [maleNames, setMaleNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetchData("/Namelist/female").then((data) => {
      setFemaleNames(data);
    });
    fetchData("/Namelist/male").then((data) => {
      setMaleNames(data);
    });

    setLoading(false);
  }, [refresh]);

  const renderBabyNames = () =>
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
        <Col md="12">
          {console.log("femaleNames", femaleNames)}
          <Card className="card-plain">
            <CardHeader>
              <CardTitle tag="h4">Pour fille</CardTitle>
            </CardHeader>
            <CardBody>
              <Table borderless hover height="400" className="flags-table">
                <thead className="text-primary">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Nom</th>
                        <th></th>
                        <th></th>

                        <th>signification</th>
                      </tr>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        cursor: "pointer",
                        fontSize: "x-large",
                        marginRight: "10px",
                      }}
                    >
                      <CreateNewNameList
                        refresh={refresh}
                        setRefresh={setRefresh}
                        pathFireBase={"/Namelist/female/"}
                      />
                    </div>
                  </div>
                </thead>
                <tbody style={{ width: "100%" }}>
                  {Object.entries(femaleNames).map((el, key) => (
                    <tr className={"tableTr"} key={key}>
                      <td>
                        <div className="text-primary">{key + 1}</div>
                      </td>
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
                              deleteDoc("/Namelist/female/", el[0]);
                              setRefresh(!refresh);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <EditBabyName
                          refresh={refresh}
                          setRefresh={setRefresh}
                          el={el}
                          pathFireBase={"/Namelist/female/"}
                        />
                      </td>

                      <td className={"tableTd"}> {el[1].Name}</td>
                      <td>{el[1].signification}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col md="12">
          <Card className="card-plain">
            <CardHeader>
              <CardTitle tag="h4"> Pour garçon</CardTitle>
            </CardHeader>
            <CardBody>
              <Table height="400" className="flags-table">
                <thead className="text-primary">
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>

                    <th>Nom</th>
                    <th>signification</th>
                    <th>
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "x-large",
                          marginRight: "10px",
                        }}
                      >
                        <CreateNewNameList
                          refresh={refresh}
                          setRefresh={setRefresh}
                          pathFireBase={"/Namelist/male/"}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(maleNames).map((el, key) => (
                    <tr className={"tableTr"} key={key}>
                      <td>
                        <div className="text-primary">{key + 1}</div>
                      </td>
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
                              deleteDoc("/Namelist/male/", el[0]);

                              setRefresh(!refresh);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <EditBabyName
                          refresh={refresh}
                          setRefresh={setRefresh}
                          el={el}
                          pathFireBase={"/Namelist/male/"}
                        />
                      </td>

                      <td className={"tableTd"}> {el[1].Name}</td>
                      <td>{el[1].signification}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </>
    );

  return <div className="content">{renderBabyNames()}</div>;
};

export default NameList;
