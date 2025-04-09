<template>
  <nav :class="{ 'nav-background': isScrolled }" class="nav-container">
    <div class="logo">
      <RouterLink to="/home" @click.prevent="handleNavClick('/home')">NueMind</RouterLink>
    </div>
    <div class="user">
      <RouterLink to="/profile" @click.prevent="handleNavClick('/profile')">个人空间</RouterLink>
      <button @click="handleLogout" class="logout-btn">退出</button>
    </div>
  </nav>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 
import { useRouter } from 'vue-router';
const router = useRouter();
// 检查是否登录
const isLoggedIn = () => {
  return !!localStorage.getItem('token'); // 假设登录后 token 存储在 localStorage
};

// 处理导航点击
const handleNavClick = (path) => {
  if (!isLoggedIn()) {
    alert('请先登录');
    router.push('/login');
  } else {
    router.push(path);
  }
};

// 处理退出
const handleLogout = () => {
  localStorage.removeItem('token'); // 清除 token
  router.push('/login');
};
// 
const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>
  
<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  background-color: rgb(6, 224, 166);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
  z-index: 1000;
}



/* 滚动超过30px时的毛玻璃效果 */
.nav-background {
  background: rgba(216, 216, 216, 0.3);
  backdrop-filter: blur(10px);

}

.nav-background * {
  color: rgb(12, 192, 144);

}

.logo {
  font-size: 2rem;
  font-weight: bold;
  margin-left: 5rem;
}

.user {
  font-size: 1.2rem;
  margin-right: 4rem;
}

* {
  color: white;
  text-decoration: none;
}

.logout-btn {
  margin-left: 30px;
  background: none;
  border: 2px solid rgba(0, 0, 0, 0);
}
</style>
  