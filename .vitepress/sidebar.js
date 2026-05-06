/**
 * ===================================================
 * 侧边栏配置文件
 * ===================================================
 *
 * 功能说明：
 * - 定义每个文档页面对应的侧边栏内容
 * - 根据当前访问的URL路径动态显示对应的侧边栏
 * - 每个侧边栏配置包含分组标题和文章链接列表
 *
 * 配置结构：
 * - key: 文档路径前缀（如 '/docs/fundamentals/introduction/'）
 * - value: 侧边栏分组数组，每个分组包含标题和文章列表
 *
 * 文章链接：
 * - 目前为占位符链接，实际文章添加后需同步更新此处配置
 * - 支持多级分类结构
 */

export default {
  '/docs/fundamentals/introduction/': [
    {
      text: '计算机导论',
      items: [
        { text: '文章1', link: '/docs/fundamentals/introduction/article1' },
        { text: '文章2', link: '/docs/fundamentals/introduction/article2' },
        { text: '文章3', link: '/docs/fundamentals/introduction/article3' }
      ]
    }
  ],
  '/docs/fundamentals/organization/': [
    {
      text: '计算机组成原理',
      items: [
        { text: '文章1', link: '/docs/fundamentals/organization/article1' },
        { text: '文章2', link: '/docs/fundamentals/organization/article2' }
      ]
    }
  ],
  '/docs/fundamentals/os/': [
    {
      text: '操作系统',
      items: [
        { text: '文章1', link: '/docs/fundamentals/os/article1' },
        { text: '文章2', link: '/docs/fundamentals/os/article2' },
        { text: '文章3', link: '/docs/fundamentals/os/article3' },
        { text: '文章4', link: '/docs/fundamentals/os/article4' }
      ]
    }
  ],
  '/docs/fundamentals/network/': [
    {
      text: '计算机网络',
      items: [
        { text: '文章1', link: '/docs/fundamentals/network/article1' },
        { text: '文章2', link: '/docs/fundamentals/network/article2' }
      ]
    }
  ],
  '/docs/programming/java/basic-syntax/': [
    {
      text: '基础语法',
      items: [
        { text: '变量与运算符', link: '/docs/programming/java/basic-syntax/variables' },
        { text: '流程控制', link: '/docs/programming/java/basic-syntax/control-flow' },
        { text: '数组', link: '/docs/programming/java/basic-syntax/arrays' },
        { text: '方法', link: '/docs/programming/java/basic-syntax/methods' }
      ]
    }
  ],
  '/docs/programming/java/collections/': [
    {
      text: '集合框架',
      items: [
        { text: 'List接口', link: '/docs/programming/java/collections/list' },
        { text: 'Set接口', link: '/docs/programming/java/collections/set' },
        { text: 'Map接口', link: '/docs/programming/java/collections/map' },
        { text: 'Collections工具类', link: '/docs/programming/java/collections/util' }
      ]
    }
  ],
  '/docs/programming/java/concurrency/': [
    {
      text: '并发编程',
      items: [
        { text: '线程基础', link: '/docs/programming/java/concurrency/threads' },
        { text: '同步机制', link: '/docs/programming/java/concurrency/synchronization' },
        { text: '并发容器', link: '/docs/programming/java/concurrency/containers' },
        { text: 'Executor框架', link: '/docs/programming/java/concurrency/executor' }
      ]
    }
  ],
  '/docs/programming/java/jvm/': [
    {
      text: 'JVM',
      items: [
        { text: 'JVM内存模型', link: '/docs/programming/java/jvm/memory-model' },
        { text: '垃圾回收', link: '/docs/programming/java/jvm/gc' },
        { text: '类加载机制', link: '/docs/programming/java/jvm/class-loading' }
      ]
    }
  ],
  '/docs/programming/go/basic-syntax/': [
    {
      text: '基础语法',
      items: [
        { text: '文章1', link: '/docs/programming/go/basic-syntax/article1' },
        { text: '文章2', link: '/docs/programming/go/basic-syntax/article2' }
      ]
    }
  ],
  '/docs/programming/go/concurrency/': [
    {
      text: '并发模型',
      items: [
        { text: 'Goroutine', link: '/docs/programming/go/concurrency/goroutine' },
        { text: 'Channel', link: '/docs/programming/go/concurrency/channel' },
        { text: 'Select', link: '/docs/programming/go/concurrency/select' }
      ]
    }
  ],
  '/docs/programming/python/basic-syntax/': [
    {
      text: '基础语法',
      items: [
        { text: '文章1', link: '/docs/programming/python/basic-syntax/article1' },
        { text: '文章2', link: '/docs/programming/python/basic-syntax/article2' }
      ]
    }
  ],
  '/docs/programming/frontend/javascript/': [
    {
      text: 'JavaScript&TypeScript',
      items: [
        { text: 'ES6+特性', link: '/docs/programming/frontend/javascript/es6' },
        { text: '异步编程', link: '/docs/programming/frontend/javascript/async' },
        { text: 'TypeScript基础', link: '/docs/programming/frontend/javascript/typescript' }
      ]
    }
  ],
  '/docs/frameworks/mysql/': [
    {
      text: 'MySQL',
      items: [
        { text: 'SQL基础', link: '/docs/frameworks/mysql/sql-basic' },
        { text: '索引优化', link: '/docs/frameworks/mysql/index-optimization' },
        { text: '事务隔离', link: '/docs/frameworks/mysql/transaction' }
      ]
    }
  ],
  '/docs/frameworks/redis/': [
    {
      text: 'Redis',
      items: [
        { text: '数据结构', link: '/docs/frameworks/redis/data-structures' },
        { text: '缓存策略', link: '/docs/frameworks/redis/cache-strategy' },
        { text: '分布式锁', link: '/docs/frameworks/redis/distributed-lock' }
      ]
    }
  ],
  '/docs/frameworks/spring/spring-boot/': [
    {
      text: 'Spring Boot',
      items: [
        { text: '快速入门', link: '/docs/frameworks/spring/spring-boot/quick-start' },
        { text: '自动配置', link: '/docs/frameworks/spring/spring-boot/autoconfig' },
        { text: 'Starter原理', link: '/docs/frameworks/spring/spring-boot/starter' }
      ]
    }
  ],
  '/docs/architecture/distributed/theory/': [
    {
      text: '分布式理论',
      items: [
        { text: 'CAP定理', link: '/docs/architecture/distributed/theory/cap' },
        { text: 'BASE理论', link: '/docs/architecture/distributed/theory/base' },
        { text: '一致性协议', link: '/docs/architecture/distributed/theory/consistency' }
      ]
    }
  ],
  '/docs/algorithms/data-structures/': [
    {
      text: '数据结构基础',
      items: [
        { text: '链表', link: '/docs/algorithms/data-structures/linked-list' },
        { text: '树', link: '/docs/algorithms/data-structures/tree' },
        { text: '堆', link: '/docs/algorithms/data-structures/heap' },
        { text: '图', link: '/docs/algorithms/data-structures/graph' }
      ]
    }
  ],
  '/docs/algorithms/sorting/': [
    {
      text: '排序算法',
      items: [
        { text: '快速排序', link: '/docs/algorithms/sorting/quick-sort' },
        { text: '归并排序', link: '/docs/algorithms/sorting/merge-sort' },
        { text: '堆排序', link: '/docs/algorithms/sorting/heap-sort' }
      ]
    }
  ],
  '/docs/cloud-native/docker/': [
    {
      text: 'Docker容器化',
      items: [
        { text: 'Docker基础', link: '/docs/cloud-native/docker/basic' },
        { text: 'Dockerfile', link: '/docs/cloud-native/docker/dockerfile' },
        { text: 'Docker Compose', link: '/docs/cloud-native/docker/compose' }
      ]
    }
  ],
  '/docs/cloud-native/kubernetes/': [
    {
      text: 'Kubernetes',
      items: [
        { text: 'Pod', link: '/docs/cloud-native/kubernetes/pod' },
        { text: 'Deployment', link: '/docs/cloud-native/kubernetes/deployment' },
        { text: 'Service', link: '/docs/cloud-native/kubernetes/service' }
      ]
    }
  ],
  '/docs/guide/': [
    {
      text: '博客导读',
      items: [
        { text: '博客结构', link: '/docs/guide/#博客结构' },
        { text: '学习路径', link: '/docs/guide/#学习路径建议' }
      ]
    }
  ],
  '/articles/': [
    {
      text: '文章列表',
      items: [
        { text: '我的第一篇文章', link: '/articles/first-post/' },
        { text: '我的第二篇文章', link: '/articles/second-post/' }
      ]
    }
  ]
};
