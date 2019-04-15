<template>
  <b-container fluid>
    <p>
      <router-link to="/">
        <b-button variant="primary">Назад</b-button>
      </router-link>

      <b-button variant="success" @click="this.saveFile">Сохранить</b-button>
    </p>

    <h4>
      Редактировать {{this.$route.params.file}}
    </h4>

    <b-form-textarea size="lg" v-model="fileContent"></b-form-textarea>
  </b-container>
</template>

<script>
  // @ is an alias to /src
  import fs from 'fs';
  import path from 'path';

  export default {
    name: 'EditPage',

    data:function(){
      return {
        fileContent:'fsfs',
        filePath: path.join(this.$store.state.path,this.$route.params.file)
      }
    },

    created(){
      this.getFile();
    },

    methods:{
      getFile: function() {
        this.fileContent = fs.readFileSync(this.filePath, 'utf8');
      },

      saveFile(){
        fs.writeFile(this.filePath,this.fileContent, 'utf8', (err)=>{
          if(err){
            console.log(err);
          }

        });
      },



    }
  }
</script>


<style scoped>

  p button{
    margin-right: 10px;
  }

  textarea{
    height: calc(100vh - 150px) !important;
  }

</style>