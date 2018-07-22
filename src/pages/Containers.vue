<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header">
                <i class="fas fa-boxes"></i> Containers</div>

            <div class="card-body pt-0 text-muted">

                <div id="containers">
                    <div class="row bg-light p-2 font-weight-bold border-bottom">
                        <div class="col-12 col-md-4">
                            Title
                        </div>
                        <div class="col-12 col-md-4">
                            Reference
                        </div>

                        <div class="col-12 col-md-4 text-center">
                            Actions
                        </div>
                    </div>

                    <loading :isLoading="loading"></loading>

                    <transition-group name="fade">
                        <div v-show="!loading" v-for="(container, idx) in containers" class="row p-2" :key="idx">
                            <div class="col-12 col-md-4">
                                {{ container.title }}
                            </div>

                            <div class="col-12 col-md-4">
                                {{ container.ref }}
                            </div>

                            <div class="col-12 col-md-4 text-center">
                                <router-link class="btn btn-sm btn-outline-primary" :to="{ name: 'container', params: { reference: container.ref } }">
                                    <i class="fas fa-link"></i> View</router-link>
                                &nbsp;
                                <button v-on:click="remove(container.ref)" class="btn btn-sm btn-outline-danger">
                                    <i class="fas fa-trash-alt"></i> Remove</button>

                            </div>
                        </div>
                    </transition-group>
                </div>

                <!--
                <div class="row">
                    <ContainerCard v-for="(container, idx) in containers" :key="idx" :container="container">
                    </ContainerCard>
                </div>
-->
            </div>
        </div>

        <AddContainer v-on:containerAdded="reload"></AddContainer>
    </div>
</template>

<script>
import { Container, User } from "@/api/shipla-api.js";
import AddContainer from "@/components/AddContainer";

export default {
  mounted() {
    User.getContainers().then(resp => {
      this.containers = resp.data;
      this.loading = false;
    });
  },
  methods: {
    reload(ref) {
      this.containers = [];
      User.getContainers().then(resp => {
        this.containers = resp.data;
        this.loading = false;
      });
    },
    remove(ref) {
      this.loading = true;
      Container.remove(ref).then(resp => {
        this.reload();
      });
    }
  },
  data: () => {
    return {
      loading: true,
      containers: null
    };
  },
  components: { AddContainer }
};
</script>

<style>
</style>
