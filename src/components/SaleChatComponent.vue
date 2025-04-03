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
    const userId = 'nuecout2';
    // 修改请求URL部分
    const response = await fetch(
      `http://localhost:8081/api/saleAgent?userId=${encodeURIComponent(userId)}&message=${encodeURIComponent(message)}`,
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
        :key="index"
        :class="['message', msg.isUser ? 'user-message' : 'gpt-message']"
      >
        {{ msg.content }}
      </div>
    </div>
    <div class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="让我们来帮你..."
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>



<style scoped>
.chat-container {
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.chat-box {
  height: 300px;
  overflow-y: auto;
  padding: 20px;
  background: #f9f9f9;
}

.message {
  margin: 10px 0;
  padding: 12px 20px;
  border-radius: 20px;
  max-width: 80%;
  word-break: break-word;
}

.user-message {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.gpt-message {
  background: #e9ecef;
  color: #333;
  margin-right: auto;
}

.input-container {
  display: flex;
  padding: 20px;
  background: white;
  border-top: 1px solid #eee;
}

input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
