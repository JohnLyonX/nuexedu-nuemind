<script setup>
import { ref } from 'vue'

const userProfile = ref({
  basicInfo: {
    name: '梁展波',
    studentId: '2024001',
    gender: '男',
    age: 20,
    email: 'example@nuexedu.com',
    phone: '138****1234'
  },
  education: {
    school: '广州大学',
    major: '计算机科学与技术',
    grade: '2024级',
    class: '计科2班'
  },
  stats: {
    coursesCount: 2,
    exercisesCount: 156,
    examCount: 8,
    averageScore: 92
  }
})
</script>

<template>
  <div class="user-profile">
    <h2 class="page-title">个人档案</h2>
    
    <!-- 基本信息卡片 -->
    <div class="profile-card">
      <h3 class="card-title">基本信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">姓名：</span>
          <span class="value">{{ userProfile.basicInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">学号：</span>
          <span class="value">{{ userProfile.basicInfo.studentId }}</span>
        </div>
        <div class="info-item">
          <span class="label">性别：</span>
          <span class="value">{{ userProfile.basicInfo.gender }}</span>
        </div>
        <div class="info-item">
          <span class="label">年龄：</span>
          <span class="value">{{ userProfile.basicInfo.age }}</span>
        </div>
        <div class="info-item">
          <span class="label">邮箱：</span>
          <span class="value">{{ userProfile.basicInfo.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">手机：</span>
          <span class="value">{{ userProfile.basicInfo.phone }}</span>
        </div>
      </div>
    </div>

    <!-- 教育信息卡片 -->
    <div class="profile-card">
      <h3 class="card-title">教育信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">学校：</span>
          <span class="value">{{ userProfile.education.school }}</span>
        </div>
        <div class="info-item">
          <span class="label">专业：</span>
          <span class="value">{{ userProfile.education.major }}</span>
        </div>
        <div class="info-item">
          <span class="label">年级：</span>
          <span class="value">{{ userProfile.education.grade }}</span>
        </div>
        <div class="info-item">
          <span class="label">班级：</span>
          <span class="value">{{ userProfile.education.class }}</span>
        </div>
      </div>
    </div>

    <!-- 学习统计卡片 -->
    <div class="profile-card">
      <h3 class="card-title">学习统计</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ userProfile.stats.coursesCount }}</div>
          <div class="stat-label">已学课程</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userProfile.stats.exercisesCount }}</div>
          <div class="stat-label">练习题数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userProfile.stats.examCount }}</div>
          <div class="stat-label">考试次数</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ userProfile.stats.averageScore }}</div>
          <div class="stat-label">平均分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.profile-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
}

.label {
  color: #666;
  margin-right: 8px;
  min-width: 60px;
}

.value {
  color: #333;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
  font-size: 14px;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .page-title {
    color: #e0e0e0;
  }

  .profile-card {
    background: #2d2d2d;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .card-title {
    color: #e0e0e0;
    border-bottom-color: #404040;
  }

  .label {
    color: #aaa;
  }

  .value {
    color: #e0e0e0;
  }

  .stat-item {
    background: #363636;
  }

  .stat-label {
    color: #aaa;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .profile-card {
    padding: 16px;
  }

  .page-title {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    gap: 12px;
  }

  .stat-item {
    padding: 12px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style> 