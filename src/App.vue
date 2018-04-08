<template>
  <div id="app">
    <header>
      <div v-if="screen=='parent'">
        <span class="title">{{ title }}</span>
      </div>
      <div v-else>
        <span class="title"><router-link to="/"> <i class="arrow left"></i> </router-link> {{ title }}</span>
      </div>
    </header>
    <main>
      <router-view :key="$route.fullPath"></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'screen', 'title'
  ]),
},
}
</script>

<style>
body {
  margin: 0;
}
main{
  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  padding:10px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 10px 0 10px;
  background-color: #f60; /* #35495E */
  color: #ffffff;
}

header span.title {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 2;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}

header span.title a{
  text-decoration:none;
  color:white;
  font-size: 20px;
  padding:0 5px;
  border-right:1px solid white;
  background: white;
  border-radius:25%;
  padding:3px 7px 5px 10px;
  margin-right:10px;
}

i {
    border: solid black;
    border-width: 0 5px 5px 0;
    display: inline-block;
    padding: 3px;
}
.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}
div.card{
  clear:both;
  padding-bottom:10px;
  border-bottom:1px solid #eee;
}
div.card a{
  text-decoration: none;
}
div.card h2{
  text-align: justify;
  margin:15px 0 5px 0;
}
div.card small{
  font-style:italic;
}
div.content{
  text-align:justify;
}
div.content img{
  width:40%;
  float:left;  
  margin:0 3px 3px 0;
}
div.category span{
  background-color:#ccc;
  margin:2px 5px 2px 0;
  padding:2px;
  font-size:75%;
}
div.content img {
  opacity: 1;
  transition: opacity 0.3s;
}

div.content img[data-src] {
  opacity: 0;
}
</style>
