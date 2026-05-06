/**
 * ===================================================
 * 导航栏配置文件
 * ===================================================
 *
 * 功能说明：
 * - 定义整个站点的导航栏菜单结构
 * - 支持一级菜单、二级下拉菜单、三级嵌套菜单
 * - 配置每个菜单项的显示文本和跳转链接
 *
 * 菜单结构：
 * - 导读（单页链接）
 * - 基础与原理（二级菜单：计算机导论、组成原理、操作系统、计算机网络）
 * - 编程语言（三级菜单：Java、Go、Python、前端各自的子分类）
 * - 框架与中间件（二级菜单 + Spring生态三级菜单）
 * - 架构设计（二级菜单 + 分布式系统三级菜单）
 * - 工程实践（二级菜单）
 * - 工程效能（二级菜单）
 * - 算法与数据结构（二级菜单）
 * - AI与大数据（二级菜单）
 * - 云原生（二级菜单）
 * - 关于（单页链接）
 */

export default [
  { text: '导读', link: '/docs/guide/' },
  {
    text: '基础与原理',
    items: [
      { text: '计算机导论', link: '/docs/fundamentals/introduction/' },
      { text: '计算机组成原理', link: '/docs/fundamentals/organization/' },
      { text: '操作系统', link: '/docs/fundamentals/os/' },
      { text: '计算机网络', link: '/docs/fundamentals/network/' }
    ]
  },
  {
    text: '编程语言',
    items: [
      {
        text: 'Java',
        items: [
          { text: '基础语法', link: '/docs/programming/java/basic-syntax/variables' },
          { text: '集合框架', link: '/docs/programming/java/collections/' },
          { text: '并发编程', link: '/docs/programming/java/concurrency/' },
          { text: 'JVM', link: '/docs/programming/java/jvm/' },
          { text: 'Java新特性', link: '/docs/programming/java/new-features/' }
        ]
      },
      {
        text: 'Go',
        items: [
          { text: '基础语法', link: '/docs/programming/go/basic-syntax/' },
          { text: '并发模型', link: '/docs/programming/go/concurrency/' },
          { text: 'GMP模型', link: '/docs/programming/go/gmp/' },
          { text: '标准库', link: '/docs/programming/go/stdlib/' }
        ]
      },
      {
        text: 'Python',
        items: [
          { text: '基础语法', link: '/docs/programming/python/basic-syntax/' },
          { text: '脚本开发', link: '/docs/programming/python/scripting/' }
        ]
      },
      {
        text: '前端',
        items: [
          { text: 'JavaScript&TypeScript', link: '/docs/programming/frontend/javascript/' },
          { text: '浏览器原理', link: '/docs/programming/frontend/browser/' },
          { text: '前端工程化', link: '/docs/programming/frontend/engineering/' },
          { text: '框架', link: '/docs/programming/frontend/frameworks/' }
        ]
      }
    ]
  },
  {
    text: '框架与中间件',
    items: [
      { text: 'MySQL', link: '/docs/frameworks/mysql/' },
      { text: 'Redis', link: '/docs/frameworks/redis/' },
      { text: '消息队列', link: '/docs/frameworks/message-queue/' },
      {
        text: 'Spring生态',
        items: [
          { text: 'Spring', link: '/docs/frameworks/spring/spring/' },
          { text: 'Spring MVC', link: '/docs/frameworks/spring/spring-mvc/' },
          { text: 'Spring Boot', link: '/docs/frameworks/spring/spring-boot/' },
          { text: 'Spring Cloud', link: '/docs/frameworks/spring/spring-cloud/' }
        ]
      }
    ]
  },
  {
    text: '架构设计',
    items: [
      {
        text: '分布式系统',
        items: [
          { text: '分布式理论', link: '/docs/architecture/distributed/theory/' },
          { text: '分布式事务', link: '/docs/architecture/distributed/transaction/' },
          { text: '分布式锁', link: '/docs/architecture/distributed/lock/' }
        ]
      },
      { text: '高并发设计', link: '/docs/architecture/high-concurrency/' },
      { text: '微服务架构设计', link: '/docs/architecture/microservices/' },
      { text: '服务治理', link: '/docs/architecture/service-governance/' },
      { text: '分布式组件', link: '/docs/architecture/distributed-components/' }
    ]
  },
  {
    text: '工程实践',
    items: [
      { text: '线程问题排查', link: '/docs/engineering/troubleshooting/' },
      { text: '性能优化案例', link: '/docs/engineering/performance/' },
      { text: '并发问题解决', link: '/docs/engineering/cases/' },
      { text: '踩坑与问题复盘', link: '/docs/engineering/lessons/' }
    ]
  },
  {
    text: '工程效能',
    items: [
      { text: 'Git使用与进阶技巧', link: '/docs/devops/git/' },
      { text: 'Maven&Gradle构建工具', link: '/docs/devops/maven-gradle/' },
      { text: 'CI/CD', link: '/docs/devops/ci-cd/' },
      { text: '监控与诊断', link: '/docs/devops/monitoring/' }
    ]
  },
  {
    text: '算法与数据结构',
    items: [
      { text: '数据结构基础', link: '/docs/algorithms/data-structures/' },
      { text: '常见算法', link: '/docs/algorithms/common-algorithms/' },
      { text: '算法思想', link: '/docs/algorithms/algorithm-thinking/' },
      { text: '程序员数学', link: '/docs/algorithms/math/' },
      { text: 'LeetCode刷题记录', link: '/docs/algorithms/leetcode/' }
    ]
  },
  {
    text: 'AI与大数据',
    items: [
      { text: '大模型基础', link: '/docs/ai-bigdata/llm/' },
      { text: 'AI工程化', link: '/docs/ai-bigdata/ai-engineering/' },
      { text: '向量数据库', link: '/docs/ai-bigdata/vector-db/' },
      { text: 'Flink流处理', link: '/docs/ai-bigdata/flink/' },
      { text: 'Spark计算框架', link: '/docs/ai-bigdata/spark/' }
    ]
  },
  {
    text: '云原生',
    items: [
      { text: 'Docker容器化', link: '/docs/cloud-native/docker/' },
      { text: 'Kubernetes', link: '/docs/cloud-native/kubernetes/' },
      { text: '容器网络', link: '/docs/cloud-native/container-network/' },
      { text: 'Service Mesh', link: '/docs/cloud-native/service-mesh/' },
      { text: '云原生架构设计', link: '/docs/cloud-native/cloud-native-design/' }
    ]
  },
  { text: '关于', link: '/about.md' }
];
