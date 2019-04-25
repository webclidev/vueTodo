<template>
  <div class="customProperties">
    <!--start INput and add edit buttons -->

    <!-- <input type="text" v-model="item" @keypress.13="add" > -->
    <v-container class="custom-width" > 

<!--@@@ input type text @@@ -->
      <v-layout > 
        <v-flex xs12>
          <v-text-field
            v-model="item"
            label="Add Item"
            @keypress.13="add"
            required
            autofocus
          ></v-text-field>       
        </v-flex> 
<!--@@@ input type text ^^^@@@ -->
      </v-layout> 

      <v-layout>
<!--@@@ input type date @@@ -->
        <v-flex xs6>

          <v-menu
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Select a Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>

        </v-flex>
<!--@@@ input type date ^^^ @@@ -->

<!--@@@ input type time @@@ -->
         <v-flex xs6>

            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              :return-value.sync="time"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="time"
                label="Select Time"
                prepend-icon="access_time"
                readonly
              ></v-text-field>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @change="$refs.menu.save(time)"
              ></v-time-picker>

            </v-menu>

        </v-flex>
<!--@@@ input type time ^^^^^ @@@ -->

      </v-layout>

      <v-layout>
        <!--@@@ input type btn @@@ -->
        <v-flex xs12> 
          <!-- <button v-show="itemEdit == null" @click="add">Add</button> -->
          <v-btn block v-show="itemEdit == null" @click="add" color="success" round>Add</v-btn>
          <!-- <button v-show="itemEdit !== null" @click="add">Edit</button>    -->
          <v-btn block v-show="itemEdit !== null" @click="add" color="info" round>Edit</v-btn>
        </v-flex> 
<!--@@@ input type btn ^^^@@@ -->
      </v-layout>
    </v-container>
    <!--ends INput and add edit buttons -->

    <!-- start show data in table -->

    
      <!-- <table v-show="sortedTodos.length" class="table" > -->
      <table v-show="userTodos.length" class="table" >
      <thead>
        <tr class="success" >
          <th>#</th>
          <th>Item</th>
          <th>Date</th>
          <th>Time</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in sortedTodos" :key="index" class="default" >
          <td>#</td>
          <td> {{ index }} - {{ todo.item }} </td>
          <td> {{ todo.date }} </td>
          <td> {{ todo.time }} </td>
          <td>
            <!-- <button @click="editTodo(index, todo)" >Edit</button> -->
            <!-- <v-btn @click="editTodo(index, todo)" color="warning" round>Edit</v-btn> -->
            <v-icon medium class="mr-2" @click="editTodo(index, todo)">edit</v-icon>
          </td>
          <td>
            <!-- <button @click="delTodo(index)" >Delete</button> -->
            <!-- <v-btn @click="delTodo(index)" color="error" round>Delete</v-btn> -->
            <v-icon medium @click="delTodo(index)">delete</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ends show data in table -->
  </div>
</template>

<script>
import Vue from "vue";
import {mapGetters, mapState, mapActions} from "vuex";
export default {
  name: "todo",
  data: function() {
    return {
      // item: null,
      // itemEdit: null,
      userTodos: [],
      // date: new Date().toISOString().substr(0, 10),
      // menu: false,
      // menu2: false,
      // time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}),
    };
  },
  computed: {
    ...mapGetters(
      [
        "store_item",
        "store_itemEdit",
        // "store_userTodos",
        "store_date",
        "store_menu",
        "store_menu2",
        "store_time",
        // "sortedTodos"
      ]),
      
    // ########## data properties follows
    item: {
      get: function (){
        return this.store_item        
      },
      set: function (value){
        this.$store.commit('update_item', value)
      }
    },
    itemEdit: {
      get: function (){
        return this.store_itemEdit
      },
      set: function ( value ){
        this.$store.commit('update_itemEdit', value)
      }
    },
    // userTodos: {},
    date: {
      get: function (){
        return this.store_date
      },
      set: function (value){
        this.$store.commit('update_date',value)
      }
    },
    menu: {
      get: function (){
        return this.store_menu
      },
      set: function (value){
        this.$store.commit('update_menu', value)
      }
    },
    menu2: {
      get: function (){
        return this.store_menu2
      },
      set: function (value){
        this.$store.commit('update_menu2', value)
      }
    },
    time: {
      get: function (){
        return this.store_time
      },
      set: function (value){
        this.$store.commit('update_time', value)
      }
    },
    // sortedTodos() {
    //     return this.sortedTodos
    // },
   
    // ######### data properties ^^^^
    sortedTodos: function() {
      return this.userTodos.slice().reverse();
    }
  },
  methods: {
    ...mapActions(["addData"]),
    ...mapState(["addTodo"]),
    add: function() {
      if ((this.item !== null && this.item !=="") && 
          (this.date !== null && this.date !== "") && 
          (this.time !== null && this.time !== "")) {
        if (this.itemEdit == null) {
          this.userTodos.push({ item: this.item, date: this.date, time: this.time });
          // this.addData({ item: this.item, date: this.date, time: this.time });
        }
        if (this.itemEdit !== null) {
          Vue.set(this.userTodos, this.userTodos.length - 1 - this.itemEdit, {
            item: this.item,
            date: this.date,
            time: this.time
          });
        }
        this.item = null;
        this.date = null; 
        this.time = null;
        this.itemEdit = null;
      } else {
        alert ("one or more entry are missing please check and fill em all");
      }
    },
    delTodo: function(index) {
      // this.userTodos.splice(index, 1);
      this.userTodos.splice(this.userTodos.length - 1 - index, 1);
    },
    editTodo: function(index, todo) {
      this.item = todo.item;
      this.date = todo.date; 
      this.time = todo.time;
      this.itemEdit = index;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*################## start custom styling ########################*/
.custom-width {
  width: 500px;
}
.success {
  color: black;
}
.customProperties {
  font-size: 18px;
}
/*################## end custom styling ########################*/
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
