<template>
    <section>
        <BaseCard>
            <h2>Register as a coach</h2>
            <CoachForm @save-data="saveData"></CoachForm>
        </BaseCard>
    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(data) {
            this.$store.dispatch('coaches/registerCoach', data)
            // can't go back from the redirected page
            this.$router.replace('/coaches')
        }
    }
}

</script>