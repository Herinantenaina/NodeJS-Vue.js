<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function goTo(path) {
      router.push(path)     
}

</script>

<template>
<header>
    
      <img src="@/assets/book.png"/>
      <nav  >
        <button @click="goTo('/')" class="navbar-toggler">Home</button>
        <button @click="goTo('/books/')" class="navbar-toggler">Books</button>
        <button @click="goTo('/admin/books/')" class="navbar-toggler">Admin Books</button>
        <button @click="goTo('/admin/users/')" class="navbar-toggler" >Admin Users</button>
        <button @click="goTo('/admin/userbook/')" class="navbar-toggler" >Admin UserBook</button>
      </nav>  
    
</header>
</template>

<style scoped>
header{
  width:100%;
  background:#D17862;
  color:white;
  display:flex;
  justify-content: space-between;
  align-items:center;
  padding:10px;
}
header img {
  height:50px;
}

button{
  padding:10px;
  border-radius: 10px;
}

button:hover{
  background-color: rgba(255, 255, 255, 0.2);
}
</style>