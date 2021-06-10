<template>
    <nav>
        <ul>
            <li>
                <router-link to="/list" exact>Search Result</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'header',
};
</script>

<style>
ul{
    text-align: center;
    margin:0;
}
li{
    display: inline-block;
    margin: 0 5px;
}
a{
    color:white;
    border-radius: 8px;
    padding: 12px;
}
nav{
    color:white;
    background: black;
    padding: 30px 0;
}
.router-link-active{
    background:grey;
    color:white;
}

</style>
