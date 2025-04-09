<template>
    <div class="video-page">
        <div class="video-description">
            <h2>编写一个用户登录的GUI布局管理器</h2>
        </div>
        <p>编写 “华山论剑” 的GUI界面，无论如何改变窗体大小,
            五大英雄布局不改变</p>
        <img src="@/assets/coursestadys/videopage4-1.png" alt="" />
        <div class="text-intro">
            <h2>学生模仿</h2>
            <p>（1）新建Hslj.java源程序文件</p>
            <p>（2）定义Hslj类，并继承JFrame</p>
            <p>（3）定义构造方法并设置窗体的布局管理器为BorderlLayout</p>
            <p>（4）定义5个JButton，并按方位添加</p>
            <p>（5）编写main方法，通过改变窗体大小完成测试</p>
            <h3>分析归纳</h3>
            <p>（1） FlowLayout界面元素因窗体大小调整而改变位置;</p>
            <p>（2） BorderLayout将界面氛围东南西北中五个方位；</p>
            <p>（3） Border Layout窗体添加组件时，需指定添加方位，默认为中；</p>
            <p>（4） JFrame默认布局管理器为BorderLayout， JPanel默认布局管理器为FlowLayout</p>
            <p>（5）布局管理器是awt提供的界面元素布局的管理工具类。</p>
            <h3>独立实践</h3>
            <img src="@/assets/coursestadys/videopage4-2.png" alt="" />
        </div>
    </div>
</template>