<template>
    <section>
        FILTER
    </section>
    <section>
        <BaseCard>
            <div class="controls">
                <BaseButton :mode="'outline'">Refresh</BaseButton>
                <BaseButton link>Register as a coach</BaseButton>
            </div>
            <ul v-if="hasCoaches">
                <CoachItem v-for="coach in filteredCoaches" :key="coach.id" :firstName="coach.firstName"
                    :lastName="coach.lastName" :id="coach.id" :rate="coach.hourlyRate" :areas="coach.areas">
                </CoachItem>
            </ul>
            <h3 v-else>No coaches found.</h3>
        </BaseCard>
    </section>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue';

export default {
    components: {
        CoachItem
    },
    computed: {
        filteredCoaches() {
            // coaches/coaches -> first is the namespace second is the getter name
            return this.$store.getters['coaches/coaches']
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches']
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.controls {
    display: flex;
    justify-content: space-between;
}
</style>