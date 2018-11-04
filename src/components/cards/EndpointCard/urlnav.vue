<template>
  <div>
    <h5 class="header">{{ endpointSelected }}</h5>
    <a @click="dec" is="sui-label" v-if="endpoint.routes.length !== 1" basic circular>
      <sui-icon style="margin-right: 0" name="chevron left"/>
    </a>
    <sui-label basic circular>
      <sui-icon name="linkify"/>
      {{ endpoint.routes.length === 1 ? endpoint.route : endpoint.routes[endpointPosition] }}
    </sui-label>
    <a @click="inc" is="sui-label" v-if="endpoint.routes.length !== 1" basic circular>
      <sui-icon style="margin-right: 0" name="chevron right"/>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endpointPosition: 0,
    };
  },
  props: ['endpoint'],
  computed: {
    endpointSelected() {
      return `Endpoint ${this.endpoint.routes.length !== 1  
        ? `(${this.endpointPosition + 1} out of ${this.endpoint.routes.length})` 
        : ''}`;
    },
  },
  watch: {
    endpointPosition: {
      handler() {
        this.$emit('input', this.endpoint.routes[this.endpointPosition]);
      },
      immediate: true,
    }
  },
  methods: {
    inc() {
      if (this.endpoint.routes.length - 1 > this.endpointPosition)
        this.endpointPosition++;
      else this.endpointPosition = 0;
    },
    dec() {
      if (this.endpointPosition > 0)
        this.endpointPosition--;
      else this.endpointPosition = this.endpoint.routes.length - 1;
    },
  },
};
</script>

<style scoped>
.header {
  margin: 3px 0 5px 3px;
}
</style>
