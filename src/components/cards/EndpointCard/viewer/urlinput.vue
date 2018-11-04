<template>
  <sui-input 
    class="mini"
    :placeholder="placeholder" 
    v-model="value"
  />
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  props: ['object', 'innitial', 'placeholder'],
  watch: {
    value() {
      this.emitChange();
    },
    innitial: {
      handler() {
        this.value = this.innitial;
      },
      immediate: true
    }
  },
  methods: {
    emitChange() {
      this.$emit('change', this.value, this.object);
    }
  },
}
</script>

<style>

</style>
