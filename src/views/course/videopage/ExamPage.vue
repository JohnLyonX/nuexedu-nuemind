<template>
  <div class="file-container">
    <!-- 文件下载 -->
    <div class="download-section">
      <h3>文件列表</h3>
      <ul class="file-list">
        <li
            v-for="file in fileList"
            :key="file.id"
            class="file-item"
        >
          <span class="file-name">{{ file.name }}</span>
          <button
              @click="handleDownload(file.url)"
              class="download-btn"
          >
            下载
          </button>
        </li>
      </ul>
    </div>
    <!-- 文件上传 -->
    <div class="upload-section">
      <h3>文件上传</h3>
      <div class="upload-box">
        <input
            type="file"
            @change="handleFileSelect"
            ref="fileInput"
            class="file-input"
        >
        <button
            @click="handleUpload"
            :disabled="!selectedFile"
            class="upload-btn"
        >
          {{ uploadStatus || '上传文件' }}
        </button>
        <div v-if="uploadProgress > 0" class="progress-bar">
          <div
              class="progress"
              :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
// 引入 npm install axios
// npm install file-saver
import axios from 'axios';
import {saveAs} from 'file-saver';

// 上传相关状态
const selectedFile = ref(null);
const uploadStatus = ref('');
const uploadProgress = ref(0);
const fileInput = ref(null);

// 文件列表数据
const fileList = reactive([
  {id: 2, name: '考试.docx', url: '/src/views/course/videopage/files/第一章考试.docx'}
]);

// 选择文件
const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过10MB');
      resetFileInput();
      return;
    }
    selectedFile.value = file;
    uploadStatus.value = '准备上传：' + file.name;
  }
};

// 执行上传
const handleUpload = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const uploadResp = await axios.post('http://localhost:1024/dev-api/common/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImxvZ2luX3VzZXJfa2V5IjoiNjdjN2Y4MWEtODQwZS00MDlkLWE2N2ItMTcwZGNiZjA2NTQ0In0.NslrSRSJpk--aXVgLbufFTxglVAKdxT_-D-5efjjmaXLIgxFSnxS7lVHVPgRLMwW6lE58E190aZoXyZUZkuA1Q'
      },
      onUploadProgress: progressEvent => {
        if (uploadProgress) {
          uploadProgress.value = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      }
    });

    // 检查上传是否成功
    if (uploadResp.data.code !== 200) {
      throw new Error(uploadResp.data.msg || '上传失败');
    }

    const filePath = uploadResp.data.fileName; // 即 subPath 字段

    // 第二步：调用数据库更新接口
    const updateResp = await axios.put('http://localhost:1024/dev-api/edu/examFilelib', {
      subPath: filePath
    });

    if (updateResp.data.code === 200) {
      return {
        success: true,
        message: '上传并更新数据库成功',
        data: updateResp.data
      };
    } else {
      return {
        success: false,
        message: updateResp.data.msg || '更新数据库失败'
      };
    }

    if (response.data.success) {
      uploadStatus.value = '上传成功！';
      fileList.push({
        id: Date.now(),
        name: selectedFile.value.name,
        url: response.data.url
      });
      resetFileInput();
    }
  } catch (error) {
    uploadStatus.value = '上传失败：' + error.message;
  } finally {
    setTimeout(() => {
      uploadProgress.value = 0;
      uploadStatus.value = '';
    }, 3000);
  }
};

// 下载文件
const handleDownload = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob'
    });
    saveAs(response.data, url.split('/').pop());
  } catch (error) {
    console.error('下载文件失败:', error);
    alert('下载文件失败，请重试。');
  }
};

// 重置文件输入
const resetFileInput = () => {
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<style scoped>
.file-container {
  max-width: 600px;
  height: 100vh;
  margin: 2rem auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.upload-section, .download-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

}

h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
}

.file-input {
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.upload-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.upload-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background: #2980b9;
}

.progress-bar {
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #27ae60;
  transition: width 0.3s ease;
}

.file-list {
  list-style: none;
  padding: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  margin: 0.5rem 0;
  background: #f8f9fa;
  border-radius: 4px;
}

.file-name {
  flex-grow: 1;
  margin-right: 1rem;
}

.download-btn {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.download-btn:hover {
  background: #27ae60;
}
</style>
