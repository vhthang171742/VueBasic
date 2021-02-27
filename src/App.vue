<template>
  <div id="app">
    <Header />
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: { Header, Sidebar }
};
</script>

<style lang="scss"></style>
