import React from "react";

const Toast = ({
  factor,
  setFactor,
}: {
  factor: any;
  setFactor: (arg: any) => any;
}) => {
  return (
    factor && (
      <div className="toast">
        <div className="alert alert-info text-white text-sm">
          <span>{factor}</span>
          <button onClick={() => setFactor("")}>X</button>
        </div>
      </div>
    )
  );
};

export default Toast;
