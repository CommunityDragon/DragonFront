<template>
  <sui-sidebar 
    direction="right"
    class="inverted vertical menu"
    animation="push"
    :visible="showSidebar">
    <router-link
      is="sui-menu-item"
      :content="item.name"
      v-for="item in items"
      :key="item.name"
      :to="item.route"
      @click.native="select"
    />
  </sui-sidebar>
</template>

<script>
export default {
  data() {
    return {
      active: 'Home',
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
  computed: {
    showSidebar() {
      return this.$store.state.showSidebar;
    },
  },
  methods: {
    select() {
      this.$store.dispatch('toggleSidebar');
    },
  },
}
</script>

<style>

</style>
