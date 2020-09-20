<template>
  <div id="health">
    <meta charset="UTF-8">
    <title>公共卫生安全</title>
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
          <li class="nav_active">
            <i class="nav_7"></i>
            <router-link class="dhTitle" :to="{ name: 'Health'}">公共安全</router-link>
          </li>
          <li>
            <i class="nav_8"></i>
             <router-link class="dhTitle" :to="{ name: 'Social'}">社会安全</router-link>
          </li>
          <li>
            <i class="nav_4"></i>
           <router-link class="dhTitle" :to="{ name: 'Warning'}">预警信息</router-link>
          </li>
        </ul>
      </div>
    </header>
    <!--内容部分-->
<div class="con left">
    <!--选择时间-->
    <div class="static_top left">
        <i></i><span>统计概况</span>
    </div>
    <!--数据总概-->
    <div class="stiatic_top_con left">

<table>
    <tr>
        <td class="labe_td">总概：</td>
        <td colspan="3" class="sky">拥有车辆数123456台，车辆整体情况比较良好，但违法纪律数也很多，应该着重改善驾驶人员交通法律法规教育！</td>
    </tr>
    <tr>
        <td class="labe_td">新进车辆：</td>
        <td>33987台</td>
        <td class="labe_td">违法车辆：</td>
        <td class="org">33987台</td>
    </tr>
    <tr>
        <td class="labe_td">报废车辆：</td>
        <td class="red">33987台</td>
        <td class="labe_td">报废车辆：</td>
        <td>33987台</td>
    </tr>
</table>

    </div>
    <!--统计分析图-->
    <div class="static_top left">
        <i></i><span>统计分析一</span>
    </div>
    <div class="div_any">
        <div class="left div_any03">
            <div class="div_any_child01 left">
                <div class="div_any_title"><img src="img/title_1.png">车辆类型统计 </div>
                <p id="char1" class="p_chart"></p>
                <div class="char_table"><div class="table_p table_p01">
                    <table>
                        <thead><tr>
                            <th>排名</th>
                            <th>车牌号</th>
                            <th>里程数（km）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        </tbody>
                    </table>
                </div></div>

            </div>
            <div class="div_any_child01 left">
                <div class="div_any_title"><img src="img/title_2.png">车辆状态统计 </div>
                <p id="char2" class="p_chart"></p>
                <div class="char_table"><div class="table_p table_p01">
                    <table>
                        <thead><tr>
                            <th>排名</th>
                            <th>车牌号</th>
                            <th>里程数（km）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        </tbody>
                    </table>
                </div></div>
            </div>
        </div>

        <div class="static_top left">
            <i></i><span>统计分析一</span>
        </div>
        <div class="right div_any03">
            <div class="div_any_child01 left">
                <div class="div_any_title"><img src="img/title_4.png">车辆行驶统计 </div>
                <p id="char3" class="p_chart"></p>
                <div class="char_table"><div class="table_p table_p01">
                    <table>
                        <thead><tr>
                            <th>排名</th>
                            <th>车牌号</th>
                            <th>里程数（km）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        </tbody>
                    </table>
                </div></div>
            </div>
            <div class="div_any_child01 left">
                <div class="div_any_title"><img src="img/title_5.png">车辆报警统计 </div>
                <p id="char4" class="p_chart"></p>
                <div class="char_table"><div class="table_p table_p01">
                    <table>
                        <thead><tr>
                            <th>排名</th>
                            <th>车牌号</th>
                            <th>里程数（km）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        </tbody>
                    </table>
                </div></div>
            </div>
        </div>
        <div class="static_top left">
            <i></i><span>统计分析一</span>
        </div>

        <div class="right div_any03">

            <div class="div_any_child01 left div_any_child01_wh">
                <div class="div_any_title"><img src="img/title_5.png">车辆报警统计 </div>
                <p id="char5" class="p_chart"></p>
                <div class="char_table"><div class="table_p table_p01">
                    <table>
                        <thead><tr>
                            <th>排名</th>
                            <th>车牌号</th>
                            <th>里程数（km）</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        <tr><td>1</td><td>京A12345</td><td>134.2</td></tr>
                        </tbody>
                    </table>
                </div></div>
            </div>
        </div>
    </div>


</div>
  </div>
</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
import "../../assets/js/urbanPublicSafety/echarts-4.2.1.min.js";
import "../../assets/js/urbanPublicSafety/base.js";
import "../../assets/js/urbanPublicSafety/static.js";
export default {

}
</script>

<style scope>
  /* 引入外部css样式 */
  @import "../../assets/css/urbanPublicSafety/base.css";
  @import "../../assets/css/urbanPublicSafety/zTreeStyle/zTreeStyle.css";
  .centerTitle{
  font-size:3.6rem;
  margin:0 auto;
}
.dhTitle{
  font-size:1.5rem;
}
</style>