<template>
    <div class="card">
        <div class="card-header">
            Add Item
        </div>

        <div class="card-body">
            <div class="mb-3 p-2">
                <h3 class="text-secondary">Add Field</h3>
                <input class="form-control mb-1" v-model="field_name" type="text" placeholder="Name of field">
                <input class="form-control mb-1" v-model="field_value" type="text" placeholder="Value">
                <br>
                <br>
                <button class="btn btn-primary" @click="addField">Add</button>

            </div>
            <div class="mb-3 p-2">
                <h3 class="text-secondary">Fields</h3>
                <div class="text-muted" v-if="item_fields.length < 1">No fields, add them using 'Add Field' above!</div>

                  <transition-group name="fade">
                  <div v-if="item_fields.length > 0" v-for="(field, idx) in item_fields" :key="idx">
                    <div class="row mb-1">
                      <div class="col-sm-5">
                      <input class="form-control" :value="field.name" type="text" disabled>
                      </div>
                      <div class="col-sm-5">
                      <input class="form-control" :value="field.value" type="text" disabled>
                      </div>
                      <div class="col-sm-2">
                      <button @click="removeField(idx)" class="btn btn-block btn-danger">
                          <i class="fas fa-trash-alt"></i>
                      </button>
                      </div>
                    </div>
                  </div>
                  </transition-group>
            </div>
            <div>
                <button @click="save" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Container } from "@/api/shipla-api";

export default {
  props: ["reference"],
  methods: {
    addField() {
      if (this.field_name.length < 3) {
        alert("Field name must be longer!");
        return;
      }

      this.item_fields.push({ name: this.field_name, value: this.field_value });
      this.field_name = null;
      this.field_value = null;
    },
    removeField(index) {
      this.item_fields.splice(index, 1);
    },
    save() {
      if (this.item_fields.length < 1) {
        alert("You need minimum 1 field!");

        return;
      }

      let data = {};

      this.item_fields.forEach(field => {
        data[field.name] = field.value;
      });

      this.item_fields = [];

      Container.container(this.reference)
        .addItem(data)
        .then(resp => {
          alert("Item added!");
          this.$router.push({
            name: "container_items",
            params: { reference: this.reference }
          });
        });
    }
  },
  data: () => {
    return {
      field_name: "",
      field_value: "",
      item_fields: []
    };
  }
};
</script>

<style>
</style>
