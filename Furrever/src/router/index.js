import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/store';
import { useAdminAuthStore } from '@/store/adminAuth';

import MainPage from '@/layout/MainPage.vue';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';
import Contact from '@/components/Contact.vue';
import Services from '@/components/Services.vue';
import Categories from '@/components/Categories.vue';
import BookingForm from '@/components/BookingForm.vue';
import ChangePassword from '@/components/ChangePassword.vue';
import Profile from '@/components/Profile.vue';

import Auth from '@/layout/Auth.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

import AdminLayout from '@/layout/AdminLayout.vue';
import AdminAuth from '@/layout/AdminAuth.vue';
import AdminLogin from '@/components/AdminLogin.vue';
import AdminRegister from '@/components/AdminRegister.vue';
import AdminHome from '@/components/AdminHome.vue';
import AdminNav from '@/components/AdminNav.vue';
import AdminCategories from '@/components/AdminCategories.vue';
import AdminBookings from '@/components/AdminBookings.vue';
import AdminAccount from '@/components/AdminAccount.vue';

import Reviews from '@/components/Reviews.vue'; // Import Reviews component

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home
            },
            {
                path: '/about',
                name: 'About',
                component: About
            },
            {
                path: '/contact',
                name: 'Contact',
                component: Contact
            },
            {
                path: '/categories',
                name: 'Categories',
                component: Categories,
            },
            {
                path: '/services/:categoryId',
                name: 'Services',
                component: Services,
                props: true // Pass route params as props to Services component
            },
            {
                path: '/book-service',
                name: 'BookService',
                component: BookingForm,
                meta: {
                    requiresAuth: true // Route requires authentication
                }
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: true // Example: Profile route requires authentication
                }
            },
            {
                path: '/changepassword',
                name: 'ChangePassword',
                component: ChangePassword,
                meta: {
                    requiresAuth: true // Example: Profile route requires authentication
                }
            },
            {
                path: '/reviews', // Route for Reviews.vue
                name: 'Reviews',
                component: Reviews,
                meta: {
                    requiresAuth: true // Example: Reviews route requires authentication
                }
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        redirect: 'auth/login',
        meta: {
            requiresGuest: true
        },
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
            },
            {
                path: 'register',
                name: 'Register',
                component: Register,
            }
        ]
    },
   
    {
        path: '/admin/auth',
        name: 'AdminAuth',
        component: AdminAuth,
        redirect: 'admin/auth/login',
        meta: {
            requiresGuest: true
        },
        children: [
            {
                path: 'login',
                name: 'AdminLogin',
                component: AdminLogin,
            },
            {
                path: 'register',
                name: 'AdminRegister',
                component: AdminRegister,
            },
        ]
    },
    {
        path: '/admin/home',
        name: 'AdminHome',
        component: AdminHome,
        meta: {
            requiresAdminAuth: true
        },
    },
    {
        path: '/admin/adminnav',
        name: 'AdminNav',
        component: AdminNav,
       
    },
    {
        path: '/admin/categories',
        name: 'AdminCategories',
        component: AdminCategories,
        meta: {
            requiresAdminAuth: true
        },
    },
    {
        path: '/admin/bookings',
        name: 'AdminBookings',
        component: AdminBookings,
        meta: {
          requiresAdminAuth: true, // Ensure this route is protected
        }
    },
    {
        path: '/admin/account',
        name: 'AdminAccount',
        component: AdminAccount,
        meta: {
            requiresAdminAuth: true
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const adminAuthStore = useAdminAuthStore();
    
    if (to.meta.requiresGuest && (authStore.isAuthenticated || adminAuthStore.isAuthenticated)) {
        next({ name: 'Home' })
    } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' })
    } else if (to.meta.requiresAdminAuth && !adminAuthStore.isAuthenticated) {
        next({ name: 'AdminLogin' })
    } else {
        window.scrollTo(0, 0);
        next();
    }
});

export default router;
