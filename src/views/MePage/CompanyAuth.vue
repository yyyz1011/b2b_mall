<template>
  <h2>企业营业执照</h2>
  <div class="company">
    <p>公司名称</p>
    <el-input v-model="email" placeholder="影响后续认证" style="width: 40%" />
    <p>营业执照注册号/统一社会信用代码</p>
    <el-input
      v-model="nickname"
      placeholder="必须与营业执照上的代码一致"
      style="width: 40%"
    />
    <p>法定代表人</p>
    <el-input v-model="email" placeholder="影响后续认证" style="width: 40%" />
    <p>营业执照</p>
    <el-upload
      drag
      :auto-upload="false"
      accept="png,jpg"
      :before-upload="fileUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">单击或者拖动文件到此区域进行上传</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的JPG、PNG图片</div>
      </template>
    </el-upload>
    <p>管理员省份证复印件</p>
    <el-upload
      drag
      :auto-upload="false"
      accept="png,jpg"
      :before-upload="fileUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">上传身份证头像面</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的文件</div>
      </template>
    </el-upload>
    <el-upload
      drag
      :auto-upload="false"
      accept="png,jpg"
      :before-upload="fileUpload"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">上传身份证国徽面</div>
      <template #tip>
        <div class="el-upload__tip">请上传大小不超过5M的文件</div>
      </template>
    </el-upload>
  </div>
</template>

<script lang='ts' setup>
import { UploadFilled } from "@element-plus/icons-vue";
</script>

<style>
.company {
  margin: 0 auto;
}
</style>