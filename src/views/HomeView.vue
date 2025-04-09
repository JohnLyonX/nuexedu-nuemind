<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import CourseCard from '@/components/CourseCardComponents.vue'

// 直接导入 Swiper 样式（根据实际需求选择）
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import SaleChatComponent from '@/components/SaleChatComponent.vue'

// Swiper 模块
const modules = [Autoplay, Pagination, EffectFade]

// Swiper 配置
const swiperOptions = ref({
  modules: modules,
  pagination: {
    clickable: true
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  loop: true,
  speed: 800,
  effect: 'fade'
})

// 课程数据
const courses = ref([])
const loading = ref(true)
const error = ref(null)

// 获取课程数据
const fetchCourses = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:1024/dev-api/edu/courses/list')
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }
    const data = await response.json()
    courses.value = data.rows || []
    loading.value = false
  } catch (err) {
    console.error('获取课程数据失败:', err)
    error.value = '加载课程数据失败，请稍后再试'
    loading.value = false

    // 加载失败时显示模拟数据
    courses.value = [
      {
        id: 1,
        coverImage: 'https://picsum.photos/400/250?random=1',
        name: 'Python自动化大师课',
        description: '掌握Web自动化测试、运维脚本开发、Office自动化等实用技能',
        price: 1990.23
      },
      {
        id: 2,
        coverImage: 'https://picsum.photos/400/250?random=2',
        name: 'Java架构师进阶',
        description: 'JVM性能调优、分布式事务解决方案、高并发架构设计',
        price: 2480.00
      },
      {
        id: 3,
        coverImage: 'https://picsum.photos/400/250?random=3',
        name: '大数据微调实战',
        description: 'LoRA/P-Tuningv2实战、领域知识注入方法、模型部署优化',
        price: 3680.00
      }
    ]
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchCourses()
})
</script>

<template>
  <div class="container">
    <!-- 轮播图容器 -->
    <div class="swiper-wrapper">
      <swiper class="swiper-container" :options="swiperOptions">
        <swiper-slide>
          <img src="../assets/hospital-logo.png" class="swiper-img">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <!-- 主要内容区域 -->
    <main class="content-container">
      <!-- 优势模块 -->
      <section class="advantages-section">
        <div class="advantages-container">
          <h2 class="section-title">为什么选择NueMind新智伙伴？</h2>
          <p class="section-subtitle">AI赋能教育新范式，智能助手全程护航教师教学与学生学习</p>

          <div class="advantages-grid">
            <div class="advantage-card">
              <h3>智能教学助手</h3>
              <ul>
                <li>AI自动化作业批改</li>
                <li>个性化学习路径规划</li>
                <li>课堂互动实时分析</li>
              </ul>
            </div>
            <div class="advantage-card">
              <h3>精准学情分析</h3>
              <ul>
                <li>多维度学习行为追踪</li>
                <li>智能知识图谱构建</li>
                <li>自适应薄弱点诊断</li>
              </ul>
            </div>
            <div class="advantage-card">
              <h3>智能教辅系统</h3>
              <ul>
                <li>AI智能排课系统</li>
                <li>教学资源智能推荐</li>
                <li>师生匹配精准营销</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 课程模块 -->
      <section class="course-section">
        <h2 class="section-title">精选热门课程</h2>
        <p class="section-subtitle">资深讲师全程指导，一对一辅导助你高效成长</p>

        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>正在加载课程数据...</p>
        </div>

        <div v-else-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-else class="new-course-grid">
          <CourseCard v-for="course in courses" :key="course.id" :id="course.id" :coverImage="course.url"
            :name="course.name" :description="course.description" :price="course.price" />
        </div>
      </section>

      <section style="margin-top: 8rem;">
        <p class="section-subtitle"
          style="margin: 0; font-weight: bold; font-size: 1.2rem; color: #2c3e50;; font-family: 'Goodly';">
          不知如何选择？请让我们的智能销售 Alice 来帮助你</p>
        <SaleChatComponent />
      </section>

     <!-- 新增模块2：团队介绍 -->
<section class="team-section">
  <div class="team-container">
    <h2 class="section-title">活力团队</h2>
    <p class="section-subtitle">年轻力量，创意无限</p>

    <div class="team-grid">
      <div class="team-card">
        <div class="team-image">
          <img src="https://picsum.photos/300/300?random=4" alt="团队成员" class="team-img">
        </div>
        <h3>梁工</h3>
        <p class="team-title">AI设计师</p>
        <p class="team-desc">智能算法爱好者，主导过多个校园AI项目，擅长将创新想法转化为可行解决方案。</p>
      </div>

      <div class="team-card">
        <div class="team-image">
          <img src="https://picsum.photos/300/300?random=5" alt="团队成员" class="team-img">
        </div>
        <h3>刘工</h3>
        <p class="team-title">前端开发</p>
        <p class="team-desc">界面设计小能手，熟练React/Vue框架，追求极致的用户体验与交互逻辑。</p>
      </div>

      <div class="team-card">
        <div class="team-image">
          <img src="https://picsum.photos/300/300?random=6" alt="团队成员" class="team-img">
        </div>
        <h3>韩工</h3>
        <p class="team-title">后端开发</p>
        <p class="team-desc">系统架构达人，在多个课程项目中搭建稳定服务，擅长数据库优化与接口设计。</p>
      </div>
    </div>
  </div>
</section>



      <!-- 新增模块1：AI技术应用案例（左右结构布局） -->
      <section class="case-section">
        <div class="case-container">
          <h2 class="section-title">NueMind 双子星</h2>
          <p class="section-subtitle">探索NueMind融入的Ai如何改变行业，创造价值; 为尾帧工作室NueCount提供技术支持</p>

          <div class="case-content" style="margin-bottom: 3rem;">
            <div class="case-image">
              <img src="../assets/IMG_8110.jpg" alt="AI应用案例" class="case-img">
            </div>
            <div class="case-text">
              <h3>智能客服系统</h3>
              <p>基于自然语言处理技术，我们的智能客服系统能够实时理解用户问题并提供精准解答，平均响应时间缩短至1秒以内，客户满意度提升至95%以上。</p>
              <ul class="case-features">
                <li>多轮对话支持</li>
                <li>情绪感知分析</li>
                <li>知识图谱驱动</li>
              </ul>
              <a href="#" class="case-link">点击了解更多 →</a>
            </div>
          </div>

          <div class="case-content">
            <div class="case-image">
              <img src="../assets/IMG_8111.jpg" alt="AI应用案例" class="case-img">
            </div>
            <div class="case-text">
              <h3>智能教学管家系统</h3>
              <p>基于多模态AI引擎与自然语言处理技术，NueMind智能教学管家实现教育场景的全链路数字化重构。系统通过：</p>
              <ul class="case-features">
                <li>文档智能解析引擎：支持PDF/Word等多格式教材的语义解构，自动生成标准化知识元数据</li>
                <li>教学行为建模：运用LSTM时序网络分析200+维度教学特征，提供精准教学策略建议</li>
                <li>学习状态感知：结合眼动追踪与语音情感分析，实时构建学习者认知画像</li>
              </ul>
              <a href="#" class="case-link">点击了解更多 →</a>
            </div>
          </div>


        </div>
      </section>




    </main>
  </div>
</template>
<style scoped>
.container {
  padding: 5rem 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  /* 防止水平溢出 */
}

/* 轮播图样式 */
.swiper-wrapper {
  height: 60vh;
  max-height: 600px;
  /* 设置最大高度 */
  width: 100%;
  position: relative;
  margin-bottom: 40px;
}

.swiper-container {
  height: 100%;
  width: 100%;
  border-radius: 0 0 30px 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.swiper-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 导航栏 */
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
}

.nav-content {
  width: 100%;
  max-width: 1200px;
  /* 减小最大宽度 */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* 减小内边距 */
}

.logo-img {
  height: 40px;
}

.nav-items {
  display: flex;
  gap: 30px;
  /* 减小间距 */
  margin-left: auto;
}

.nav-link {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-link:hover {
  color: #00a8ff;
  transform: translateY(-2px);
}

/* 添加汉堡菜单图标 */
.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 20;
}

section {
  margin-bottom: 60px;
}

/* 课程模块 */
.section-title {
  font-size: 32px;
  /* 减小字体大小 */
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

.section-subtitle {
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.8;
}

.course-grid {
  display: grid;
  ;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* 自适应列宽 */
  gap: 30px;
  margin-bottom: 60px;
}

.course-card {
  border-radius: 16px;
  padding: 25px;
  /* 减小内边距 */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #eee;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.card-header h3 {
  font-size: 22px;
  /* 减小字体大小 */
  color: #34495e;
  margin-bottom: 12px;
  font-weight: 600;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  color: #95a5a6;
  font-size: 14px;
}

.course-features {
  margin: 25px 0;
  padding-left: 15px;
}

.course-features li {
  color: #444;
  margin-bottom: 12px;
  padding-left: 15px;
  position: relative;
  line-height: 1.6;
}

.course-features li::before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
  font-size: 18px;
}

.price-box {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 25px;
}

.current-price {
  font-size: 24px;
  color: #e74c3c;
  font-weight: 700;
}

.original-price {
  color: #bdc3c7;
  text-decoration: line-through;
  font-size: 16px;
}

/* 优势模块 */
.advantages-section {
  margin: 60px 0;
}

.advantages-container {
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  padding: 40px 30px;
  /* 减小内边距 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  /* 自适应列宽 */
  gap: 30px;
  margin-top: 40px;
}

.advantage-card {
  background: #fff;
  border-radius: 12px;
  padding: 30px 20px;
  /* 减小内边距 */
  transition: all 0.3s ease;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.advantage-card h3 {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
}

.advantage-card ul {
  list-style: none;
  padding-left: 0;
}

.advantage-card li {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #444;
  font-size: 15px;
  display: flex;
  align-items: center;
}

.advantage-card li:last-child {
  border-bottom: none;
}

/* 新增模块1：AI技术应用案例 */
.case-section {
  margin: 60px 0;
}

.case-container {
  background: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  /* 减小内边距 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.case-content {
  display: flex;
  flex-direction: row;
  /* 默认为行方向 */
  gap: 30px;
}

.case-image {
  flex: 1;
}

.case-img {
  width: 100%;
  border-radius: 10px;
}

.case-text {
  flex: 1;
}

.case-text h3 {
  font-size: 26px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.case-text p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.case-features {
  list-style: none;
  padding-left: 15px;
  margin-bottom: 20px;
}

.case-features li {
  color: #444;
  margin-bottom: 12px;
  padding-left: 15px;
  position: relative;
  line-height: 1.6;
}

.case-features li::before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
  font-size: 18px;
}

.case-link {
  display: inline-block;
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.case-link:hover {
  color: #1a237e;
  transform: translateX(5px);
}

/* 新增模块2：团队介绍 */
.team-section {
  margin: 60px 0;
}

.team-container {
  background: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  /* 减小内边距 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* 自适应列宽 */
  gap: 30px;
  margin-top: 40px;
}

.team-card {
  text-align: center;
  padding: 25px 15px;
  border-radius: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.team-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-5px);
}

.team-image {
  margin-bottom: 15px;
}

.team-img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
}

.team-title {
  color: #7f8c8d;
  font-size: 15px;
  margin-bottom: 12px;
}

.team-desc {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

/* 大屏幕 */
@media (max-width: 1200px) {

  .swiper-wrapper {
    height: 50vh;
  }

  .section-title {
    font-size: 30px;
  }
}

/* 平板和小屏电脑 */
@media (max-width: 992px) {

  .course-grid,
  .advantages-grid,
  .team-grid {
    gap: 25px;
  }

  .case-content {
    flex-direction: column;
    /* 平板及以下改为列方向 */
  }

  .case-image {
    margin-bottom: 20px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 16px;
    margin-bottom: 30px;
  }
}

/* 平板 */
@media (max-width: 768px) {
  .nav-items {
    display: none;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .swiper-wrapper {
    height: 40vh;
  }

  .course-card,
  .advantage-card,
  .team-card {
    padding: 20px 15px;
  }

  .course-card h3,
  .advantage-card h3 {
    font-size: 18px;
  }

  .team-img {
    width: 110px;
    height: 110px;
  }

  .advantages-container,
  .case-container,
  .team-container {
    padding: 30px 20px;
  }

  .section-title {
    font-size: 26px;
    margin-bottom: 15px;
  }

  .section-subtitle {
    font-size: 15px;
    margin-bottom: 25px;
  }

  .course-features li,
  .case-features li {
    font-size: 14px;
  }
}

/* 手机 */
@media (max-width: 576px) {
  .swiper-wrapper {
    height: 30vh;
  }

  .course-grid,
  .advantages-grid,
  .team-grid,
  .new-course-grid {
    grid-template-columns: 1fr;
    /* 单列显示 */
  }

  .logo-img {
    height: 32px;
  }

  .team-img {
    width: 100px;
    height: 100px;
  }

  .section-title {
    font-size: 24px;
  }

  .section-subtitle {
    font-size: 14px;
  }

  .advantages-container,
  .case-container,
  .team-container {
    padding: 25px 15px;
    border-radius: 15px;
  }

  .course-card,
  .advantage-card,
  .team-card {
    padding: 15px 12px;
  }

  .current-price {
    font-size: 20px;
  }

  .original-price {
    font-size: 14px;
  }
}

/* 超小屏幕（小型手机） */
@media (max-width: 375px) {
  .nav-content {
    padding: 0 10px;
  }

  .logo-img {
    height: 28px;
  }

  .swiper-wrapper {
    height: 25vh;
  }

  .section-title {
    font-size: 22px;
  }

  .team-img {
    width: 90px;
    height: 90px;
  }

  .content-container {
    padding: 20px 10px;
  }
}

/* 触控优化 */
@media (hover: none) {

  .course-card:hover,
  .advantage-card:hover,
  .team-card:hover {
    transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .case-link:hover {
    transform: none;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .container {
    background: #1a1a1a;
  }

  .section-title {
    color: #e0e0e0;
  }

  .course-card,
  .advantage-card,
  .case-container,
  .team-container {
    background: #2d2d2d;
    border-color: #404040;
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.9);
  }
}

/* 性能优化 */
.swiper-img,
.team-img,
.case-img {
  will-change: transform;
}

/* 字体大小响应式 */
:root {
  --base-font-size: 16px;
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 15px;
  }
}

@media (max-width: 480px) {
  :root {
    --base-font-size: 14px;
  }
}

body {
  font-size: var(--base-font-size);
}

/* 间距系统优化 */
:root {
  --space-unit: 1rem;
  --space-xs: calc(0.5 * var(--space-unit));
  --space-sm: calc(0.75 * var(--space-unit));
  --space-md: var(--space-unit);
  --space-lg: calc(1.5 * var(--space-unit));
  --space-xl: calc(2 * var(--space-unit));
}

@media (max-width: 768px) {
  :root {
    --space-unit: 0.875rem;
  }
}

/* 应用间距系统 */
.section-title {
  margin-bottom: var(--space-lg);
}

.course-grid {
  gap: var(--space-xl);
}

/* 添加新课程网格样式 */
.new-course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 错误消息 */
.error-message {
  text-align: center;
  color: #e74c3c;
  padding: 30px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  margin-bottom: 40px;
}

@media (prefers-color-scheme: dark) {
  .loading-spinner {
    border-color: rgba(255, 255, 255, 0.1);
    border-top-color: #64b5f6;
  }

  .error-message {
    background: rgba(231, 76, 60, 0.2);
  }
}

@media (max-width: 576px) {
  .loading-container {
    padding: 30px 0;
  }

  .loading-spinner {
    width: 30px;
    height: 30px;
  }
}</style>
