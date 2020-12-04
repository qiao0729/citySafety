<template>
<div>
  <div class="el-dropdown-left">
            <span class="el-dropdown-link"
              ><img src="../../assets/img/header.png" alt=""
            /></span>
          </div>
          <el-dropdown-menu slot="dropdown" class="dropdown1">
            <li>
              <router-link class="dhTitle dhTitle1" :to="{ name: 'Login' }"
                >退出系统</router-link
              >
            </li>
          </el-dropdown-menu>
</div>
</template>