<template>
    <div class="card">
        <div class="card-header">Container items</div> 
        <div class="card-body">
            <div>
                Total items: {{ items.length }}
            </div>
            <div class="bg-light mb-3 p-2 shadow rounded" v-for="(item,idx) in items_arr" :key="idx">
                Item #{{ idx }}

                <span class="border" v-for="(item_f,idx) in item" :key="idx">
                    {{ item_f.name }} -> {{  item_f.value}}
                </span>

                <div class="mt-2"> 
                    <button @click="removeItem(idx)" class="btn btn-danger btn-sm">Remove</button>
                </div>
            </div>

            <div> 
                <router-link class="btn btn-primary" :to="{ name: 'container_add_item', params: { reference: this.reference } }">Add Item</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { Container, objectToArray } from "@/api/shipla-api"

export default {
    props: ["reference"],
    mounted() {
        this.load()
    },
    data: () => {
        return {
            items: [],
            items_arr: []
        }
    },
    
    methods: {
        load() {
            Container.container(this.reference).getAllItems(items => {
                this.items_arr = []
                this.items = []
                this.items = items
    

                this.items.forEach(item => {
                    this.items_arr.push(objectToArray(item))
                })
            })
        },
        removeItem(id) {
            Container.container(this.reference).removeItem(id).then(resp => {
                alert('Item removed!')
                this.load()
            })
        }
    }
}
</script>

<style>

</style>
