export default {
    state: {
        addTodo:{
            item: null,
            itemEdit: null,
            userTodos: [],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            menu2: false,
            time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}),
        }
    },
    mutations: {
        update_item(state, value){
            state.addTodo.item = value
        },
        update_itemEdit(state, value) {
            state.addTodo.itemEdit = value
        },
        update_date(state, value) {
            state.addTodo.date = value
        },
        update_menu(state, value) {
            state.addTodo.menu = value
        },
        update_menu2(state, value) {
            state.addTodo.menu2 = value
        },
        update_time(state, value) {
            state.addTodo.time = value
        },
        addData (state, value){
            state.addTodo.userTodos.push(value)
        }
    },
    actions: {
        update_item({commit}, payload) {
            // eslint-disable-next-line
            console.log(payload)
            commit('update_item', payload)            
        },
        update_itemEdit({commit}, payload) {
            // eslint-disable-next-line
            console.log(payload)
            commit('update_itemEdit', payload)
        },
        update_date({commit},payload) {
            commit('update_date', payload)
        },
        update_menu({commit}, payload) {
            commit('update_menu',payload)
        },
        update_menu2({commit}, payload) {
            commit('update_menu2',payload)
        },
        update_time({commit}, payload) {
            commit('update_time',payload)
        },
        addData({commit}, payload) {
            commit('addData',payload)
        },       

    },
    getters: {
        store_item : state => state.addTodo.item,
        store_itemEdit : state => state.addTodo.itemEdit,
        store_date : state => state.addTodo.date,
        store_menu : state => state.addTodo.menu,
        store_menu2 : state => state.addTodo.menu2,
        store_time : state => state.addTodo.time,
        // sortedTodos(state) {
        //     return state.addTodo.userTodos.slice().reverse();
        //   }
        // sortedTodos: state => state.addTodo.userTodos,
    },
}