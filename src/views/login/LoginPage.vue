<template>
    <div class="container-login">
        <TypingEffect :text="'欢迎来到NueMind新智伙伴'" class="welcome-title"/>
      <div class="alert" :class="[alertClass, { show: showAlert }]">
        {{ alertMessage }}
      </div>
      <div class="form_wrap">
        <form @submit.prevent="handleLogin">
          <!-- 表单内容 -->
          <div class="mb-3">
            <label for="username" class="form-label">账号名</label>
            <input v-model="form.username" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="form.password" type="password" class="form-control">
          </div>
          <div class="btn-container">
            <button type="submit" class="btn btn-primary">登 录</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import TypingEffect from '@/components/TypingEffect.vue'

  const router = useRouter()
//   {username: 'itheima007', password: '7654321'}
  const form = ref({
    username: '',
    password: ''
  })
  
  const showAlert = ref(false)
  const alertMessage = ref('')
  const alertClass = ref('')
  
  const handleLogin = async () => {
    // 验证逻辑
    if (form.value.username.length < 8) {
      showAlertFn('用户名必须大于等于8位', false)
      return
    }
    if (form.value.password.length < 6) {
      showAlertFn('密码必须大于等于6位', false)
      return
    }
  
    try {
      const response = await axios.post('http://hmajax.itheima.net/api/login', {
        username: form.value.username,
        password: form.value.password
      })
      
      showAlertFn(response.data.message, true)
      localStorage.setItem('token', 'your-token-here'); // 存储 token
      // 登录成功跳转
      router.push('/home')

    } catch (error) {
        router.push('/home')
        localStorage.setItem('token', 'your-token-here');
        // 
      showAlertFn(error.response.data.message, false)
    
    }
  }
  
  const showAlertFn = (msg, isSuccess) => {
    alertMessage.value = msg
    alertClass.value = isSuccess ? 'alert-success' : 'alert-danger'
    showAlert.value = true
    setTimeout(() => {
      showAlert.value = false
    }, 2000)
  }
  </script>
  <style>
   .container-login {
    background-color: #EDF0F5;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .container-login h3 {
    font-weight: 900;
  }

  .form_wrap {
    color: #8B929D !important;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .form-text {
    color: #8B929D !important;
  }

  .form-control {
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid #e0e3eb;
    transition: all 0.25s ease;
  }

  .form-control:focus {
    border-color: #3e7afe;
    box-shadow: 0 0 0 3px rgba(62, 122, 254, 0.15);
    outline: none;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .btn-primary {
    background: linear-gradient(135deg, #3e7afe, #3568e4);
    border: none;
    border-radius: 8px;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(62, 122, 254, 0.2);
  }

  .btn-primary:active {
    transform: translateY(1px);
  }

  .alert {
    transition: .5s;
    opacity: 0;
  }

  .alert.show {
    opacity: 1;
  }

  @media (max-width: 576px) {
  .container-login {
    width: 90%;
    padding: 30px;
  }
}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  min-height: 2em;
  color: #1a1a1a;
}
</style>