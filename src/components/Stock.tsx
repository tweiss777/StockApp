import Header from "./Header";
import Tabs from "./Tabs";
import Tab from "./Tab";
import Overview from "./Overview";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";
import { currentStockData } from "../types/currentStockData";
import { Range } from "../enums/Range";
interface IProps {
    currentStockData: currentStockData;
    overViewData: currentStockData[];
    getStocksBetweenRanges: (range: number) => void;
    loading?: boolean;
    selectedRange: number;
}

export default function Stock({
    currentStockData,
    overViewData,
    getStocksBetweenRanges,
    loading,
    selectedRange,
}: IProps) {
    function getStocks(range: number) {
        if (range === selectedRange) return;
        getStocksBetweenRanges(range);
    }
    return (
        <div>
            <Header
                stockName={currentStockData.stockName}
                currentPrice={currentStockData.currentPrice}
                change={currentStockData.change}
                changePercent={currentStockData.changePercent}
                lastUpdated={currentStockData.lastUpdated}
            />
            <Tabs>
                <Tab title="Overview">
                    <ButtonGroup>
                        <Button
                            selected={selectedRange === Range.oneDay}
                            onClick={() => getStocks(Range.oneDay)}
                        >
                            1 Day
                        </Button>
                        <Button
                            selected={selectedRange === Range.oneWeek}
                            onClick={() => getStocks(Range.oneWeek)}
                        >
                            1 Week
                        </Button>
                        <Button
                            selected={selectedRange === Range.oneMonth}
                            onClick={() => getStocks(Range.oneMonth)}
                        >
                            1 Month
                        </Button>
                        <Button
                            selected={selectedRange === Range.sixMonths}
                            onClick={() => getStocks(Range.sixMonths)}
                        >
                            6 Months
                        </Button>
                        <Button
                            selected={selectedRange === Range.oneYear}
                            onClick={() => getStocks(Range.oneYear)}
                        >
                            1 Year
                        </Button>
                    </ButtonGroup>

                    {!loading ? (
                        <Overview
                            showOneDay={selectedRange === Range.oneDay}
                            stockData={overViewData}
                        />
                    ) : (
                        <p>loading...</p>
                    )}
                </Tab>
                <Tab title="Historical Data">
                    <p>History</p>
                </Tab>
            </Tabs>
        </div>
    );
}
