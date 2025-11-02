<script setup>
    import { ref,onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps(['user'])
    const emit = defineEmits(['close'])
    const date = new Date().toISOString().split('T')[0]
    const return_date = ref("")
    const state = ref(false)

    const getDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('en-UK', options);
    };

    onMounted(() => {
        if (!props.user.book_id) {
            state.value = true
            
        } else {
            state.value = false
        }
        console.log(state)
    })

    async function submit(user, bool) { 

        if (!return_date.value || !user.user_id || !user.book_id) {
            alert("Some fied(s) missing");
            return;
        }

        //Pour savoir si c'est POST or PUT
        if (!bool){
            try{
                const res = axios.put(`http://localhost:5000/userbook/${user.id}`, {
                    user_id : user.id,
                    book_id : user.book_id,
                    return_date : return_date.value
                })
                console.log('Changed')
            
            } catch (err){
                console.log(err)
            }
        } else{
            try{
                const res = axios.post(`http://localhost:5000/userbook/`, {
                    user_id : 2,
                    book_id : user.book_id,

                    return_date : return_date.value
                })
                console.log('Changed')
                console.log(return_date.value)
            
            } catch (err){
                console.log(err)
            }
        }
        emit('close');
    }
</script>

<template>
    <form @submit.prevent="">
        <section>
            <label for="title">User_id</label>
            <input type="text" placeholder="" v-model="user.user_id"/>
        </section>
        <section>
            <label for="title">Book_id</label>
            <input type="text" placeholder="" v-model="user.book_id"/>
        </section>
        <section>
            <label for="title">Borrow_date</label>
            <input type="text" placeholder="" readonly="true" :value="getDate(new Date)"/>
        </section>
        <section>
            <label>Return Date:</label>
            <input type="date" v-model="return_date" />
        </section>
        <section>
            <button @click="submit(user,state)">Submit</button>
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