<script setup>
import { ref } from 'vue';
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

// 注册必须的组件
use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

// 定义图表配置
const chartOption = {
  title: {
    text: "学习建议",
  },
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["Java基础语法学习", "距离下次考试还有5天", "今日学习时长已达标"],
    axisLabel: {
      interval: 0, // 显示所有标签
      rotate: 0, // 标签旋转30度
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "时间（小时）",
      type: "bar",
      data: [10, 5, 8], // 对应每项的学习时间
    },
  ],
};
const learningData = ref({
  todayStudy: {
    duration: 180, // 分钟
    completedTasks: 5,
    totalTasks: 8
  },
  weeklyStats: {
    monday: 120,
    tuesday: 90,
    wednesday: 180,
    thursday: 150,
    friday: 210,
    saturday: 60,
    sunday: 30
  },
  upcomingTasks: [
    {
      id: 1,
      type: 'course',
      title: 'Java基础语法学习',
      deadline: '2024-03-20 14:30',
      priority: 'high'
    },
    {
      id: 2,
      type: 'exercise',
      title: 'C语言编程练习',
      deadline: '2024-03-21 16:00',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'exam',
      title: '背八股文',
      deadline: '2024-03-25 09:00',
      priority: 'high'
    }
  ],
  learningTips: [
    'Java基础语法学习',
    '距离下次考试还有5天，请合理安排复习时间',
    '今日学习时长已达标，继续保持！'
  ],
  // 添加个人情况分析数据
  personalAnalysis: {
    learningAbility: 85,
    logicalThinking: 90,
    codingSpeed: 75,
    accuracy: 88
  }
})
const analysisOption = {
  title: {
    text: "个人情况分析",
  },
  tooltip: {},
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["考试准确率", "逻辑能力"],
    axisLabel: {
      fontSize: 10  , // 进一步缩小字体大小
      interval: 0, // 显示所有标签
      formatter: function (value) {
        return value.length > 4 ? value.substring(0, 4) + '\n' + value.substring(4) : value; // 自动换行
      }
    },
  },
  series: [
    {
      name: "评分",
      type: "bar",
      data: [88, 75, 90, 85], // 对应每项的评分
      barWidth: '60%',
    },
  ],
};

const studyOverviewOption = {
  title: {
    text: "今日学习概览",
  },
  tooltip: {},
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["学习时长", "任务完成"],
    axisLabel: {
      fontSize: 10, // 进一步缩小字体大小
      interval: 0, // 显示所有标签
      formatter: function (value) {
        return value.length > 4 ? value.substring(0, 4) + '\n' + value.substring(4) : value; // 自动换行
      }
    },
  },
  series: [
    {
      name: "评分",
      type: "bar",
      data: [3, 5], // 对应每项的评分
      barWidth: '60%',
    },
  ],
};

// 用户信息数据
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
});
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

    <!-- echarts图表 横向排列 -->
    <div class="charts-container">

      <div class="chart-item">
        <h1>个人情况分析</h1>
        <v-chart class="chart" :option="analysisOption" />
      </div>
      <div class="chart-item">
        <h1>今日学习概览</h1>
        <v-chart class="chart" :option="studyOverviewOption" />
      </div>

<div class="dashboard-card learning-tips">
        <h3 class="card-title">学习建议</h3>
        <div class="tips-list">
          <div
            v-for="(tip, index) in learningData.learningTips"
            :key="index"
            class="tip-item"
          >
            <span class="tip-icon">💡</span>
            <span class="tip-text">{{ tip }}</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.charts-container {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* 缩小间隔 */
  margin-top: 24px;
}

.chart-item {
  flex: 1;
  min-width: 0; /* 确保文字显示完全 */
}

.chart {
  width: 100%;
  height: 600px; /* 放大图表 */
}

.user-profile {
  max-width: 1400px; /* 增加整体宽度 */
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

.dashboard-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  width: 30%;
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
