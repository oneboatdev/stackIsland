# 反射机制概述
## 为什么需要反射？
在 Java 程序中，对象通常有两种类型：**编译时类型**和**运行时类型**。

```java
Object obj = new String("hello");
```

在上述代码中，`obj` 的编译时类型是 `Object`，而运行时类型是 `String`。如果需要调用 `String` 类特有的方法（而非 `Object` 中的方法），通常有两种方案：

1. **强制类型转换**：在编译和运行时都明确知道类型信息，使用 `instanceof` 判断后强转。
2. **反射机制**：在编译时无法预知对象的真实信息，程序只能依靠运行时信息来发现该对象和类的真实信息。

## 反射的核心概念
反射机制允许程序在运行期间借助于 `Reflection API` 取得任何类的内部信息。

+ **核心原理**：加载完类之后，在堆内存的方法区中就产生了一个 `Class` 类型的对象（一个类只有一个 `Class` 对象）。这个对象包含了完整的类的结构信息。
+ **形象比喻**：这个 `Class` 对象就像一面镜子，透过这面镜子，可以看到类的结构（属性、方法、构造器等）。

## 反射的优缺点
+ **优点**：
    - 极大地提高了 Java 程序的灵活性和扩展性，降低了耦合性。
    - 允许程序创建和控制任何类的对象，无需提前硬编码目标类。
+ **缺点**：
    - **性能较低**：反射操作通常比直接代码慢。
    - **安全性与可读性**：反射会模糊程序内部逻辑，且绕过访问控制检查可能带来安全隐患。

# 理解 Class 类并获取实例
要想解剖一个类，必须先获取到该类的 `Class` 对象。`Class` 类是反射的根源。

## Class 类的特性
+ `Class` 本身也是一个类。
+ `Class` 对象只能由系统建立。
+ 一个加载的类在 JVM 中只会有一个 `Class` 实例。
+ 每个类的实例都会记得自己是由哪个 `Class` 实例所生成。

## 获取 Class 实例的四种方式
+ **类名.class**（最安全，性能最高）：适用于编译期间已知类型。

```java
Class clazz = String.class;
```

+ **对象.getClass()**：适用于已知某个类的实例。

```java
Class clazz = "www.oneboatdev.com".getClass();
```

+ **Class.forName("全类名")**（最常用）：适用于编译期间未知类型，通过字符串加载。

```java
Class clazz = Class.forName("java.lang.String");
```

+ **类加载器加载**

```java
ClassLoader cl = this.getClass().getClassLoader();
Class clazz = cl.loadClass("类的全类名");
```

## 哪些类型可以有 Class 对象？
简言之，Java 中几乎所有类型都有对应的 `Class` 对象：

+ 外部类、成员内部类、局部内部类、匿名内部类
+ 接口 (`interface`)
+ 数组 (`[]`)
+ 枚举 (`enum`)
+ 注解 (`@interface`)
+ 基本数据类型 (`int`, `double` 等)
+ `void`

```java
Class c1 = Object.class;
Class c2 = Comparable.class;
Class c3 = int[].class;
Class c4 = int.class;
Class c5 = void.class;
```

# 类的加载与 ClassLoader
## 类的生命周期
类从被加载到内存中开始，到卸载出内存为止，经历了：**加载 -> 链接 -> 初始化 -> 使用 -> 卸载**。

#### **加载过程的三个阶段**
1. **装载 (Loading)**：将 `.class` 文件字节码内容读入内存，并创建 `java.lang.Class` 对象。
2. **链接 (Linking)**：
    - **验证**：确保加载的类符合 JVM 规范。
    - **准备**：为类变量 (`static`) 分配内存并设置默认初始值。
    - **解析**：将符号引用替换为直接引用。
3. **初始化 (Initialization)**：执行类构造器 `<clinit>()` 方法（收集静态变量赋值和静态代码块）。

## 类加载器 (ClassLoader)
类加载器的作用是将 class 文件加载到内存中，并生成 `Class` 对象。

### 类加载器的分类
+ **启动类加载器 (Bootstrap ClassLoader)**：
    - C/C++ 实现，嵌套在 JVM 内部。
    - 加载 Java 核心库 (`rt.jar`)。
    - 获取其对象时通常返回 `null`。
+ **扩展类加载器 (Extension ClassLoader)**：
    - 加载 `jre/lib/ext` 目录下的类库。
+ **应用程序类加载器 (AppClassLoader)**：
    - 加载 `classpath` 或 `java.class.path` 指定路径下的类库。
    - 是用户自定义类加载器的默认父加载器。
+ **自定义类加载器**：
    - 继承 `ClassLoader`，用于实现热部署、加密加载或模块隔离（如 Tomcat）。

### 使用 ClassLoader 获取资源流
在开发中，常使用类加载器读取配置文件，因为它默认从 `src` 目录（类路径）开始查找。

```java
InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("info.properties");
Properties pros = new Properties();
pros.load(is);
String name = pros.getProperty("name");
```

# 反射的基本应用
有了 `Class` 对象，就可以进行以下操作：

## 创建运行时类的对象
这是反射最常用的场景。

+ **方式一**：`clazz.newInstance()`。要求类必须有无参构造器，且权限足够。
+ **方式二**：通过构造器对象创建。可以调用有参构造或私有构造。

```java
// 获取 Class 对象
Class<?> clazz = Class.forName("com.oneboatdev.User");

// 获取指定参数的构造器 (String, int)
Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);

// 如果构造器是私有的，需要暴力反射
constructor.setAccessible(true);

// 创建实例
Object obj = constructor.newInstance("张三", 20);
```

## 获取运行时类的完整结构
可以获取类的包、修饰符、父类、接口、属性、方法、注解等。

### 获取属性 (Field)
+ `getFields()`：获取**所有 public** 属性（包括父类）。
+ `getDeclaredFields()`：获取**当前类声明的所有**属性（包括 private，不包括继承）。

```java
Field[] fields = clazz.getDeclaredFields();
for (Field f : fields) {
    // 获取修饰符 (public, private 等)
    int mod = f.getModifiers();
    System.out.print(Modifier.toString(mod) + " ");
    // 获取类型
    System.out.print(f.getType().getName() + " ");
    // 获取变量名
    System.out.println(f.getName());
}
```

### 获取方法 (Method)
+ `getMethods()`：获取**所有 public** 方法（包括父类）。
+ `getDeclaredMethods()`：获取**当前类声明的所有**方法。

```java
Method[] methods = clazz.getDeclaredMethods();
for (Method m : methods) {
    System.out.print(Modifier.toString(m.getModifiers()) + " ");
    System.out.print(m.getReturnType().getName() + " ");
    System.out.print(m.getName() + "(");
    // 获取参数类型
    Class[] params = m.getParameterTypes();
    // ... 拼接参数 ...
    System.out.println(")");
}
```

## 调用运行时类的指定结构
### 操作属性
通过 `Field` 对象的 `get()` 和 `set()` 方法。

```java
Field nameField = clazz.getDeclaredField("name");
nameField.setAccessible(true); // 暴力反射，允许访问私有属性

Object obj = clazz.newInstance();
nameField.set(obj, "李四"); // 相当于 obj.name = "李四"
System.out.println(nameField.get(obj)); // 相当于 obj.name
```

### 调用方法
通过 `Method` 对象的 `invoke()` 方法。

```java
Method showMethod = clazz.getDeclaredMethod("show");
showMethod.setAccessible(true); // 如果是私有方法

Object obj = clazz.newInstance();
// 调用方法，返回值为方法的返回值
Object result = showMethod.invoke(obj);
```

### 读取注解信息
反射常用于框架中读取注解，实现配置化开发（如 ORM 框架）。  
**前提：** 注解的 `@Retention` 必须是 `RetentionPolicy.RUNTIME`。

```java
// 获取类上的注解
Table table = clazz.getAnnotation(Table.class);
if (table != null) {
    String tableName = table.value();
    System.out.println("表名: " + tableName);
}

// 获取属性上的注解
Field[] fields = clazz.getDeclaredFields();
for (Field f : fields) {
    Column col = f.getAnnotation(Column.class);
    if (col != null) {
        System.out.println("字段名: " + col.columnName());
    }
}
```

# 体会反射的动态性
反射最大的魅力在于**动态性**。可以通过配置文件来决定程序运行哪个类、调用哪个方法，而无需修改代码重新编译。

**场景示例：**  
假设有一个果汁机 `Juicer`，我们需要根据配置文件决定榨苹果汁还是橘子汁。

+ **配置文件**: `config.properties`：

```properties
fruitName=com.oneboatdev.Orange
```

+ **代码实现**：

```java
Properties pros = new Properties();
pros.load(new FileInputStream("config.properties"));
String className = pros.getProperty("fruitName");

// 动态加载类
Class clazz = Class.forName(className);
Fruit fruit = (Fruit) clazz.newInstance();

// 运行
Juicer juicer = new Juicer();
juicer.run(fruit); // 输出：榨出一杯桔子汁儿
```

通过这种方式，如果需要更换水果，只需修改配置文件，无需改动 Java 代码，极大地提高了系统的扩展性。

