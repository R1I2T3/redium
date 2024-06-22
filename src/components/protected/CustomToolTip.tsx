import React, { useEffect, useState } from "react";

const CustomToolTip = ({
  active,
  payload,
  label,
  type,
}: {
  active: boolean;
  payload: any;
  label: string;
  type: string;
}) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    if (active && payload.length !== 0) {
      if (type === "bookmarks") {
        setQuantity(payload[0].payload.bookmarks);
      } else {
        setQuantity(payload[0].payload.comments);
      }
    }
  }, [setQuantity, payload, type, active]);
  if (active && payload.length !== 0) {
    return (
      <div className="bg-primary text-white p-4 w-[170px] md:w-[240px] lg:w-[250px]">
        <h1 className="text-sm">
          <strong>Title</strong>:{payload[0].payload.title}
        </h1>
        <p>{`${type}:${quantity}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
