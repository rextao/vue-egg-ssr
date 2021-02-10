<template>
    <div>
        <div @click='handleClick'>{{msg}}</div>
        <button @click="handleClick">阿萨复复阿斯dddddd</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: '宿舍宿舍'
            };
        },
        created(){
            this.msg = 'this is created'
        },
        mounted(){
            this.msg = 'this is mounted'
        },
        methods: {
            handleClick() {
                console.log('nameasasdfafsdaf');
                this.msg += '11111';
            }
        }
    }
</script>
