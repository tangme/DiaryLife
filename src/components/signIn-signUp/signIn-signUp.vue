<style lang="scss" scoped>
@import './signIn-signUp.less';
</style>
<template>
    <div class="container">
        <ul class="bg-bubbles">
            <li v-for="(item,index) in 10" :key="index"></li>
        </ul>
        <div class="footer">Code By TangLv</div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
export default {}
</script>
