import { currentStockData } from "./currentStockData";

export type StockRange = {
 oneDay: currentStockData[];
 oneWeek: currentStockData[];
 oneMonth: currentStockData[];
 sixMonths: currentStockData[];
 oneYear: currentStockData[];
}
