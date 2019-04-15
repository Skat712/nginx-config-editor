<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="item in items">
          <FileItem :file="item"/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import {ListGroup} from 'bootstrap-vue/es/components/list-group';
import FileItem from '@/components/FileItem.vue';
import fs from 'fs';

export default {
  name: 'HelloWorld',
    components: {FileItem},

  data:function () {
    return {
      items: [],
      name:''
    }
  },

    mounted() {
        this.getFiles();
    },

  methods:{
    getFiles:function () {
        fs.readdir(this.$store.state.path, (err, files) => {
          files.forEach(file => {
            this.items.push(file);
          });
        });
    },

    createFile:function(bvModalEvt) {
        if(this.name === ''){
            bvModalEvt.preventDefault();
        }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
