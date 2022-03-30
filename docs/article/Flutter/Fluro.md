# Fluro

## 1：简介

`Fluro`是`Flutter`生态下的路由管理，类似于`React`中的`React-Route`和`Vue`中的`Vue-router`。

- 简单的路由导航
- 函数处理程序（映射到函数而不是路由）
- 通配符参数匹配
- 内置常见转换
- 简单的自定义过渡创建

## 2：开始

在项目的根目录下的`pubspec.yaml`文件中添加`fluro`依赖。

[Pub](https://pub.dev/packages/fluro)

## 3：生成路由文件

1. 在`lib`目录下创建`routers`目录，并创建`application.dart`、`router_handler.dart`和`routes.dart`文件；

2. `application.dart`内容为：

   ```dart
   import 'package:fluro/fluro.dart';
   // 路由静态化
   class Application{
     static FluroRouter router;
   }
   ```

3. `routes.dart`的内容：

   ```dart
   import 'package:fluro/fluro.dart';
   import 'package:flutter/material.dart';
   class Routes {
      	//路由地址
       static String web = '/web';

       static void configRoutes(FluroRouter router){
           router.notFoundHandler = new Handler(
               handlerFunc: (BuildContext context, Map<String, dynamic> params){
                   print('ERROR====>ROUTE WAS NOT FONUND!!!');
                   return ;
               }
           );

           //挂载页面
           router.define(web, handler: webHandler);
       }

       // 对参数进行encode，解决参数中有特殊字符，影响fluro路由匹配
     	static Future navigateTo(BuildContext context, String path, {Map<String, dynamic> params, TransitionType transition = TransitionType.fadeIn,bool clear = false,bool replace= false}) {
           String query =  "";
           if (params != null) {
             int index = 0;
             for (var key in params.keys) {
               var value = Uri.encodeComponent(params[key].toString());
               if (index == 0) {
                 query = "?";
               } else {
                 query = query + "\&";
               }
               query += "$key=$value";
               index++;
             }
           }
           if(query!='') //print('我是navigateTo传递的参数：$query');
           path = path + query;
           return Application.router.navigateTo(context, path, transition:transition,clearStack: clear,replace: replace);
         }
   }
   ```

4. `router_handler.dart`的内容：

   ```dart
   Handler webHandler = Handler(
     handlerFunc: (BuildContext context, Map<String,List<String>> params){
       return WebPage();
     }
   );
   ```

## 4：在项目中引入 Fluro

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    final router = FluroRouter();
    Routes.configRoutes(router);
    Application.router = router;

    return MaterialApp(
      title: 'Flutter Demo',
      onGenerateRoute: Application.router.generator,
      home: IndexPage(),
    );
  }
}
```

## 5：跳转、传参

普通跳转，不监听返回；

```dart
Routes.navigateTo(context, Routes.web,params{"data","xxxxx"});
```

普通跳转，监听返回；

```dart
//返回 value值会返回到上一页面
Navigator.pop(context,value);
Routes.navigateTo(context, Routes.web).then((value){
    //通过value来判断是够需要执行
});
```

跳转，清除所有页面

```
Routes.navigateTo(context, Routes.web,params{"data","xxxxx"},clear: true);
```

## 6：跳转样式

```dart
TransitionType transition = TransitionType.fadeIn

enum TransitionType {
  native,
  nativeModal,
  inFromLeft,
  inFromTop,
  inFromRight,
  inFromBottom,
  fadeIn,
  custom,
  material,
  materialFullScreenDialog,
  cupertino,
  cupertinoFullScreenDialog,
  none,
}
```
