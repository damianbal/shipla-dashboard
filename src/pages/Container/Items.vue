<template>
    <div class="card">
        <div class="card-header">Container items</div>
        <loading :isLoading="loading"></loading>
        <transition name="fade">
          <div v-show="!loading" class="card-body">
              <div>
                  Total items: {{ items.length }}
              </div>
              <div class="bg-light mb-3 p-2 shadow rounded" v-for="(item,idx) in items_arr" :key="idx">
                  Item #{{ idx }} 

                  <span class="border" v-for="(item_f,idx) in item" :key="idx">
                      {{ item_f.name }} -> {{ item_f.value}}
                  
                  </span>

                  <div class="mt-2">
                      <button @click="removeItem(idx)" class="btn btn-danger btn-sm">Remove</button>
                  </div>
              </div>

              <div>
                  <router-link class="btn btn-primary" :to="{ name: 'container_add_item', params: { reference: this.reference } }">Add Item</router-link>
              </div>
          </div>
        </transition>
    </div>
</template>

<script>
import { Container, objectToArray } from "@/api/shipla-api";

export default {
  props: ["reference"],
  mounted() {
  
    this.load();
  },
  data: () => {
    return {
      items: [],
      items_arr: [],
      loading: true
    };
  },

  methods: {
    load() {
      this.loading = true;
      Container.container(this.reference).getAllItems(items => {
        this.items_arr = [];
        this.items = [];
        this.items = items;

        this.items.forEach(item => {
          this.items_arr.push(objectToArray(item));
        });

        this.loading = false;
      });
    },
    removeItem(idx) {

      Container.container(this.reference)
        .removeItem(this.items[idx].meta.ref)
        .then(resp => {
          alert("Item removed!");
          this.load();
        });
    }
  }
};
</script>

<style>
</style>
