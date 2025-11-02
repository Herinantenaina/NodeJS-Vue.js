<script setup>
import UserBookList from "./UserBookList.vue";
import EditUserBook from "./EditUserBook.vue";
import { ref,onMounted } from 'vue';
import axios from "axios";

const borrow = ref(false)
const selectedUserBook = ref(null)
const dummyUser = {
    "user_id": "2",
    "book_id": "",
    "date_created": "",
    "return_date": ""
}
const users = ref([])

const fetchUserBook = async () => {
  try {
      const response = await axios.get('http://localhost:5000/userbook') 
      users.value = response.data
  } catch (err) {
      console.error(err)
  } 
}

onMounted(fetchUserBook)

function OpenBorrow(user) {
  selectedUserBook.value = user
  borrow.value = true
}

function closeBorrow() {
  borrow.value = false
  selectedUserBook.value = null
  window.location.reload()  
}
</script>

<template>
    <div class="grid"  v-if="!borrow">
        <UserBookList v-for="user in users" 
                :key="user.id"
                :user="user" 
                @borrow="OpenBorrow"
                class="UserBookList"
        />
        <div class="add" v-if="!borrow" >
          <img src="/photo/add.png" @click="OpenBorrow(dummyUser)">
        </div>
    </div>

    <EditUserBook 
                :user="selectedUserBook"
                v-if="borrow"
                @close="closeBorrow"
    />
</template>

<style scoped>
.UserBookList{
  transition: transform 0.4s;
}

.UserBookList:hover{
  transform:scale(1.1);
}
.grid{
  padding:10px;
  display:grid;
  grid-template-columns: 1fr;
  gap:10px;
  background:white;
}

@media (min-width:414px){
  .grid{
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width:768px){
  .grid{
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width:1200px){
  .grid{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.add img{  
  width: 70px;
  transition:transform 0.2s ;
  margin-top:80px;
  margin-left: 20px;
}

.add img:hover{
  transform:scale(1.05);
}
</style>