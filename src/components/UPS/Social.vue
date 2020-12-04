<template>
  <div id="social">
    <meta charset="UTF-8" />
    <title>社会安全</title>
    <!--顶部-->
    <header class="header left">
      <div class="left nav left-box">
        <el-dropdown hide-on-click>
          <div class="menu_title">
            <i class="el-icon-s-unfold"></i>
            <span class="el-dropdown-link"
              >社会安全<i class="el-icon-arrow-down el-icon--right"></i
            ></span>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown">
            <dropMenu></dropMenu>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="header_center left">
        <timeRecord></timeRecord>
      </div>
      <!-- 头部右侧区域 -->
      <div class="right nav text_right">
        <el-dropdown size="mini" hide-on-click placement="bottom-start">
          <titleRight></titleRight>
        </el-dropdown>
      </div>
    </header>
    <section class="left" style="width: 100%">
      <form class="sm_section">
        <fieldset class="message_fieldset">
          <legend>基本信息</legend>
          <div class="message_con">
            <label>新闻标题：</label
            ><input type="text" class="message_input" /><span class="must"
              >*</span
            >
            <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
          </div>
          <div class="message_con">
            <label>新闻类型：</label
            ><select class="message_select">
              <option>全部类型</option></select
            ><span class="must">*</span>
            <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
          </div>
          <div class="message_con">
            <label>是否需要审核：</label
            ><input type="radio" name="ref" checked /><span class="font_color"
              >是</span
            ><input type="radio" name="ref" /><span class="font_color">否</span>
          </div>
          <div class="message_con inputfile_div">
            <label>附件上传：</label
            ><input type="file" class="message_input input_file" /><span
              class="must"
              >*</span
            >
            <div><input type="text" /><button>选择文件</button></div>
            <p>新闻标题可以输入任一字符，但长度不能小于1大有大于200！</p>
          </div>
        </fieldset>
        <fieldset class="message_fieldset">
          <legend>详情信息</legend>
          <div class="message_con">
            <label>新闻格式：</label
            ><input type="checkbox" name="ref" checked /><span
              class="font_color"
              >格式一</span
            ><input type="checkbox" name="ref" /><span class="font_color"
              >格式二</span
            ><input type="checkbox" name="ref" /><span class="font_color"
              >格式三</span
            >
          </div>
          <div class="message_con">
            <label>新闻详情：</label>
            <textarea id="editor" style="width: 100%; height: 200px"></textarea>
          </div>
        </fieldset>
        <div class="message_footer">
          <button class="bule">保存</button><button class="orgen">取消</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import "../../assets/js/urbanPublicSafety/jquery-1.10.2.js";
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
  methods: {},
};
</script>

<style scoped>
/* 引入外部css样式 */
@import "../../assets/css/urbanPublicSafety/base.css";
@import "../../assets/css/urbanPublicSafety/tail.css";
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
</style>>
