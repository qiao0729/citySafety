<template>
<div>
  <h1 class="centerTitle">
          城市公共安全信息监测系统
          <img src="../../assets/img/title_left.png" class="title_left" />
          <img src="../../assets/img/title_right.png" class="title_right" />
        </h1>
        <!-- 时钟 -->
        <span class="time_">{{ dateFormat(date) }}</span>
</div>
</template>

<script>
export default {
  data(){
    return{
      date:new Date()
    }
  },
  mounted(){
     //显示当前日期时间
    this.timer = setInterval(() => {
           this.date = new Date(); // 修改数据date
           }, 1000)
    },
    beforeDestroy() {
       if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
  methods: {
    dateFormat(time) {
          var date=new Date(time);
          var year=date.getFullYear();
          /* 在日期格式中，月份是从0开始的，因此要加0
          * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
          * */
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },
  }
}

</script>
