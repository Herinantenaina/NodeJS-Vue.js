<script setup>
    import axios from 'axios'

    const props = defineProps(['user'])
    
    async function delete_(id) {  
         try{
             const res = axios.delete(`http://localhost:5000/users/${id}`).
                         then(() => {  window.location.reload() })
                         
             console.log('Changed')

         } catch (err){
             console.log(err)
         }
    }
</script>

<template>
    <section class="container">
        <h3>User</h3>
        <div class="view">
            <h1>Username: {{ user.name }}</h1>
            <div class="details">
                <p>Role: {{ user.role }}</p>
            </div>
        </div>

        <div class="action">
            <button  @click="$emit('borrow', user)">Edit</button>
            <button  @click="delete_(user.id)" class="deleteButton">Delete</button>
        </div>
    </section>
    
</template>

<style scoped>
.container{
    margin-top: 10px;
    width:100%;
    display:flex;
    flex-direction:column;
    border-radius:10px;
    box-shadow: 0 0 5px #ddd;
    padding:15px;
}

.container .view{
    aspect-ratio: 1/1;
    display:flex;
    flex-direction:column;
    gap:20px;
}

.container .view h1{
    font-size: 1.3rem;
}

.deleteButton{
  background-color: #930000;
  margin-left: 10px;
}   

h3{
    text-align: center;
}
.container .view .action{
    display:flex;
    align-items:center;
    gap:5px;
    flex-grow:1;
}

button{
  cursor:pointer;
  background: #D17862;
  color:white;
  font-weight:bold;
  border: 0;
  border-radius:5px;
  padding:5px 15px;
  font-size:1rem;
  transition: transform 0.2s;
  margin: 10px 0;
}
button:hover{
  transform:scale(1.05);
}
</style>