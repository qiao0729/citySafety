<template>
  <div id="warning">
    <meta charset="UTF-8">
    <title>预警信息</title>
    <!--顶部-->
    <header class="header left">
      <div class="left nav">
        <ul>
          <li >
            <i class="nav_1"></i>
            <router-link class="dhTitle" :to="{ name: 'urbanPublicSafety'}">信息总览</router-link>
          </li>
          <li>
            <i class="nav_2"></i>
             <router-link class="dhTitle" :to="{ name: 'Nature'}">自然灾害</router-link>
          </li>
          <li>
            <i class="nav_3"></i>
            <router-link class="dhTitle" :to="{ name: 'Accident'}">事故灾难</router-link>
          </li>
        </ul>
      </div>
      <div class="header_center left">
         <span class='centerTitle'>
          城市公共安全信息监测系统
        </span> 
      </div>
      <div class="right nav text_right">
        <ul>
          <li>
            <i class="nav_7"></i>
            <router-link class="dhTitle" :to="{ name: 'Health'}">公共安全</router-link>
          </li>
          <li>
            <i class="nav_8"></i>
             <router-link class="dhTitle" :to="{ name: 'Social'}">社会安全</router-link>
          </li>
          <li  class="nav_active">
            <i class="nav_4"></i>
           <router-link class="dhTitle" :to="{ name: 'Warning'}">预警信息</router-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="clear"></div>
<!--内容部分-->
<div class="con1 left" id="car_control">

    <div class="left_table  left bow_shadow">


        <p class="set_list"><i class="list_i"></i> 设备列表：</p>
        <ul id="treeDemo" class="ztree"></ul>
    </div>
    <div class="right  right_table">
        <div class="table_find">
            <p><label>名称：</label><input type="text" placeholder="请输入名称"><label>编号：</label><input type="text" placeholder="请输入编号">
                <label>选择类型：</label><select><option>xxxxxx</option></select><label>关键字：</label><input type="text" placeholder="请输入关键字"></p>
            <p><label>出生日期：</label><input type="date"><label>编号：</label><input type="text" placeholder="请输入编号">
                <label>品牌：</label><select><option>xxxxxx</option></select><label>关键字：</label><input type="text" placeholder="请输入关键字"></p>
            <p><label>选择方式：</label><input type="checkbox"><span>方式一</span><input type="checkbox"><span>方式一</span><input type="checkbox"><span>方式一</span><input type="checkbox"><span>方式一</span><input type="checkbox"><span>方式一</span><button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-search"></span>查询</button><span class="more_find right" onclick="openList()" id="open">高级查询>></span></p>

            <div class="find_expend">
                <p><label>名称：</label><input type="text" placeholder="请输入名称"><label>编号：</label><input type="text" placeholder="请输入编号">
                    <label>选择类型：</label><select><option>xxxxxx</option></select><label>关键字：</label><input type="text" placeholder="请输入关键字"></p>
                <p><label>出生日期：</label><input type="date"><label>编号：</label><input type="text" placeholder="请输入编号">
                    <label>品牌：</label><select><option>xxxxxx</option></select><label>关键字：</label><input type="text" placeholder="请输入关键字">
                    <span class="more_find right" onclick="closeList()">收起>></span></p>
            </div>
        </div>
        <div class="table_div">
            <p class="table_but"><a href="javascript:void(0)" onclick="add()"><i class="glyphicon glyphicon-plus"></i>新增</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-remove"></i> 删除</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-print"></i>打印</a><a href="javascript:void(0)"><i class="glyphicon glyphicon-export"></i>导出</a> </p>
            <p>
            <table id="table" class="table_style" border="0"></table>
            </p>
        </div>
    </div>
</div>
  </div>
</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
import "../../assets/js/urbanPublicSafety/echarts-4.2.1.min.js";
import "../../assets/js/urbanPublicSafety/base.js";
export default {

}
</script>

<style scope>
.centerTitle{
  font-size:3.6rem;
  margin:0 auto;
}
.dhTitle{
  font-size:1.5rem;
}
</style>