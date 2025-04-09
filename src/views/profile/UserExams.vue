<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const exams = ref([])
const loading = ref(true)
const error = ref(null)

// 获取考试列表
const fetchExams = async () => {
  loading.value = true
  error.value = null
  
  try {
    // 实际项目中应该从API获取数据
    // const response = await fetch('http://localhost:1024/dev-api/edu/user/exams')
    // const data = await response.json()
    // exams.value = data.data
    
    // 使用假数据
    setTimeout(() => {
      exams.value = [
        {
          id: 1,
          title: 'C语言进阶课程 - 期中考试',
          course: 'C语言进阶课程',
          examTime: '2023-05-15 14:30',
          duration: 90,
          totalScore: 100,
          score: 85,
          status: 'completed',
          analysis: {
            correct: 17,
            wrong: 3,
            partial: 0,
            accuracy: 85
          }
        },
        {
          id: 2,
          title: 'C语言进阶课程 - 指针与内存管理测试',
          course: 'C语言进阶课程',
          examTime: '2023-05-10 10:15',
          duration: 60,
          totalScore: 100,
          score: 92,
          status: 'completed',
          analysis: {
            correct: 18,
            wrong: 1,
            partial: 1,
            accuracy: 92
          }
        },
        {
          id: 3,
          title: 'C语言进阶课程 - 函数与结构体测试',
          course: 'C语言进阶课程',
          examTime: '2023-05-05 09:30',
          duration: 60,
          totalScore: 100,
          score: 78,
          status: 'completed',
          analysis: {
            correct: 15,
            wrong: 4,
            partial: 1,
            accuracy: 78
          }
        },
        {
          id: 4,
          title: 'C语言进阶课程 - 期末模拟考试',
          course: 'C语言进阶课程',
          examTime: '2023-05-20 09:00',
          duration: 120,
          totalScore: 100,
          score: null,
          status: 'not_started',
          analysis: null
        }
      ]
      loading.value = false
    }, 1000)
  } catch (err) {
    error.value = '获取考试数据失败，请稍后重试'
    loading.value = false
    console.error('获取考试数据失败:', err)
  }
}

// 查看考试详情
const viewExamDetail = (examId) => {
  router.push(`/exam/${examId}`)
}

// 格式化日期时间
const formatDate = (dateStr) => {
  if (!dateStr) return '未开始'
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取状态标签和颜色
const getStatusLabel = (status) => {
  const statusMap = {
    'not_started': { label: '未开始', color: '#999' },
    'in_progress': { label: '进行中', color: '#1890ff' },
    'completed': { label: '已完成', color: '#52c41a' }
  }
  return statusMap[status] || { label: '未知', color: '#999' }
}

onMounted(() => {
  fetchExams()
})
</script>

<template>
  <div class="user-exams">
    <h2 class="page-title">考试分析</h2>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>正在加载考试数据...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>

    <!-- 考试列表 -->
    <div v-else class="exams-list">
      <div v-for="exam in exams" :key="exam.id" class="exam-card">
        <div class="exam-header">
          <h3 class="exam-title">{{ exam.title }}</h3>
          <span class="exam-course">{{ exam.course }}</span>
        </div>
        
        <div class="exam-info">
          <div class="info-item">
            <span class="info-label">考试时间:</span>
            <span class="info-value">{{ formatDate(exam.examTime) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">考试时长:</span>
            <span class="info-value">{{ exam.duration }}分钟</span>
          </div>
          <div class="info-item">
            <span class="info-label">总分:</span>
            <span class="info-value">{{ exam.totalScore }}分</span>
          </div>
          <div class="info-item" v-if="exam.score !== null">
            <span class="info-label">得分:</span>
            <span class="info-value score">{{ exam.score }}分</span>
          </div>
          <div class="info-item">
            <span class="info-label">状态:</span>
            <span class="status" :style="{ color: getStatusLabel(exam.status).color }">
              {{ getStatusLabel(exam.status).label }}
            </span>
          </div>
        </div>
        
        <!-- 考试分析 -->
        <div v-if="exam.status === 'completed' && exam.analysis" class="exam-analysis">
          <h4 class="analysis-title">考试分析</h4>
          <div class="analysis-stats">
            <div class="stat-item correct">
              <span class="stat-value">{{ exam.analysis.correct }}</span>
              <span class="stat-label">正确</span>
            </div>
            <div class="stat-item wrong">
              <span class="stat-value">{{ exam.analysis.wrong }}</span>
              <span class="stat-label">错误</span>
            </div>
            <div class="stat-item partial">
              <span class="stat-value">{{ exam.analysis.partial }}</span>
              <span class="stat-label">部分正确</span>
            </div>
            <div class="stat-item accuracy">
              <span class="stat-value">{{ exam.analysis.accuracy }}%</span>
              <span class="stat-label">正确率</span>
            </div>
          </div>
        </div>
        
        <div class="exam-footer">
          <button 
            class="action-btn" 
            :class="{ 'start-btn': exam.status === 'not_started' }"
            @click="viewExamDetail(exam.id)"
          >
            {{ exam.status === 'not_started' ? '开始考试' : '查看详情' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-exams {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #333;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.exams-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exam-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.exam-card:hover {
  transform: translateY(-4px);
}

.exam-header {
  margin-bottom: 16px;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.exam-course {
  font-size: 14px;
  color: #666;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.exam-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
  min-width: 70px;
}

.info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.info-value.score {
  color: #1890ff;
  font-weight: 600;
}

.status {
  font-size: 14px;
  font-weight: 500;
}

.exam-analysis {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.analysis-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.analysis-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.stat-item.correct .stat-value {
  color: #52c41a;
}

.stat-item.wrong .stat-value {
  color: #f5222d;
}

.stat-item.partial .stat-value {
  color: #faad14;
}

.stat-item.accuracy .stat-value {
  color: #1890ff;
}

.exam-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #1890ff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #40a9ff;
}

.start-btn {
  background: #52c41a;
}

.start-btn:hover {
  background: #73d13d;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .page-title {
    color: #e0e0e0;
  }

  .exam-card {
    background: #2d2d2d;
  }

  .exam-title {
    color: #e0e0e0;
  }

  .exam-course {
    color: #aaa;
    background: #363636;
  }

  .info-label {
    color: #aaa;
  }

  .info-value {
    color: #e0e0e0;
  }

  .exam-analysis {
    background: #363636;
  }

  .analysis-title {
    color: #e0e0e0;
  }

  .stat-label {
    color: #aaa;
  }

  .exam-footer {
    border-top-color: #404040;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .exam-info {
    grid-template-columns: 1fr;
  }

  .analysis-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
