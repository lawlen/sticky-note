<template>
  <div>
    <h5 class="center-align">Reminders: {{ getTotalNotes() }}</h5>
    <div class="index container">
      <div class="card" v-for="note in notes" :key="note.id"> 
        <div class="card-content">
          <i class="material-icons delete" @click="deleteNote(note.id)">delete</i>


                    <h2 class="black-text">{{ note.title }}</h2>

                
                
               
          <p class="note-message" v-for="(task, index) in note.tasks" :key="index">{{index + 1}}. {{ task }}</p>
        </div>
        <span class="btn-floating btn-large halfway-fab pink circle">
                    <router-link class="white-text" v-bind:to="'/editnote/' + note.title"><i class="material-icons">edit</i></router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import db from '@/firebase/init'


export default {
  name: 'Index',
  data () {
    return {
/*         notes: [
          { title: 'Need to do', message: 'You got mail', id: '1'},
          { title: 'Urgent', message: 'Do work!', id: '2'},
          { title: 'Remember', message: 'Shopping list', id: '3'},
          { title: 'To do list', message: 'You chores', id: '4'}
        ]
    } */

    notes: [],
    total: ''
    }
  },
  methods: {
    deleteNote: function(id){
/*       this.notes = this.notes.filter((note) => {
        return note.id != id;
      }) */

      this.disappear = true;

      db.collection('notes').doc(id).delete().then(() => {
        this.notes = this.notes.filter((note) => {
          return note.id != id;
        });
      });
    },

    getTotalNotes: function(){
      //this.total = this.notes.length;
      //return this.total;
      return this.notes.length;
    }
  },
  created() {
    db.collection('notes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let note = doc.data();
        note.id = doc.id;
        this.notes.push(note);
        this.total++;
      })
    });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .index {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
    margin-top: 60px;
  }

  .index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
    /*text-decoration: underline wavy black;*/

  }

  .index .delete {
    position: absolute;
    top: 4px;
    right: 12px;
    cursor: pointer;
    color: gray;
    font-size: 2em
  }

  .index .delete:hover {
    color: black;
    font-size: 2.2em
  }

  .index .note-message {
    text-align: left;
  }

  .card {
    background: #f7cf52;
    border: 1px solid black;
    border-radius: 3%;
    box-shadow: 5px 10px #888888;
  }

  .circle:hover {
      border: 1px solid black;
  }



</style>
