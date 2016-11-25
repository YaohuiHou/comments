# 新版专题评论系统
采用微信开源的前端自动化工具weflow进行开发
必选参数帖子id:tid,皮肤:theme;
实例：comment.php?tid=1222&theme=dark;
theme现阶段只提供两个值 light,dark;

## 项目开发简介

### 概述
- 新建/导入 本地项目目录
- 按需配置相关自动化选项，默认开启LiveReload自动刷新功能
- 配置REM自动化适配解决方案，开启WebP解决方案，支持增量编译
- 可配置与远程静态文件服务器自动同步功能

### 生产编译
- Less -> CSS
- AutoPrefixer前缀自动补全
- postCSS包含了cssnano,CSS Sprites自动合成 @2x && @3x自动生成适配
- imagemin 图片自动压缩
- js 自动合并压缩
