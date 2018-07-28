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
    this.fetch()
  },
  data: () => {
    return {
      user: { email: "Loading..." }
    };
  },
  watch: {
    '$route': function(to, from) {
      this.fetch()
    }
  },
  methods: {
    fetch() {
      Auth.user().then(resp => {
        this.user = resp.data;
      });
    },
    signOut() {
      Auth.signOut();
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
</style>
