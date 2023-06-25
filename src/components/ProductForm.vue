<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="512">
      <template v-slot:activator="{ props }">
        <v-btn size='x-large' icon="mdi-plus" color='indigo-darken-1' v-bind="props"></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div v-if="this.switch">
                  <v-select
                  clearable
                  label="Domek"
                  :items="this.houseCategories"
                  v-model="this.house"
                  variant="outlined">
                  </v-select>
                  <span @click="this.switch = !this.switch" class="span__change">enter manually</span>
                </div>
                <div v-else>
                  <v-text-field v-model="this.house" label="Domek" variant="outlined" append-inner-icon="mdi-home-outline"></v-text-field>
                  <span @click="this.switch = !this.switch" class="span__change">enter with select</span>
                </div>
              </v-col>
              <v-col cols="12">
                <div v-if="this.switch2">
                  <v-select
                  clearable
                  label="Zwierzę"
                  :items="this.animalCategories"
                  v-model="this.animal"
                  variant="outlined">
                  </v-select>
                  <span @click="this.switch2 = !this.switch2" class="span__change">enter manually</span>
                </div>
                <div v-else>
                  <v-text-field v-model="this.animal" label="Zwierzę" variant="outlined" append-inner-icon="mdi-pig-variant-outline"></v-text-field>
                  <span @click="this.switch2 = !this.switch2" class="span__change">enter with select</span>
                </div>
              </v-col>
             <v-col cols="12">
                <v-text-field v-model="this.price" label="Price" variant="outlined" append-inner-icon="mdi-currency-usd" type="number"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-4">
              <v-btn 
              block
              class="mb-4 mr-4"
              color="blue-grey-lighten-5"
              variant="flat"  @click="dialog = false">
              Close
              </v-btn>
          </div>
          <div>
              <v-btn 
              block
              class="mb-4 mr-4 pr-4 pl-4"
              color="indigo-darken-1"
              variant="flat" 
              @click="addNewProduct">
              Save
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      products: Array,
      addFun: Function,
      houseCategories: Array,
      animalCategories: Array,
    },
    data() {
      return {
        dialog: false,
        switch: true,
        switch2: true,
        house: '',
        animal: '',
        price: 0,
      }
    },
    methods: {
      addNewProduct() {
        this.dialog = false;
        this.addFun(this.house, this.animal, +this.price)
      }
    },
  }
</script>

<style lang="scss">
.span__change {
  color:blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>