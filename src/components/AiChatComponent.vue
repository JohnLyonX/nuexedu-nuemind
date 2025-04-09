<script setup>
import { ref, nextTick, onMounted } from 'vue';

const messages = ref([]);
const userInput = ref('');
const chatBox = ref(null);

// 自动滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
};

const handleStream = async (reader, id) => {
  const decoder = new TextDecoder();
  let messageBuffer = '';

  const readStream = async () => {
    const { value, done } = await reader.read();
    if (done) {
      // 更新最终消息
      const index = messages.value.findIndex(m => m.id === id);
      if (index !== -1) {
        messages.value[index].html = messageBuffer;
      }
      return;
    }

    messageBuffer += decoder.decode(value, { stream: true });

    const existingIndex = messages.value.findIndex(m => m.id === id);
    if (existingIndex !== -1) {
      messages.value[existingIndex].content = messageBuffer;
    } else {
      messages.value.push({
        content: messageBuffer,
        isUser: false,
        id: id
      });
    }

    await scrollToBottom();
    readStream();
  };

  await readStream();
};

const sendMessage = async () => {
  const message = userInput.value.trim();
  if (!message) return;

  // 添加用户消息（保持不变）
  messages.value.push({
    content: message,
    isUser: true,
    id: Date.now()
  });

  userInput.value = '';
  await scrollToBottom();

  try {
    const id = Date.now();
    const userId = 'nuecout1';
    // 修改请求URL部分
    const response = await fetch(
      `http://localhost:8081/api/aiAgent?userId=${encodeURIComponent(userId)}&message=${encodeURIComponent(message)}`,
      {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.ok && response.body) {
      const reader = response.body.getReader();
      await handleStream(reader, id);
    }
  } catch (error) {
    console.error('请求失败:', error);
    messages.value.push({
      content: '消息发送失败，请稍后再试',
      isUser: false,
      id: Date.now()
    });
    await scrollToBottom();
  }
};
</script>

<template>
  <div class="chat-container">
    <div ref="chatBox" class="chat-box">
      <div
        v-for="(msg, index) in messages"
        :key="msg.id"
        :class="['message', msg.isUser ? 'user-message' : 'bot-message']"
      >
        <div class="message-content">
          {{ msg.content }}
          <div v-if="!msg.isUser && index === messages.length - 1" class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="input-area">
      <div class="input-wrapper">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="输入消息..."
          class="message-input"
        />
        <button @click="sendMessage" class="send-btn">
          <svg class="send-icon" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f6fa;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.chat-box {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fe 100%);
}

.message {
  max-width: 72%;
  padding: 0;
  margin: 4px 0;
  position: relative;
  transition: transform 0.2s ease;
}

.message:hover {
  transform: translateX(4px);
}

.bot-message {
  align-self: flex-start;
  animation: slideInLeft 0.3s ease;
}

.user-message {
  align-self: flex-end;
  animation: slideInRight 0.3s ease;
}

.message-content {
  padding: 14px 20px;
  border-radius: 20px;
  line-height: 1.6;
  font-size: 15px;
  word-break: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.bot-message .message-content {
  background: white;
  color: #1a1a1a;
  border: 1px solid #eceef2;
  border-radius: 20px 20px 20px 6px;
}

.user-message .message-content {
  background: linear-gradient(135deg, #3e7afe, #3568e4);
  color: white;
  border-radius: 20px 20px 6px 20px;
}

.input-area {
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #f0f2f5;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);
}

.input-wrapper {
  display: flex;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.message-input {
  flex: 1;
  padding: 12px 20px;
  border: 1px solid #e0e3eb;
  border-radius: 16px;
  font-size: 15px;
  transition: all 0.25s ease;
}

.message-input:focus {
  border-color: #3e7afe;
  box-shadow: 0 0 0 3px rgba(62, 122, 254, 0.15);
  outline: none;
}

.send-btn {
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #3e7afe;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover {
  background: #3568e4;
  transform: translateY(-1px);
}

.send-btn:active {
  transform: translateY(1px);
}

.send-icon {
  width: 20px;
  height: 20px;
}

/* 打字动画 */
.typing-indicator {
  display: flex;
  gap: 6px;
  padding: 12px 0 4px;
}

.dot {
  width: 7px;
  height: 7px;
  background: #d3d8e4;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* 消息入场动画 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 美化滚动条 */
.chat-box::-webkit-scrollbar {
  width: 8px;
}

.chat-box::-webkit-scrollbar-track {
  background: rgba(200, 200, 200, 0.1);
  border-radius: 4px;
}

.chat-box::-webkit-scrollbar-thumb {
  background: #c1c6d0;
  border-radius: 4px;
}

.chat-box::-webkit-scrollbar-thumb:hover {
  background: #a8acb5;
}
</style>

