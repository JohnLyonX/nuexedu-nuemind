<script setup>
import { ref, computed } from 'vue';
import VideoPage1 from '@/views/course/videopage/VideoPage1.vue';
import VideoPage2 from '@/views/course/videopage/VideoPage2.vue';
import ExamPage from '@/views/course/videopage/ExamPage.vue';
import VideoPage3 from '@/views/course/videopage/VideoPage3.vue';
import VideoPage4 from '@/views/course/videopage/VideoPage4.vue';

const modules = ref(['目录']);
const activeModule = ref(0);
const collapsedItems = ref([]);
const directoryItems = ref([
  // 目录
  [
    {
      id: 1,
      title: '1.编写Java程序',
      children: [
        {
          id: 11,
          title: '编写第一个Java程序',
        },
        {
          id: 12,
          title: '实现Java类继承、方法重载、重写',
        },
        {
          id: 13,
          title: '章节考试1',
        }
      ]
    },
    {
      id: 2,
      title: '2.GUI编程',
      children: [
        {
          id: 21,
          title: 'GUI布局管理',
        },
        {
          id: 22,
          title: 'Swing组件编程',
        },
        {
          id: 23,
          title: '章节考试2',
        }
      ]
    }
  ]
]);

const currentDirectoryItems = computed(() => {
    return directoryItems.value[activeModule.value];
});

const switchVideo = (index) => {
    activeModule.value = index;
    if (index === 0) {
        currentVideoComponent.value = VideoPage1;
    }else if (index === 1) {
        currentVideoComponent.value = VideoPage2;
    }else if (index === 2) {
        currentVideoComponent.value = ExamPage;
    }
};

// 切换一级目录的展开和收起状态
const toggleCollapse = (itemId) => {
  const index = collapsedItems.value.indexOf(itemId);
  if (index === -1) {
    collapsedItems.value.push(itemId);
  } else {
    collapsedItems.value.splice(index, 1);
  }
};

const currentVideoComponent = ref(VideoPage1);
// 添加对二级目录项的处理逻辑
const handleDirectoryItemClick = (childId) => {
  const componentMap = {
    11: VideoPage1,
    12: VideoPage2,
    13: ExamPage,
    21: VideoPage4,
    22: VideoPage3,
    23: ExamPage,
  };
  currentVideoComponent.value = componentMap[childId] || VideoPage1;
};

// 拖动功能相关代码
const startResize = (e) => {
  const rightContainer = e.target.parentElement;
  const startX = e.clientX;
  const startWidth = rightContainer.offsetWidth;

  const onMouseMove = (e) => {
    const newWidth = startWidth - (e.clientX - startX);
    rightContainer.style.width = `${newWidth}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <div id="app" class="app-container">
    <!-- 右侧功能区（25%宽度） -->
    <div class="right-container">
      <div class="resize-handle" @mousedown="startResize"></div> <!-- 拖动区域保持不变 -->
      <!-- 右侧顶部导航栏（占右侧区域25%高度） -->
      <div class="right-navbar">
        <div
            v-for="(module, index) in modules"
            :key="index"
            class="module-item"
            :class="{ active: activeModule === index }"
            @click="switchVideo(index)"
        >
          {{ module }}
        </div>
      </div>

      <!-- 右侧目录区（占右侧区域75%高度，可左右滚动） -->
      <div class="directory-container">
        <ul class="directory-list">
          <li
              v-for="item in currentDirectoryItems"
              :key="item.id"
              class="directory-item"
          >
            <div
                class="item-title"
                @click="toggleCollapse(item.id)"
            >
              <i class="fas fa-folder"></i> {{ item.title }}
            </div>
            <ul
                v-if="item.children && !collapsedItems.includes(item.id)"
                class="sub-directory"
            >
              <li v-for="child in item.children" :key="child.id" class="sub-item">
                <div class="item-title" @click="handleDirectoryItemClick(child.id)">
                  {{ child.title }}
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 左侧主内容区（75%宽度） -->
    <component
        :is="currentVideoComponent"
        class="left-side"
        :class="{'video-page-1': activeModule === 0, 'video-page-2': activeModule === 2}"
    ></component>
  </div>
</template>

<style>

/* 全局布局 */
.app-container {
  margin-top: 5rem;
  display: flex;
  flex-direction: row-reverse;
  background-image: url(@/assets/coursestadys/灰色背景-001.png);
}

/* 左侧样式 */
.left-side {
  width: 95%;
  padding: 20px;
  box-sizing: border-box;
  border-right: 2px dashed #333;
  border-image: linear-gradient(
    45deg,
    transparent,
    rgba(0,0,0,0.3),
    transparent
  ) 1;
  border-right-style: dashed;
}

/* 视频页面的特定样式 */
.video-page {
  background-color: #eef7ffe0; /* 浅蓝色背景 */
  border-right-color: #007bff; /* 蓝色边框 */
  border-radius: 2%;
}

.video-player {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.text-intro {
  line-height: 1.6;
  color: #343a40;
}

/* 右侧整体样式 */
.right-container {
  width: 25%;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 8px;
  min-width: 18px;
  background-color: #f8f9fa;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  position: fixed;
}

/* 右侧顶部导航栏样式 */
.right-navbar {
  height: 40px;
  display: flex;
  justify-content: space-around;
  padding: 3px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.module-item {
  height: 25px;
  line-height: 25px;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
  white-space: nowrap;
  border-radius: 4px;
  font-weight: bold;
  color: #333;
}

.module-item:hover,
.module-item.active {
  background-color: #e9ecef;
  transform: scale(1.05);
  color: #007bff;
}

/* 添加动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.module-item {
  animation: fadeIn 0.5s ease-in-out;
}

/* 右侧目录区样式 */
.directory-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.directory-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.directory-item {
  margin-bottom: 10px;
}

.item-title {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.item-title i {
  margin-right: 8px;
  color: #007bff;
}

.item-title:hover {
  background-color: #f8f9fa;
}

.sub-directory {
  list-style: none;
  padding-left: 20px;
  margin: 5px 0 0 0;
}

.sub-item {
  padding: 6px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sub-item:hover {
  background-color: #f8f9fa;
}

/* 滚动条样式优化 */
.directory-container::-webkit-scrollbar {
  width: 8px;
}

.directory-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.directory-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.directory-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* 拖动区域样式 */
.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  background-color: #ccc;
}

</style>
