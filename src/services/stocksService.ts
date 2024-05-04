import axios from "axios";

export async function getStocks(startDate: string, endDate: string) {
    console.log(startDate, endDate)
    const endpoint = `https://test.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=30&Precision=Minutes&StartTime=${startDate}&EndTime=${endDate}%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`
  const response = await axios.get(endpoint);
  return response.data;
}
