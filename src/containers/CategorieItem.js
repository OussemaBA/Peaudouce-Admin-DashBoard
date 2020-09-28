import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
  Description,
} from "vertical-timeline-component-react";
import React from "react";
import _ from "lodash";
import { GrView } from "react-icons/gr";

import { AiOutlineDelete, AiOutlineLink } from "react-icons/ai";
import { deleteDoc } from "../Api/Api";
import EditItem from "./EditProductItem";
const ProductItems = (props) => {
  const { item, id, refresh, setRefresh } = props;

  const trimmedText =
    item.description.length < 337
      ? item.description.slice(0, 337)
      : item.description.slice(0, 337) + "...";

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
        <>
          <Container>
            <YearContent startDate="" />

            <BodyContent>
              <Section title={item?.name}>
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      <img
                        src={item?.image}
                        style={{
                          margin: " 5px 25px 5px 0px",
                          objectFit: "cover",
                          maxHeight: "200px",
                          maxWidth: "200px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        maxHeight: "fit-content",
                        maxWidth: "400px",
                        fontSize: "15px",
                        marginRight: "10px",
                        flex: 3,
                        textAlign: "justify",
                        textJustify: "inter-word",
                      }}
                    >
                      <Description text={trimmedText} />
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
      </Timeline>
    </>
  );
};

export default ProductItems;
