<template>
  <div id="nav-bar">
    <sui-menu pointing secondary color="blue">
      <sui-menu-menu>
        <router-link
          is="sui-menu-item"
          :content="item.name"
          v-for="item in items"
          :key="item.name"
          :to="item.route"
          :active="isActive(item.name)"
        />
      </sui-menu-menu>
      <sui-menu-menu position="right">
        <a
          is="sui-menu-item"
          icon="bars"
          @click="toggleSidebar"
        />
      </sui-menu-menu>
    </sui-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'Home',
          route: '/',
        }, 
        {
          name: 'Docs',
          route: '/docs',
        },
      ],
    };
  },
  methods: {
    isActive(name) {
      return this.$store.state.activeRoute === name;
    },
    toggleSidebar() {
      this.$nextTick(() => {
        this.$store.dispatch('toggleSidebar');
      })
    },
  },
  watch: {
    '$route.name': function() {
      this.$store.commit('changeRoute', this.$route.name);
    }
  },
}
</script>

<style lang="scss" scoped>
#nav-bar {
  padding: 10px;
}
</style>
