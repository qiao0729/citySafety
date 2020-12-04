<template>
  <div id="warning">
    <meta charset="UTF-8">
    <title>预警信息</title>
    <!--顶部-->
      <header class="header left">
      <div class="left nav left-box">
            <el-dropdown hide-on-click>
              <div class="menu_title">
              <i class="el-icon-s-unfold"></i>
           <span class="el-dropdown-link">预警信息<i class="el-icon-arrow-down el-icon--right"></i></span>
           </div>
           <el-dropdown-menu slot="dropdown" class="dropdown" >
			 <dropMenu></dropMenu>
            </el-dropdown-menu>
         </el-dropdown>
         
      </div>
      <div class="header_center left">
        <timeRecord></timeRecord>
      </div>
      <!-- 头部右侧区域 -->
      <div class="right nav text_right" >
               <el-dropdown size="mini" hide-on-click placement="bottom-start" >
              <titleRight></titleRight>
         </el-dropdown>
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
import dropMenu from "../publicComponents/dropMenu";
import titleRight from "../publicComponents/titleRight";
import timeRecord from "../publicComponents/timeRecord";
export default {
  components: {
    dropMenu,
    titleRight,
    timeRecord,
  },
  data() {
    return {};
  },
};
</script>

<style scope>
.centerTitle {
  font-size: 3.6rem;
  margin: 0 auto;
}
.left-box {
  width: 25%;
  height: 80px;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 0.104167rem;
  margin: 0 auto;
}

.el-dropdown-link {
  cursor: pointer;
  color: #c0c4cc;
}
.el-dropdown-left {
  margin-right: 35px;
  margin-top: 30px;
}
.centerTitle {
  font-size: 2rem !important;
  margin: 0 auto;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: 700;
  color: #666;
  letter-spacing: 2px;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#fff),
    to(#4589ff)
  );
  background: linear-gradient(180deg, #fff, #4589ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.dhTitle {
  font-size: 1rem;
  padding: 0.6rem;
  color: #c0c4cc;
}

.dhTitle a {
  color: #c0c4cc !important;
}
.menu_title {
  /* margin: 0 auto; */
  /* margin-top:22px; */
  margin-left: 20px;
  vertical-align: middle;
  line-height: 0.166667rem !important;
  /* color:  #034c6a ; */
  font-size: 22px;
  border: 1px solid #2977ff;
}
.dropdown {
  background-color: rgb(3, 8, 41);
  /* opacity: 0.9; */
  border: 1px solid #2977ff;
  width: 135px;
  text-align: center;
}
.dropdown1 {
  background-color: rgb(3, 8, 41);
  /* opacity: 0.9; */
  border: 1px solid #2977ff;
  width: 95px;
  text-align: center;
}
li:hover {
  background-color: #0f2967;
  color: #fff;
}
.time_ {
  position: absolute;
  margin-top: 4px;
  margin-left: -70px;
}
</style>