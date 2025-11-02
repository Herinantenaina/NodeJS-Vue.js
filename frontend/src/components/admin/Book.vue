<script setup>
import ListBook from './ListBook.vue';
import EditForm from "./EditForm.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';

const borrow = ref(false)
const selectedBook = ref(null)
const dummyBook = {
  "id": 0,
  "title": "",
  "author": "",
  "available": 1
}
const books = ref([])

const fetchBooks = async () => {
  try {
      const response = await axios.get('http://localhost:5000/books') 
      books.value = response.data
  } catch (err) {
      console.error(err)
  } 
}

onMounted(fetchBooks)

function OpenBorrow(book) {
  selectedBook.value = book
  borrow.value = true
}

function closeBorrow() {
  borrow.value = false
  selectedBook.value = null
  window.location.reload()  
}
</script>

<template>
    <div class="grid"  v-if="!borrow">
        <ListBook v-for="book in books" 
                :key="book.id"
                :book="book" 
                @borrow="OpenBorrow"
                class="ListBook"
        />
        <div class="add" v-if="!borrow" >
          <img src="/photo/add.png" @click="OpenBorrow(dummyBook)">
        </div>
    </div>
    <EditForm 
                :book="selectedBook"
                v-if="borrow"
                @close="closeBorrow"
    />
</template>

<style scoped>
.ListBook{
  transition: transform 0.4s;
}

.ListBook:hover{
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