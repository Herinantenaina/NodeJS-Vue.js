<script setup>
    import { ref,onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps(['book'])

    const return_date = ref("")
    const state = ref(false)
    const emit = defineEmits(['close'])

    onMounted(() => {
        if (!props.book.title) {
            state.value = true
            
        } else {
            state.value = false
        }
        console.log(state)
    })

    async function submit(book, bool) { 

        if (!book.available || !book.title || !book.author) {
            alert("Some fied(s) missing");
            return;
        }
        
        //Pour savoir si c'est POST or PUT
        if (!bool){
            try{
                const res = axios.put(`http://localhost:5000/books/${book.id}`, {
                    title: book.title,
                    author: book.author,
                    available: book.available
                })
                console.log('Changed')
            
            } catch (err){
                console.log(err)
            }
        } else{
            try{
                const res = axios.post(`http://localhost:5000/books/`, {
                    title: book.title,
                    author: book.author,
                    available: 1
                })
                console.log('Changed')
            
            } catch (err){
                console.log(err)
            }
        }
        emit('close');
        
    }

</script>

<template>
     <form @submit.prevent="submit(book, state)">
        <section>
            <label for="title">Title</label>
            <input type="text" placeholder="title" v-model="book.title"/>
        </section>
        <section>
            <label for="author">Author</label>
            <input type="text" placeholder="author" v-model="book.author"/>
        </section>
        <section>
            <label>Availability:</label>
                <select v-model="book.available">
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
        </section>
        <section>
            <button type="submit">Submit</button>
        </section>
        <section>
            <button @click="$emit('close')">Cancel</button>
        </section>
    </form>
</template>

<style scoped>
form {
    background: #ffffffaa;
    padding: 25px;
    margin-top: 25px;
    width:500px;
    border:solid 1px ;
    border-color: #696969aa;
    border-radius: 5px;
}

form section + section {
    margin: 10px 0;
}

form section label {
    color: black;
}

form section input {
    margin-left:50px
}
form section select{
    margin-left:50px
}
form section label:first-child {
    display: inline-block;
    width: 15%;
}

form section label:not(first-child) {
    margin-right: 10px;
}

form section button {
    background-color: #D17862;
    border: 0;
    color: white;
    padding: 5px 15px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: transform 0.2s;
}

form section button:hover{
    transform:scale(1.05);
}

form section input[type='text'],
form section input[type='number'],
form section select,
form section textarea {
    padding: 5px;
    width: 70%;
}

</style>