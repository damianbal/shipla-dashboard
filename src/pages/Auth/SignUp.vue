<template>

    <div class="card">
        <div class="card-header">Sign Up</div>
        <div class="card-body">
            <h3 class="text-primary">Sign Up</h3>
            <div class="text-muted">Sign up to create and manage containers</div>

            <div v-if="message">
                <div class="alert alert-primary mt-1" :class="{ 'alert-danger': error }" role="alert">
                    {{ message }}
                </div>
            </div>

            <loading :isLoading="loading"></loading>

            <form v-on:submit.prevent="signUp" class="mt-3">

                <div class="form-group">

                    <label>Name</label>
                    <input placeholder="Name" type="text" minlength="3" class="form-control" v-model="name" required>

                </div>

                <div class="form-group">

                    <label>Email</label>
                    <input placeholder="Email" minlength="3" type="email" class="form-control" v-model="email" required>

                </div>

                <div class="form-group">

                    <label>Password</label>
                    <input placeholder="Password" minlength="3" type="password" class="form-control" v-model="password" required>

                </div>

                <button class="btn btn-primary" type="submit">
                    <i class="fas fa-sign-in-alt"></i> Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { Auth } from "@/api/shipla-api.js";

export default {
  methods: {
    signUp() {
      this.loading = true;

      Auth.create(this.email, this.password, this.name).then(resp => {
        if (resp.data.success) {
          console.log("account created!", resp.data);

          alert("Created your account!");

          //this.message = resp.data.message
          //this.error = false

          this.loading = false;

          this.$router.push({ name: "sign-in" });
        } else {
          alert("Could not create your account: " + resp.data.message);
          this.message = resp.data.message;
          this.error = true;
        }
      });
    }
  },
  data: () => {
    return {
      email: "",
      password: "",
      name: null,
      loading: false,
      message: "",
      error: false
    };
  }
};
</script>

<style>
</style>
