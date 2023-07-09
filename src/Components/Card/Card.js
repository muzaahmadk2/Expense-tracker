import React from "react";
import "./Card.css";
import { Container } from "react-bootstrap";

function Card(props) {
  return (
    <Container className="myCardDiv">
      <div> {props.children}</div>
    </Container>
  );
}

export default Card;