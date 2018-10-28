<template>
  <sui-container class="home-container">
    <sui-header 
      icon
      size="huge" 
      text-align="center">
      <img class="cdragon-logo" alt="CommunityDragon logo" src="../assets/logo.png">
      <h1>A community made to manage a custom<br>API that serves static data</h1>
    </sui-header>
  </sui-container>
</template>

<style lang="scss" scoped>
.home-container {
  margin-top: 50px;
}

.cdragon-logo {
  width: 10em !important; 
  height: auto !important;
}

@media (min-width: 768px) { 
  .cdragon-logo {
    width: 16em !important; 
    height: auto !important;
  }
}
</style>

