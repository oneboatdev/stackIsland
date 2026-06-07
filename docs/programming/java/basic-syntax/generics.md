# 泛型概述
## 什么是泛型
在Java中声明方法的时候，当在完成方法功能时如果有_未知的数据_需要参与，这些未知的参数需要在调用方法时才能确定，一般就把这样的数据通过**形参**表示。在方法体中，用这个形参名来代表那个位置的数据，而调用者在调用时，传入对应的实参就可以了，但是对于_未知的数据类型_，则需要使用**泛型**来代表。

在 Java 中，**泛型（Generics）**是 JDK 5.0 引入的一项核心特性，它的本质是**参数化类型**。简单来说，就是允许在定义类、接口或方法时，不预先指定具体的数据类型，而是使用一个“类型占位符”（比如 `<T>`）来代替。等到真正使用这些类、接口或方法时，再传入具体的类型（比如 `String`、`Integer` 等）

## 泛型的语法
`<类型>`这种语法形式就叫做泛型。其中的 `类型` 被称为**类型参数**，习惯上使用 `T` (Type 的缩写) 来表示。

+ **类型形参 vs. 类型实参**：可以类比方法的参数来理解。`T` 就像是方法的形参，代表一个未知的数据类型；而在使用时指定的具体类型（如 `String`, `Integer`）就像是实参。
+ **命名约定**：`T` 只是一个占位符，可以使用任何字母，例如 `K` (Key), `V` (Value), `E` (Element) 等。

## 泛型的声明
泛型可以在两个地方声明：

+ 类或接口：在类名或接口名后面声明，这样的类或接口被称为**泛型类**或**泛型接口**。

```java
[修饰符] class 类名<类型变量列表> [extends 父类] [implements 接口们] { ... }
[修饰符] interface 接口名<类型变量列表> [extends 接口们] { ... }

// 例如 JDK 中的：
public class ArrayList<E> { ... }
public interface Map<K,V> { ... }
```

+ 在方法的修饰符和返回值类型之间声明，这样的方法被称为**泛型方法**。

```java
[修饰符] <类型变量列表> 返回值类型 方法名([形参列表]) [throws 异常列表] { ... }

// 例如 java.util.Arrays 类中的：
public static <T> List<T> asList(T... a) { ... }
```

# 泛型使用举例
## 集合中的泛型：告别“类型转换异常”
**集合中没有使用泛型时**：

在没有泛型的时候，Java的集合就像一个没有任何标签的纸箱，默认只能往里塞`Object`类型。这意味着可以随意往里边扔字符串、整数甚至自定义对象。这就会有两个问题存在：

+ 类型不安全：任何类型都可以添加到集合中
+ 繁琐的操作方式：读取出来的对象需要经过强制类型转换，还有可能会发生`ClassCastException`异常

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/34286438/1780154430031-2d10e559-e09d-4a42-a1d9-bdd38fa64988.png)

```java
List list = new Array();
list.add("Java泛型"); // 存入字符串
list.add(123); // 存入整数

// 取值时，意外里边是字符串，结果摸到了整数
String str = (String)list.get(1); // 运行时报错：ClassCastException
```

**集合中使用泛型时**：

在集合中如果使用了泛型，就像是给纸箱贴上了明确的标签。就只有指定类型才可以添加到集合中，以此来保证类型安全；并且在读取时也不需要进行强转，操作便捷。

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/34286438/1780154861226-8e51c3f6-6fc2-4ef4-b73f-afcd514b7502.png)

```java
// 使用泛型，指定集合只能存储 String 类型
List<String> list = new ArrayList<>();
list.add("Java泛型");
// list.add(123); // 编译直接报错！拒绝存入非 String 类型

// 取值时，完全不需要强制转换，拿出来的百分之百是 String
String str = list.get(0); 
System.out.println(str); 
```

> Java泛型可以保证如果程序在编译时没有发出警告，运行时就不会产生ClassCastException异常。也就是在编译期就排除了不安全的因素，既然通过了编译，那么类型就一定是符合要求的，以此来避免类型转换的风险。
>

## 比较器中的泛型：告别Object强转的繁琐
在Java中，当需要使用自定义对象进行排序时，通常会用到`Comparable`或`Comparator`接口。泛型在这两个接口中的应用，直接决定了代码是否臃肿。

假设有一个学生类`Student`:

```java
class Student {
    private String name;
    private int score;
    // 省略构造方法和 getter/setter
    public Student(String name, int score) { this.name = name; this.score = score; }
    public int getScore() { return score; }
    public String getName() { return name; }
}
```

**没有使用泛型**：

如果不使用泛型，比较器的参数只能是`Object`，在比较之前，必须进行强制类型转换。

```java
// 实现非泛型的 Comparator 接口
class OldStudentComparator implements Comparator {
    @Override
    public int compare(Object o1, Object o2) {
        // 必须先手动强转，非常麻烦且不安全
        Student s1 = (Student) o1;
        Student s2 = (Student) o2;
        return s1.getScore() - s2.getScore();
    }
}
```

**使用泛型**：

加上泛型`<Student>`后，编译器会自动完成类型匹配，`compare`方法的参数就是`Student`类型。

```java
// 实现泛型接口 Comparator<Student>
class StudentScoreComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        // 不需要任何强转，直接调用 Student 的方法，代码极其简洁
        return Integer.compare(s1.getScore(), s2.getScore());
    }
}

// 测试排序
public class GenericDemo {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("张三", 85));
        students.add(new Student("李四", 92));
        
        // 使用泛型比较器进行排序
        Collections.sort(students, new StudentScoreComparator());
        
        for (Student s : students) {
            System.out.println(s.getName() + " : " + s.getScore());
        }
    }
}
```

同样的道理，如果让 `Student` 类实现 `Comparable<Student>` 接口，重写 `compareTo(Student o)` 方法时，也无需再进行任何向下转型。

# 自定义泛型结构
## 自定义泛型类
泛型类最常见的应用场景就是作为“容器”或“数据传输对象”。它的核心思想是：**在定义类时不指定具体类型，而是在创建对象时再决定它装什么。**

**例如：**

```java
public class ApiResponse<T> {
    private int code;       // 状态码
    private String message; // 提示信息
    private T data;         // 具体的业务数据，类型由调用者决定

    public ApiResponse(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public T getData() {
        return data;
    }
}
```

**使用：**

```java
// 返回用户信息
ApiResponse<User> userResponse = new ApiResponse<>(200, "成功", new User("张三"));
User user = userResponse.getData(); // 不需要强转，直接拿到 User 对象

// 返回商品列表
ApiResponse<List<Product>> productResponse = new ApiResponse<>(200, "成功", productList);
List<Product> products = productResponse.getData(); // 也不需要强转
```

## 自定义泛型接口
泛型接口与泛型类的逻辑相似，用于定义一套通用的操作规范。在DAO（数据访问）层或工具类设计中非常常见。

**举例：**

假设我们需要对不同的实体（User, Order, Book）进行数据库操作，我们可以定义一个泛型接口：

```java
public interface BaseDAO<T> {
    void save(T entity);      // 保存实体
    T findById(int id);       // 根据ID查询，返回对应的实体类型
    void delete(T entity);    // 删除实体
}
```

## 自定义泛型方法
泛型方法与泛型类中的方法不同。泛型方法的核心在于：**类型参数是独立于类的，仅在方法调用时才被确定**。

**举例：**

```java
// 泛型方法的标志：public 和 返回值 void 之间的 <T>
public static <T> void printArray(T[] array) {
    for (T element : array) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

泛型方法赋予了单个方法极强的通用性，即使类是一个普通的非泛型类，只要加上`<T>`，这个方法就能适配任意类型的参数。编译器会在调用方法时，根据传入的实参自动推断出具体的类型。

**实战：**

```java
public class ArrayUtils {
    // 泛型方法：交换数组中任意两个位置的元素
    public static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // 泛型方法：获取数组中的第一个元素
    public static <T> T getFirst(T[] arr) {
        return (arr == null || arr.length == 0) ? null : arr;
    }
}

// 调用时，编译器自动推断 T 为 String 或 Integer
String[] names = {"张三", "李四"};
ArrayUtils.swap(names, 0, 1); 

Integer[] scores = {98, 85, 100};
Integer firstScore = ArrayUtils.getFirst(scores);
```

## 泛型的继承与实现
当我们去继承一个泛型类或者实现一个泛型接口时，泛型通常会有三种走向，这也是面试和实战中的高频场景：

### 继续保留泛型，“躺平”式子类
子类自己不确定类型，把决定权交给自类的调用者。此时子类是一个泛型类。

```java
// 实现接口时，继续保留 <T>
public class UserDAO<T> implements BaseDAO<T> {
    @Override
    public void save(T entity) { /* 具体的保存逻辑 */ }
    @Override
    public T findById(int id) { return null; }
    @Override
    public void delete(T entity) { /* 具体的删除逻辑 */ }
}
```

### 明确指定类型，“认命”型子类
子类在实现时，直接把泛型指定为某种具体的类型。此时子类不再是泛型类。

```java
// 明确告诉编译器，我这个类就是专门处理 User 的
public class UserDAOImpl implements BaseDAO<User> {
    @Override
    public void save(User user) { /* 专门保存 User */ }
    @Override
    public User findById(int id) { return new User("张三"); }
    @Override
    public void delete(User user) { /* 专门删除 User */ }
}
```

### 完全不写泛型，“摆烂”式子类
如果在实现活继承时，连尖括号`<>`都不写，这被称为“原生类型”（Raw Type）。此时泛型会被擦除，所有的`T`都会被当作`Object`处理。虽然编译能通过，但失去了泛型的类型安全检查意义，**在实际开发中应坚决避免**。

### 自定义泛型的注意事项
在自定义泛型结构时，有几个绝对不能踩的“雷区”：

1. **静态成员不能使用泛型**：静态变量和方法在类加载时就初始化了，而泛型`T`是在创建对象时才确定的。所以`public static T data;`是非法的。
2. **不能实例化泛型数组**：不能写`T[] arr = new [10];`。因为运行时泛型会被擦除，JVM不知道`T`到底是什么，无法分配内存。通常的妥协方案是使用`Object[]`然后强转，或者使用`ArrayList<T>`。
3. **异常类型不能是泛型**：不能定义`class MyException<T> extends Exception`。因为异常是在运行时被捕获和处理的，而泛型信息在运行时已经被擦除了，这会导致异常处理机制失效。
4. **基本数据类型进不来**：泛型只能装引用数据类型。如果想存`int`，必须使用它的包装类`Integer`。

# 泛型通配符：解决“类型不兼容”的万能钥匙
在开发中，会经常遇到一种场景：`Apple`是`Fruit`的子类，但`List<Apple>`却不是`List<Fruit>`的子类。如果想写一个方法同时接手这两种List，普通的泛型写法就会报错。这时候就需要使用通配符来解决。

通配符主要有三种形态：

1. **无界通配符**`**<?>**`**：啥都行，但只能读：**

`<?>`代表任意未知的类型。它最常用于只读的场景，比如打印集合、判断集合是否为空。

+ 能做什么：读取元素（只能当作`Object`读取）
+ 不能做什么：除了`null`，不能向集合中添加任何元素。

```java
public static void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj); // 只能当作 Object 读取
    }
    // list.add("hello"); // 编译报错！编译器不知道 list 具体是什么类型，为了安全禁止写入
    list.add(null); // 唯一允许添加的就是 null
}
```

2. **上界通配符**`**<? extends T>**`**：只进不出（生产者Producer）**

它表示“T或者T的某个子类”。当需要从集合中**读取数据**时，可以使用。

+ 能做什么：安全地读取元素（读出来的一定是T或它的父类。
+ 不能做什么：不能写入任何T的子类对象（因为编译器不知道具体的子类是什么，防止类型错乱）。

```java
// 计算任意 Number 子类（Integer, Double等）集合的总和
public static double sum(List<? extends Number> list) {
    double total = 0;
    for (Number num : list) {
        total += num.doubleValue(); // 安全读取，向上转型为 Number
    }
    // list.add(100); // 编译报错！不知道具体是 List<Integer> 还是 List<Double>，禁止写入
    return total;
}
```

3. **下界通配符**`**<? super T>**`**：只进不出（消费者Consumer）**

它表示“T或者T的某个父类”。当需要向集合中**写入数据**时，可以使用。

+ 能做什么：安全的写入T及其子类对象
+ 不能做什么：读取时只能当作`Object`，因为编译器不知道父类具体是谁。

```java
// 向一个 Integer 或其父类（如 Number, Object）的集合中添加数据
public static void addNumbers(List<? super Integer> list) {
    list.add(100); // 安全写入，100 是 Integer，肯定能放进 Integer 或其父类的集合里
    list.add(200);
    
    // Object obj = list.get(0); // 读取只能得到 Object，失去了具体类型的意义
}
```

# 类型擦除
Java的泛型是“伪泛型”，它只在编译期有效。代码编译成字节码后，所有的泛型信息（比如`<String>`）都会被擦除，还原成`Object`类型。

正因为有这个机制，所以在使用泛型的时候需要记住两条铁律：

+ 不能使用基本类型；`List<int>`是绝对不行的，因为`int`不是`Object`子类，必须使用包装类`List<Integer>`。
+ 运行时拿不到泛型类型：在代码运行期间，JVM根本不知道`List<String>`里的是`<String>`存在，它只知道这是一个`List`。

