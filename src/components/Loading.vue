<template>
    <div v-show="isLoading" class="text-center m-3">
        <i style="font-size:40px" class="fas fa-spin fa-spinner"></i>
    </div>
</template>

<script>
export default {
  props: ["isLoading"]
};
</script>

<style>
</style>
