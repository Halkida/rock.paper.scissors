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
}

export default new LeaderboardApi();