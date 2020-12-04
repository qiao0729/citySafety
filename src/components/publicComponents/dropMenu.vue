<template>
<div>
  <li class="dhTitle">
              <router-link :to="{ name: 'urbanPublicSafety' }">信息总览</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Hik' }">自然灾害</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Accident' }">事故灾难</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Health' }">公共安全</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Social' }">社会安全</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Warning' }">预警信息</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Trace' }">轨迹挖掘</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'CrowdFlow' }">人流监测</router-link>
            </li>
            <li class="dhTitle">
              <router-link :to="{ name: 'Sjmt1' }">社交媒体预览</router-link>
            </li>
</div>
</template>