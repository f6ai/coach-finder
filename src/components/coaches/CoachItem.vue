<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <BaseBadge :type="area" :title="area" v-for="area in areas" :key="area"></BaseBadge>
        </div>

        <div class="actions">
            <BaseButton mode="outline" link :to="coachContactLink">Contact coach</BaseButton>
            <BaseButton link :to="coachDetailsLink">Details</BaseButton>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        firstName: '',
        lastName: '',
        id: null,
        rate: null,
        areas: null
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`
        },
        coachContactLink() {
            return this.$route.path + '/' + this.id + '/contact'
        },
        coachDetailsLink() {
            return this.$route.path + '/' + this.id
        }
    },
}
</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
}

h3 {
    font-size: 1.5rem;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>