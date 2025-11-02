<script setup>
    import { ref,onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps(['book'])
    const return_date = ref(null)
    const books = ref([])   
    const emit = defineEmits(['close'])
    const date = new Date().toISOString().split('T')[0]
    
    const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/books') 
        books.value = response.data
    } catch (err) {
        console.error(err)
    }
    }

    onMounted(fetchBooks)

    async function submit(book) {
        if (!return_date.value) {
            alert("Some fied(s) missing");
            return;
        }

        if (book.available == 0){
            alert("This book is not yet available");
            return;
        }
        

        try{
            const res = axios.post("http://localhost:5000/userbook", {
                user_id : 2,
                book_id : book.id,
                borrow_date : date,
                return_date : return_date.value
            })
            console.log("Changed")
        } catch (err){
            console.log(err)
        }
            
        emit('close'); 
    }
</script>

<template>
    <section @submit.prevent="submit">

            <p>This book's title is {{ book.title }}, written by {{ book.author }}</p>
 
            <div>
                <label>Return Date:</label>
                <input type="date" v-model="return_date" />
            </div>
            <button class="button"@click=(submit(book))>Borrow</button>
            <button class="button" @click="$emit('close')">Close</button>
    </section>
</template>

<style scoped>
section {
    background: #ffffffaa;
    padding: 25px;
    margin-top: 25px;
    box-shadow: 0 0 10px #0003;
}
input{
    margin-left: 10px;
}
section .button {
    background-color: #D17862;
    border: 0;
    color: white;
    padding: 5px 15px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top:30px
}

div{
    margin-top: 20px;
}
button:hover{
  transform:scale(1.05);
}

section .button:nth-of-type(2){
    margin-left : 25px
}

</style>