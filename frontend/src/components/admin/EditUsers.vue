<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const props = defineProps(['user'])
    const state = ref(false)
    const return_date = ref("")
    const emit = defineEmits(['close'])

    onMounted(() => {
        if (!props.user.name) {
            state.value = true
            
        } else {
            state.value = false
        }
        console.log(state)
    })

    async function submit(user, bool) { 
        
        if (!user.password || !user.name || !user.role) {
            alert("Some fied(s) missing");
            return;
        }

        //Pour savoir si c'est POST or PUT
        if (!bool){
            try{
                const res = axios.put(`http://localhost:5000/users/${user.id}`, {
                    name: user.name,
                    role: user.role,
                    password: user.password
                })
                console.log(res.data)
            
            } catch (err){
                console.log(err)
            }
        } else{
            try{
                const res = axios.post(`http://localhost:5000/users/`, {
                    name: user.name,
                    password: user.password,
                    role: user.role
                })
                console.log(res.data)
            
            } catch (err){
                console.log(err)
            }
        }
        emit('close');
        
    }
</script>

<template>
    <form @submit.prevent="submit(user, state)">
        <section>
            <label for="title">Name</label>
            <input type="text" placeholder="" v-model="user.name"/>
        </section>
        <section>
            <label for="title">Password</label>
            <input type="text" placeholder="" v-model="user.password"/>
        </section>
        <section>
            <label>Role</label>
                <select v-model="user.role">
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
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