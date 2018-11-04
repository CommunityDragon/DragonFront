<template>
  <div class="endpoint-card">
    <sui-card class="fluid">
      <sui-card-content>
        <sui-card-header>{{ endpoint.name }}</sui-card-header>
        <sui-card-meta>{{ endpoint.category }}</sui-card-meta>
        <sui-card-description>
          <url-nav class="url-nav" :endpoint="endpoint"/>
        </sui-card-description>
      </sui-card-content>
      <sui-card-content class="viewer-button" extra>
        <a @click="open">
          <sui-icon name="clone"/> Viewer
        </a>
      </sui-card-content>
    </sui-card>
    <viewer :endpoint="endpoint" v-model="toggled"/>
  </div>
</template>

<script>
import UrlNav from './urlnav';
import Viewer from './viewer';

export default {
  data() {
    return {
      toggled: false,
    };
  },
  props: ['endpoint'],
  components: {
    UrlNav,
    Viewer,
  },
  watch: {
    toggled() {
      this.$store.commit('toggleModal', this.toggled);
    },
  },
  methods: {
    open() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style scoped>
.url-nav {
  margin-top: 20px;
}

.endpoint-card {
  width: 100%;
}

.viewer-button {
  text-align: center;
  padding: 10px !important;
}
</style>
