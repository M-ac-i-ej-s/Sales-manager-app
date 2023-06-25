<template>
    <div class="div__nav">
      <div class='div__icons decoy'>
        <v-icon class='icon' icon='mdi-facebook'></v-icon>
        <v-icon class='icon' icon='mdi-twitter'></v-icon>
      </div>
      <div class='div__links'>
        <span>
          <router-link 
              @click.capture="onClickedHome" 
              class='link home' 
              :style="{'color': clicked === '/' ? '#8484d8' : '#c7c7c7'}" 
              to="/">
              Home
          </router-link> 
        </span>
        <span>
          <router-link 
              @click="onClickedAbout" 
              class='link' 
              :style="{'color': clicked === '/about' ? '#8484d8' : '#c7c7c7'}" 
              to="/about">
              About
          </router-link>
        </span>
        <span>
          <router-link 
              @click="onClickedCatalog" 
              class='link' 
              :style="{'color': clicked === '/catalog' ? '#8484d8' : '#c7c7c7'}" 
              to="/catalog">
              Catalog
          </router-link> 
        </span>
      </div>
      <div class='div__icons'>
        <v-icon class='icon' icon='mdi-facebook'></v-icon>
        <v-icon class='icon' icon='mdi-twitter'></v-icon>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
             clicked:'/' 
        }
    },
    methods: {
      onClickedHome() {
          this.clicked = '/'
      },
      onClickedAbout() {
          this.clicked = '/about'
      },
      onClickedCatalog() {
          this.clicked = '/catalog'
      },
      getPage() {
          const currentUrl = window.location.pathname;
          this.clicked = currentUrl;
      }
    },
    mounted() {
        this.getPage()
    }

}
</script>

<style scoped lang='scss'>
.div__nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .div__links {
    display: flex;
    align-items:baseline;
    .link {
    text-decoration: none;
    color: rgb(199, 199, 199);
    font-size: 40px;
    padding: 0 20px 0 20px;
    transition: 0.2s ease-in-out;
    &.home {
      font-size: 60px;
    }
    &:hover {
      color: rgb(132, 132, 216);
    }
    &.home:hover {
      color: rgb(94, 94, 201);
    }
  }
  }
  .div__icons {
    display: flex;
    align-items: center;
    &.decoy {
      visibility: hidden;
    }
    .icon {
      font-size: 40px;
      margin: 0 5px 0 5px;
      transition: 0.2s ease-in-out;
      color: rgb(199, 199, 199);
      cursor: pointer;
      &:hover {
        color: rgb(132, 132, 216);
        scale: 1.2;
      }
    }
  }
}
</style>
