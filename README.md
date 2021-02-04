高级软件开发 作业
=================

| Name | Student ID |
| ---- | ---------- |
| zinc | xxxxx      |

简介
----

**高级软件开发**课程作业

```bash
.
├── Dockerfile
├── jest.config.js
├── NumericalDiff.spec.ts
├── README.md
├── utils.ts
└── whyfp90.pdf

0 directories, 6 files
```



程序
----

### 代码

`/asdt/`目录下为程序运行所需所有代码，其中

| File                    | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `Dockerfile`            | 构建docker容器文件                                           |
| `jest.config.js`        | 项目使用jest作为测试工具，该文件为jest相关配置文件           |
| `NumericalDiff.spec.ts` | `whyfp`文章中4.2节描述的[Numerical Differentiation]内容实现代码 |
| `utils.ts`              | 辅助工具类，老师实现的代码，这里复用                         |
| `whyfp90.pdf`           | Why Functional Programming Matters paper                   |

### 运行

在目录`/asdt/`下，运行

```bash
docker build -t ts .
```

等待image构建成功后，运行

```bash
docker run ts
```

得到结果

```

> ts@1.0.0 test /ts
> jest

PASS src/NumericalDiff.spec.ts
  ✓ Numerical Differentiation (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.351 s
Ran all test suites.
```

此为文件`NumericalDiff.spec.ts`中的测试结果

```typescript
	// test case
	var func = (x: number) => x;
	expect(derivative(differentiate(1)(func)(2))()).toBe(1);	// f(x) = x, f'(x) = 1
	func = (x: number) => x * x;
	expect(derivative(differentiate(2)(func)(2))()).toBe(4); 	// f(x) = x^2, f'(x) = 2x
	func = (x: number) => Math.pow(x, 4);
	expect(derivative(differentiate(1)(func)(2))()).toBe(32); 	// f(x) = x^4, f'(x) = 4x^3
```


