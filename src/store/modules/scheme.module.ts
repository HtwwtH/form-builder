import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

interface Option {
  id: string;
  key: string;
  value: string;
}
interface Scheme {
  key: string,
  label: string,
  type: string,
  validation: {
    required: boolean,
    min?: number,
    max?: number,
    pattern?: string
  },
  options?: Option[];
}

@Module({ namespaced: true, stateFactory: true })
class Scheme extends VuexModule {
  public schemeList: Scheme[] = [];

  @Mutation
  public addToList(item: Scheme): void {
    console.log("add item to store list: ", item);
    this.schemeList.push(item);
  }

  @Mutation
  public clearList(): void {
    this.schemeList = [];
  }

  @Action
  addToListAction(item: Scheme): void {
    this.context.commit('addToList', item);
  }

  @Action
  clearListAction(): void {
    this.context.commit('clearList');
  }

  get getSchemeList(): Scheme[] {
    return this.schemeList;
  }

}

export default Scheme;