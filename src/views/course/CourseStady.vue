<template>
    <div id="app" class="app-container">
      <!-- 左侧主内容区（75%宽度） -->
      <component 
        :is="currentVideoComponent" 
        class="left-side"
        :class="{'video-page-1': activeModule === 0, 'video-page-2': activeModule === 2}"
      ></component>
  
      <!-- 右侧功能区（25%宽度） -->
      <div class="right-container">
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
  
        <!-- 右侧目录区（占右侧区域75%高度，可滚动） -->
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
                  <div class="item-title">{{ child.title }}</div>
                  <ul v-if="child.children" class="sub-directory">
                    <li v-for="subChild in child.children" :key="subChild.id" class="sub-item">
                      {{ subChild.title }}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import VideoPage1 from '../course/VideoPage1.vue';
  
  export default {
    components: {
      VideoPage1
    },
    data() {
      return {
        modules: ['模块一', '模块二', '模块三'],
        activeModule: 0,
        currentVideoComponent: 'VideoPage1',
        collapsedItems: [], // 新增：用于存储被收起的一级目录项的 ID
        directoryItems: [
          // 模块一的目录
          [
            {
              id: 1,
              title: '一级目录项1',
              children: [
                { 
                  id: 11, 
                  title: '二级目录项1-1',
                  children: [
                    { id: 111, title: '三级目录项1-1-1' },
                    { id: 112, title: '三级目录项1-1-2' }
                  ]
                },
                { 
                  id: 12, 
                  title: '二级目录项1-2',
                  children: [
                    { id: 121, title: '三级目录项1-2-1' },
                    { id: 122, title: '三级目录项1-2-2' }
                  ]
                },
                { 
                  id: 13, 
                  title: '二级目录项1-3',
                  children: [
                    { id: 131, title: '三级目录项1-3-1' },
                    { id: 132, title: '三级目录项1-3-2' }
                  ]
                }
              ]
            },
            {
              id: 2,
              title: '一级目录项2',
              children: [
                { 
                  id: 21, 
                  title: '二级目录项2-1',
                  children: [
                    { id: 211, title: '三级目录项2-1-1' },
                    { id: 212, title: '三级目录项2-1-2' }
                  ]
                },
                { 
                  id: 22, 
                  title: '二级目录项2-2',
                  children: [
                    { id: 221, title: '三级目录项2-2-1' },
                    { id: 222, title: '三级目录项2-2-2' }
                  ]
                }
              ]
            }
          ],
          // 模块二的目录
          [
            {
              id: 3,
              title: '一级目录项3',
              children: [
                { 
                  id: 31, 
                  title: '二级目录项3-1',
                  children: [
                    { id: 311, title: '三级目录项3-1-1' },
                    { id: 312, title: '三级目录项3-1-2' }
                  ]
                },
                { 
                  id: 32, 
                  title: '二级目录项3-2',
                  children: [
                    { id: 321, title: '三级目录项3-2-1' },
                    { id: 322, title: '三级目录项3-2-2' }
                  ]
                }
              ]
            },
            {
              id: 4,
              title: '一级目录项4',
              children: [
                { 
                  id: 41, 
                  title: '二级目录项4-1',
                  children: [
                    { id: 411, title: '三级目录项4-1-1' },
                    { id: 412, title: '三级目录项4-1-2' }
                  ]
                },
                { 
                  id: 42, 
                  title: '二级目录项4-2',
                  children: [
                    { id: 421, title: '三级目录项4-2-1' },
                    { id: 422, title: '三级目录项4-2-2' }
                  ]
                }
              ]
            }
          ],
          // 模块三的目录
          [
            {
              id: 5,
              title: '一级目录项5',
              children: [
                { 
                  id: 51, 
                  title: '二级目录项5-1',
                  children: [
                    { id: 511, title: '三级目录项5-1-1' },
                    { id: 512, title: '三级目录项5-1-2' }
                  ]
                },
                { 
                  id: 52, 
                  title: '二级目录项5-2',
                  children: [
                    { id: 521, title: '三级目录项5-2-1' },
                    { id: 522, title: '三级目录项5-2-2' }
                  ]
                }
              ]
            },
            {
              id: 6,
              title: '一级目录项6',
              children: [
                { 
                  id: 61, 
                  title: '二级目录项6-1',
                  children: [
                    { id: 611, title: '三级目录项6-1-1' },
                    { id: 612, title: '三级目录项6-1-2' }
                  ]
                },
                { 
                  id: 62, 
                  title: '二级目录项6-2',
                  children: [
                    { id: 621, title: '三级目录项6-2-1' },
                    { id: 622, title: '三级目录项6-2-2' }
                  ]
                }
              ]
            }
          ]
        ]
      };
    },
    computed: {
      currentDirectoryItems() {
        return this.directoryItems[this.activeModule];
      }
    },
    methods: {
      switchVideo(index) {
        this.activeModule = index;
        if (index === 0) {
          this.currentVideoComponent = 'VideoPage1';
        } else if (index === 1) {
          this.currentVideoComponent = 'VideoPage3';
        } else if (index === 2) {
          this.currentVideoComponent = 'VideoPage2';
        }
      },
      // 新增：切换一级目录的展开和收起状态
      toggleCollapse(itemId) {
        const index = this.collapsedItems.indexOf(itemId);
        if (index === -1) {
          this.collapsedItems.push(itemId);
        } else {
          this.collapsedItems.splice(index, 1);
        }
      }
    }
  };
  </script>
  
  <style>
  /* 全局布局 */
  .app-container {
    margin-top: 5rem;
    display: flex;
    height: 100vh;
    position: relative;
  }
  
  /* 左侧样式 */
  .left-side {
    width: 75%;
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
  
  /* 视频页面1的特定样式 */
  .video-page-1 {
    background-color: #f0f8ff; /* 浅蓝色背景 */
    border-right-color: #007bff; /* 蓝色边框 */
  }
  
  /* 视频页面2的特定样式 */
  .video-page-2 {
    background-color: #fff0f5; /* 浅粉色背景 */
    border-right-color: #ff69b4; /* 粉色边框 */
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
  </style>