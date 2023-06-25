<template lang="">
<div class='div__catalog_page'>
    <div class='div__search'>
        <span class='span__search'>
            <v-text-field v-model="this.search" label="Szukaj" variant="outlined" append-inner-icon='mdi-magnify'></v-text-field>
        </span>
    </div>
    <div class='div__catalog'>
        <div class='select__category'>
            <v-select
            v-model="this.house"
            clearable
            label="Domek"
            :items="houseCategories"
            variant="outlined">
            </v-select>
            <v-select
            v-model="this.animal"
            clearable
            label="Zwierzę"
            :items="animalCategories"
            variant="outlined">
            </v-select>
            <v-select
            v-model="this.price"
            clearable
            label="Cena"
            :items="['Rosnąco', 'Malejąco']"
            variant="outlined">
            </v-select>
            <div class='div__price'>
                <v-icon size='x-large' icon='mdi-currency-usd'></v-icon>
                <div class='div__textfields'>
                    <v-text-field
                        v-model="priceMax"
                        label="Max"
                        prepend-icon="mdi-arrow-up-bold-outline"
                        variant="outlined"
                        hide-details
                        ></v-text-field>
                    <v-text-field
                        v-model="priceMin"
                        label="Min"
                        prepend-icon="mdi-arrow-down-bold-outline"
                        variant="outlined"
                        hide-details
                        ></v-text-field>
                </div>
            </div>
            <v-select
            v-model="this.currency"
            clearable
            label="Waluta"
            :items="[...currencyList.map((item) => item.code), 'PLN']"
            variant="outlined">
            </v-select>
            <v-btn
            :disabled="loading"
            :loading="loading"
            block
            class="text-none mb-4"
            color="indigo-darken-1"
            size="x-large"
            variant="flat"
            @click="sortValues"
            >
            Check
        </v-btn>
        </div>
        <div class='div__products'>
            <Product v-for="product in productsFiltered" 
                    :key="product.id" 
                    :id="product.id" 
                    :type="product.type" 
                    :animal="product.animal" 
                    :price="+product.price" 
                    :deleteFun="deleteProduct"
                    :currency="currencyView"/>
            <ProductForm 
                    :products="products" 
                    :addFun="addProduct"
                    :houseCategories="houseCategories"
                    :animalCategories="animalCategories"/>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Product from '../components/Product.vue'
import ProductForm from '../components/ProductForm.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components: {
        Product,
        ProductForm,
    },
    data() {
        return {
            loading: false,
            products: [],
            productsFiltered: [],
            houseCategories: [],
            animalCategories: [],
            currencyList: [],
            house: '',
            animal: '',
            price: '',
            priceMax:0,
            priceMin:0,
            search: '',
            currency: 'PLN',
            currencyView: 'PLN',
        }
    },
    mounted() {
        this.getProducts()
        this.getCurrencyRates()
    },
    methods: {
        async getProducts() {
            axios.get('http://localhost:3000/products').then(res => {
                this.products = res.data
                this.productsFiltered = res.data
                this.getAllCategories()
            })
        },
        async deleteProduct(id: number) {
            Swal.fire({
                icon:'question',
                title: 'Do you want to delete this product?',
                showCancelButton: true,
                denyButtonText: `Delete`,
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3000/products/${id}`).then(res => {
                        console.log(res.data)
                        this.getProducts()
                    })
                    Swal.fire('Product is deleted', '', 'success')
                }
                })
        },
        async addProduct(type: string, animal: string, price: number) {
            Swal.fire({
                icon:'question',
                title: 'Do you want to add this product?',
                showCancelButton: true,
                confirmButtonText: 'Add',
                }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('http://localhost:3000/products', {
                        type: type,
                        animal: animal,
                        price: price
                    },{
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        console.log(res.data)
                        this.getProducts()
                    })
                    Swal.fire('Product is added', '', 'success')
                }
            })
        },
        getCurrencyRates() {
            axios.get('http://api.nbp.pl/api/exchangerates/tables/a/?format=json').then(res => {
                this.currencyList = res.data[0].rates
            })
        },
        sortValues() {
            this.loading = !this.loading

            let sortedProducts = this.products

            if(this.house !== '' && this.house){
                sortedProducts = sortedProducts.filter(product => product['type'] === this.house)
            }
            if(this.animal !== '' && this.animal){
                sortedProducts = sortedProducts.filter(product => product['animal'] === this.animal)
            }
            sortedProducts = sortedProducts.filter(product => product['price'] >= this.priceMin && product['price'] <= this.priceMax)
            if(this.price !== '' && this.price){
                if(this.price === 'Rosnąco'){
                    sortedProducts = sortedProducts.sort((a, b) => a['price'] - b['price'])
                }else{
                    sortedProducts = sortedProducts.sort((a, b) => b['price'] - a['price'])
                }
            }

            if(this.currency !== '' && this.currency !== 'PLN' && this.currency){
                let currencyRate = this.currencyList.find(item => item['code'] === this.currency)
                this.currencyView = this.currency
                sortedProducts = sortedProducts.map(product => {
                    return {
                        ...product,
                        price: Math.round(product['price'] / currencyRate.mid * 100) / 100
                    }
                })
            }

            this.productsFiltered = sortedProducts

            this.loading = !this.loading
        },

        getAllCategories() {
            this.houseCategories = this.products.reduce((acc, product) => {
                if (!acc.includes(product['type'])) {
                    acc.push(product['type']);
                }
                return acc;
                }, [])
            this.animalCategories = this.products.reduce((acc, product) => {
                if (!acc.includes(product['animal'])) {
                    acc.push(product['animal']);
                }
                return acc;
            }, [])
            this.priceMax = this.products.reduce((acc, product) => {
                if (acc < product['price']) {
                    acc = product['price'];
                }
                return acc;
            }, 0)
      },

      searchFun(val: string) {
        let sortedProducts = this.products

        if(val || val !== '') {
            this.productsFiltered = sortedProducts.reduce((acc, product) => {
                if (product['type'].includes(val) || product['animal'].includes(val) || product['price'].toString().includes(val)) {
                    acc.push(product)
                }
                return acc
            }, [])
        }else{
            this.productsFiltered = sortedProducts
        }    
      }
  },
  watch: {
    search(newVal) {
        this.searchFun(newVal)
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