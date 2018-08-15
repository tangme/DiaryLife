<template>
    <div class="container">
        <ul class="bg-bubbles">
            <li v-for="(item,index) in 10" :key="index"></li>
        </ul>
        <div style="position: absolute;bottom: 0;width:100%;color: #fff;text-align: center;">code by tanglv</div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>
<script>
import Cookies from 'js-cookie';

export default {
    methods: {
        showUserSetting(event) {
            let flag = this.$refs['test'].style.display;
            this.$refs['test'].style.display = (flag == 'block' ? 'none' : 'block');
        },
        loginOut() {
            Cookies.remove('account');
            sessionStorage.clear();
            this.$router.push({
                name: 'login'
            });
        }
    }
}
</script>
<style scoped>
.container {
    width: 100%;
    height: 100%;
    /* background: url('http://thepatternlibrary.com/img/aq.jpg') repeat; */
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    /*opacity: .8;*/
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

.bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, .2);
    bottom: 0;
    -webkit-animation: square 25s infinite;
    animation: square 10s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    opacity: 0;
}

.bg-bubbles li:nth-child(1) {
    left: 10%;
}

.bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 17s;
    animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    -webkit-animation-duration: 22s;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
    left: 70%;
}

.bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
}

.bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 11s;
    animation-delay: 11s;
}

@-webkit-keyframes square {
    0% {
    	opacity: 1;
        -webkit-transform: translateY(0) scale(0.5,0.5);
        transform: translateY(0) scale(0.5,0.5);
    }
    100% {
        -webkit-transform: translateY(-800px) rotate(600deg) scale(1,1);
        transform: translateY(-800px) rotate(600deg) scale(1,1);
    }
}

@keyframes square {
    0% {
    	opacity: .4;
        -webkit-transform: translateY(0) scale(0.5,0.5);
        transform: translateY(0) scale(0.5,0.5);
    }
    50% {
    	opacity: 1;
    }
    100% {
        -webkit-transform: translateY(-800px) rotate(600deg) scale(1,1);
        transform: translateY(-800px) rotate(600deg) scale(1,1);
    }
}
</style>
