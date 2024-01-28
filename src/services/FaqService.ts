import { FAQ } from "../types/FAQ.tsx";
import { apiUrl } from "../constants/apiUrl.ts";

export const FaqService = {
  fetchData: async (): Promise<{ data?: FAQ[]; error?: string }> => {
    try {
      const response = await fetch(apiUrl);
      const data: FAQ[] = await response.json();

      if (data.length > 0) {
        return { data };
      } else {
        return { error: "No data found" };
      }
    } catch (error) {
      return { error: error.message };
    }
  },
};