"use client";
import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  Label,
  Legend,
  CartesianGrid,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
interface ChartProps {
  data: any;
  type: string;
}
export const Chart = ({ data, type }: ChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label value="Blogs" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          label={{ value: type, angle: -90, position: "insideLeft" }}
        ></YAxis>
        <Tooltip
          content={
            <CustomToolTip active={false} payload={[]} label="" type={type} />
          }
        />
        <Legend align="right" layout="horizontal" />
        <Line dataKey={type} fill="#6366f1" />
      </LineChart>
    </ResponsiveContainer>
  );
};
