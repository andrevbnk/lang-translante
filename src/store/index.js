import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import user from '@/modules/user';
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const userState = createPersistedState({
  paths:['user'],
})

export default new Vuex.Store({
  state: {
    resultSearch : false,
  },
  mutations: {
    setResult(state,result){
      state.resultSearch = result;
      console.log(state.resultSearch);
    }
  },
  actions: {
    async getSearch({commit},data){
      let result = await axios.post('/translate',data).then(res=>{
        commit('setResult',res);
        return res;
      });
      return result;
    }
  },
  modules: {
    user,
  },
  plugins: [userState],
});
