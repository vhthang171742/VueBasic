<template>
  <div class="sidebar">
    <div class="logo-site">
      <div class="icon toggle-icon"></div>
      <div class="icon logo-school"></div>
    </div>
    <div class="sidebar-content">
      <router-link to="/" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-overview"></div>
        <span class="sidebar-item-text">Tổng quan</span>
      </router-link>

      <router-link to="/student" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-student"></div>
        <span class="sidebar-item-text">Danh sách học sinh</span>
      </router-link>

      <router-link to="/teacher" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-teacher"></div>
        <span class="sidebar-item-text">Danh sách giáo viên</span>
      </router-link>

      <router-link to="/class" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-class"></div>
        <span class="sidebar-item-text">Danh sách lớp học</span>
      </router-link>

      <router-link to="/subject" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-subject"></div>
        <span class="sidebar-item-text">Danh sách môn học</span>
      </router-link>

      <router-link to="/account" class="sidebar-item">
        <div class="icon sidebar-item-icon sidebar-item-account"></div>
        <span class="sidebar-item-text">Tài khoản</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.toggle-icon {
  width: 24px;
  height: 24px;
  background-image: url("~@/assets/icons/toggle.png");
  position: absolute;
  left: 16px;
}

.logo-school {
  width: 150px;
  height: 25px;
  background-image: url("~@/assets/icons/logo-qlth.svg");
  position: absolute;
  left: 50px;
}

a {
  text-decoration: none;
}

.sidebar-item-overview {
  background-image: url("~@/assets/icons/dashboard.png");
}

.sidebar-item-student {
  background-image: url("~@/assets/icons/group.png");
}

.sidebar-item-teacher {
  background-image: url("~@/assets/icons/teacher.png");
}

.sidebar-item-class {
  background-image: url("~@/assets/icons/class.png");
}

.sidebar-item-subject {
  background-image: url("~@/assets/icons/subject.png");
}

.sidebar-item-account {
  background-image: url("~@/assets/icons/account.png");
}
</style>
