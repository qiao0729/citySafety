<template>
  <div id="social">
    <meta charset="UTF-8">
    <title>社会安全</title>
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
          <li class="nav_active">
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
    <section class="sm_section left" style="width: 100%;">
    <form>
        <fieldset class="message_fieldset">
            <legend>基本信息</legend>
            <div class="message_con"><label>新闻标题：</label><input type="text" class="message_input"><span class="must">*</span>
            <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
            </div>
            <div class="message_con"><label>新闻类型：</label><select class="message_select"><option>全部类型</option></select><span class="must">*</span>
                <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
            </div>
            <div class="message_con"><label>是否需要审核：</label><input type="radio" name="ref" checked><span class="font_color">是</span><input type="radio" name="ref" ><span class="font_color">否</span>

            </div>
            <div class="message_con inputfile_div"><label>附件上传：</label><input type="file" class="message_input input_file"><span class="must">*</span>
                <div><input type="text"><button>选择文件</button></div>
                <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
            </div>
        </fieldset>
        <fieldset class="message_fieldset">
            <legend>详情信息</legend>
            <div class="message_con"><label>新闻格式：</label><input type="checkbox" name="ref" checked><span class="font_color">格式一</span><input type="checkbox" name="ref" ><span class="font_color">格式二</span><input type="checkbox" name="ref" ><span class="font_color">格式三</span></div>
            <div class="message_con"><label>新闻详情：</label>
                <textarea id="editor" style="width: 100%;height: 200px"></textarea>

            </div>
            </fieldset>
        <div class="message_footer"><button class="bule">保存</button><button class="orgen">取消</button></div>
    </form>
</section>

  </div>

</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
export default {

}
</script>

<style scoped>
  /* 引入外部css样式 */
  @import "../../assets/css/urbanPublicSafety/base.css";
  @import "../../assets/css/urbanPublicSafety/tail.css";
  .centerTitle{
  font-size:3.6rem;
  margin:0 auto;
}
.dhTitle{
  font-size:1.5rem;
}
</style>>
