import axios from 'axios';
import { API_AUTH } from '@/api'

interface Token {
  access_token: string;
}

class AuthService {
  async login(username: string, password: string) {
    return axios
      .post<Token>(API_AUTH, {
        username,
        password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(error => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

}

export default new AuthService();