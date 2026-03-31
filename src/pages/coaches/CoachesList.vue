<template>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </BaseDialog>
    <section>
        <CoachFilter @change-filter="setFilters" </CoachFilter>
    </section>
    <section>
        <BaseCard>
            <div class="controls">
                <BaseButton :mode="'outline'" @click="loadCoaches(true)">Refresh</BaseButton>
                <BaseButton v-if="!isCoach && !this.isLoading" link :to="'/register'">Register as a coach</BaseButton>
            </div>
            <div v-if="isLoading">
                <BaseSpinner></BaseSpinner>
            </div>
            <ul v-else-if="hasCoaches">
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
import CoachFilter from './CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed: {
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        },
        filteredCoaches() {
            // coaches/coaches -> first is the namespace second is the getter name
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true
                }
                return false
            })
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        }
    },
    created() {
        this.loadCoaches()
    },
    methods: {
        async loadCoaches(refresh = false) {
            this.isLoading = true
            try {
                await this.$store.dispatch('coaches/loadCoaches', {
                    forceRefresh: refresh
                })
            }
            catch (error) {
                this.error = error.message || 'Something went wrong.'
            }
            this.isLoading = false
        },
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        handleError() {
            this.error = null
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