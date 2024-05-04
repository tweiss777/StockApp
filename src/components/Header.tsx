import "../scss/header.scss";
import "../scss/grid.scss";
import { currentStockData } from "../types/currentStockData";
export default function Header(props: currentStockData) {
  const { stockName, lastUpdated, currentPrice } = props;
  const isDipping: boolean = props.change < 0;
  const direction: string = isDipping ? "▼" : "▲";
  const setColor: string = isDipping ? "decrease" : "increase";
  const percentage: string = `${Math.abs(props.changePercent).toFixed(2)}%`;
  const change: string = props.change.toFixed(2);

  return (
    <div className="stock-header">
      <div className="col">
        <h1 className="stock-name"> {stockName}</h1>
        <p className="update-date">As of: {lastUpdated}</p>
      </div>

      <div className="col">
        <h1 className="current-price">
          <span className={setColor}>{direction}</span> {currentPrice}
        </h1>
        <div className="row change-container">
          <p className={`${setColor} change`}>{change}</p>
          <p className={`${setColor} change-percent`}>
            ({isDipping ? "-" : "+"}
            {percentage})
          </p>
        </div>
      </div>
    </div>
  );
}
