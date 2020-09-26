import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
} from "vertical-timeline-component-react";
import React from "react";
import _ from "lodash";

import { AiOutlineDelete, AiOutlineLink } from "react-icons/ai";
import { deleteDoc } from "../Api/Api";
import EditItem from "./EditItem";
const ProductItems = (props) => {
  const { items, id, refresh, setRefresh } = props;

  const customTheme = {
    yearColor: "#405b73",
    lineColor: "#d0cdc4",
    dotColor: "#262626",
    borderDotColor: "#d0cdc4",
    titleColor: "#405b73",
    subtitleColor: "#bf9765",
    textColor: "#262626",
  };

  return (
    <>
      <Timeline theme={customTheme}>
        {_.map(items, (item, i) => (
          <>
            <Container>
              <YearContent startDate="" />

              <BodyContent>
                <Section title={item?.name}>
                  <div style={{ display: "flex" }}>
                    <div
                      className={"peuImg"}
                      style={{ maxWidth: "120px", flex: 1 }}
                    >
                      <img
                        src={item?.image}
                        style={{
                          margin: " 5px 25px 5px 0px",
                          objectFit: "cover",
                          maxHeight: "100px",
                          maxWidth: "100px",
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          cursor: "pointer",
                          color: "red",
                          fontSize: "large",
                          marginRight: "5px",
                          color: "#007BFF",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <AiOutlineLink />
                        </div>
                        <div
                          style={{
                            flex: 10,
                            fontSize: "12px",
                            marginBottom: "4px",
                            marginLeft: "5px",
                          }}
                          onClick={() => {
                            setRefresh(!refresh);
                            deleteDoc(`products/${id}/items`, i);
                          }}
                        >
                          <a target="_blank" href={item?.url}>
                            Voir url
                          </a>
                        </div>
                      </div>
                      <div></div>
                      <div
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          fontSize: "large",
                          marginRight: "5px",
                          alignItems: "flex-end",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <EditItem
                            id={id}
                            itemID={i}
                            item={item}
                            refresh={refresh}
                            setRefresh={setRefresh}
                          />
                        </div>
                        <div
                          style={{
                            flex: 10,
                            fontSize: "12px",
                            marginBottom: "1px",
                            marginLeft: "5px",
                          }}
                        >
                          {" "}
                          Edit
                        </div>{" "}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          cursor: "pointer",
                          color: "red",
                          fontSize: "large",
                          marginRight: "5px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <AiOutlineDelete />
                        </div>
                        <div
                          style={{
                            flex: 10,
                            fontSize: "12px",
                            marginBottom: "4px",
                            marginLeft: "5px",
                          }}
                          onClick={() => {
                            setRefresh(!refresh);
                            deleteDoc(`products/${id}/items`, i);
                          }}
                        >
                          Supprimer
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>
              </BodyContent>
            </Container>
            <Container>
              <YearContent startDate="" style={{ display: "none" }} />
            </Container>
            <hr className={"style-four"} />
          </>
        ))}
      </Timeline>
    </>
  );
};

export default ProductItems;
