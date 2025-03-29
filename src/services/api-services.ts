export const fetchQuickTransferData = async ({ limit = 3, offset = 0 }: QTransferGetApiType) => {
    try {
        const response = await fetch(`/api/quick-transfer?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const contacts = await response.json();
        return contacts;
        // setData(weeklyData);
      } catch (error) {
        console.error('Error fetching weekly activity data:', error);
        return error;
        // You could set an error state here if you want to display an error message
      }
}
    // fetch(`/api/quick-transfer?limit=${limit}&offset=${offset}`)
    //     .then((res) => res.json());
