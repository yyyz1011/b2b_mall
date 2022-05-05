<template>
  <div class="group-plan">
    <div class="plan-left"></div>
    <div class="plan-right"></div>
  </div>
</template>

<script>
export default {
  name: "groupPlan",
};
</script>

<style scoped>
.group-plan {
  position: absolute;
  top: 60px;
  left: 233px;

  width: 83%;
  /* height: auto; */
  min-height: 91%;
  background-color: aqua;
}
.plan-left{
    width: 80%;
    height: 100%;
    background-color: antiquewhite;
}
</style>