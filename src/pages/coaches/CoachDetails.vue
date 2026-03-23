<template>
   <section>
      <BaseCard>
         <h2>{{ fullName }}</h2>
         <h3>${{ rate }}</h3>
      </BaseCard>
   </section>
   <section>
      <BaseCard>
         <header>
            <h2>Interested? Reach out now!</h2>
            <BaseButton link :to="contactLink">Contact</BaseButton>
         </header>
         <router-view></router-view>
      </BaseCard>
      <section>
         <BaseCard>
            <BaseBadge :type="area" :title="area" v-for="area in areas" :key="area"></BaseBadge>
            <p>{{ description }}</p>
         </BaseCard>

      </section>
   </section>

</template>

<script>
export default {
   props: {
      id: null
   },
   data() {
      return {
         selectedCoach: null

      }
   },
   computed: {
      fullName() {
         return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
      },
      contactLink() {
         return this.$route.path + '/' + this.id + '/contact'
      },
      areas() {
         return this.selectedCoach.areas
      },
      rate() {
         return this.selectedCoach.hourlyRate
      },
      description() {
         return this.selectedCoach.description
      }
   },
   created() {
      this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id);
   }
}
</script>