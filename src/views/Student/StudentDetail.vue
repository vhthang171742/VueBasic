<template>
  <h1>studentDetail</h1>
</template>

<script>
export default {
  props: {
    id: String
  },
  mounted() {
    console.log(this.id);
  }
};
</script>
