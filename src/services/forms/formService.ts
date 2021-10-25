import axios from 'axios';
import authHeader from '../auth/auth-header';
import { API_FORM } from '@/api'
import { Schema } from '@/Interfaces'

class FormService {
  async fetchForms() {
    return axios
      .get(API_FORM, { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error)
        return Promise.reject(error);
      });
  }
  async fetchSingleForm(id: string) {
    return axios
      .get(API_FORM + id, { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error)
        return Promise.reject(error);
      });
  }

  async saveNewForm(schema: Schema) {
    console.log(schema)
    return axios
      .post(API_FORM, { schema: schema }, { headers: authHeader() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error)
        return Promise.reject(error);
      });
  }
}

export default new FormService();