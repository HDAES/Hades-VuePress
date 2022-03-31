# Typescript

## 内置类型

### 1.Partial （部分的）

```typescript
type Partial<T> = {
    [P in keyof T]?: T[P];
};

interface Person {
  name: string;
  age: number;
  gender: boolean;
}

const xiaomi: Partial<Person> = {
  name: "小明",
  age: 10,
};

=>  { gender? : boolean}
```

### 2.Pick  （选择）

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

interface Person {
  name: string;
  age: number;
  gender: boolean;
}

type PickPerson = Pick<Person, "name" | "age">;

const xiaomhei: PickPerson = {
  name: "小黑",
  age: 10,
};  //gender 就会被 筛选掉
```

### 3. typeof

```typescript
const xiaobai: typeof xiaomhei = {
  name: "小白",
  age: 18,
}
```

### 4.Record

Record 后面的泛型就是对象键和值的类型。

```typescript
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};

type keys = 'A' | 'B' | 'C'
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3
}
```



##  interface & type 的区别

```typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const xiaomi: Person = {
  name: "xiaomi",
  age: 18,
};
// 可以合并

type PersonB = {
  age: number;
};
type PersonB = { //标识符“PersonB”重复
  name: string;
};

//可以被继承
interface A extends Person {}
const xiaoHi: A = {
  name: "xiaomi",
  age: 18,
};

type B extends PersonB = {} //找不到名称“extends”
```

