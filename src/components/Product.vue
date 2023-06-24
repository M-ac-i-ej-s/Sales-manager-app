<template lang="">
    <div class='div__product'>
        <div class='div__sections'>
            <div class='div__section'>
                <v-icon color='#8484d8' size='large' class='icon' icon='mdi-home-outline'></v-icon>
                <span class='span__data'>: Domek na drzewie</span>
            </div>
            <div class='div__section'>
                <v-icon color='#8484d8' size='large' class='icon' icon='mdi-pig-variant-outline' ></v-icon>
                <span class='span__data'>: Wiewiórka</span>
            </div>
            <div class='div__section'>
                <v-icon color='#8484d8' size='large' class='icon' icon='mdi-currency-usd'></v-icon>
                <span class='span__data'>: 340 PLN</span>
            </div>
        </div>
        <v-btn color="red" size='x-large' density="compact" icon='mdi-delete'></v-btn>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="scss">
.div__product {
    padding: 20px;
    border: 2px solid rgb(240, 238, 238);
    border-radius: 10px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .div__sections {
        .div__section {
            display: flex;
            align-items: center;
            margin: 5px 0 5px 0;
            .span__data {
                font-size: 20px;
        }
        }
    }
}    
</style>