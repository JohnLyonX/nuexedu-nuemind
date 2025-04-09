<template>
  <div class="video-page">
    <div class="video-description">
      <h1>Java面向对象编程</h1>
    </div>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ODSRbi0saHo?si=qPoS-Z0HI5NqLv1v"
      title="YouTube video player" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="text-intro">
      <h2>知识引入 </h2>
      <p>第1步：新建java源文件</p>
      <p>第2步：编写类</p>
      <p>第3步：编写主函数</p>
      <p>第4步：写代码</p>
      <h3>案例源代码</h3>
      <pre>package com.test;

//1.首先写类

/*

{  }是类的作用范围

*/

//类名命名遵循大驼峰命名规则

//AnimalDog

class Student{

}

class Teacher{

}

class Test0201{

    //2.编写主函数:是程序的入口

    public static void main(String[] args){

         System.out.println("Hello,World!");

   }

}</pre>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text-intro {
  line-height: 1.6;
  color: #343a40;
}</style>