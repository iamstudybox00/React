import React from "react";

export default function Counter(props) {
  return (<>
    <div className="counter">
      <button className="counter-action decrement"
        onClick={() => {
          //  alert('점수차감'); 
           props.onChangeScore('-', props.idx);
           }}> -</button>
      <span className="counter-score">{props.score}</span>
      <button className="counter-action increment"
        onClick={() => { 
          // alert('점수증가');
          props.onChangeScore('+', props.idx);
          }}> +</button>
    </div>
  </>);
}