<template>
    <div>

        <loading :isLoading="loading"></loading>

        <transition name="fade">
            <div v-show="!loading">
                <div class="card card-sm">
                    <div class="card-header">
                        Container: {{ title }}
                    </div>

                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item p-3">
                                <small class="text-muted">Reset container, this will remove all data from container</small>
                                <br>
                                <button class="btn btn-danger btn-sm" @click="reset">Reset</button>
                            </li>
                            <li class="list-group-item p-3">

                                <div class="mb-3">
                                    <h4 class="text-secondary">Auth</h4>

                                    <div class="form-check">
                                        <input v-model="requires_auth" class="form-check-input" type="checkbox" value="" id="requiresAuthCheck">
                                        <label class="form-check-label" for="requiresAuthCheck">
                                            Require Auth to add items to container?
                                        </label>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <h4 class="text-secondary">Items per page</h4>
                                    <small class="text-secondary">How many items should be returned when accessing items with pagination</small>
                                    <div>
                                        <select v-model="items_per_page">
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            <option value="6">6</option>
                                            <option value="9">9</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                        </select>
                                    </div>
                                </div>

                                <button class="btn btn-primary" type="button" @click="save">Save</button>
                            </li>

                            <li class="list-group-item p-3">
                                <textarea class="form-control" v-model="data" disabled></textarea>
                                <br>
                                <router-link :to="{ name: 'container_items', params: { reference: this.reference } }" class="btn btn-secondary">Items</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import { Container } from "@/api/shipla-api.js";

export default {
  props: ["reference"],

  mounted() {
    this.load();
  },

  methods: {
    load() {
      let container = new Container(this.reference);

      container.data().then(resp => {
        this.title = resp.data.title;
        this.data = resp.data.data;
        this.requires_auth = resp.data.requires_auth;
        this.items_per_page = resp.data.items_per_page;
        this.loading = false;
      });
    },

    reset() {
      this.loading = true;
      Container.container(this.reference)
        .update({
          data: "[]"
        })
        .then(resp => {
          console.log("Container reseted!");
          this.loading = false;
        });
    },

    save() {
      let container = new Container(this.reference);

      container
        .update({
          requires_auth: this.requires_auth,
          items_per_page: this.items_per_page
        })
        .then(resp => {
          alert(resp.data.message);
        })
        .catch(err => {});
    }
  },

  data: () => {
    return {
      title: null,
      data: null,
      requires_auth: false,
      items_per_page: 0,
      loading: true
    };
  }
};
</script>

<style>
</style>
