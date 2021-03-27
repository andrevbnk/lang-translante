// import axios from 'axios';
// import store from '@/store';
// import router from '@/router';
const state = {
    user: {
        groups:{
            Animals:[
                {text:"albatross"},
                {text:"biddy"},
                {text:"blackbird"},
                {text:"canary"},
                {text:"crow"},
                {text:"cuckoo"},
            ],
            Cars:[                {text:"albatross"},
            {text:"biddy"},
            {text:"blackbird"},
            {text:"canary"},
            {text:"crow"},
            {text:"cuckoo"},],
            Arts:[                {text:"albatross"},
            {text:"biddy"},
            {text:"blackbird"},
            {text:"canary"},
            {text:"crow"},
            {text:"cuckoo"},],
        },
        dict:{

        },
        name:'Learn English',
        email:'',
    },
};

const getters = {
    user: state => state.user,    

};
const actions = {
    addWord({commit}, data){
        commit('setWord',data);
    },
    changeName({commit},name){
        commit('setName',name)
    },
    
    changeEmail({commit},email){
        commit('setEmail',email);
    }

};
const mutations = {
    setWord(state, {data,group}){
        console.log(group);
        if(!group){
            state.user.dict[data.text] = data; 
        }else{
            state.user.groups[group].push(data);
        }
    },
    setName(state,name){
        console.log(state,name);
        state.user.name = name;
    },
    setEmail(state,email){
        console.log(state);
        state.user.name = email;
    }

};
export default {
  state,
  getters,
  actions,
  mutations
};

