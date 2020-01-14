<template>
    <div>
        <div class="index container">
            <div class="card">
                <h4 class="center-align black-text">New Note</h4>
                <div class="add-note container">
                    <form>
                        <div class="field title">
                            <label for="title">Title: </label>
                            <input type="text" name="text" v-model="title"/>
                            <label for="title">Tasks: <span class="tip"><i>(Press tab for new task entry)</i></span></label>
                            <input type="text" name="task" v-model="task" @keydown.tab="addTask"/>
                                                

                            <div v-if="taskEmpty">                   
                                <h5 class="center-align">List of Tasks</h5>
                                <p class="left-align">Type to edit:</p>
                                <div v-for="(task, index) in tasks" :key="index" class="left-align">
                                    <input type="text" v-model="tasks[index]"/>
                                    <i class="material-icons delete" @click="deleteNote(task)">delete</i>
                                </div>
                            </div>
                            
                            <p v-if="feedback" class="red-text">{{ this.feedback }}</p>
                            <div class="center-align">
                                <button v-if="filled" class="btn green" @click.prevent="addEntry">Post</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <div class="card">
                <h4 class="center-align black-text">Live Preview</h4>
                <div class="add-note container">
                    <form>
                        <div class="field title">
                            <h4 class="black-text center-align title">{{ this.title }}</h4>
                            <ul>
                                <li v-for="(task, index) in tasks" :key="index" class="left-align"> {{ index + 1}}. {{ task }}</li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>

import db from '@/firebase/init'
                    

export default{
    name: 'AddNote',

    data(){
        return{
            title: '',
            task: '',
            tasks: [],
            filled: false,
            feedback: '',
            taskEmpty: false
        }
    },
    methods: {
        addTask: function(){
            if(this.task){
                this.tasks.push(this.task);
                console.log(this.tasks);
                this.task = '';
                this.filled = true;
                this.feedback = "";
                this.taskEmpty = true;
            }
            else{
                this.feedback = "Please fill in the text fields.";
            }
        },

        addEntry: function(){
            if(this.title){

                this.feedback = "";

                db.collection('notes').add({
                    title: this.title,
                    tasks: this.tasks
                }).then(() => {
                    this.$router.push({ name: 'Index'});
                });
            }
            else {
                this.feedback = "You must have a title.";
            }
        },

        deleteNote: function(task){
            this.tasks = this.tasks.filter((t) => {
                return t != task;
            });
        }
    }
}

</script>

<style scoped>

  .index {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
    margin-top: 60px;
  }

.card {
    box-shadow: 0px 0px white;
}

    .add-note {
        background: #f7cf52;
        padding: 50px;
        border: 1px solid black;
        border-radius: 3%;
        box-shadow: 5px 10px #888888;
    }

    .container {
        width: 90%;
        margin-top: 50px;
    }

    label {
        font-size: 1.6em;
        color: black;
        float: left;
    }
    
    label .tip {
        font-size: 0.6em;
    }

    .delete {
        cursor: pointer;
        
    }

    .delete:hover {
        color: white;
    }

    .add-note .delete {
        position: absolute;
        right: 50px;
        
      
    }

</style>