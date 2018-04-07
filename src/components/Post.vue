<template>
  <div>
    <h2>{{ item.title }}</h2>
    <div class="content" v-html="item.content"></div>
    <small>Post by {{ item.author }} at {{ item.pubDate }}</small>
  </div>
</template>
<style>
div.content{
  text-align:justify;
}
div.content figure img{
  width: 80% !important;
  text-align:center;  
}
div.content figure img{
  text-align:center;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'post',
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.setScreen('child')
    let postId = this.$route.params.id
    this.setPostId(postId)
    if(this.posts.length==0){
      fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
        .then(response => response.json())
        .then(data =>{
          this.setPosts(data.items)    
          this.item = this.post
          this.setTitle(this.item.title)
          // console.log(this.posts)
        })
        .catch(error => console.log('error is', error))
    }
    else{
      this.item = this.post
      this.setTitle(this.item.title)
    }
  },
  computed: {
    ...mapGetters([
      'screen', 'posts', 'post'
    ]),
  },
  methods: {
    ...mapActions([
      'setScreen', 'setPostId', 'setPosts', 'setTitle'
    ])
  }
}
</script>