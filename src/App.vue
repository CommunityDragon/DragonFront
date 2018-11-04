<template>
  <div id="app">
    <sui-sidebar-pushable 
      :class="{ 
        'pushable-show-modal': showModal 
      }">
      <side-bar/>
      <sui-sidebar-pusher 
        @click="toggleSidebar" 
        :dimmed="showSidebar"
        :class="{ 
          'pusher-show-modal': showModal 
        }">
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
    showModal() {
      return this.$store.state.modalShown;
    },
  },
  methods: {
    toggleSidebar() {
      if (this.showSidebar) {
        this.$store.dispatch('toggleSidebar');
      }
    },
  },
  created() {
    this.$store.dispatch('loadEndpoints');
  },
};
</script>

<style>
#app {
  height: 100%;
}

.pushable-show-modal {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: absolute;
}

.pusher-show-modal {
  height: 100vh;
}
</style>
