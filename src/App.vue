<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-light" style="background: #3F51B5 !important;">
      <a class="navbar-brand" href="#">
        <i class="fas fa-box-open"></i> Shipla</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link :to="{ name: 'home' }" class="nav-item nav-link">Home</router-link>

          <router-link v-if="signed_in == null" class="nav-item nav-link" :to="{ name: 'sign-up' }">Sign Up</router-link>
          <router-link v-if="signed_in == null" class="nav-item nav-link" :to="{ name: 'sign-in' }">Sign In</router-link>
          <router-link v-if="signed_in" class="nav-item nav-link" :to="{ name: 'containers' }">Containers</router-link>
          <router-link v-if="signed_in" class="nav-item nav-link" :to="{ name: 'account' }">Account</router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <div class="row">
        <div class="col-12">
          <router-view/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  watch: {
    '$route': function (to, from) {
      this.signed_in = localStorage.getItem("token");
    }
  },
  data: () => {
    return {
      signed_in: localStorage.getItem("token")
    };
  }
};
</script>


<style>
body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  background: rgb(253, 253, 253);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
