import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Путь к папке с конфиг файлами
     */
    path: '/etc/nginx/sites-available',
    files:[],
  },
  mutations: {
    /**
     * Добавляет файл в список
     * @param state
     * @param file
     */
    addFile:(state,file)=>{
      state.files.push(file);
    },
    /**
     * Удаляет файл из списка
     * @param state
     * @param file
     */
    removeFile:(state,file)=>{
      let index = state.files.indexOf(file);
      state.files.splice(index,1);
    }
  },
  actions: {

  }
})
