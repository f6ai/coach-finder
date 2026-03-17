<template>
   Details for coach
   <router-view></router-view>
   <div class="controls">
      <router-link :to="{ name: 'contact', params: { id: $route.params.id } }">
         Contact
      </router-link>
   </div>
</template>