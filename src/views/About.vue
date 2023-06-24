<template lang="">
    <div class='div__about'>
        <span class='span__header'>
            Sales Manager App
        </span>
        <span class='span__description'>
            With this app u can control what u have in your store, in 
            our case <b> Houses for animals </b>. You can sort, filter, 
            and search for all types of houses. You can also add new house 
            with category, animal and price of your choice. Every new cataegory will be
            added to the the sort and filter options. You can also delete any house u want.
        </span>
        <span class='span__signature'>
            Page created by <span class='name'> Maciej Słupianek </span>
        </span>
    </div>
</template>

<style scoped lang="scss">
.div__about {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15vh;
    .span__header {
        font-size: 60px;
        font-weight: 600;
        margin-bottom: 20px;
        color: rgb(132, 132, 216);
    }
    .span__description {
        font-size: 30px;
        font-weight: 400;
        margin-bottom: 20px;
        text-align: center;
        width: 600px;
    }
    .span__signature {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
        .name {
            font-weight: 600;
            color: rgb(132, 132, 216);
        }
    }
}
</style>