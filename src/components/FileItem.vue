<template>
    <div class="file-item">
           <b-row>
               <router-link :to="{ name: 'edit', params: { file: this.file}}">
               <div style="display: flex">
                   <div>
                       <img  src="../assets/Filetype-Docs-icon.png" style="max-width: 40px;">
                   </div>
                   <div class="file-item">
                       <p>{{this.file}}</p>
                       <p>
                           <span>Размер: {{this.size}}</span>
                           <span>Создан: {{this.created}}</span>
                           <span>Изменен: {{this.updated}}</span>
                       </p>
                   </div>
               </div>
               </router-link>
               <div>
                   <b-button variant="danger" size="sm" @click="this.deleteFile">Удалить</b-button>
               </div>
           </b-row>

    </div>
</template>

<script>
    import fs from 'fs';
    import path from 'path';
    const { dialog } = require('electron').remote;

    export default {
        name: "FileItem",
        props: ['file'],

        data:function(){
            return{
              size:0,
              created:0,
              updated:0,
              filePath:path.join(this.$store.state.path,this.file),
            }
        },

        created(){
             //kek
            this.getFileInfo();
        },

        methods:{
            /**
             * Получает информацию о файле(размер,дату создания и тд.)
             */
            getFileInfo:function () {
                fs.stat(this.filePath, (err, stats) => {
                    if (err) {
                        alert(err);
                        return false;
                    }

                    this.size = this.formatBytes(stats['size']);
                    this.created = stats['ctime'].toString().split('G')[0];
                    this.updated = stats['mtime'].toString().split('G')[0];
                })
            },

            /**
             * Удаляет файл
             */
            deleteFile:function(){
                let response = dialog.showMessageBox({
                    buttons: ["Да","Отмена"],
                    message: `Удалить файл ${this.file} ?`
                });

                 //lol wtf
                if (response === 0){
                    fs.unlinkSync(this.filePath);
                    this.$store.commit('removeFile',this.file);
                }
            },

            /**
             * Форматирует размер файла
             * @param bytes
             * @param decimals
             * @returns {string}
             */
            formatBytes: (bytes, decimals = 2) =>{
                if (bytes === 0) return '0 Bytes';

                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                const i = Math.floor(Math.log(bytes) / Math.log(k));

                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }


        }

    }
</script>

<style scoped>
  span{
      padding-right: 10px;
      font-size: 12px;
  }

  .file-item p{
      color: #2c3e50;
      margin: 0;
  }

  .file-item a{
      text-decoration: none;
  }

  button{
      margin-right: 10px;
  }

  .row{
      align-items: center;
      justify-content: space-between;
  }
</style>
