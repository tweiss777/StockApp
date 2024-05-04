import { currentStockData } from "../types/currentStockData";
import dayjs from "dayjs";
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
interface IProps {
    stockData: currentStockData[];
    showOneDay: boolean;
}
export default function Overview({ stockData, showOneDay }: IProps) {
    const format: string = showOneDay ? " HH:mm " : " MM-DD-YYYY ";
    const formattedData = stockData.map((stock: currentStockData) => {
        return {
            ...stock,
            currentPrice: stock.currentPrice.toFixed(2),
            lastUpdated: dayjs(stock.lastUpdated).format(format),
        };
    });
    return (
        <>
            <AreaChart
                width={1200}
                height={300}
                data={formattedData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="stock" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0074e9" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0074e9" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="lastUpdated" />
                <YAxis domain={["auto", "auto"]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="currentPrice"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#stock)"
                />
                )
            </AreaChart>
        </>
    );
}
