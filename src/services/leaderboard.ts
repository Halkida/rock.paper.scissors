import { AxiosInstance } from "axios";
import getAxiosInstance from "@/utils/axios";

class LeaderboardApi {
  http: AxiosInstance

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2');
  }

  addUser(data: Record<string, unknown>) {
    return this.http.post('/leaderboard', data)
      .catch(() => {
        console.log('leaderboard error')
      })
  }

  getLeaderboard() {
    const settings = {
      ratingFieldName: "score",
      cursor: 0,
      limit: 100
    }
    return this.http.post('/leaderboard/chalkida', settings)
      .then((response) => response.data);
  }
}

export default new LeaderboardApi();