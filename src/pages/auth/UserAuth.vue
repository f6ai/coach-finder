<template>
    <BaseCard>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>

            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" />
            </div>

            <p v-if="!this.formIsValid">Please enter a valid email and min 6 character long password.</p>
            <BaseButton>{{ sumbitButtonCaption }}</BaseButton>
            <BaseButton type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</BaseButton>
        </form>
    </BaseCard>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login'
        }
    },
    computed: {
        sumbitButtonCaption() {
            return this.mode === 'login' ? 'Login' : 'Signup'
        },
        switchModeButtonCaption() {
            return this.mode === 'login' ? 'Signup instead' : 'Login instead'
        }
    },
    methods: {
        submitForm() {
            this.formIsValid = true

            if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false
                return
            }

        },
        switchAuthMode() {
            this.mode = this.mode === 'login' ? 'signup' : 'login'
        }
    }
}
</script>

<style scoped>
form {
    margin: 1rem;
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
</style>