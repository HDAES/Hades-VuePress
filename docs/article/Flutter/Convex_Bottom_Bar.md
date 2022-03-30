# Convex_Bottom_Bar

## 1：简介

ConvexBottomBar 是一个底部导航栏组件，用于展现凸起的 TAB 效果，支持多种内置样式与动画交互。你可以在[https://appbar.codemagic.app](https://appbar.codemagic.app/)上找到在线样例。

[Github]("https://github.com/hacktons/convex_bottom_bar")

[Pub](https://pub.dev/packages/convex_bottom_bar)

## 2：如何使用

```yaml
dependencies:
  convex_bottom_bar: ^latest_version
```

```dart
import 'package:convex_bottom_bar/convex_bottom_bar.dart';

Scaffold(
  bottomNavigationBar: ConvexAppBar(
    items: [
      TabItem(icon: Icons.home, title: 'Home'),
      TabItem(icon: Icons.map, title: 'Discovery'),
      TabItem(icon: Icons.add, title: 'Add'),
      TabItem(icon: Icons.message, title: 'Message'),
      TabItem(icon: Icons.people, title: 'Profile'),
    ],
    initialActiveIndex: 2,//optional, default as 0
    onTap: (int i) => print('click index=$i'),
  )
);
```

## 3：常用参数

| Attributes  |                               Description                               |
| :---------: | :---------------------------------------------------------------------: |
| Description |                               AppBar 背景                               |
|  gradient   |                   渐变属性，可以覆盖 backgroundColor                    |
|   height    |                          AppBar 高度；默认 50                           |
|    color    |                           icon/text 的颜色值                            |
| activeColor |                      icon/text 的**选中态**颜色值                       |
|  curveSize  |                           凸形大小；默认 100                            |
|     top     |                   凸形到 AppBar 上边缘的距离；默认-30                   |
|    style    | 持的样式: **fixed, fixedCircle, react, reactCircle,flip,textIn,titled** |
| chipBuilder |        角标构造器 builder, **ConvexAppBar.badge**会使用默认样式         |

## 4：默认样式

![appbar-theming.png](https://hades0512.oss-cn-beijing.aliyuncs.com/image/2021-02-08/appbar-theming.png)
