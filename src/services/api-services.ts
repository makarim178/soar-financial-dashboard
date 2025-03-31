import { QTransferGetApiType } from "../types";
import { getApiUrl } from "../utils/getApiUrl";

export const fetchQuickTransferData = async ({ limit = 3, offset = 0 }: QTransferGetApiType) => {
    try {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/api/quick-transfer?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const contacts = await response.json();
        return contacts;
        // setData(weeklyData);
      } catch (error) {
        console.error('Error fetching weekly activity data:', error);
        return error;
      }
}
