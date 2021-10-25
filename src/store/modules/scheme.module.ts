import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Field } from '@/Interfaces'
@Module({ namespaced: true, stateFactory: true })
class Scheme extends VuexModule {
  public schemeList: Field[] = [
    {
      key: '',
      label: '',
      type: '',
      validation: {
        required: false,
      },
    }
  ];

  public triggerNewProperty = false;
  public triggerNewScheme = false;

  @Mutation
  public addToList(item: Field): void {
    console.log("add item to store list: ", item);
    this.schemeList.push(item);
  }

  @Mutation
  public updateList(payload: [item: Field, index: number]): void {
    const [item, index] = payload
    this.schemeList[index] = item;
  }

  @Mutation
  public clearList(): void {
    this.schemeList = [];
  }

  @Mutation
  public triggerNewPropertyChange(): void {
    this.triggerNewProperty = !this.triggerNewProperty;
  }

  @Mutation
  public triggerNewSchemeChange(): void {
    this.triggerNewScheme = !this.triggerNewScheme;
  }

  @Action
  addToListAction(item: Scheme): void {
    this.context.commit('addToList', item);
  }

  @Action
  clearListAction(): void {
    this.context.commit('clearList');
  }

  @Action
  triggerNewPropertyAction(): void {
    this.context.commit('triggerNewPropertyChange');
  }

  @Action
  triggerNewSchemeAction(): void {
    this.context.commit('triggerNewSchemeChange');
  }

  // @Action
  // updateListAction(item: Field, index: number): void {
  //   this.context.commit('updateList', item, index);
  // }

  get getSchemeList(): Field[] {
    return this.schemeList;
  }

  get getNewPropertyTrigger(): boolean {
    return this.triggerNewProperty;
  }

  get getNewSchemeTrigger(): boolean {
    return this.triggerNewScheme;
  }

}

export default Scheme;