<template>
    <TheHeader />
    <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
    components: {
        TheHeader
    },
    computed: {
        didAutoLogout() {
            return this.$store.getters.didAutoLogoout
        }
    },
    created() {
        this.$store.dispatch('tryLogin')
    },
    watch: {
        didAutoLogout(curValue, oldValue) {
            if (curValue && curValue !== oldValue) {
                this.$router.replace('/coaches')
            }

        }
    }
}
</script>

<style>
@import './assets/styles/app.css';
</style>
