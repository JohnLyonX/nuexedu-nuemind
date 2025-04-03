<template>
  <div class="video-page">
    <div class="video-description">
      <p>Java面向对象编程</p>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ODSRbi0saHo?si=qPoS-Z0HI5NqLv1v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="text-intro">
      <h2>new 对象 </h2>
      <p>这里是视频 1 的详细文字介绍内容，支持多行显示。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPage1'
};
</script>

<style scoped>
.video-page {
  padding: 20px;
}

.video-description {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
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
</style>