# Redux 状态管理

## 1.简介

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。[Redux 官网](https://redux.js.org/)

## 2.基础

### Action

Action 就是把数据从应用传到`store`的有效载荷。它是`store`数据的唯一来源。一般会通过`store.dispatch()`将`action`传到`store`。下面是一个简单`action`例子：

```javascript
const ADD_TODO = "ADD_TODO"

{
    type:ADD_TODO,
    text:'xxxxxx'	//这里是从应用中传过来的数据
}
```

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。

通常情况下，我们会使用函数的方式返回`action`，这样我就不会考虑`type`的值了，只用关注从应用传递过来的值，这样每一个`action`都是独立的。

```javascript
const ADD_TODO = "ADD_TODO";

function addTode(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
```

### **Reducers**

**Reducers** 指定了应用状态的变化如何响应 [actions](https://www.redux.org.cn/docs/basics/Actions.html) 并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。

其实`reducers`就是一个纯函数，接受`action`和旧的`state`，返回新的`state`。

```javascript
(previousState, action) => newState;
```

之所以将这样的函数称之为 reducer，是因为这种函数与被传入 [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作：

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

下面是一个完整的`reducers`例子：

```javascript
const ADD_TODO = "ADD_TODO";

const initState = {
  name: "hades",
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        name: action.name,
      };
    default:
      return {
        ...state,
      };
  }
};
```

### Store

前面说过使用 [reducers](https://www.redux.org.cn/docs/basics/Reducers.html) 来根据 action 更新 state， **Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 返回的函数注销监听器。

**Redux 应用只有一个单一的 store**。

### redux-devtools-extension

这是一个 redux 的插件，需要在创建`store`引入，然后在谷歌浏览器中安装`Redux DevTools`插件，就可以在控制台中查看`state`的值和变化。

```javascript
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
export default () => createStore(reducers, composeWithDevTools());
```

## 3.在 React 中使用 Redux

Redux 和 React 之间其实是没有任何关系的，就行`java`和`JavaScript`一样，Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

所以我们使用`react-redux`把两者连接起来。[官网文档](https://react-redux.js.org/)

`react-redux`提供两个重要的组件，一个是`Provider `，另一个是`connect `。Provider 的作用是让 App 的所有子组件默认都可以拿到 state。`connect `的作用是让组件能够获取到 state 值。

## 4.完整例子

部分代码

```javascript
// index.js 文件
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux'
import App from './App';
import store from './store/store'
ReactDOM.render(
  <Provider store={store()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// store.js
import { createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'
export default () =>createStore(reducers,composeWithDevTools())

// action.js
export const type ={
    NAME:'NAME'
}

export function setName(name){
    return {
        type:type.NAME,
        name
    }
}

//reducers.js
import { type } from './action'

const initState = {
    name:'hello redux',
    age:18
}

export default ( state = initState,action) =>{
    switch(action.type){
        case type.NAME :
            return{
                ...state,
                name:action.name
            }
        default :
            return {
                ...state
            }
    }
}

//App.js
import React,{ useState} from 'react';
import { setName } from './store/action'
import { connect } from 'react-redux'
import './app.css'
function App({name,age,dispatch}) {
  const [inputName,setInputName] = useState()
  return (
    <div className="App">
      <div className="name">
        <span>名字：</span>
        {name}
      </div>
      <div className="age">
        <span>年龄：</span>
        {age}
      </div>

      <div className="name-input">
        <span>名字输入框：</span>
        <input onChange={(e)=>setInputName(e.target.value)}/>
        <div style={{marginLeft:20}} onClick={ ()=>dispatch(setName(inputName))} >确定修改			</div>
      </div>

    </div>
  );
}

const mapStateToProps = state =>{
  return {
    name:state.name,
    age:state.age
  }
}

export default connect(mapStateToProps)(App);

```

[源码地址](https://github.com/HDAES/example/tree/master/redux-example)
