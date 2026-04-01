export default {
    login() {

    },
    async signup(context, payload) {
        const API_KEY = "AIzaSyA7EYVx2I3XWHtfHkVUq8wNzke__F69QsQ"
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
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
    }
}