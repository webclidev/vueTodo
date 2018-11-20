<template>
  <div>
    <!--start INput and add edit buttons -->

    <input type="text" v-model="item" @keypress.13="add" >
    <button v-show="itemEdit == null" @click="add">Add</button>
    <button v-show="itemEdit !== null" @click="add">Edit</button>   

    <!--ends INput and add edit buttons -->

    <!-- start show data in table -->

    <table v-show="userTodos.length" >
      <thead>
        <tr>
          <th>#</th>
          <th>Item</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in sortedTodos" :key="index" >
          <td>#</td>
          <td> {{ index }} - {{ todo.item }} </td>
          <td>
            <button @click="editTodo(index, todo)" >Edit</button>
          </td>
          <td>
            <button @click="delTodo(index)" >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ends show data in table -->
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "todo",
  data: function() {
    return {
      item: null,
      itemEdit: null,
      userTodos: []
    };
  },
  computed: {
    // sortedTodos: function() {
    //   function compare(a, b) {
    //     if (a.item > b.item) {
    //       return -1;
    //     }
    //     if (a.item < b.item) {
    //       return 1;
    //     }
    //     return 0;
    //   }
    //   return this.userTodos.sort(compare);
    // },
    sortedTodos: function () {
      return this.userTodos.slice().reverse();
    }
  },
  methods: {
    add: function() {
      if (this.itemEdit == null) {
        this.userTodos.push({ item: this.item });
      }
      if (this.itemEdit !== null) {
        Vue.set(this.userTodos, this.userTodos.length - 1 - this.itemEdit, { item: this.item });
      }
      this.item = null;
      this.itemEdit = null;
    },
    delTodo: function(index) {
      // this.userTodos.splice(index, 1);
      this.userTodos.splice(this.userTodos.length - 1 - index, 1);
    },
    editTodo: function(index, todo) {
      this.item = todo.item;
      this.itemEdit = index;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
