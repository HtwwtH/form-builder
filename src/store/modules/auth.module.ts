import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthService from '@/services/auth/authService';

const storedUser = localStorage.getItem('user');
interface User {
  username: string,
  password: string
}

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public user: User | null = storedUser ? JSON.parse(storedUser) : null;

  @Mutation
  public loginSuccess(user: User): void {
    this.status.loggedIn = true;
    this.user = user;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public registerSuccess(): void {
    this.status.loggedIn = false;
  }

  @Mutation
  public registerFailure(): void {
    this.status.loggedIn = false;
  }

  @Action
  login(data: User): Promise<any> {
    return AuthService.login(data.username, data.password).then(
      user => {
        this.context.commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        this.context.commit('loginFailure');
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return Promise.reject(message);
      }
    );
  }

  @Action
  logOut(): void {
    AuthService.logout();
    this.context.commit('logout');
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}

export default User;