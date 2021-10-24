import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import FormService from '@/services/forms/formService';

interface Schema {
  id: string,
  schema: {
    name: string,
    fields: []
  }
}

@Module({ namespaced: true, stateFactory: true })
class Form extends VuexModule {
  public formList: Schema[] = [];
  public currentForm: any = {};

  @Mutation
  public setList(list: Schema[]): void {
    console.log('set ', list)
    this.formList = list;
  }

  @Mutation
  public setCurrentForm(item: Schema): void {
    this.currentForm = item;
  }

  @Action
  fetchForms(): Promise<any> {
    return FormService.fetchForms().then(
      list => {
        console.log(list)
        this.context.commit('setList', list);
        return Promise.resolve(list);
      },
      error => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  fetchSingleForm(id: string): Promise<any> {
    return FormService.fetchSingleForm(id).then(
      item => {
        console.log(item);
        this.context.commit('setCurrentForm', item);
        return Promise.resolve(item);
      },
      error => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  saveNewForm(schema: { name: string, fields: [] }): Promise<any> {
    return FormService.saveNewForm(schema).then(
      () => {
        console.log('saved schema: ', schema);
        return Promise.resolve(schema);
      },
      error => {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    )
  }

  get getFormList(): Schema[] {
    return this.formList;
  }

  get getCurrentForm(): Schema {
    return this.currentForm
  }
}

export default Form;