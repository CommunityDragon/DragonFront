<template>
  <sui-modal v-model="toggled">
    <sui-modal-content image>
      <sui-modal-description style="width: 100%">
        <url-nav v-model="baseURL" :endpoint="endpoint"/>
        <div class="input-group">
          <url-input 
            :key="key"
            :object="key"
            class="input"
            :innitial="values[key]" 
            v-on:change="updateParam"
            :placeholder="capitalize(key)" 
            v-for="(value, key) in values"
          />
          <sui-button class="input mini" @click="loadURL" secondary>Load</sui-button>
        </div>
        <div 
          :class="{ 
            'img-container': contentType === 'image/png' || contentType === 'image/jpeg',
            'json-container': contentType.startsWith('application/json'),
          }"
          class="content-container">
          <h1 
            v-if="loadError"
            style="color: rgba(0,0,0,.35)">
            File not found...
          </h1>
          <h1 
            v-else-if="!endURL"
            style="color: rgba(0,0,0,.35)">
            Enter parameters and<br/>load the file
          </h1>
          <vue-json-pretty
            :path="'res'"
            :data="data"
            v-else-if="contentType.startsWith('application/json')">
          </vue-json-pretty>
          <img 
            v-else 
            :src="endURL">
        </div>
      </sui-modal-description>
    </sui-modal-content>
  </sui-modal>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import UrlInput from './urlinput';
import UrlNav from '../urlnav';
import Axios from 'axios';

export default {
  data() {
    return {
      endURL: '',
      baseURL: '',
      data: null,
      contentType: 'test',
      loadError: false,
      parameters: [],
      values: {},
      toggled: false,
    }
  },
  props: ['value', 'endpoint'],
  components: {
    VueJsonPretty,
    UrlInput,
    UrlNav
  },
  watch: {
    baseURL() {
      this.parameters = this.baseURL.split('/')
      .filter(param => param.startsWith(':'))
      .map(param => param.substr(1));

      this.values = {};
      this.parameters.forEach(param => {
        this.values[param] = '';
      });
    },
    value() {
      this.toggled = this.value;
    },
    toggled(newToggled, oldToggled) {
      if (!newToggled && oldToggled) this.close();
    },
  },
  methods: {
    async loadURL() {
      let url = this.baseURL;

      Object.keys(this.values).forEach((key) => {
        url = url.replace(`:${key}`, this.values[key]);
      });

      try {
        const req = await Axios.get(url);
        this.loadError = false;
        this.contentType = req.headers['content-type'];
        if (this.contentType.startsWith('application/json')) this.data = req.data
        this.endURL = url;
      } catch (e) {
        this.loadError = true;
        this.contentType = '';
        this.endURL = '';
      }
    },
    updateParam(value, key) {
      this.values[key] = value;
    },
    close() {
      this.$emit('input', false)
    },
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    paramValue(param) {
      return this.values[param]
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  margin-top: 10px;

  .input {
    margin-right: 10px;
  }
}

.content-container.json-container {
  overflow: scroll;
  text-align: left;
  display: block;
}

.content-container {
  width: 100%;
  height: 450px;
  margin-top: 25px;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1e1e1;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

</style>
