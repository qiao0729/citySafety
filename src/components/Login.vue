<template>
	<div class="loginPage">
		<!-- 利用vue-particle插件添加的粒子特效 -->
		<vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="30" shapeType="star" :particleSize="5"
		 linesColor="#fff" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
		 :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"></vue-particles>
		<div id="bg">
		</div>
		<div class="title">
			<h1>城市公共安全监测预警系统</h1>
		</div>
		<div class="sub-main-w3">
			<el-form ref="loginFormRef" :model="loginform" :rules="rules" label-width="80px">
				<h2>
					登录
					<i class="fa fa-long-arrow-down"></i>
				</h2>
				<el-form-item label="用户名" class="form-style-agile" prop="username">
					<el-input v-model="loginform.username" prefix-icon="iconfont icon-user" class="inputK"></el-input>
				</el-form-item>
				<el-form-item label="密 码" class="form-style-agile" prop="password">
					<el-input v-model="loginform.password" prefix-icon="iconfont icon-3702mima" type="password" class="inputK"></el-input>
				</el-form-item>
				<input type="submit" value="登 录" @click.prevent="submit" />
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				res: '',
				//登录表单绑定数据对象
				loginform: {
					username: "admin",
					password: "123456"
				},
				//登录表单验证规则
				rules: {
					username: [{
							required: true,
							message: "请输入登录名称",
							trigger: "blur"
						},
						{
							min: 3,
							max: 15,
							message: "长度在 3 到 15 个字符",
							trigger: "blur"
						}
					],
					password: [{
							required: true,
							message: "请输入登录密码",
							trigger: "blur"
						},
						{
							min: 3,
							max: 15,
							message: "长度在 3 到 15 个字符",
							trigger: "blur"
						}
					]
				}
			};
		},
		methods: {
			submit() {
				//var res = this.res;
				this.$refs.loginFormRef.validate(async (valid) => {
					if (!valid) return;
					const {
						data: res
					} = await this.$http.post("login", this.loginform);
					console.log(res)
					if (res.meta.status !== 200) {
						return this.$message.error("登录失败");
					} else {
						//登录成功
						//保存token到sessionstrage, 跳转到主页
						window.sessionStorage.setItem("token", res.data.token);
						this.$message.success("登录成功");
						this.$router.push("/urbanPublicSafety");
					}
				});
			},
		}
	};
</script>

<style>
	.el-form-item__label {
		color: #fff !important;
		font-size: 18px !important;
	}
</style>

<style scoped>
	/* reset */

	.loginPage,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	dl,
	dt,
	dd,
	ol,
	nav ul,
	nav li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}

	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	ol,
	ul {
		list-style: none;
		margin: 0px;
		padding: 0px;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: "";
		content: none;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* start editing from here */

	a {
		text-decoration: none;
	}

	.txt-rt {
		text-align: right;
	}

	/* text align right */

	.txt-lt {
		text-align: left;
	}

	/* text align left */

	.txt-center {
		text-align: center;
	}

	/* text align center */

	.float-rt {
		float: right;
	}

	/* float right */

	.float-lt {
		float: left;
	}

	/* float left */

	.clear {
		clear: both;
	}

	/* clear float */

	.pos-relative {
		position: relative;
	}

	/* Position Relative */

	.pos-absolute {
		position: absolute;
	}

	/* Position Absolute */

	.vertical-base {
		vertical-align: baseline;
	}

	/* vertical align baseline */

	.vertical-top {
		vertical-align: top;
	}

	/* vertical align top */

	nav.vertical ul li {
		display: block;
	}

	/* vertical menu */

	nav.horizontal ul li {
		display: inline-block;
	}

	/* horizontal menu */

	img {
		max-width: 100%;
	}

	/*end reset*/

	/*--header--*/

	h1 {
		font-size: 3.5em;
		color: #fff;
		letter-spacing: 3px;
		text-align: center;
		font-style: italic;
		margin: 3vw 1vw;
		font-family: "Josefin Sans", sans-serif;
	}

	h1 span,
	h2 i {
		color: #f7296f;
	}

	h2 {
		color: #fff;
		font-size: 22px;
		font-weight: 500;
		letter-spacing: 1px;
		text-transform: capitalize;
		margin-bottom: 1em;
	}

	/*--//header--*/

	/*-- content --*/

	.sub-main-w3 {
		display: -webkit-flex;
		display: -webkit-box;
		display: -moz-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		bottom: 20%;
		margin-left: 40%;
		position: absolute;
		-webkit-filter: brightness(1);
		filter: brightness(1);
		
	}

	.sub-main-w3 form {
		max-width: 400px;
		/* margin: 0 15vw; */
		/* background: rgba(140, 137, 137, 0.28); */
		background: rgba(8,2,36,0.5);
		padding: 3.5vw;
		box-sizing: border-box;
		display: -webkit-flex;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		border-bottom: 8px solid #f7296f;
		border-radius: 30px 30px 50px 50px; 
		height: 45vh;
		width: 600px;
	}

	.form-style-agile {
		margin-bottom: 1.5em;
		flex-basis: 100%;
		-webkit-flex-basis: 100%;
	}

	.sub-main-w3 label {
		font-size: 14px;
		color: #fff;
		display: inline-block;
		font-weight: 500;
		margin-bottom: 12px;
		text-transform: capitalize;
		letter-spacing: 1px;
	}

	.sub-main-w3 label i {
		font-size: 15px;
		margin-left: 5px;
		color: #f7296f;
		border-radius: 50%;
		line-height: 1.9;
		text-align: center;
	}

	.form-style-agile input[type="text"],
	.form-style-agile input[type="password"] {
		color: #000;
		outline: none;
		font-size: 14px;
		letter-spacing: 1px;
		padding: 15px 15px;
		box-sizing: border-box;
		border: none;
		border: 2px solid #000;
		background: #fff;
		width: 385px;
	}
	.sub-main-w3 input[type="submit"] {
		color: #fff;
		background: #f7296f;
		border: none;
		padding: 13px 0;
		margin-top: 30px;
		outline: none;
		width: 36%;
		font-size: 16px;
		cursor: pointer;
		letter-spacing: 2px;
		-webkit-transition: 0.5s all;
		-o-transition: 0.5s all;
		-moz-transition: 0.5s all;
		-ms-transition: 0.5s all;
		transition: 0.5s all;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.49);
	}

	.sub-main-w3 input[type="submit"]:hover {
		background: #000;
		-webkit-transition: 0.5s all;
		-o-transition: 0.5s all;
		-moz-transition: 0.5s all;
		-ms-transition: 0.5s all;
		transition: 0.5s all;
	}

	.wthree-text {
		width: 100%;
	}

	.wthree-text ul li:nth-child(1) {
		float: left;
	}

	.wthree-text ul li:nth-child(2) {
		float: right;
	}

	.wthree-text ul li {
		display: inline-block;
	}

	.wthree-text ul li a {
		color: #fff;
		font-size: 14px;
		letter-spacing: 1px;
		font-weight: 500;
	}

	/*-- checkbox --*/

	.wthree-text label {
		font-size: 15px;
		color: #fff;
		cursor: pointer;
		position: relative;
	}

	.wthree-text {
		text-align: center;
	}

	input.checkbox {
		background: #f7296f;
		cursor: pointer;
		width: 1.2em;
		height: 1.2em;
		vertical-align: text-bottom;
	}

	input.checkbox:before {
		content: "";
		position: absolute;
		width: 1.2em;
		height: 1.2em;
		background: inherit;
		cursor: pointer;
	}

	input.checkbox:after {
		content: "";
		position: absolute;
		top: 1.5px;
		left: 1.5px;
		z-index: 1;
		width: 1em;
		height: 1em;
		border: 1px solid #fff;
		-webkit-transition: 0.4s ease-in-out;
		-moz-transition: 0.4s ease-in-out;
		-o-transition: 0.4s ease-in-out;
		transition: 0.4s ease-in-out;
	}

	input.checkbox:checked:after {
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
		height: 0.5rem;
		border-color: #fff;
		border-top-color: transparent;
		border-right-color: transparent;
	}

	.anim input.checkbox:checked:after {
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
		height: 0.5rem;
		border-color: transparent;
		border-right-color: transparent;
		animation: 0.4s rippling 0.4s ease;
		animation-fill-mode: forwards;
	}

	@keyframes rippling {
		50% {
			border-left-color: #fff;
		}

		100% {
			border-bottom-color: #fff;
			border-left-color: #fff;
		}
	}

	/*-- //checkbox --*/

	/*--placeholder-color--*/

	::-webkit-input-placeholder {
		color: #000;
	}

	:-moz-placeholder {
		/* Firefox 18- */
		color: #000;
	}

	::-moz-placeholder {
		/* Firefox 19+ */
		color: #000;
	}

	:-ms-input-placeholder {
		color: #000;
	}

	/*-- //placeholder-color --*/

	/*-- //content --*/

	/*-- copyright --*/

	.footer {
		margin: 4vw 0.3vw 2vw;
	}

	.footer p {
		font-size: 14px;
		color: #fff;
		letter-spacing: 2px;
		text-align: center;
		line-height: 1.8;
		bottom: 10px;
		position: absolute;
		margin-left: 40%;
	}

	.footer p a {
		color: #fff;
		-webkit-transition: 0.5s all;
		-o-transition: 0.5s all;
		-moz-transition: 0.5s all;
		-ms-transition: 0.5s all;
		transition: 0.5s all;
	}

	.footer p a:hover {
		color: #f7296f;
		-webkit-transition: 0.5s all;
		-o-transition: 0.5s all;
		-moz-transition: 0.5s all;
		-ms-transition: 0.5s all;
		transition: 0.5s all;
	}

	/*-- //copyright --*/

	/*-- bg effect --*/

	#bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-image: url(../static/img/bk3.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		-ms-background-size: 100% 100%;
	}

	#bg canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/*-- //bg effect --*/

	/*--responsive--*/

	@media (max-width: 1920px) {
		h1 {
			font-size: 3.5vw;
		}
	}

	@media (max-width: 1024px) {
		h1 {
			font-size: 4.5vw;
		}
	}

	@media (max-width: 800px) {
		h1 {
			font-size: 2.6em;
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 2.3em;
			letter-spacing: 1px;
		}

		.sub-main-w3 form {
			padding: 7.5vw;
		}

		.footer p {
			letter-spacing: 1px;
		}
	}

	@media (max-width: 414px) {

		.form-style-agile input[type="text"],
		.form-style-agile input[type="password"] {
			font-size: 13px;
			padding: 13px 15px;
		}

		.wthree-text ul li:nth-child(1),
		.wthree-text ul li:nth-child(2) {
			float: none;
		}

		.wthree-text ul li:nth-child(2) {
			margin-top: 10px;
		}

		.sub-main-w3 input[type="submit"] {
			width: 56%;
		}

		.wthree-text ul li {
			display: block;
		}
	}

	@media (max-width: 320px) {
		h1 {
			font-size: 1.8em;
			margin: 5vw 1vw;
		}

		.sub-main-w3 form {
			padding: 25px 14px;
		}
	}
	
	h1{
		    font-size: 4.5vw !important;
	}
	.title{
		display: -webkit-flex;
		display: -webkit-box;
		display: -moz-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		-webkit-box-pack: center;
		-moz-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		top: 2%;
		margin-left: 25%;
		position: absolute;
		-webkit-filter: brightness(1);
		filter: brightness(1);
		color: #fafafa;
		letter-spacing: 0;
		text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135
	}
</style>
