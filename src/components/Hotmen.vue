<template>
    <div>
        123
    </div>
</template>

<script>
export default {
    data(){
        return{
            Hotname:[]
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.$http.get("/search/hot").then(data=>{
                console.log(data)
                // vm.recommendMusicList=data.data.result;
            })  
        })
    }
}
</script>