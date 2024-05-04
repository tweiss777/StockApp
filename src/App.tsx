import Stock from "./components/Stock";
import "./App.css";
import useStocksService from "./hooks/useStocksService";
import { Range } from "./enums/Range";
import dayjs from "dayjs";
function App() {
  const {
    currentData,
    getStocksBetweenRanges,
    loading,
    error,
    currentOverviewRange,
    setCurrentOverviewRange,
    stockRanges,
    selectedRange,
    setSelectedRange,
  } = useStocksService();

  async function onSelectRange(rangeSelection: number) {
    setSelectedRange(rangeSelection);
    let startDate: string = "";
    const currentDate: Date = new Date();
    const todaysDate: dayjs.Dayjs = dayjs(currentDate);
    const endDate = todaysDate.format("MM-DD-YYYY");
    if (rangeSelection === Range.oneDay) {
      let daysTosubtract = 0;
      switch (todaysDate.day()) {
        case 6:
          daysTosubtract = 1;
          break;
        case 0:
          daysTosubtract = 2;
          break;
        case 1:
          daysTosubtract = 3;
          break;
        default:
          daysTosubtract = 1;
          break;
      }

      const oneDayAgo = dayjs(currentDate).subtract(daysTosubtract, "day");
      startDate = oneDayAgo.format("MM-DD-YYYY");

      if (stockRanges.oneDay.length) {
        setCurrentOverviewRange(stockRanges.oneDay);
        return;
      }
    } else if (rangeSelection === Range.oneWeek) {
      const oneWeekAgo = dayjs(currentDate).subtract(1, "week");
      startDate = oneWeekAgo.format("MM-DD-YYYY");
      if (stockRanges.oneWeek.length) {
        setCurrentOverviewRange(stockRanges.oneWeek);
        return;
      }
    } else if (rangeSelection === Range.oneMonth) {
      const oneMonthAgo = dayjs(currentDate).subtract(1, "month");
      startDate = oneMonthAgo.format("MM-DD-YYYY");
      if (stockRanges.oneMonth.length) {
        setCurrentOverviewRange(stockRanges.oneMonth);
        return;
      }
    } else if (rangeSelection === Range.sixMonths) {
      const sixMonthsAgo = dayjs(currentDate).subtract(6, "month");
      startDate = sixMonthsAgo.format("MM-DD-YYYY");
      if (stockRanges.sixMonths.length) {
        setCurrentOverviewRange(stockRanges.sixMonths);
        return;
      }
    } else if (rangeSelection === Range.oneYear) {
      const oneYearAgo = dayjs(currentDate).subtract(1, "year");
      startDate = oneYearAgo.format("MM-DD-YYYY");
      if (stockRanges.oneYear.length) {
        setCurrentOverviewRange(stockRanges.oneYear);
        return;
      }
    }
    await getStocksBetweenRanges(startDate, endDate, rangeSelection);
  }

  return (
    <div className="stock">
      {error && <h1 className="error">Error: Something went wrong</h1>}
      {currentData && (
        <Stock
          loading={loading}
          getStocksBetweenRanges={onSelectRange}
          currentStockData={currentData}
          overViewData={currentOverviewRange}
          selectedRange={selectedRange}
        />
      )}
    </div>
  );
}

export default App;
