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
const genericPieData: GenericPieData = {
    labels: ["Needs", "Wants", "Savings"],
    datasets: [
        {
            label: "Amount",
            data: [2500, 1500, 1000],
            backgroundColor: [
                "rgba(19, 141, 117, 0.9)",
                "rgba(84, 153, 199, 0.9)",
                "rgba(91, 124, 153, 0.9)"
            ],
            hoverOffset: 4,
        }
    ]
}

export default genericPieData;