<template>
    <div>
        <p class="p1">{{msg}}</p>
        <router-view></router-view>
        <router-view name="a"></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: "test"
        }
    }
}
</script>
<style lang="sass">
@import './sass/reset';
@import './sass/base';
.p1
    color: blue
</style>
