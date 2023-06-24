<template lang="">
<div class='div__catalog_page'>
    <div class='div__search'>
        <span class='span__search'>
            <v-text-field label="Szukaj" variant="outlined" append-inner-icon='mdi-magnify'></v-text-field>
        </span>
    </div>
    <div class='div__catalog'>
        <div class='select__category'>
            <v-select
            clearable
            chips
            label="Domek"
            :items="['Domek na drzewie', 'Domek na ziemi']"
            multiple
            variant="outlined">
            </v-select>
            <v-select
            clearable
            chips
            label="Zwierzę"
            :items="['Wiewiórka', 'Pies']"
            multiple
            variant="outlined">
            </v-select>
            <v-select
            clearable
            chips
            label="Cena"
            :items="['Rosnąco', 'Malejąco']"
            multiple
            variant="outlined">
            </v-select>
            <div class='div__price'>
                <v-icon size='x-large' icon='mdi-currency-usd'></v-icon>
                <div class='div__textfields'>
                    <v-text-field
                        label="Max"
                        prepend-icon="mdi-arrow-up-bold-outline"
                        variant="outlined"
                        hide-details
                        ></v-text-field>
                    <v-text-field
                        label="Min"
                        prepend-icon="mdi-arrow-down-bold-outline"
                        variant="outlined"
                        hide-details
                        ></v-text-field>
                </div>
            </div>
            <v-btn
            :disabled="loading"
            :loading="loading"
            block
            class="text-none mb-4"
            color="indigo-darken-1"
            size="x-large"
            variant="flat"
            @click="loading = !loading"
            >
            Check
        </v-btn>
        </div>
        <div class='div__products'>
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <ProductForm/>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Product from '../components/Product.vue'
import ProductForm from '../components/ProductForm.vue'

export default {
    components: {
        Product,
        ProductForm
    },
    data() {
        return {
            loading: false
        }
    }
  }
</script>

<style scoped lang="scss">
.div__catalog_page {
    margin-top: 70px;
    .div__search {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
        .span__search {
            width: 80vh;
        }
    }
    .div__catalog {
        display: flex;
        justify-content: center;
        gap: 50px;
        .select__category {
            width: 250px;
            .div__price {
                display: flex;
                align-items: center;
                margin-bottom:20px;
                .div__textfields {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap:20px;
                }
            }
        }
        .div__products {
        display: grid;
        grid-template-columns: repeat(3, 350px);
        grid-auto-rows: 180px;
        align-items: center;
        grid-gap: 20px;
        justify-content: center;
            .div__button {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>