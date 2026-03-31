export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            areas: data.areas,
            description:
                data.desc,
            hourlyRate: data.rate
        }

        const response = await fetch(`https://vue-demo-936ca-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        })

        if (!response.ok) {
            const error = new Error(responseData.message || 'Could not update coach.')
            throw error
        }


        context.commit('registerCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context) {
        const response = await fetch(`https://vue-demo-936ca-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`)

        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error
        }

        const coaches = []

        // transform data into correct structure, key is the userId
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate
            }

            coaches.push(coach)
        }

        context.commit('setCoaches', coaches)

    }



}