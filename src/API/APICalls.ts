import {APIData, ApiResponse, SavedBudget} from '../Interfaces'
export async function getData(): Promise<APIData> {
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/${userId}/advices`);
        
        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error:unknown) {
        if (error instanceof Error) {
            console.error("Something went wrong:", error.message);
        } else {
            console.error("An unknown error occurred");
        }
        throw error;
    }
}

export async function fetchUserBudgets(userId: string): Promise<SavedBudget[]> {
    const url = `https://fruga-be-340d88ac3f29.herokuapp.com/api/v1/users/${userId}/advices`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching budgets: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error(error);
      return [] ;
    }
  }
