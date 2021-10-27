import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '@/components/Login.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {
  let actions, getters, store

  beforeEach(() => {
    actions = {
      login: jest.fn(),
    };
    getters = {
      isLoggedIn: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        Auth: {
          namespaced: true,
          actions,
          getters,
        },
      },

    })
  })

  it('is a Vue instance', () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('check title', () => {
    const wrapper = shallowMount(Login, { store, localVue })
    expect(wrapper.find('h3').text()).toContain("Вход")
  })

  it('check if logged', () => {
    const isLogged = jest.fn()
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      methods: { isLogged: isLogged }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('try to login when form submit', () => {
    const handleLogin = jest.fn()
    const wrapper = shallowMount(Login, {
      store,
      localVue,
      methods: { handleLogin: handleLogin }
    })
    wrapper.setMethods({ handleLogin: handleLogin })
    wrapper.get('form').trigger('submit')
    expect(handleLogin).toHaveBeenCalled()
  })

  it('change input type when click hide pass button', async () => {
    const wrapper = shallowMount(Login, {
      store,
      localVue,
    })
    expect(wrapper.find('.input-wrapper.pass input').attributes('type')).toBe("text")
    await wrapper.get('.hide-pass').trigger('click')
    expect(wrapper.find('.input-wrapper.pass input').attributes('type')).toBe("password")
  })

})
