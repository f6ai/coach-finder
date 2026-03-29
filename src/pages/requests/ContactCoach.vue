<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{ invalid: !email.isValid }">
            <label for="email">Your email</label>
            <input type="email" id="email" v-model.trim="email.val">
            <p v-if="!email.isValid">Field should have a valid email address.</p>
        </div>
        <div class="form-control" :class="{ invalid: !message.isValid }">
            <label for="message">Your message</label>
            <textarea rows="5" id="message" v-model.trim="message.val"></textarea>
            <p v-if="!message.isValid">Message must not be empty.</p>
        </div>

        <p class="errors" v-if="!formIsValid">Form is invalid. Fix the errors.</p>

        <div class="actions">
            <BaseButton>Send Message</BaseButton>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            email: {
                val: '',
                isValid: true
            },
            message: {
                val: '',
                isValid: true
            },
            formIsValid: true
        }
    },
    methods: {
        onSubmit() {
            this.validateForm()

            if (!this.formIsValid) {
                return
            }

            this.$store.dispatch('requests/contactCoach', {
                email: this.email,
                message: this.message,
                coachId: this.$route.params.id
            })

            this.$router.replace('/coaches')

        },
        validateForm() {
            this.formIsValid = true

            if (this.email.val === '' || !this.email?.val?.includes('@')) {
                this.email.isValid = false
                this.formIsValid = false
            }

            if (this.message.val === '') {
                this.message.isValid = false
                this.formIsValid = false
            }
        }
    },
}

</script>

<style scoped>
form {
    margin: 1rem;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}

.errors {
    font-weight: bold;
    color: red;
}

.actions {
    text-align: center;
}

.invalid label {
    color: red;
}

.invalid input,
.invalid textarea {
    border: 1px solid red;
}
</style>