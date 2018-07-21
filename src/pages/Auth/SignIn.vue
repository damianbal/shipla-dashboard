<template>
  <div>
    <h3 class="text-primary">Sign In</h3>
    <div class="text-muted">Sign in to have access to your containers</div>
    <form v-on:submit.prevent="signIn" class="mt-3">
      <div class="form-group">

        <label>Email</label>
        <input placeholder="Email" type="email" class="form-control" v-model="email" required>

      </div>

      <div class="form-group">

        <label>Password</label>
        <input placeholder="Password" type="password" class="form-control" v-model="password" required>

      </div>

      <button class="btn btn-primary" type="submit">
        <i class="fas fa-sign-in-alt"></i> Sign In</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "@/api/shipla-api.js";

export default {
  methods: {
    signIn() {
      Auth.auth(this.email, this.password).then(resp => {
        if (resp.data.success) {
          localStorage.setItem("token", resp.data.token);
          console.log("Signed in!", resp.data);
          this.$router.push({ name: "containers" });
        }
      });
    }
  },
  data: () => {
    return {
      email: "",
      password: ""
    };
  }
};
</script>

<style>
</style>
