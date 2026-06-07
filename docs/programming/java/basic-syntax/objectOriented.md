# 面向过程VS面向对象

## 面向过程（POP）：关注“怎么做”的线性执行者

**面向过程**是一种以“过程”为中心的编程思想，<font style="color:rgb(34, 34, 34);">它将一个复杂的问题分解成一系列按顺序执行的步骤，每个步骤由一个函数来实现，</font>然后依次调用。

它的优点是使用面向过程思想进行的开发，代码都是流程化的，只需要按照第一步做什么，第二步做什么的流程一步步的执行即可，这种方式的代码执行起来效率很高。最典型的面向过程编程语言就是C语言。

同时，面向过程还存在了**代码重用性低**，**扩展能力差**，**维护难度大**等问题。

## 面向对象（OOP）：关注“谁来做”的协作系统

**面向对象**是一种以“对象”为中心的编程思想，<font style="color:rgb(34, 34, 34);">它将现实世界的事物抽象为程序中的“对象”，每个对象都包含了自己的“属性”（数据）和“方法”（行为），这种思想认为程序是由多个相互协作的对象组成的网络。</font>

在面向对象中，它将问题分解成一个个步骤，然后对每个步骤进行抽象，形成对象，通过对象之间的掉用，组合解决问题。

它的优点是使用面向对象进行编程时，需要把属性、行为等封装成对象，然后基于这些对象以及对象的能力实现业务逻辑。使用这种开发范式实现的程序，**扩展性**、**可维护性**都很高。

# 类和对象

类(Class)和对象(Object)是面向对象的核心概念。

+ 类：具有相同特征的事物的抽象描述，是一种`抽象的`、概念上的定义。
+ 对象：实际存在的该类事物的`每个个体`，是具体的，因此也称为实例(instance)。

## 类的成员
类是一组相关`属性`和`行为`的集合，也是类最基本的两个成员。

+ 属性：该类事物的状态信息，对应类中的`成员变量`,也就是字段.
+ 行为：该类事物要做什么操作，或者基于事物的状态能做什么，对应类中的`成员方法`

## 类的定义与对象的创建
### 类的定义
定义类需要使用`class`关键字，格式如下：

```java
[修饰符] class 类名{
    属性;
    方法;
}
```

例如：

```java
public class Person{
    // 属性
    int age;
    
    // 方法
    public void eat(){
        System.out.println("人吃饭");
    }
}
```

### 对象的创建
创建对象需要使用关键字`new`，创建对象的语法：

```java
类名 对象名 = new 类名();
```

例如：

```java
public class PersonTest{
    public static void main(String[] args){
        // 创建Person类对象
        Person per = new Person();
    }
}
```

### 对象调用属性或方法
使用`对象名.属性`或`对象名.方法`的方式访问对象成员

例如：

```java
public class Person{
    // 属性
    int age;
    
    // 方法
    public void eat(){
        System.out.println("人吃饭");
    }
}

public class PersonTest{
    public static void main(String[] args){
        // 创建Person类对象
        Person per = new Person();
        // 访问属性
        per.age = 4;
        
        // 访问方法
        per.eat();
    }
}
```

## 匿名对象
可以不定义对象的句柄，而直接掉用这个方法。这样的对象叫做匿名对象。如：

```java
new Person().eat();
```

**使用情况：**

+ 如果一个对象只需要进行一次方法掉用，那么就可以使用匿名对象。
+ 经常将匿名对象作为实参传递给一个方法掉用。

## 类的成员之一：成员变量
### 如何声明成员变量
+ 语法格式：

```java
[修饰符] class 类名{
    [修饰符2] 数据类型 成员变量名;
}
```

+ 示例：

```java
public class Person{
    private int age;
    public String name = "lisi";
}
```

+ 成员变量定义要点：
    - 成员变量位置必须在类中，方法外。
    - 成员变量的修饰符可以省略。
    - 成员变量的数据类型可以是任何基本数据类型或任何引用数据类型
    - 成员变量的变量名属于标识符，需要满足命名规范。
    - 成员变量的初始化值可以显示赋值，也可以不赋值，使用默认值。

> 常见的权限修饰符：private 、缺省、protected、public
>
> 其他常用修饰符：static、final
>

### 成员变量VS局部变量
**变量的分类：**

+ 成员变量：在类中，方法体外声明的变量称为成员变量

> `static`关键字可以将成员变量分为两大类，**静态变量**和**非静态变量**。其中静态变量又称为`类变量`，非静态变量又称为`实例变量或属性`。
>

+ 局部变量：在方法体内部等位置声明的变量称为局部变量

<!-- 这是一张图片，ocr 内容为： -->
![](https://cdn.nlark.com/yuque/0/2026/png/34286438/1778068485726-9ae467e0-2ec4-4406-b601-b6bc6b3f165b.png)

**相同点与不同点：**

+ 相同点
    - 变量声明的格式必须相同：数据类型 变量名 = 初始化值
    - 变量必须先声明、后初始化、在使用。
    - 变量都有其对应的作用域，只在其作用域内是有效的。
+ 不同点：

| 不同点 | 实例变量 | 局部变量 |
| --- | --- | --- |
| 声明位置和方式 | 在类中方法外 | 在方法体或方法的新参、代码块中 |
| 在内存中的位置 | 堆 | 栈 |
| 生命周期 | 和对象的生命周期一样，随着对象的创建而存在，随着对象被GC回收而消亡，而且每一个对象的实例变量都是独立的 | 和方法调用的生命周期一样，每一次方法被调用而存在，随着方法执行的结果而消亡，而且每一次方法调用都是独立的 |
| 作用域 | 通过对象就可以使用，本类中直接调用，其他类中通过"对象.实例变量"调用 | 出了作用域就不能使用 |
| 修饰符 | public、protected、private、volatile、transient | final或没有 |
| 默认值 | 有默认值 | 没有默认值，必须手动初始化。其中新参需要通过实参给它初始化 |


## 类的成员之二：方法
### 什么是方法？
+ **方法**是类或对象行为特征的抽象，用来完成某个功能操作。在某些语言中也称为`函数`或`过程`。
+ 将功能封装为方法的目的是，可以**实现代码重用**，**减少冗余**，**简化代码**。
+ Java里方法**不能独立存在**,所有方法必须定义在类里。

### 如何声明方法
**声明方法的语法格式：**

```java
[修饰符] 返回值类型 方法名([形参列表])[thorws 异常列表]{
    方法体;
}
```

> 一个完整的方法 = 方法头 + 方法体。
>
> + 方法头就是`[修饰符] 返回值类型 方法名([形参列表])[throws 异常列表]`，也称为方法签名。通常调用方法时只需要关注方法头，从方法头可以看出这个方法的功能和调用格式。
> + 方法体就是方法被调用后要执行的代码。
>

**方法头包含5部分**

+ 修饰符：可选。方法的修饰符包含public、protected、private、static、abstract、native、final、synchronize等。其中权限修饰符有public、protected、private。同时根据是否有static，可以将方法分为静态方法和非静态方法。其中静态方法又称为类方法、非静态方法又称为实例方法。
+ 返回值类型：表示方法运行结果的数据类型，方法执行后将结果返回到调用者。如果没有返回值，就声明为void，有返回值，就声明出返回值类型（可以是任意类型），与方法体中的`return 返回值`搭配使用。
+ 方法名：属于标识符，命名时遵循标识符命名规则和规范。
+ 形参列表：表示完成方法体功能时需要外部提供的数据列表。可以包含零个，一个或多个。
+ throws异常列表：可选。声明方法体中可预知的异常。

**return语句**

+ return语句的作用是结束方法的执行，并将方法的结果返回去
+ 如果返回值类型不是void，方法体中必须保证一定有`return 返回值;`语句，并且要求该返回值结果的类型与声明的返回值类型一致或兼容。
+ 如果返回值类型为void时，方法体中可以没有`return 返回值;`语句，如果要用return语句提前结束方法的执行，直接写`return;`。
+ return语句后面不能再写任何代码。

**注意点**

+ 方法必须先声明后使用，且方法必须定义在类的内部
+ 调用一次就执行一次，不调用不执行。
+ 方法中可以调用类中的方法和属性，不可以在方法内不定义方法。

### 调用实例方法
方法通过方法名被调用，且只有被调用才会执行。

**格式：**

```java
对象.方法名([实参列表]);
```

## 方法的重载(overload)
+ 方法重载的概念：在同一个类中，允许存在一个以上的同名方法，只要参数列表不同。
    - 参数列表不同，意味着参数个数或参数类型的不同
+ 重载的特点：与修饰符、返回值类型无关，只看参数列表，且参数列表必须不同（参数个数或参数类型）。调用时，根据方法参数列表的不同来区别。
+ 重载方法的调用：JVM通过方法的参数列表，调用匹配的方法。

## 可变个数形参
Java在 JDK5.0之后提供了Varargs机制，即当定义一个方法时，形参的类型可以确定，但是形参的个数不确定，可以考虑使用可变个数的形参。

**格式：**

```java
方法名(参数类型 ...参数名)
```

**特点：**

+ 可变参数：方法参数部分指定类型的参数个数是可变多个；
+ 可变个数形参的方法与同名的方法之间，彼此构成重载；
+ 可变参数方法的使用与方法参数部分使用数组是一致的，二者不能同时声明，否则报错；
+ 方法的参数部分有可变形参，需要放在形参声明的最后；
+ 在一个方法的形参中，最多只能声明一个可变个数的形参；

## 方法的参数传递机制
### 形参和实参
+ 形参：在定义方法时，方法名后面括号()中声明的变量称为形式参数，简称形参。
+ 实参：在调用方法时，方法名后边括号()中使用的值/变量/表达式称为实际参数，简称实参。

### 参数传递机制：值传递
Java里方法的参数传递方式只有一种：`值传递`。即将实际参数值的副本（复制品）传入方法内，而参数本身不受影响。

+ 形参是基本数据类型：将实参基本数据类型变量的**数据值**传递给形参。
+ 形参事引用数据类型：将实参引用数据类型变量的**地址值**传递给形参。

## 递归方法
**递归方法**：方法自己调用自己的现象就是递归

**递归方法的分类**：直接递归、间接递归。

+ 直接递归：方法自身调用自己。

```java
public void methodA(){
    methodA();
}
```

+ 间接递归：A方法调用B方法，B方法调用C方法，C方法调用A方法。

```java
public static void A(){
    B();
}
public static void B(){
    C():
}
public static void C(){
    A();
}
```

**说明：**

+ 递归方法中包含了一种`隐式的循环`
+ 递归方法会`重复执行`某段代码，但这种重复执行无须循环控制。
+ 递归一定要`已知方向`递归，否则这种递归就变成了无穷递归，停不下来，类似于**死循环**。最终发生`栈内存溢出`。

## 类的成员之三：构造器
Java提供了**构造器（也称为构造方法）**，可以在实例化对象时为实例变量赋值。构造器名必须与类名相同，并且没有返回值，格式如下：

```java
[修饰符] class 类名{
    // 无参构造
    [修饰符] 构造器名(){
        // 实例化初始代码
    }
    
    // 有参构造
    [修饰符] 构造器名(参数列表){
        // 实例化初始代码
    }
}
```

> 在类中，至少会存在一个构造器，并且构造器可以重载。当类中没有显示声明构造器时，那么编译器会自动提供一个无参构造，并且这个构造器的修饰符与类的修饰符一致。
>

## 类中属性赋值过程
+ 默认初始化
+ 显示初始化
+ 构造器中初始化
+ 通过"对象.属性" 或"对象.方法"的方式，给属性赋值

**执行的先后顺序：**

默认初始化-显示初始化-构造器中初始化-通过对象初始化

> 在默认初始化、显示初始化和构造器中初始化在对象创建过程中，只执行一次，通过对象初始化是在对象创建后执行的，可以根据需求多次执行。
>

# 面向对象特征一：封装
**封装**就是把客观事物封装成抽象概念的类，并且类可以把自己的数据和方法只**对可信的类或者对象开放**，**对不可信的进行隐藏**。

## Java中如何实现封装
实现封装就是**控制类或成员的可见范围**，需要依赖访问修饰符来控制。

**不同权限修饰符的具体访问范围：**

| 修饰符 | 本类内部 | 本包内 | 其他包的子类 | 其他包非子类 |
| --- | --- | --- | --- | --- |
| private | ✅ | ❌ | ❌ | ❌ |
| 缺省 | ✅ | ✅ | ❌ | ❌ |
| protected | ✅ | ✅ | ✅ | ❌ |
| public | ✅ | ✅ | ✅ | ✅ |


**具体的修饰结构：**

+ 外部类：public、缺省
+ 成员变量、成员方法、构造器、成员内部类：public、protected、缺省、private

## 封装性的体现
### 成员变量/属性私有化
私有化类的成员变量，提供公共的get和set方法，对外暴露获取和修改属性的的功能。

```java
// 使用private修饰成员变量
public class Person{
    private String name;
    private int age;
    
    // 提供get和set方法
    public void setName(String n){
        name = n;
    }
    
    public String getName(){
        return name;
    }
    
    public void setAge(int a){
        age = a;
    }
    
    public int getAge(){
        return age;
    }
}
```

**成员变量封装的好处：**

+ 让使用者只能通过事先预定的饭方法来_访问数据_，从而可以在该方法里面加入控制逻辑，限制对成员变量的不合理访问。还可以进行_数据检查_，从而有利于保证对象信息的完整性。
+ _便于修改，提高代码的可维护性_。

### 私有化方法
使用private修饰方法，只能在类内部使用。

# this关键字
## this的本质
this是一个**引用变量**，它指向当前对象（也就是正在调用该方法或构造器的对象）。换句话说：谁调用了方法，this就代表谁。

**类型：**

+ this是类的**隐藏参数**，编译器在每个实例方法和构造器中都会自动传入当前对象的引用。
+ 静态方法中没有this，因为静态方法不属于某个对象。

## this的常见使用场景
+ 访问当前对象的成员变量：当局部变量（如方法参数）与成员变量同名时，使用this区分。

```java
public class Person{
    private String name;
    
    public Person(String name){
        this.name = name; // 使用this区分成员变量和构造器参数
    }
}
```

> + this.name 指代当前对象的成员变量
> + 如果没有变量名冲突，可以省略this
>

+ 调用当前对象的其他实例方法：在一个实例方法中，可以使用this调用当前对象的另一个方法。

```java
public class Student{
    private int score;
    
    public void study(){
        System.out.println("正在学习...");
        this.exam();// 调用当前对象的另一个实例方法
    }
    
    public void exam(){
        System.out.println("正在考试...");
    }
}
```

> 一般用于明确当前对象方法或链式调用场景
>

+ 在构造器中调用另一个构造器：this(...)用于在一个构造器中调用同类的另一个构造器。这叫做构造器链。

```java
public class Book{
    private String title;
    private double price;
    
    public Book(){
        this("未命名",0.0);// 调用另一个构造器，必须放在第一行。
    }
    
    public Book(String title,double price){
        this.title = title;
        this.price = price;
    }
}
```

> this(...)必须是构造器中的第一条语句。不能同时调用super()和this().
>

+ 返回当前对象（链式调用）：在很多框架中、工具类中，常用this实现链式调用。

```java
public class UserBuilder{
    private String name;
    private int age;
    
    public UserBuilder setName(String name){
        this.name = name;
        return this; //返回当前对象，实现链式调用
    }
    
    public UserBuilder setAge(int age) {
        this.age = age;
        return this;
    }

    public void build() {
        System.out.println("name = " + name + ", age = " + age);
    }
}

// 调用示例：
new UserBuilder().setName("Alice").setAge(25).build();
```

## this的使用限制
| 使用场景 | 是否可用 | 说明 |
| --- | --- | --- |
| 实例方法中 | 可以 | 表示当前对象 |
| 构造器中 | 可以 | 调用其他构造器或引用当前对象 |
| 静态方法中 | 不可以 | 没有当前对象 |
| 静态代码块中 | 不可以 | 没有当前对象 |
| 内部类中 | 可以 | 可通过外部类名.this访问外部对象 |


## this在内部类中的特殊用法
在内部类中，如果内部类和外部类有同名成员，可以用`外部类名.this.成员`来访问外部类的成员。

```java
public class Outer{
    private String name = "外部类";
    
    class Inner{
        private String name = "内部类";
        
        public void show(){
            System.out.println(name); // 内部类的name
            System.out.println(this.name); // 内部类的name
            System.out.println(Outer.this.name); // 外部类的name
        }
    }
}
```

# 面向对象特征二：继承
## 继承的基本概念
**继承**是面向对象编程的三大特征之一，它允许一个类继承另一个类的属性和方法，从而实现代码的复用与扩展。使用**关键字：extends **实现

**语法：**

```java
class 父类名{
    // 父类成员
}

class 子类名 extends 父类名{
    // 字类特有成员
}
```

## 继承的主要作用
| 作用 | 说明 |
| --- | --- |
| 代码复用 | 字类自动拥有父类的属性和方法，减少重复代码 |
| 功能扩展 | 字类可以新增功能或者修改父类功能 |
| 实现多态 | 父类引用指向子类对象，实现动态绑定 |


## 继承的基本规则
| 项目 | 说明 |
| --- | --- |
| 继承关键字 | extends |
| 继承层次 | Java只支持单继承，但可以多层继承（A->B->C) |
| 顶级父类 | 所有类默认继承自java.lang.Object |
| 构造器 | 不能继承，但可以通过super()调用 |
| 成员变量 | 可继承（但访问权限受限制） |
| 私有成员 | private不可被子类访问 |
| 静态成员 | 可被继承，但不具备多态性 |
| 方法重写 | 子类可重写父类方法 |
| 访问控制 | 子类方法访问权限不能低于父类 |


## super关键字
### super的基本概念
super是Java的一个**引用关键字**，用于在子类中引用父类的成员（变量、方法、构造器）。可以理解为`this指向当前对象，super指向父类对象`。

### super的主要用途
| 功能 | 作用 | 使用位置 |
| --- | --- | --- |
| 调用父类的构造器 | 初始化父类部分 | 构造器第一行 |
| 调用父类的成员方法 | 访问被重写的方法 | 实例方法中 |
| 访问父类的成员变量 | 访问被隐藏的字段 | 实例方法或构造器中 |


## 构造器与继承
子类不能继承父类的构造器，但子类构造器中必须显示或隐式地掉用父类构造器

+ 默认调用父类无参构造器

```java
class Parent{
    public Parent(){
        System.out.println("父类构造器");
    }
}

class Child extends Parent{
    public Child(){
        // 这里会默认调用父类的无参构造器
        System.out.println("子类构造器");
    }
}

new Child();
```

+ 显示调用父类构造器

```java
class Parent {
    public Parent(String msg) {
        System.out.println("父类构造器：" + msg);
    }
}

class Child extends Parent {
    public Child() {
        super("Hello"); // 必须是第一行
        System.out.println("子类构造器");
    }
}
```

## 方法的重写
子类可以根据需要重写父类方法，修改其实现逻辑。

```java
class Animal{
    public void sound(){
        System.out.println("动物叫");
    }
}

class Dog extends Animal{
    @Override
    public void sound(){
        System.out.println("狗汪汪叫");
    }
}
```

**重写要求：**

+ 方法名、参数列表必须一致
+ 放回值类型相同或是父类的子类型（协变返回类型）
+ 访问权限不能更严格
+ 异常类型不能更广
+ 推荐使用@Override注解

## 继承的优缺点
**优点：**

+ 代码复用
+ 功能扩展
+ 多态实现基础

**缺点：**

+ 增加耦合度，父类改动会影响子类
+ 不当使用会造成类结构复杂

# 面向对象特征三：多态
**多态**是指“同一个行为，因对象不同而表现出不同形态”。

**表现形式：**父类引用指向子类对象，通过该引用调用方法时，会执行子类重写后的版本。

```java
class Animal{
    public void sound(){
        System.out.println("动物叫");
    }
}

class Dog extends Animal{
    @Override
    public void sound(){
        System.out.println("狗叫");
    }
}

class Cat extends Animal{
    @Override
    public void sound(){
        System.out.println("猫叫");
    }
}

public class Test{
    public static void main(String[] args){
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        a1.sound(); // 狗叫
        a2.sound(); //猫叫
    }
}
```

## 多态的三个必要条件
| 条件 | 说明 |
| --- | --- |
| 继承 | 子类继承父类 |
| 重写 | 子类重写父类方法 |
| 父类引用指向子类对象 | Parent p  = new Child(); |


## 编译期与运行期绑定
| 阶段 | 方法调用确定依据 |
| --- | --- |
| 编译期 | 看左边（引用类型） |
| 运行期 | 看右边（实际对象类型） |


```java
Animal a = new Dog();

a.sound(); // 编译期看Animal是否有sound() 运行期执行Dog的sound()
```

## 向上转型与向下转型
+ 向上转型

父类引用指向子类对象——安全、自动发生。

```java
Animal a = new Dog():
```

+ 向下转型

将父类引用强制转换为子类引用——需要强转、不安全

```java
Animal a = new Dog():
Dog d = (Dog)a; // 向下转型成功

Animal b = new Animal();
Dog d2 = (Dog)b; //运行期报错
```

> 建议在转型前使用`instanceof`判断
>

```java
if(a instanceof Dog){
    ((Dog) a).sound;
}
```

## 多态的优势
+ 代码更灵活，可扩展性强
+ 消除分支判断（if-else替换为多态行为）
+ 框架、接口编程的基础

# Object类的使用
## 基本概念
+ Java中所有类都直接或间接继承自java.lang.Object
+ 是Java类层次结构的顶级父类
+ 定义了所有对象都具备的方法

## Object类常用方法汇总
| 方法 | 作用 | 常见重写场景 |
| --- | --- | --- |
| toString() | 返回对象的字符串描述 | 调试、日志输出 |
| equals(Object o) | 判断对象是否相等 | 实体类、集合判断 |
| hashCode() | 返回哈希值 | HashMap、HashSet |
| getClass() | 获取对象运行时类 | 反射 |
| clone() | 克隆对象（浅拷贝) | 原型模式 |


## 常用方法详解
+ toString()：默认返回对象地址，可重写打印有意义信息。

```java
@Override
public String toString(){
    return "Person{name=}" + name + ",age="+age+"}";
}
```

+ equals()：默认是“==”比较（地址相同）。重写后用于比较内容相同。

```java
@Override
public boolean equals(Object obj){
    if (this == obj) return true;
    if (obj == null || getClass() != obj.getClass()) return false;
    Person p = (Person) obj;
    return age == p.age && Object.equals(name,p.name);
}
```

> queals与hashCode必须重写，否则在集合中行为不一致。
>

## Object与多态的关系
+ 任何对象都可以用Object类型接收：

```java
Object obj = new String("Hello");
```

+ 实现“万物皆对象”的特性
+ 调用obj.toString、obj.equals()等方法时，会根据实际对象类型进行多态调用。

## Object类在框架中的应用
| 场景 | 应用 |
| --- | --- |
| 集合类 | HashMap依赖hashCode()与equals() |
| 反射机制 | 通过getClass()获取类型信息 |
| 序列化 | 对象通用基类调用 |


# 关键字static——静态成员与类级别共享
## static的定义
static是Java中的一个**静态修饰符**，可以修饰：

+ 变量（静态变量/类变量）
+ 方法（静态方法）
+ 代码块（静态代码块）
+ 内部类（静态内部类）

> 意义：属于类本身，而不是属于某个具体的对象。即在内存中只有一份副本，由所有对象共享。
>

## static变量（类变量）
```java
class Student{
    static String school = "清华大学"; // 静态变量
    String name; // 实例变量
    
    Student(String name){
        this.name = name;
    }
    
    void show(){
        System.out.println(name + " - " + school);
    }
}

public class Test{
    public static void main(String[] args){
        Student s1 = new Student("小明");
        Student s2 = new Student("小红");
        
        s1.show();
        s2.show();
        
        Student.school = "北京大学";
        s1.show();
        s2.show();
    }
}

//小明 - 清华大学
//小红 - 清华大学
//小明 - 北京大学
//小红 - 北京大学
```

**特点总结：**

+ 随类加载而加载，只存一份
+ 所有对象共享
+ 可通过“类名.变量名"访问
+ 存储在方法区中（或对应的元空间静态区域）

## static方法（类方法）
```java
class MathUtil{
    static int add(int a,int b){
        return a + b;
    }
}
```

**调用方法：**

```java
int sum = MathUtil.add(10,20);
```

**注意：**

+ 静态方法中不能访问实例成员（this、非static变量）
+ 可以访问静态变量
+ 常用于工具类、常量类中

## static代码块（静态初始化块）
用于在类加载时执行一次初始化逻辑。

```java
class Demo{
    static int count;
    
    static {
        System.out.println("静态代码块执行");
        count = 10;
    }
    
    static void show(){
        System.out.println("count = " + count);
    }
}

public class Test{
    public static void main(String[] args){
        Demo.show();
        Demo.show();// 不会重复执行代码块
    }
}

// 静态代码块执行
// count = 10;
// count = 10;
```

**执行时机：**

+ 类第一次被加载时
+ 在所有静态成员访问前
+ 只执行一次

## static内部类
```java
class Outer{
    static class Inner{
        void show(){
            System.out.println("静态内部类方法");
        }
    }
}

public class Test{
    public static void main(String[] args){
        Outer.Inner inner = new Outer.Inner();
        inner.show();
    }
}
```

**特性：**

+ 不依赖外部类对象
+ 不能访问外部类的非静态成员

# 单例设计模式
**单例模式：**保证一个类在JVM中只存在一个对象，并提供全局访问点。

常用于：

+ 配置类（如数据库连接配置）
+ 工具类（日志、线程池）
+ 控制类（线程管理、缓存）

## 单例的分类
### 饿汉式
```java
public class Singleton{
    // 类加载时就创建对象
    private static final Singleton instance = new Singleton();
    
    private Singleton(){} // 私有构造
    
    public static Singleton getInstance(){
        return instace;
    }
}
```

**特点：**

+ 类加载即创建实例
+ 线程安全
+ 若对象较大且未使用，会浪费内存

### 懒汉式
```java
public class Singleton{
    private static Singleton instance;
    
    private Singleton(){}
    
    public static Singleton getInstance(){
        if (instance == null){
            instance = new Singleton(); // 延迟加载
        }
        return instance;
    }
}
```

**缺点：**

+ 线程不安全（多线程下可能创建多个实例）

### 线程安全懒汉式（双重检查锁定）
```java
public class Singleton{
    private static volatile Singleton instance; //volatile防止指令重排
    
    private Singleton(){}
    
    public static Singleton getInstance(){
        if (instance == null){ // 第一次检查
            synchronized (Singleton.class){
                if (instance == null){ // 第二次检查
                    instance = new Singleton():
                }
            }
        }
        return instance;
    }
}
```

**优点：**

+ 延迟加载
+ 线程安全
+ 性能较好

### 静态内部类式
```java
public class Singleton{
    private Singleton(){}
    
    private static class Holder{
        private static final Singleton INSTANCE = new Singleton();
    }
    
    public static Singleton getInstance(){
        return Holder.INSTANCE;
    }
}
```

**优点：**

+ 延迟加载
+ 线程安全
+ 静态特性与类加载机制结合

### 枚举式（最安全的写法）
```java
public new Singleton{
    INSTANCE;
    
    public void show(){
        System.out.println("枚举单例方法");
    }
}
```

**优点：**

+ 天然防反射、防序列化
+ 最简洁、安全的写法。

# 代码块
## 分类
| 类型 | 关键字 | 执行时机 | 执行次数 |
| --- | --- | --- | --- |
| 静态代码块 | static | 类加载时 | 只执行一次 |
| 实例代码块 | 无 | 每次创建对象时 | 每次执行 |


## 实例代码块示例
```java
class Demo{
    {
        System.out.println("实例代码块执行");
    }
    
    Demo(){
        System.out.println("构造器执行");
    }
}

public class Test{
    public static void main(String[] args){
        new Demo();
        new Demo();
    }
}

// 输出
实例代码块执行
构造器执行
实例代码块执行
构造器执行
```

> 执行顺序：静态代码块->实例代码块->构造器（静态成员变量先初始化，实例成员次之）
>

## 常见应用场景
+ 静态代码块：加载配置、驱动（如Class.forName("com.mysql.jdbc.Driver"));
+ 实例代码块：提取构造器中公共初始化逻辑。

# final关键字——不可修改的约束
## final的作用
用于修饰类、方法、变量、表示**不可更改**

| 修饰目标 | 含义 |
| --- | --- |
| 类 | 不能被继承 |
| 方法 | 不能被重写 |
| 变量 | 不能被修改 |


## 修饰类
```java
final class Animal{}

// 无法继承final类

class Dog extends Animal{} //编译不通过
```

## 修饰方法
```java
class Parent{
    public final void show(){
        System.out.println("父类方法");
    }
}

class Child extends Parent{
    // 不能重写final方法
    public void show(){}//编译不通过
}
```

## 修饰变量
+ 修饰基本类型变量

```java
final int x = 10;
// x = 20; // 不能修饰final变量
```

+ 修饰引用类型变量

```java
final Student stu = new Student("小明");
// stu = new Student("小红"); // 不可重新复制
stu.name = "小红"; //可以修改对象内部属性
```

> fianl修饰的是“引用不可变”，但对象内容可变。
>

## 修饰参数
```java
void test(final int a){
    // a = 10; //不可修饰
}
```

> 常用于阻止方法参数被误改
>

## 修饰静态变量（常用组合)
```java
class Const{
    public static final double PI =3.14159;
}
```

> 初始化后不可修改
>

# 抽象类与抽象方法
## abstract关键字
abstract是Java中的一个**非访问修饰符**,用于修饰类或方法，表示“抽象、不完整、需要子类补充实现”。

## 抽象类
抽象类是使用**abstract**修饰的类，用来作为其他类的**父类模板**。

```java
abstract class Animal{
    String name;
    void sleep(){
        system.out.println("睡觉中...")；
    }
}
```

**抽象类特点：**

| 特点 | 说明 |
| --- | --- |
| 不能被实例化 | 不能直接new创建对象 |
| 可以包含抽象方法和非抽象方法 | 抽象方法由子类实现 |
| 可以有构造方法 | 用于子类初始化时使用 |
| 可以有成员变量、静态方法、常量 | 与普通类一样 |
| 抽象类的子类必须重写全部抽象方法 | 否则子类也要是abstract |


## 抽象方法
+ 没有方法体（只定义方法名和参数）
+ 必须使用abstract修饰
+ 必须定义在抽象类中

```java
abstract class Animal{
    abstract void makeSound(); //抽象方法，没有方法体
}
```

**特点：**

| 特点 | 说明 |
| --- | --- |
| 无方法体 | 用分号结尾 |
| 必须被子类重写 | 否则子类也必须声明为abstract |
| 不能是static、final、private | 否则会与“可重写“冲突 |


> 抽象类是模板，抽象方法是规范。
>

## 抽象类vs普通类
| 比较项 | 抽象类 | 普通类 |
| --- | --- | --- |
| 是否可实例化 | 不可直接创建对象 | 可直接创建对象 |
| 是否包含抽象方法 | 包含 | 不包含 |
| 是否有构造器 | 有（用于子类调用） | 有 |
| 继承限制 | 只能被继承 | 可以被继承，也可以实例化 |
| 是否可以包含成员变量、静态方法 | 可以 | 可以 |
| 设计目的 | 定义规范、共性抽取 | 实现完整功能 |


## 抽象类的构造方法
虽然抽象类不能直接实例化，但可以有构造器，用于子类构造时初始化父类部分。

```java
abstract class Animal{
    String name;
    
    Animal(String name){
        shit.name = name;
        System.out.println("Animal 构造执行"+ name);
    }
    
    abstract void makeSound(){};
}

class Dog extends Animal{
    Dog(String name){
        super(name); //调用抽象类的构造器
    }
    
    @Override
    void makeSound(){
        System.out.pritln(name + "汪汪汪")；
    }
}
```

## 抽象类与多态的结合使用
抽象类常与多态配合，实现“统一接口，不同表现”。

```java
abstract class Shape{
    abstract void draw();
}

class Circle extends Shape{
    void draw(){
        System.out.println("画圆形");
    }
}

class Rectangle extends Shapt{
    void draw(){
        System.out.println("画矩形");
    }
}

public class Test{
    public static void main(String[] args){
        Shape s1 = new Circle();
        Shape s2 = new Rectangle();
        s1.draw();
        s2.draw();
    }
}

// 输出
画圆形
画矩形
```

**意义：**

+ 父类抽象类统一调用入口
+ 子类多态实现不同逻辑

## 抽象类的继承规则
| 场景 | 说明 |
| --- | --- |
| 子类未实现所有抽象方法 | 子类必须定义为asbstract |
| 子类实现所有抽象方法 | 子类可实例化 |
| 抽象类可以继承普通类 | 可以继承并扩展功能 |
| 抽象类可以继承抽象类 | 可逐层补充实现 |


```java
abstract class A {
    abstract void f1();
}

abstract class B extends A {
    void f1() { System.out.println("实现部分"); }
    abstract void f2();
}

class C extends B {
    void f2() { System.out.println("最终实现"); }
}
```

# 接口
## 接口的基本概念
+ 接口是Java中一种更加抽象的类型。——比抽象类更“抽象”，它所有方法默认都是抽象的（Java7及之前）
+ 使用关键字`interface`来定义。
+ 接口主要用于：**统一标准、定义规范、实现多实现、扩展系统功能**
+ 接口不能实例化，只能由类实现或接口继承接口。

## 接口的语法格式
**定义接口**

```java
public interface MyInterface{
    // 常量
    int AGE = 20;
    
    // 抽象方法
    void run();
}
```

**类实现接口**

```java
public class Student implements MyInterface{
    @Override
    public viod run(){
        System.out.println("student run");
    }
}
```

## 接口中的成员（Java8以后）
| 成员类型 | 默认关键字 | 可否省略 | 特点 |
| --- | --- | --- | --- |
| 常量（public static final） | 默认有 | 可以省略 | 接口中只能定义常量 |
| 抽象方法（public abstract） | 默认有 | 可以省略 | 实现类必须重写 |
| 默认方法（default method） | 必须写default | 不能省略 | 有方法体，可被实现类重写 |
| 静态方法（static method） | 必须写static | 不能省略 | 接口名调用 |
| 私有方法（private method） | 必须写private | 不能省略 | 仅接口内部使用（Java9+） |


**接口中的变量必须是常量**

```java
public interface A{
    int NUM = 10; // 等价于 public static final int NUM = 10;
}
```

>  即使不写public static final，编译器也会自动加上。
>

**接口中的抽象方法**

```java
void run(); // 默认已经是 public abstract
```

> + 无方法体
> + 实现类必须实现（除非实现类是抽象类）
>

**接口中的默认方法（Java8）**

```java
default void eat(){
    System.out.println("eat...");
}

// 调用
Student s = new Student();
s.eat();
```

> + 有方法体
> + 实现类可选择重写
> + 解决接口升级问题（不破坏已有实现类）
> + 可以使用接口名.super.方法名() 调用父接口默认方法
>

**接口中的静态方法（Java8）**

```java
static void test(){
    System.out.println("interface static method");
}

// 调用
MyInterface.test();
```

> + 不会被继承
> + 只能通过接口名调用
>

**接口中的私有方法（Java9）：**用于接口内部代码复用

```java
private void log(){
    System.out.println("log...");
}
```

> + 不能被实现类使用
> + 仅接口内部其他默认方法/静态方法调用
>

## 接口的继承
**接口支持多继承**

```java
public interface A{
    void a();
}

public interface B{
    void b():
}

public interface C extends A,B{
    void c();
}
```

## 类与接口的关系——多实现
```java
public class Student implements A,B{
    @Override
    public void a(){}
    
    @Override
    public void b(){}
}
```

Java 中类只能单继承，但可以**实现多个接口**，这种机制弥补了单继承的缺陷。

## 接口的多态性
接口变量可以指向实现类对象

```java
MyInterface m = new Student();
m.run();
```

多态体现：

+ 编译看左边（接口类型）
+ 运行看右边（真实对象）

# 内部类
## 什么是内部类
**内部类是定义在类内部的类。**

作用：

+ 可以访问外部类的成员（包括private）
+ 用于逻辑分组，隐藏实现
+ 更方便地实现回调（Java用内部类实现匿名函数的雏形）

## 内部类的分类与特点
### 成员内部类（普通内部类）
定义在类中，属于外部类对象的一部分：

```java
class Outer{
    private int a = 10;
    class Inner{
        void show(){
            System.out.println("a");
        }
    }
}
```

**创建方式：**

```java
Outer.Inner inner = new Outer().new Inner();
```

**特点：**

+ 能访问外部类所有成员（包括private）
+ 外部类访问内部类需创建对象

### 静态内部类
```java
class Outer{
    static class Inner{
        void show() {
            System.out.println("static inner");
        }
    }
}
```

**创建方式：**

```java
Outer.Inner inner = new Outer.Innter();
```

**特点：**

+ 不依赖外部类对象
+ 只能访问外部类的静态成员

### 局部内部类
**定义在方法中：**

```java
void test(){
    class Inner{
        void show(){}
    }
}
```

**特点：**

+ 只能在方法内部使用
+ 可以访问final或effectively final的局部变量（Java8+）

### 匿名内部类
**最常用的一种实现方式，用于快速实现接口、继承类**

```java
Runnable r = new Runnable(){
    @Override
    public void run(){
        System.out.println("run...");
    }
}
```

**特点：**

+ 无类名
+ 用于一次性实现接口或继承类
+ 常用于回调、事件监听

# 枚举
## 枚举的概念
枚举用于定义**有限个固定常量**的类型

```java
public enum Season{
    SPRING,SUMMER,AUTUMN,WINTER;
}
```

**优点：**

+ 类型安全（避免魔法数字、字符串常量）
+ 表达式含义更清晰
+ Java中enum是一个特殊的**类**

## 枚举的特性
枚举本质上是一个类；

+ 自动继承`java.lang.Enum`
+ 枚举项都是`public static final`
+ 构造函数必须是`private`
+ 枚举可以定义：
    - 构造方法
    - 成员变量
    - 方法

## 带构造方法的枚举
```java
public enum Status{
    SUCCESS(200),
    ERROR(500);
    
    private final int code;
    
    Status(int code){
        this.code = code;
    }
    
    public int getCode(){
        return code;
    }
}
```

**使用：**

```java
Status.SUCCESS.getCode();
```

## 枚举常用方法
| 方法 | 作用 |
| --- | --- |
| values() | 获取所有枚举项 |
| valueOf("STR") | 根据名称获取枚举常量 |
| name() | 获取枚举项名称 |
| ordinal() | 获取枚举项自定义序号（从0开始） |


## 枚举实现接口
```java
enum Color implements Showable{
    RED,GREEN;
    
    @Override
    public void show() {
        System.out.println("color");
    }
}
```

# 注解
## 什么是注解
注解是**辅助说明性的结构**，用于提供配置信息。注解可以像修饰符一样使用，可以用于修饰包、类、构造器、方法、成员变量、参数、局部变量的声明。还可以添加一些参数值，这些信息被保存在注解的`name`属性中。注解还可以在类编译、运行时进行加载，体现不同的功能。

## 内置常用注解
**编译器相关：**

| 注解 | 作用 |
| --- | --- |
| @Override | 检查方法是否可重写 |
| @Depracated | 表示方法/类已过时 |
| @SuppressWarnings | 抑制警告 |


**生成文档相关：**

| 注解 | 作用 |
| --- | --- |
| @author | 标明开发该类模块的作者，多个作者之间使用,隔开 |
| @version | 标明该类模块的版本 |
| @see | 参考转向，也就是相关主题 |
| @since | 从哪个版本开始增加的 |
| @param | 对方法中某个参数的说明 |
| @return | 对方法返回值的说明 |
| @exception | 对方法抛出的异常的说明 |


## 元注解（定义注解时使用的注解）
| 元注解 | 作用 |
| --- | --- |
| @Retention | 指定注解的生命周期 |
| @Target | 指定注解能用在什么位置 |
| @Documented | 注解是否生成到文档 |
| @Inherited | 子类是否能继承父类注解 |


**声明周期：**

+ SOURCE: 只在源码
+ CLASS: 存在字节码（默认）
+ RUNTIME: 运行时可获取

## 自定义注解
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log{
    String value();
}
```

**使用：**

```java
@Log("save user")
public void save(){}
```

# 包装类
## 为什么需要包装类？
Java 基本类型不是对象，而集合、泛型只能存对象。因此需要包装类作为“基本类型的对象表示”。

| **基本类型** | **包装类** |
| --- | --- |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |


## 装箱与拆箱
**自动装箱：**基本类型->包装类

```java
Integer a = 10; 
```

**自动拆箱：**包装类->基本类型

```java
int b = a;
```

## 基本数据类型、包装类与字符串间的转换
**基本数据类型转换为字符串**

+ 调用字符串重载的valueOf方法

```java
int a = 10;
String str = String.valueOf(a);
```

+ 使用+拼接

```java
int a = 10;
String str = a + "";
```

**字符串转为基本类型**

+ 除了Character类之外，其他所有包装类都具有`parseXxx`静态方法可以将字符串参数转换为对应的基本类型。

```java
public static int parseInt(String s); //将字符串参数转换为对应的int类型
public static long parseLong(String s); //将字符串参数转换为对应的long类型
public static double parseDouble(String s); //将字符串参数转换为对应的double类型
```

+ 字符串转为包装类，然后自动拆箱为基本数据类型

```java
public static Integer valueOf(String a); //将字符串参数转换为对应的Integer包装类
public static Long valueOf(String s); //将字符串参数转换为对应的Long包装类
public static Double valueOf(String s); //将字符串参数转换为对应的Double包装类
```

+ 通过包装类的构造器实现

```java
int a = Integer.parseInt("整数的字符串");
double d = Double.parseDouble("小数的字符串");
boolean b = Boolean.parseBoolean("true或false");
```

