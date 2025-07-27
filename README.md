# QuickCDN

一个快速、可靠的公共静态资源库检索工具。基于 CDNJS API，为开发者提供便捷的前端开源项目 CDN 链接搜索服务。

[![GitHub license](https://img.shields.io/github/license/muzihuaner/quickCDN)](https://github.com/muzihuaner/quickCDN/blob/main/LICENSE)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

## ✨ 特性

- 🚀 实时搜索：快速检索数千个前端开源项目
- 📦 常用包展示：展示热门 JavaScript 库的最新版本
- 🌙 深色模式：支持浅色/深色主题切换
- 📱 响应式设计：完美适配各种设备屏幕
- 🔄 实时更新：与 CDNJS API 实时同步
- 🎨 优雅界面：基于 Tailwind CSS 的现代设计

## 🛠 技术栈

- HTML5 + Tailwind CSS：构建现代化响应式界面
- JavaScript + jQuery：实现交互功能
- CDNJS API：提供实时数据
- SweetAlert2：优雅的提示信息
- Font Awesome：丰富的图标支持

## 📦 安装

1. 克隆仓库：

```bash
git clone https://github.com/muzihuaner/quickCDN.git
```

2. 进入项目目录：

```bash
cd quickCDN
```

3. 使用 VS Code 的 Live Server 或其他 HTTP 服务器运行项目。

## 🚀 使用说明

1. 直接搜索：
   - 在搜索框输入库名（如 "vue"、"react" 等）
   - 支持模糊搜索
   - 按回车或点击搜索图标开始搜索

2. 常用包：
   - 首页直接展示常用的 JavaScript 库
   - 显示版本号和简介
   - 一键复制 CDN 链接

3. 深色模式：
   - 点击导航栏右侧的月亮/太阳图标切换
   - 自动记忆用户偏好
   - 支持跟随系统主题

## 📄 API 说明

本项目使用 CDNJS API，主要接口：

- 搜索接口：`https://api.cdnjs.com/libraries?search=[关键词]`
- 库总数接口：`https://api.cdnjs.com/libraries`

CDN 域名使用 `cdnjs.quickso.cn` 作为国内加速节点。

## 🤝 贡献指南

欢迎提交问题和改进建议！提交代码前请确保：

1. 代码符合项目规范
2. 更新相关文档
3. 添加必要的测试
4. 提交有意义的 commit 信息

## 📝 开源协议

本项目基于 MIT 协议开源，详见 [LICENSE](LICENSE) 文件。

## 🔗 相关链接

- [CDNJS](https://cdnjs.com)
- [jsDelivr](https://www.jsdelivr.com)
- [Cloudflare](https://www.cloudflare.com)
- [UNPKG](https://unpkg.com)

## 👨‍💻 作者

- 木子欢儿 [@muzihuaner](https://github.com/muzihuaner)

## 🙏 鸣谢

感谢以下开源项目：

- [Tailwind CSS](https://tailwindcss.com)
- [jQuery](https://jquery.com)
- [SweetAlert2](https://sweetalert2.github.io)
- [Font Awesome](https://fontawesome.com)
