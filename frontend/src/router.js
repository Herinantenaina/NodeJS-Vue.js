import { createRouter, createWebHistory } from "vue-router";
import BookClient from "./components/client/Book.vue";
import UserAdmin from "./components/admin/User.vue";
import BookAdmin from "./components/admin/Book.vue";
import UserBook from "./components/admin/UserBook.vue";
import Home from "./components/Home.vue";

const routes = [
    {
        path:"/",component: Home
    },
    {
        path:"/admin/books/",component: BookAdmin
    },
    {
        path:"/admin/users/",component: UserAdmin
    },
    {
        path:"/books/",component: BookClient
    },
    {
        path:"/admin/userbook",component: UserBook
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router