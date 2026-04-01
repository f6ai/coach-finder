import { normalizeModuleId } from "vite/module-runner";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
};

export default {
    async login(context, payload) {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await res.json()

        if (!res.ok) {
            const error = new Error(`Failed to log in ${responseData.error.message}`)
            throw error
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    async signup(context, payload) {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await res.json()

        if (!res.ok) {
            const error = new Error(`Failed to authenticate ${responseData.error.message}`)
            throw error
        }

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    logout(context) {
        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        })
    }
}