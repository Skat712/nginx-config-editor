<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="file in this.$store.state.files">
          <FileItem :file="file"/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import FileItem from '@/components/FileItem.vue';
import fs from 'fs';

export default {
  name: 'FilesList',
  components: {FileItem},

  mounted() {
    if(this.$store.state.files.length == 0){
      //this.getFiles();
    }
  },

  methods:{
    /**
     * Получает все файлы
     */
    getFiles:function () {
        fs.readdir(this.$store.state.path, (err, files) => {

          if(err){
            alert(err);
            return false;
          }

          files.forEach(file => {
            this.$store.commit('addFile',file);
          });
        });
    },
  }

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
