<template>
  <div id="app">
    <sui-sidebar-pushable>
      <side-bar/>
      <sui-sidebar-pusher @click="toggleSidebar" :dimmed="showSidebar">
        <nav-bar/>
        <router-view/>
      </sui-sidebar-pusher>
    </sui-sidebar-pushable>
  </div>
</template>

<script>
import { NavBar, SideBar } from './components/common';

export default {
  components: {
    NavBar,
    SideBar,
  },
  computed: {
    showSidebar() {
      return this.$store.state.showSidebar;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.showSidebar) {
        this.$store.dispatch('toggleSidebar');
      }
    },
  },
};
</script>

<style>
#app {
  height: 100%;
}
</style>
