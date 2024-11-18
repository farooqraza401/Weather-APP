import React from "react";

export const Test = () => {
  return (
    <div className="parent dark">
      <div className="child one dark">
        <div className="childone child dark">
          <input type="text" name="" id="" />
          <button>search</button>
        </div>
        <div className="childone dark child">
          <h1>Temp is 23 degree</h1>
        </div>
        <div className="childone dark child">
          <div>23</div>
          <div>67</div>
          <div>89</div>
          <div>89</div>
        </div>
      </div>
      <div className="child two dark">
        <div className="childtwo dark child">
          <p>Hourly forecat for today</p>
        </div>
        <div className="childtwo dark child">
          <p>daily forecast</p>
        </div>
        <div className="childtwo dark child">
          <p>Others</p>
        </div>
      </div>
    </div>
  );
};
