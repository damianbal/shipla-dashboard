<template>
  <div class="card">
    <div class="card-header">Container items</div>
    <loading :isLoading="loading"></loading>
    <transition name="fade">
      <div v-show="!loading" class="card-body">
        <div class="mt-1 mb-2">
          Total items: {{ items.length }}
        </div>
        <div class="mb-2">
          <router-link class="btn btn-primary" :to="{ name: 'container_add_item', params: { reference: this.reference } }">
            <i class="fas fa-plus"></i> Add Item</router-link>
        </div>

      <div class="row">
        <div class="col-sm-6 mb-3 border bg-light"  v-for="(item,idx) in items_arr" :key="idx">
       
          <div class="row p-2">
            <div class="col-12">
              {{ items[idx].meta.ref }}
            </div>
          </div>

          <div class="row p-2" v-for="(item_f,idx) in item" :key="idx">
            <div class="col-3 p-1 font-weight-bold">
            {{ item_f.name }}
            </div>

            <div class="col-9 p-1">
              <div v-if="item_f.name == 'meta'">
                  <button @click="show(item_f.value)" class="btn btn-sm btn-secondary"><i class="fas fa-info"></i> Show Meta</button>
              </div>
              <div v-else>
                <div v-if="item_f.value.length > 30">
                  <textarea class="form-control" v-model="item_f.value"></textarea>
                </div>
                <div v-else>
                      {{ item_f.value}}
                </div>
              </div>
            </div>
          </div>

          <div class="row p-2">
            <div class="col-12">
                <button @click="removeItem(idx)" class="btn btn-danger btn-block"><i class="fas fa-trash-alt"></i> Remove</button>
            </div>
          </div>
        </div>
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
    show(data) {
      alert(JSON.stringify(data))
    },
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
