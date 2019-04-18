<template>
  <div class="home">
    <p>
      <b-container fluid>
          <b-row>
            <h5>Обнаружено {{this.$store.state.files.length}} файлов конфигурации</h5>
            <CreateFileBtn/>
          </b-row>
      </b-container>
    </p>

    <FilesList/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from '@/components/FilesList.vue';
import CreateFileBtn from "../components/CreateFileBtn";

export default {
  name: 'home',
  components: {
    CreateFileBtn,
    FilesList,
  },
}
</script>

<style scoped>
  .row{
    align-items: center;
  }

  h5{
    padding-left: 10px;
    margin: 0px;
  }

</style>
