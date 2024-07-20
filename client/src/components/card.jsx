import React from 'react';
import pics from '../styles/i1.png';
import '../App.css';

const Card = ({ props }) => {
const colors = ['blue', 'yellow', 'green', 'red', 'purple', 'pink'];
const randomIndex = Math.floor(Math.random() * colors.length);
const color = colors[randomIndex];

// console.log(color)

  return (
    <div className= {`card bg-${color}-300`}>
      <div className="Cimg">
        <img src={pics} alt="" />
      </div>
      <div className="words">
        <div className="Chead">{props.food_name}</div>
        <div className="Cdis">
          <div className="CDtitle">Description</div>
          <div className="CDpara">{props.food_description}</div>
          <div className="CDparaAtt">Diet Goal : {props.diet_goal}</div>
          <div className="CDparaAtt">Diet Plan : {props.diet_plan}</div>
          <div className="CDparaAtt">Veg / Non-Veg : {props.veg_non}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
