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

                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <button data-toggle="tooltip" title="Are you sure? This is going to remove all items" @click="reset" class="btn btn-danger btn-block"><i class="fas fa-exclamation-triangle"></i> Reset</button>
                            </div>
                            
                            <div class="col-sm-3">
                                <router-link :to="{ name: 'container_items', params: { reference: this.reference } }" class="btn btn-block btn-secondary"><i class="fas fa-sitemap"></i> Items</router-link>
                            </div>

                            <div class="col-sm-3">
                                 <button class="btn btn-block btn-secondary" type="button" data-toggle="collapse" data-target="#collapsedData"><i class="fas fa-database"></i> Show Data</button>
                            </div>
                        </div>


                                <div class="row">
                                    <div class="col-sm-6 center">
                                     <h4 class="text-secondary">Auth</h4>

                                    <div class="form-check">
                                        <input v-model="requires_auth" class="form-check-input" type="checkbox" value="" id="requiresAuthCheck">
                                        <label class="form-check-label" for="requiresAuthCheck">
                                            Require Auth to add items to container?
                                        </label>
                                    </div>
                                    </div>

                                    <div class="col-sm-6 center">
                                                       <h4 class="text-secondary">Items per page</h4>
                                    <small class="text-secondary">How many items should be returned when accessing items with pagination</small>
                                    <div>
                                        <select class="custom-select" v-model="items_per_page">
                                            <option value="1">1</option>
                                            <option value="3">3</option>
                                            <option value="6">6</option>
                                            <option value="9">9</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                

                                <button class="btn btn-primary" type="button" @click="save">Save</button> &nbsp;

                        <div class="collapse mt-3" id="collapsedData">
                                <textarea class="form-control" v-model="data" disabled></textarea>
                        </div>
                   
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
