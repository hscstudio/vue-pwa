# Tujuannya apa?

Mengapa harus susah-susah untuk membuat aplikasi web yang bisa digunakan kurang dari 5 detik? Selain untuk memenuhi tantangan WWWID, saat ini kebutuhan akan aplikasi web yang bisa diakses dengan cepat sudah merupakan kebutuhan pasar. Berdasarkan riset, umumnya calon pengunjung web hanya akan memberikan toleransi sampai 5 detik saja, artinya jika aplikasi web kita tidak terbuka dalam kisaran waktu tersebut maka pengguna umumya akan membatalkan kunjungannya atau minimal berpikiran negatif terhadap web kita. Berangkat dari hal tersebut, penulis dengan segala kekurangan disana sini bermaksud mengikuti tantangan tersebut dengan menghadirkan aplikasi web yang bisa digunakan kurang dari 5 detik.

# Mulai dari mana?

Penulis memulai dengan bergabung ke group WWWID di telegram https://t.me/wwwid_pwa. Group yang diasuh langsung oleh om Yohan totting ini sebagai media untuk saling berbagi tips dan trik untuk bagaimana mengoptimasi suatu aplikasi berbasis web baik dari sisi performa maupun progressive web application (PWA). PWA sendiri merupakan istilah yang disematkan untuk sebuah aplikasi web yang memiliki kemampuan lebih seperti offline mode, add shortcut to homescreen, push notification dsb. 

# Menggunakan teknologi apa?

Flashback, kebetulan beberapa minggu yang lalu penulis mendapatkan project yang akan banyak mengeksplore frontend, dari sanalah penulis yang sebenarnya berlatar belakang sebagai programmer backend (PHP -red) dituntut untuk beralih sementara ke bahasa pemrograman yang khusus untuk frontend, apalagi kalo bukan Javascript. Sebenarnya ada banyak sekali pilihan library atau framework jika kita bermain dengan Javascript, sebut saja yang populer yaitu JQuery, Angular, React, dan Vue. JQuery tentu library yang sudah terbiasa penulis gunakan, Angular (1) & React juga pernah penulis gunakan meski hanya untuk coba-coba saja membuat CRUD sederhana. Tersisa Vue, dan atas dasar paling kekinian,kemudian penulis dengan mantap memilih library ini.

Dengan background pengetahuan di library Js lain, ternyata cukup mudah dan menyenangkan belajar Vue. Setelah belajar, baru tahu tentang berbagai kelebihannya dibanding library Js lain, yang paling utama adalah kemudahannya untuk diintegrasikan dengan library lain dan current aplikasi. Dengan menggunakan library ini, membuat single page application (SPA) jauh lebih mudah dan cepat dibandingkan dengan JQuery. Kebutuhan akan routing dan manajemen state juga sudah tersedia dan didukung secara official. Penulis mengenal & mengimplementasikan PWA juga melalui library ini, apalagi secara official juga telah disediakan template aplikasi PWA.

Jadi, untuk tantangan ini, penulis menggunakan Vue sebagai core library JSnya, Vue-router menangangani routing pada aplikasi (dipersyaratkan dalam tantangan), Vuex untuk manajemen state, vue-cli untuk generate template aplikasi, serta webpack untuk build source code.

# Mempersiapkan Senjata Perang

Ada banyak cara untuk menggunakan Vue, namun penulis menggunakan cara yang direkomendasikan yaitu menggunakan tools NPM (universal library installer berbasis Node). Oleh karena itu Node & NPM adalah dua tools yang perlu diinstall pertama kali. 

Sebagaimana yang telah penulis sebutkan diatas, bahwa untuk menggenerate template aplikasi, penulis menggunakan vue-cli. https://vuejs.org/v2/guide/installation.html

# install vue-cli
$ npm install -g vue-cli

Selain berfungsi untuk menggenerate scaffolding untuk SPA, tools ini juga  menyediakan template untuk PWA. So akan lebih mudah lagi pekerjaan kita. https://github.com/vuejs-templates/pwa. Oh iya, project ini penulis berikan nama pelan, namun penulis berharap performanya akan berbeda dengan arti namanya.

# menggenerate template pwa ke dalam folder pelan
$ vue init pwa pelan

Perintah ini akan menginstal dan menyiapkan webpack, pwa, vue-router. Langkah standard selanjutnya yang penulis harus lakukan untuk menjalankan aplikasi ini adalah sebagai berikut.

$ cd pelan
$ npm install
$ npm run dev

Selanjutnya akan terbuka browser pada alamat localhost:8080 yang berisi tampilan logo Vue.

Ada satu library lagi yang perlu kita instal, meski library ini optional tapi penulis tetap akan gunakan sebagai library standard untuk mengelola state aplikasi. Vuex.

$ npm install vuex --save

# Waktunya Coding

Setelah semua tools terinstall kini waktunya untuk coding aplikasi. Sebagaimana yang telah dijelaskan pada artikel tantangan bahwa halaman utama aplikasi harus menampilkan daftar artikel yang diambil dari https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid

Untuk membaca RSS yang telah disediakan tersebut, penulis menggunakan fungsi fetch yang merupakan fungsi internal JS, meskipun sebenarnya library axios lebih sering penulis gunakan untuk real project.

Pada component Home (yang penulis telah buat sebelumnya) tepatnya pada method created. Pada konsep lifecycle component vue, method ini merupakan method yang akan dijalankan ketika komponen dibuat sehingga sangat cocok digunakan untuk pengambilan data.

```
created () {
  ...
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fwwwid')
    .then(response => response.json())
    .then(data =>{
      this.setPosts(data.items)
    })
    .catch(error => console.log('error is', error))
},  
```

fungsi fetch ini akan membaca data RSS sekaligus mentransformasi responsenya menjadi format json. Sedangkan method setPosts sebenarnya merupakan dispatcher atau action yang terdapat pada store namun telah penulis map ke component Home sehingga bisa digunakan layaknya method biasa. Dispatcher ini berfungsi untuk menyimpan data daftar artikel yang berbentuk JSON dari feed di atas.

Berikut ini potongan kode store terkait method dispatcher ini.

```
actions: {
  ...
  setPosts ({ commit }, posts) {
    commit('setPosts', posts)
  },
  ...
},
mutations: {
  ...
  setPosts (state, posts) {
    state.posts = posts
  },
  ...
},
getters: {
  ...
  posts: (state) => {
    return state.posts
  },
  ...
},
```

Agar dapat digunakan layaknya method biasa, maka pada perlu dimap

methods: {
  ...mapActions([
    'setPosts'
  ])
}

Tentunya dengan sebelumnya mengimport mapActions vuex pada component Home.

import { mapActions } from 'vuex'

Vue menyediakan cara yang mudah untuk memparsing data ke dalam tampilan, yaitu menggunakan v-for

<div class="card" v-for="(item, idx) in posts">
  <h2>{{ item.title }}</h2>
  <div class="content">
    {{ item.description }}
  </div>
</div>

directive v-for akan melakukan perulangan sebanyak jumlah array dari variabel posts yang berisi daftar artikel dari RSS tersebut.

Cara yang kurang lebih sama, kemudian penulis gunakan untuk component atau halaman berikutnya yaitu Post (menampilkan detail artikel) dan Category (menampilkan daftar artikel berdasarkan kategori tertentu). Source code lengkap bisa anda dapatkan pada link github yang telah penulis sertakan di bagian atas.

# Build Production

Setelah aplikasi jadi secara fungsional, maka langkah selanjutnya adalah mem-build source code supaya siap digunakan untuk production. Pertama kita perlu jalankan perintah

npm run build 

Perintah ini untuk mengenerate kode melalui webpack agar siap digunakan untuk production (sudah diminify dan dipack). Secara default hasil dari generate bisa kita jumpai di folder dist. Source code pada folder inilah yang akan kita deploy ke server.

# Deploy Ke Server

Sebelum kita mendeploy source code aplikasi ke server tentunya kita harus menentukan server mana yang akan kita gunakan. Pada tantangan wwwid, tidak ada ketentuan tentang server. Kali ini penulis lebih cenderung untuk menggunakan yang gratisan, toh aplikasi ini hanya berupa static web yang tidak harus instalasi apa-apa di server. Pilihan mengerucut ke dua server yaitu github dan firebase. Berdasarkan masukan dari rekan-rekan di telegram serta hasil dari googling, mantap bagi penulis untuk memilih firebase hosting. https://firebase.google.com

Setelah register dan membuat project baru di console firebase, penulis baru tahu ternyata firebase menyediakan tools untuk membantu kita mendeploy aplikasi kita ke server firebase. Selengkapnya bisa kita jumpai pada link berikut.

https://firebase.google.com/docs/hosting/quickstart?authuser=0

Tools itu bernama firebase cli, instalasinya juga mudah melalui NPM

npm install -g firebase-tools

Selanjutkan kita inisialiasi project kita

$ firebase init

Ketika kita melakukan inisialiasi, kita perlu menentukan folder yang akan kita deploy yaitu folder dist. Setelah inisialiasi berhasil, langkah selanjutnya adalah menjalankan perintah untuk mengunggah source code applikasi ke server

$ firebase deploy

Tunggu beberapa saat, maka aplikasi kita sudah akan ready dan bisa diakses publik. Mudah sekali bukan?

https://pelan-76437.firebaseapp.com

# Audit Aplikasi

Setelah aplikasi berhasil dideploy dan bisa diakses publik maka langkah berikutnya adalah melakukan audi aplikasi.. wuih serem ya.. :). Audit adalah tools yang telah secara default terintall pada google chrome berfungsi untuk mengaudit aplikasi web kita dari berberapa sisi seperti performa, PWA, SEO dsb.



