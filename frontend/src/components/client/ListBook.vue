<script setup>
    const props = defineProps(['book'])
    
</script>

<template>
    <section class="container">
        <h3>Book</h3>
        <div class="view">
            <h1>Title: {{ book.title }}</h1>
            <div class="details">
                <p>Author: {{ book.author }}</p>
                <p>Availibility: {{ book.available == 1 ? 'Yes' : 'No' }}</p>
            </div>
        </div>

        <div class="action">
            <button  @click="$emit('borrow', book)">Borrow</button>
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

.container .view .action{
    display:flex;
    align-items:center;
    gap:5px;
    flex-grow:1;
}

h3{
    text-align: center;
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