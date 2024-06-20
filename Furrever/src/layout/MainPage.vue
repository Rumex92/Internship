<template>
<Nav />
    <router-view></router-view>
<Footer />
</template>

<script setup>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
</script>