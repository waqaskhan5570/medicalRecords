import React from "react";
import "./FluidCard.css";
import Title from "../Typography/Title/Title";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const FluidCard = (props) => {
  return (
    <section className="FluidCard">
      <div className="container">
        <div className="row">
          <div className="col col-lg-11 col-xl-12 mx-auto">
            <div className="FluidCard-Wrap">
              <div className="head">
                <div className="card-bg-img">
                  <img src={props.img} alt="CardBgImg" />
                </div>
                <div className="overlay"></div>
              </div>
              <div className="body">
                {props.headers.map((text) => (
                  <Title color="white" isResponsive={true}>
                    {text}
                  </Title>
                ))}
                <div className="btn-box mt-3">
                  <Button variant="warning">{props.btnText}</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FluidCard.propTypes = {
  img: PropTypes.any.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  btnText: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default FluidCard;
