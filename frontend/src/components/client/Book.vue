<script setup>
import ListBook from './ListBook.vue';
import BorrowForm from "./BorrowForm.vue";
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios";

const router = useRouter()
const borrow = ref(false)
const selectedBook = ref(null)
const books = ref([])


const fetchBooks = async () => {
  try {
      const response = await axios.get('http://localhost:5000/books') 
      books.value = response.data
  } catch (err) {
      console.error(err)
  } 
}

function OpenBorrow(book) {
  selectedBook.value = book
  borrow.value = true 
}

function closeBorrow() {
  borrow.value = false
  selectedBook.value = null
  window.location.reload()  
}

onMounted(fetchBooks)

</script>

<template>
    <div class="grid"  v-if="!borrow">
        <ListBook v-for="book in books" 
                :key="book.id"
                :book="book" 
                @borrow="OpenBorrow"
                class="ListBook"
        />
    </div>

    <BorrowForm 
                :book="selectedBook"
                v-if="borrow"
                @close="closeBorrow"
    />
</template>

<style scoped>
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
.ListBook{
  transition: transform 0.4s;
}

.ListBook:hover{
  transform:scale(1.1);
}
</style>