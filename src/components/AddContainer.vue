<template>

    <div class="card mb-3 mt-3">
        <div class="card-header">Add Container</div>
        <div class="card-body">

            <small class="card-text text-muted">Add container which you will be able to access</small>

            <div class="row">
                <div class="col-12 col-md-10">
                    <input minlength="4" v-model="title" type="text" class="form-control" placeholder="Container title" required>
                </div>

                <div class="col-12 col-md-2">
                    <button v-on:click="add" class="btn btn-block btn-primary">
                        <i class="fas fa-plus"></i> Add</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { Container } from "@/api/shipla-api.js";

export default {
  mounted() {},
  methods: {
    add() {
      if(this.title.length < 3) 
      {
        alert('Container title must be longer!');
        return;

      }

      Container.add(this.title, data => {
        alert("Created container ref: " + data.ref);

        this.$emit("containerAdded", data.ref);
      });

      this.title = null;
    }
  },
  data: () => {
    return {
      title: ""
    };
  }
};
</script>

<style>
</style>
