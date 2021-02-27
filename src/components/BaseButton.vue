<template>
  <button
    class="normal"
    :class="type"
    :disabled="disabled"
    @click="callback($event)"
  >
    <slot name="icon" class="btn-icon"></slot>
    <slot name="text" class="btn-text">Button</slot>
  </button>
</template>
<script>
export default {
  props: {
    type: String,
    disabled: Boolean,
  },
  computed: {},
  methods: {
    callback: function(e) {
      this.$emit("click", e);
    },
  },
};
</script>
<style scoped>
button {
  display: flex;
  padding: 10px 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: #019160;
  font-size: 13px;
  font-family: "GoogleSans-Regular";
  cursor: pointer;
}

button:hover {
  cursor: pointer;
}

.btn-icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
}

.btn-text {
  margin-left: 8px;
  text-align: center;
}
</style>
