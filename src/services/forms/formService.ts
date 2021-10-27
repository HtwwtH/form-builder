import axios from 'axios';
import authHeader from '../auth/auth-header';
import { API_FORM } from '@/api'
import { Schema, Field, UserInput } from '@/Interfaces'

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

  customValidate(fields: Field[], userData: UserInput[]): UserInput[] {
    const rules = fields.map((item) => {
      return item.validation;
    });
    rules.forEach((item, i) => {
      if (item.required === true) {
        userData[i].userValue == "" ? (userData[i].invalid = true) : {};
      }
      if (item.required && item.minlength) {
        userData[i].userValue.length < item.minlength
          ? (userData[i].invalid = true)
          : {};
      }
      if (item.required && item.maxlength) {
        userData[i].userValue.length > item.maxlength
          ? (userData[i].invalid = true)
          : {};
      }
      if (item.required && item.min) {
        parseInt(userData[i].userValue) < item.min
          ? (userData[i].invalid = true)
          : {};
      }
      if (item.required && item.max) {
        parseInt(userData[i].userValue) > item.max
          ? (userData[i].invalid = true)
          : {};
      }
      if (item.required && item.pattern) {
        if (!userData[i].userValue.match("/" + item.pattern + "/"))
          userData[i].invalid = true;
      }
    });
    return userData;
  }
}

export default new FormService();