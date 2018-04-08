<template>
  <div>
    <div class="card" v-for="(item, idx) in posts">
      <router-link :to="'/post/'+idx" >
      <h2>{{ item.title }}</h2>
      </router-link>
      <small>Post by {{ item.author }} at {{ item.pubDate }}</small>      
      <div class="content">
        <img :data-src="item.thumbnail" alt="thumbnail" />
        {{ item.description | stripHtml | subStr(300) }}
      </div>
      <div class="category">
        <span v-for="category in item.categories">
        <router-link :to="'/category/'+category" >
        {{ category }}
        </router-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      //items: []
    }
  },
  created () {
    this.setTitle('Pelan - RSS Reader')
    this.setScreen('parent')
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
      .then(response => response.json())
      .then(data =>{
        this.setPosts(data.items)
      })
      .catch(error => console.log('error is', error))
  },
  mounted() {
    this.scroll();
  },
  updated () {
    this.$nextTick(function () {
      let load = 0
      let lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'))
      for(let img of lazyImages){
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
          img.removeAttribute('data-src');
        }
        load++
        if(load>1) break
      }
    })
  },
  computed: {
    ...mapGetters([
      'screen', 'posts'
    ]),
  },
  filters: {
    subStr (text, count) {
      let substr = text.substring(0, count)
      let dot = ''
      if( text.length > substr.length ) dot = '...'
      return substr+dot;
    },
    stripHtml(text) {
      return text.replace(/(<([^>]+)>)/ig,"")
    }
  },
  methods: {
    ...mapActions([
      'setScreen','setPosts','setTitle'
    ]),
    scroll () {
      window.onscroll = () => {
        let lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'))
        for(let img of lazyImages){
          img.setAttribute('src', img.getAttribute('data-src'));
          img.onload = function() {
            img.removeAttribute('data-src');
          }
        }
      }
    },
  }
}
</script>