<template>
  <sui-container class="docs-container">
    <sui-grid>
      <sui-grid-row stretched>
        <sui-grid-column :width="4">
            <sui-menu fluid vertical tabular>
              <sui-menu-item style="padding-left: 0">
                <sui-input v-model="filter" placeholder="Search..." icon="search"/>
              </sui-menu-item>
              <a
                v-for="category in categories"
                :key="category"
                is="sui-menu-item"
                :content="category"
                :active="isActive(category)"
                @click="select(category)"
              />
            </sui-menu>
          </sui-grid-column>
        <sui-grid-column :width="12">
          <sui-item-group>
            <sui-item v-for="(endpoint, i) in endpoints" :key="i">
              <endpoint-card :endpoint="endpoint"/>
            </sui-item>
          </sui-item-group>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>
  </sui-container>
</template>

<script>
import { mapGetters } from 'vuex';
import { EndpointCard } from '@/components/cards';

export default {
  data() {
    return {
      active: 'All',
      filter: '',
    };
  },
  components: {
    EndpointCard,
  },
  computed: {
    categories() {
      return ['All'].concat(this.$store.getters.endpointCategories);
    },
    endpoints() {
      let endpoints = [];
      const data = this.$store.getters
        .endpointsByCategory(this.active)
        .map(endpoint => { endpoint.routes = [endpoint.route]; return endpoint; });

      data.forEach(item => {
        const existingEndpoint = endpoints.find(({ name, category }) =>
          name === item.name && category === item.category);

        if (existingEndpoint) existingEndpoint.routes.push(item.route);
        else endpoints.push(item);
      });

      if (this.filter) endpoints = endpoints.filter(
        ({ name }) => name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()),
      );

      return endpoints.sort((a, b) =>
        (a.category > b.category)
          ? 1
          : ((b.category > a.category)
          ? -1
          : 0
        ),
      );
    },
  },
  methods: {
    isActive(name) {
      return this.active === name;
    },
    select(name) {
      this.active = name;
    },
  },
};
</script>

<style>
.docs-container {
  margin: 40px auto;
}

</style>