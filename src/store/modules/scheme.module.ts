import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Field } from '@/Interfaces'
@Module({ namespaced: true, stateFactory: true })
class Scheme extends VuexModule {
  public schemeName = ''
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
  public setSchemeName(name: string): void {
    this.schemeName = name;
  }

  @Mutation
  public addToList(item: Field): void {
    this.schemeList.push(item);
  }

  @Mutation
  public removeFromList(index: number): void {
    this.schemeList.splice(index, 1);
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
  setSchemeNameAction(name: string): void {
    this.context.commit('setSchemeName', name);
  }

  @Action
  addToListAction(item: Scheme): void {
    this.context.commit('addToList', item);
  }

  @Action
  removeFromListAction(index: number): void {
    this.context.commit('removeFromList', index);
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

  get getSchemeName(): string {
    return this.schemeName;
  }

  get getNewPropertyTrigger(): boolean {
    return this.triggerNewProperty;
  }

  get getNewSchemeTrigger(): boolean {
    return this.triggerNewScheme;
  }

}

export default Scheme;