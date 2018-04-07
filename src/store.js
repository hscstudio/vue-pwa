import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: 'Pelan - RSS Reader',
    screen: 'parent', // child
    posts: [],
    id: null,
    post:{},
    categories: [],
    category:null
  },
  actions: {
    setTitle ({ commit }, title) {
      commit('setTitle', title)
    },
    setScreen ({ commit }, type) {
      commit('setScreen', type)
    },
    setPosts ({ commit }, posts) {
      commit('setPosts', posts)
    },
    setPostId ({ commit }, id) {
      commit('setPostId', id)
    },
    setCategory ({ commit }, category) {
      commit('setCategory', category)
    },
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setScreen (state, type) {
      state.screen = type
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    setPostId (state, id) {
      state.id = id
    },
    setCategory (state, category) {
      state.category = category
    },
  },
  getters: {
    title: (state) => {
      return state.title
    },
    screen: (state) => {
      return state.screen
    },
    posts: (state) => {
      return state.posts
    },
    postId: (state) => {
      return state.id
    },
    post: (state) => {
      return state.posts[state.id]
    },
    postsByCategory: (state) => {
      return state.posts.filter(function (post) {
        return  post.categories.indexOf(state.category) > -1
      })
    },
    categoryId: (state) => {
      return state.category
    },
  },
})

export default store