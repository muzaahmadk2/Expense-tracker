import React from "react";
import "./Card.css";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

function Card(props) {
  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <Container className={isDark ? "myCardDivDark" : "myCardDiv"}>
      <div> {props.children}</div>
    </Container>
  );
}

export default Card;