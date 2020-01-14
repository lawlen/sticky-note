<template>

    <div>
        <div class="index container">
            <div class="card">
                <h4 class="center-align black-text">Edit Note</h4>
                <div class="edit-note container">
                    <form>
                        <div class="field title">
                            <label for="title">Title: </label>
                            <input type="text" name="text" v-model="note.title"/>
                            <label for="title">Tasks: <span class="tip"><i>(Press tab for new task entry)</i></span></label>
                            <input type="text" name="task" v-model="task" @keydown.tab="addTask"/>       
                            <h5 class="center-align">List of Tasks</h5>
                            <p class="left-align">Type to edit:</p>
                            <div v-for="(task, index) in note.tasks" :key="index" class="left-align">
                                <input type="text" v-model="note.tasks[index]"/>
                                <i class="material-icons delete" @click="deleteNote(task)">delete</i>
                            </div>
                            <p v-if="feedback" class="red-text">{{ this.feedback }}</p>
                            <div class="center-align">
                                <button class="btn green" @click.prevent="editEntry">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="card">
                <h4 class="center-align black-text">Live Preview</h4>
                <div class="edit-note container">
                    <form>
                        <div class="field title">
                            <h4 class="black-text center-align title">{{ note.title }}</h4>
                            <ul>
                                <li v-for="(task, index) in note.tasks" :key="index" class="left-align"> {{ index + 1}}. {{ task }}</li>
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
export default {
    
    name: 'EditNote',

    data() {
        return {
            title: this.$route.params.title,
            id: this.$route.params.id,
            note: '',
            tasks: [],
            task: '',
            feedback: false,
            filled: false,
            taskEmpty: false
        }
    },
    methods: {
        editEntry: function(){
            console.log(this.note.title, this.note.tasks);

            if(this.note.title){

                this.feedback = "";

                db.collection('notes').doc(this.note.id).update({
                    title: this.note.title,
                    tasks: this.note.tasks
                }).then(() => {
                    this.$router.push({ name: 'Index'});
                });
            }
            else {
                this.feedback = "You must have a title.";
            }
        },
        addTask: function(){
            if(this.task){
                this.note.tasks.push(this.task);
                //this.tasks.push(this.task);
                this.task = '';
            }
            else{
                this.feedback = "Please fill in the text fields.";
            }
        },
        deleteNote: function(n){
            this.note.tasks = this.note.tasks.filter((task) => {
                return task != n;
            });
        },
    },
    created(){
        let ref = db.collection('notes').where('title', '==', this.$route.params.id);

        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.note = doc.data();
                this.note.id = doc.id;
            });
        });
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

    .edit-note {
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
        position: absolute;
        right: 50px;
  }

  .delete:hover {
    color: black;
    font-size: 2.2em;
    cursor: pointer;
  }
</style>