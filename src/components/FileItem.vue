<template>
    <div class="file-item">
        <router-link :to="{ name: 'edit', params: { file: this.file}}">


           <b-row style="align-items: center">
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
               <div>
                   <p>fsf</p>
               </div>
           </b-row>

        </router-link>
    </div>
</template>

<script>
    import  fs from 'fs';
    import  path from 'path';

    export default {
        name: "FileItem",
        props: ['file'],

        data:function(){
            return{
              size:0,
              created:0,
              updated:0,
            }
        },

        created(){
            this.getFileInfo();
        },

        methods:{
            getFileInfo:function () {
                fs.stat(path.join(this.$store.state.path,this.file), (err, stats) => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    this.size = this.formatBytes(stats['size']);
                    this.created = stats['ctime'].toString().split('G')[0];
                    this.updated = stats['mtime'].toString().split('G')[0];
                })
            },

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
</style>