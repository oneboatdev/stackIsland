/**
 * ===================================================
 * VitePress 核心配置文件
 * ===================================================
 *
 * 功能说明：
 * - 定义站点的基本配置（标题、描述、基础路径）
 * - 配置站点头部资源（favicon、样式注入）
 * - 导入并应用导航栏配置（nav.js）
 * - 导入并应用侧边栏配置（sidebar.js）
 * - 配置主题相关的社交链接
 *
 * 配置内容：
 * 1. 站点元信息：标题、描述、base路径
 * 2. head配置：favicon图标、导航栏样式注入
 * 3. themeConfig：logo、导航栏、侧边栏、社交链接
 */

import { defineConfig } from 'vitepress'
import nav from './nav.js'
import sidebar from './sidebar.js'

export default defineConfig({
  title: '栈岛 Stack Island',
  description: '分享技术与生活',
  base: '/stackIsland/',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }]
  ],
  markdown: {
    math: true
  },
  themeConfig: {
    logo: '/img/logo.png',
    nav,
    sidebar,
    outline: {
      level: [1, 2, 3, 4],
      label: '页面导航'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  }
})
