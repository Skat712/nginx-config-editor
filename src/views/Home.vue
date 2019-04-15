<template>
  <div class="home">
    <p>
      <b-container fluid>
          <b-row style="align-items: center">
            <b-button v-b-modal.my-modal>Создать</b-button>
          </b-row>

        <b-modal id="my-modal" @ok="this.createFile"
                 title="Создать файл конфигурации"
                 ok-title = "Создать"
                 cancel-title = "Отмена"
        >
          <b-form-input v-model="name" placeholder="Введите имя файла"></b-form-input>
        </b-modal>

      </b-container>
    </p>

    <FilesList/>
  </div>
</template>

<script>
// @ is an alias to /src
import FilesList from '@/components/FilesList.vue'

export default {
  name: 'home',
  components: {
    FilesList
  },
}
</script>
