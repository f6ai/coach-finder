<template>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </BaseDialog>
    <section>
        <BaseCard>
            <h2>Requests received</h2>
            <div v-if="isLoading">
                <BaseSpinner></BaseSpinner>
            </div>
            <ul v-else-if="hasRequests">
                <RequestItem v-for="request in receivedRequests" :key="request.id" :email="request.userEmail"
                    :message="request.message"></RequestItem>
            </ul>

            <h3 v-else>You haven't received any requests yet.</h3>
        </BaseCard>
    </section>
</template>

<script>
import RequestItem from "./../../components/requests/RequestItem.vue"

export default {
    components: {
        RequestItem
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    created() {
        this.loadRequests()
    },
    computed: {
        receivedRequests() {
            return this.$store.getters['requests/requests']
        },
        hasRequests() {
            return !this.isLoading && this.$store.getters['requests/hasRequests']
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true
            try {
                await this.$store.dispatch('requests/fetchRequests')
            } catch (error) {
                this.error = error.message || 'Something failed!'
            }

            this.isLoading = false
        },
        handleError() {
            this.error = false
        }
    }
}

</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>