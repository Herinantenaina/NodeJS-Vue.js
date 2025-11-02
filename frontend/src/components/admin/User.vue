<script setup>
import ListUser from "./ListUser.vue";
import EditUsers from "./EditUsers.vue";
import { ref,onMounted } from 'vue';
import axios from "axios";

const borrow = ref(false)
const selectedUser = ref(null)
const dummyUser = {
    "id": 0,
    "name": "",
    "password": "",
    "role": ""
}
const users = ref([])

const fetchUser = async () => {
  try {
      const response = await axios.get('http://localhost:5000/users') 
      users.value = response.data
  } catch (err) {
      console.error(err)
  } 
}

onMounted(fetchUser)

function OpenBorrow(user) {
  selectedUser.value = user
  borrow.value = true
}

function closeBorrow() {
  borrow.value = false
  selectedUser.value = null
  window.location.reload()  
}
</script>

<template>
    <div class="grid"  v-if="!borrow">
        <ListUser v-for="user in users" 
                :key="user.id"
                :user="user" 
                @borrow="OpenBorrow"
                class="ListUser"
        />
        <div class="add" v-if="!borrow" >
          <img src="/photo/add.png" @click="OpenBorrow(dummyUser)">
        </div>
    </div>
    
    <EditUsers 
                :user="selectedUser"
                v-if="borrow"
                @close="closeBorrow"
    />
</template>

<style scoped>
.ListUser{
  transition: transform 0.4s;
}

.ListUser:hover{
  transform:scale(1.05);
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