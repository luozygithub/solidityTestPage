/* eslint-disable */
/* @ts-ignore */
import Vue from 'vue'
import Vuex from 'vuex'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import getWeb3 from "@/utils/getWeb3";
// @ts-ignore
import abisMethods from "./modules/abisMethods/index"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3:null,
    account:'',
    isConnected:false,
    chainId: 666,

  },
  getters: {
    isConnected: state => state.isConnected,
    account: state => state.account,
    web3: state => state.web3,
  },
  mutations: {
    SET_ACCOUNT(state, account){
      //@ts-ignore
      state.account = account
    },
    SET_ISCONNECT(state, isConnect){
      //@ts-ignore
      state.isConnected = isConnect
    },
    SET_NAVARR: (state, arr) => {
      //@ts-ignore
      state.navArr = arr
    },
    SET_NAVNAME: (state, name) => {
      //@ts-ignore
      state.navName = name
    },
    // 菜单状态
    TOGGLE_SIDEBAR: state => {
      //@ts-ignore
      state.sidebar.opened = !state.sidebar.opened
      //@ts-ignore
      state.sidebar.withoutAnimation = false
    },
    //  注册web3
    SET_WEB3INSTANCE (state, web3Instance) {
      //@ts-ignore
      state.web3 = web3Instance
      //@ts-ignore
      web3Instance?state.isConnected = true:state.isConnected = false
    },
    SET_CHAINID: (state, chainId) => {
      if (!chainId) {
        localStorage.removeItem('chainId')
        return;
      }
      chainId = parseInt(chainId)
      //@ts-ignore
      state.chainId = chainId ? chainId : null
      localStorage.setItem('chainId', chainId)
    },
    SET_BALANCE: (state, balance) => {
      //@ts-ignore
      state.balance = parseInt(balance, 10)
      localStorage.setItem('balance', balance)
    },
  },
  actions: {
    async registerWeb3 ({commit},provider) {
      return new Promise(resolve => {
        getWeb3(provider).then((result: object) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit('SET_WEB3INSTANCE', result.web3Instance.web3())
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit('SET_ACCOUNT', result.account)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit('SET_CHAINID', result.networkId)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          commit('SET_BALANCE', result.balance)
          commit("SET_ISCONNECT",true)

          // //签名结束
          resolve(result)
        }).catch((e: any) => {
          console.log('error in action registerWeb3', e)
        })
      })
    },
  },
  modules: {
    ...abisMethods
  }
})
