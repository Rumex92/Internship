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
import ProfileEdit from '@/components/ProfileEdit.vue';
import UserBooking from '@/components/UserBooking.vue';
import Booking from '@/components/Booking.vue';

import Auth from '@/layout/Auth.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

import AdminLayout from '@/layout/AdminLayout.vue';
import AdminAuth from '@/layout/AdminAuth.vue';
import AdminLogin from '@/components/AdminLogin.vue';

import AdminHome from '@/components/AdminHome.vue';
import AdminNav from '@/components/AdminNav.vue';
import AdminCategories from '@/components/AdminCategories.vue';
import AdminBookings from '@/components/AdminBookings.vue';
import AdminAccount from '@/components/AdminAccount.vue';

import UserList from '@/components/UserList.vue';
import Reviews from '@/components/Reviews.vue'; 

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
                path: '/booking',
                name: 'Booking',
                component: Booking
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
                props: true 
            },
            {
                path: '/book-service',
                name: 'BookService',
                component: BookingForm,
                meta: {
                    requiresAuth: true 
                }
            },
            {
                path: '/profile',
                name: 'Profile',
                component: Profile,
                meta: {
                    requiresAuth: true 
                }
            },
            {
                path: '/profile/edit',
                name: 'ProfileEdit', 
                component: ProfileEdit,
                meta: {
                    requiresAuth: true 
                }
            },
            {
                path: '/profile/booking',
                name: 'UserBooking', 
                component: UserBooking,
                meta: {
                    requiresAuth: true 
                }
            },
            {
                path: '/changepassword',
                name: 'ChangePassword',
                component: ChangePassword,
                meta: {
                    requiresAuth: true 
                }
            },
            {
                path: '/reviews', 
                name: 'Reviews',
                component: Reviews,
                meta: {
                    requiresAuth: true 
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
          requiresAdminAuth: true, 
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
  
   
    {
        path: '/admin/userlist',
        name: 'UserList',
        component: UserList,
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
