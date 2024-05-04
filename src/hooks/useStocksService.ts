import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getStocks } from "../services/stocksService";
import { Stock } from "../types/stock";
import { StockRange } from "../types/StockRanges";
import { currentStockData } from "../types/currentStockData";
import { Range } from "../enums/Range";
export default function useStocksService() {
  const [currentData, setCurrentData] = useState<currentStockData>();
  const [stockRanges, setStockRanges] = useState<StockRange>({
    oneDay: [],
    oneWeek: [],
    oneMonth: [],
    sixMonths: [],
    oneYear: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currentOverviewRange, setCurrentOverviewRange] = useState<
    currentStockData[]
  >([]);
  const [selectedRange, setSelectedRange] = useState<number>(Range.oneDay);
  useEffect(() => {
    async function init() {
      await getInitialStockData();
    }
    init();
  }, []);

  useEffect(() => {
    switch (selectedRange) {
      case Range.oneDay:
        setCurrentOverviewRange(stockRanges.oneDay);
        break;
      case Range.oneWeek:
        setCurrentOverviewRange(stockRanges.oneWeek);
        break;
      case Range.oneMonth:
        setCurrentOverviewRange(stockRanges.oneMonth);
        break;
      case Range.sixMonths:
        setCurrentOverviewRange(stockRanges.sixMonths);
        break;
      case Range.oneYear:
        setCurrentOverviewRange(stockRanges.oneYear);
        break;
      default:
        setCurrentOverviewRange(stockRanges.oneDay);
    }
  }, [stockRanges]);

  async function getInitialStockData() {
    try {
      setLoading(true);
      let daysTosubtract = 0;
      const currentDate: Date = new Date();
      const todaysDate = dayjs(currentDate);
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
      const startDate = oneDayAgo.format("MM-DD-YYYY");
      const endDate = todaysDate.format("MM-DD-YYYY");
      const stockData: Stock[] = await getStocks(startDate, endDate);
      const overViewData: currentStockData[] = stockData.map((stock: Stock) =>
        computeStockData(stock),
      );
      setCurrentData(overViewData[overViewData.length - 1]);
      setStockRanges({
        ...stockRanges,
        oneDay: overViewData,
      });

      setCurrentOverviewRange(stockRanges.oneDay);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function computeStockData(stock: Stock) {
    const currentPrice = stock.Close;
    const change = stock.Close - stock.Open;
    const changePercent = (change / stock.Open) * 100;
    const lastUpdated = stock.Date;
    return {
      stockName: "Apple",
      currentPrice,
      change,
      changePercent,
      lastUpdated,
    };
  }

  async function getStocksBetweenRanges(
    startDate: string,
    endDate: string,
    rangeSelection: number,
  ) {
    try {
      setLoading(true);
      const stockData: Stock[] = await getStocks(startDate, endDate);
      const overViewData: currentStockData[] = stockData.map((stock: Stock) =>
        computeStockData(stock),
      );
      switch (rangeSelection) {
        case Range.oneDay:
          setStockRanges({
            ...stockRanges,
            oneDay: overViewData,
          });
          break;
        case Range.oneWeek:
          setStockRanges({
            ...stockRanges,
            oneWeek: overViewData,
          });
          break;
        case Range.oneMonth:
          setStockRanges({
            ...stockRanges,
            oneMonth: overViewData,
          });
          break;
        case Range.sixMonths:
          setStockRanges({
            ...stockRanges,
            sixMonths: overViewData,
          });
          break;
        case Range.oneYear:
          setStockRanges({
            ...stockRanges,
            oneYear: overViewData,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return {
    setSelectedRange,
    stockRanges,
    getStocksBetweenRanges,
    currentOverviewRange,
    setCurrentOverviewRange,
    selectedRange,
    currentData,
    loading,
    error,
  };
}
