# Part 1

## NPM

node package manager

### Package.json

存储依赖，版本，脚本命令信息

### 依赖结构

存储在 `node_modules` 文件夹中，npm 默认打平依赖树：

扁平化前：

```
node_modules/
├── A/
│   └── node_modules/
│       └── B@1.0.0/
│           └── node_modules/
│               └── C@1.0.0/
└── D/
    └── node_modules/
        └── B@2.0.0/
```

扁平化后：

```
node_modules/
├── A/
├── B@1.0.0/
├── C@1.0.0/
└── D/
└── B@2.0.0/
```

## React

React 采用函数式设计思想，将状态单独隔离，组件只负责渲染。

组件（函数）只有一个返回值。

### 理解 React 纯在哪里？

React 纯函数组件体现在确保 rendering 过程一定是“纯”的，useEffect()， eventHandler 都不是在渲染阶段发生的。

### 纯组件的好处

- run in different environment
- improve performance by skipping rendering
- 随时停止渲染

### 理解 useState

统一管理状态，状态更新时，组件重新渲染。

状态必须通过 setter 更新。

状态只能在一开始声明，好处有:

- 需要事先思考组件有哪些状态，编程是思路明确
- 提醒开发者对有过多状态的组件进行拆分，保持单一职责
- 鼓励开发者少使用状态

### 选择状态结构
