import axios from "axios";
import { SelectOption, Token } from "../types";

export const fetchPrices = async (): Promise<SelectOption[]> => {
  try {
    const response = await axios.get<Token[]>(
      "https://interview.switcheo.com/prices.json"
    );

    const uniqueList = Array.from(
      new Map(response.data.map((item) => [item.currency, item])).values()
    );
    return uniqueList.map((token) => ({
      value: token.currency,
      label: token.currency.toUpperCase(),
      price: token.price,
    }));
  } catch (error) {
    console.error("Error fetching prices", error);
    throw new Error("Failed to fetch prices");
  }
};
