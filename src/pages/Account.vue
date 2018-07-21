<template>
    <div class="card">
        <div class="card-header">Account: {{ user.email }}</div>
        <div class="card-body">
            <button v-on:click="signOut" class="btn btn-secondary">Sign out</button>
        </div>
    </div>
</template>

<script>
import { Auth } from "@/api/shipla-api.js";

export default {
  mounted() {
    Auth.user().then(resp => {
      this.user = resp.data;
    });
  },
  data: () => {
    return {
      user: { email: "Loading..." }
    };
  },
  methods: {
    signOut() {
      Auth.signOut();
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>
