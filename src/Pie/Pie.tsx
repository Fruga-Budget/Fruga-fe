import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import genericPieData from "./Mock";
import "./Pie.css"

ChartJS.register(Tooltip, Legend, ArcElement);

interface DataSet {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}

interface GenericPieData {
    labels: string[];
    datasets: DataSet[];
}

interface PieChartProps {
    data?: GenericPieData;
}

const PieChart: React.FC<PieChartProps> = ({ data = genericPieData }) => {
    const options = {};

    return (
        <div className="pie">
            <Pie options={options} data={data} />;
        </div>
    )
};

export default PieChart;
