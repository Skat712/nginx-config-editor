<template>
    <div>
        <b-button v-b-modal.create-file-modal variant="success">Добавить</b-button>

        <b-modal id="create-file-modal" @ok="this.createFile"
                 title="Создать файл конфигурации"
                 ok-title = "Создать"
                 cancel-title = "Отмена">
            <b-form-input v-model="fileName" placeholder="Введите имя файла"></b-form-input>
            <p v-if="error !== ''">{{this.error}}</p>
        </b-modal>
    </div>
</template>

<script>
    import fs from 'fs';

    export default {
        name: "CreateFileBtn",

        data:function(){
            return{
                fileName:'',
                filePath:this.$store.state.path+'/',
                error:''
            }
        },

        computed: {
            getFilePath: function () {
                return this.filePath+this.fileName;
            }
        },

        methods:{
            /**
             * Создает файл
             * @param event
             * @returns {boolean}
             */
            createFile:function(event) {
                if(this.fileName.trim() === ''){
                    this.error = 'Необходимо ввести имя файла!';
                    event.preventDefault();
                    return false;
                }

                if(fs.existsSync(this.getFilePath)){
                    this.error = 'Файл существует!';
                    event.preventDefault();
                    return false;
                }

                fs.writeFile(this.getFilePath,'', 'utf8', (err)=>{
                    if(err){
                        alert(err);
                        return false
                    }

                    this.$store.commit('addFile',this.fileName);
                    alert('Файл сохранен!');
                });
            }
        }
    }
</script>

<style scoped>
button{
    margin-left: 10px;
}

p{
    margin-top: 5px;
    color: red;
}
</style>