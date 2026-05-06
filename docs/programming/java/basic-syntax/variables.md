# 关键字（keyword）
被Java语言已经定义好了，赋予了特殊含义，用做专门用途的字符串（或单词）。

特点：全部关键字都是小写字母。

[官方地址](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html)

> 1. 关键字一共50个，其中const和goto时保留字。
> 2. true、false、null不是关键字，他们是字面量，表示特殊的布尔值和空值。
>

| 用于定义数据类型的关键字 | | | | |
| --- | --- | --- | --- | --- |
| class | interface | enum | byte | short |
| int | long | float | double | char |
| boolean | void |  |  |  |
| 用于定义流程控制的关键字 | | | | |
| if | else | switch | case | default |
| while | do | for | break | continue |
| return |  |  |  |  |
| 用于定义访问权限修饰符的关键字 | | | | |
| private | protected | public |  |  |


| 用于定义类，函数，变量修饰符的关键字 | | | | |
| --- | --- | --- | --- | --- |
| abstract | final | static | synchronized |  |
| 用于定义类与类之间关系的关键字 | | | | |
| extends | implements |  |  |  |
| 用于定义建立实例及引用实例，判断实例的关键字 | | | | |
| new | this | super | instanceof |  |
| 用于异常处理的关键字 | | | | |
| try | catch | finally | throw | throws |
| 用于包的关键字 | | | | |
| package | import |  |  |  |
| 其他修饰符的关键字 | | | | |
| native | strictfp | transient | volatile | assert |
| const | goto |  |  |  |
| 用于定义数据类型值的字面值 | | | | |
| true | false | null |  |  |


# 标识符(identifier)
Java中变量、方法、类等要素命名时使用的字符序列，称为`标识符`。

**标识符的命名规则:**

+ 硬性要求：
    - 由26个英文字母大小写，0-9，_或$组成
    - 数字不可以开头
    - 不可以使用关键字和保留字，但能包含关键字和保留字
    - Java中严格区分大小写，长度无限制
    - 表示符不能包含空格
+ 软性要求：
    - 包名：多单词组成时所有字母都小写：java.lang
    - 类名、接口名：所有单词首字母大写：HelloWorld
    - 变量名、方法名：多单词组成时，第一个单词首字母小写，第二个单词首字母大写：bookName
    - 常量名：所有字母都大写。多单词时每个单词用下划线连接：MAX_VALUE

# 变量
## 什么是变量
+ 变量的概念
    - 内存中的一个存储区域，该区域的数据可以在同一类型范围内不断变化
    - 变量的构成包含三个要素：**数据类型、变量名、存储的值**
    - Java中变量声明的格式：_数据类型 变量名 = 变量值_
+ 变量的作用：用于在内存中保存数据。
+ 使用变量注意：
    - Java中每个变量必须先声明，后使用。
    - 使用变量名来访问这块区域的数据。
    - 变量的作用域：其定义所在的一对{}内。
    - 变量只有在其作用域内才有效。出了作用域，变量不可以再被调用。
    - 同一个作用域内，不能定义重名的变量。

## Java中变量的数据类型
Java中变量的数据类型分为两大类：

+ **基本数据类型:** 整型、浮点型、字符类型、布尔类型。
+ **引用数据类型:** 数组、类、接口、枚举、注解、记录。
  ![Java中数据类型](./assets/Java中数据类型.png)

## 变量的使用
+ 声明：

```java
//数据类型 变量名;
int age;
double weight;
char gender;
boolean marry;
// 同时声明多个同类型的变量
int a,b,c;
```

+ 赋值

给变量赋值就是把值存到该变量代表的内存空间中。给变量赋的值类型必须与变量声明的类型一致或兼容。

```java
// 变量名 = 值;
age = 18;
weight = 109;
gender = '女';
// 变量声明与赋值一并执行
int age = 19;
```

> 可以使用合适类型的_常量值_给已声明的变量赋值。
>
> 可以使用其他变量或表达式给变量赋值
>
> 变量可以反复赋值
>

# 基本数据类型
## 整型
整型表示没有小数部分的数据，允许是负数。Java中有四种整型。

| 类型 | 存储空间 | 取值范围 |
| --- | --- | --- |
| byte 字节 | 1字节 | $-2^{8-1} \sim 2^{8-1}-1$(-128~127) |
| short 短整型 | 2字节 | $-2^{2 \times 8-1} \sim 2^{2 \times 8-1}-1$ |
| int 整型 | 4字节 | $-2^{4 \times 8-1} \sim 2^{4 \times 8-1}-1$(约21亿) |
| long 长整型 | 8字节 | $-2^{8 \times 8-1} \sim 2^{8 \times 8-1}-1$ |


> + 定义long类型的变量，赋值时需要以"l"或"L"作为后缀
> + Java程序中整数的变量通常声明为int型，除非不足以表示较大的数，才使用long
> + Java的整型常量默认为int型
>

## 浮点类型
| 类型 | 存储空间 | 取值范围 |
| --- | --- | --- |
| float 单精度 | 4字节 | 大约±3.402 823 47E+38F(有效位数6～7位) |
| double 双精度 | 8字节 | 大约±1.797 693 134 862 315 70E+308(有效位数为15位) |


浮点型常量有两种表示形式：

+ 十进制数形式：如：5.12 512.0F .512(必须有小数点)
+ 科学计数法形式：如：5.12e2 512E2 100E-2

> 定义float类型的变量，赋值时需要以F或f作为后缀。没有后缀的浮点数默认是double类型。
>

## 计算机存储单位
+ **字节(Byte)**: 是计算机用于_计算存储容量_的基本单位，一个字节等于8bit。
+ **位(bit)**: 是数据存储的_最小单位_。二进制数系统中，每个0或1就是一个位，叫做bit(比特)。
+ **转换关系**：
    - 8 bit = 1Byte
    - 1024 Byte = 1KB
    - 1024KB = 1MB
    - 1024MB = 1GB
    - 1GB = 1T

## 字符型
char类型数据用于表示通常意义上的**字符**（占两个字节），Java中的所有字符都使用Unicode编码，因此一个字符可以存储一个字母，一个汉字或者其他书面语的一个字符。

字符型变量的三种表现形式：

+ 形式1:使用单引号括起来的单个字符。

```java
char c1 = 'a';
char c2 = '中';
char c3 = '9';
```

+ 形式2:直接使用Unicode值来表示字符型常量：'\uXXXX'。XXXX表示一个十六进制整数。
+ 形式3:Java中允许使用转义字符"\"来将字符转换为特殊字符型常量。

```java
char c3 = '\n'; //表示换行符
```

+ 常见转义字符

| 转义字符 | 说明 | Unicode表示方式 |
| --- | --- | --- |
| \n | 换行符 | \u000a |
| \t | 制表符 | \u0009 |
| \" | 双引号 | \u0022 |
| \' | 单引号 | \u0027 |
| \\ | 反斜线 | \u005c |
| \b | 退格符 | \u0008 |
| \r | 回车符 | \u000d |


char类型是可以进行运算的。因为每一个char都有对应的Unicode码，可以看做是一个数值。

## 布尔类型
boolean类型用来判断逻辑条件，一般用于流程控制语句中。boolean类型数据只有两个值：`true、false`.

# 基本数据类型间运算规则
在Java中，不同的基本数据类型（只有7种，不包含boolean类型）变量的值经常会进行相互转换，转换的方式有两种：_自动类型提升_和_强制类型转换_。

## 自动类型提升
规则：将取值范围小（或容量小）的类型自动提升为取值范围大（或容量大）的类型。

基本数据类型的转换规则：

![自动类型提升](./assets/自动类型提升.png)

+ 当把存储范围小的值（常量值、变量的值、表达式计算的结果值）赋值给了存储范围大的变量时：

```java
int i = 'A';// char自动升级为int，其实就是把字符的编码值赋值给了i变量

double d = 10;//int自动提升为double

long num = 1234567; //int类型自动提升为long类型，等号右边的数值如果在int范围内，编译和运行都可以通过

long bigNum = 12345678912L; // 右边的整数值如果超过int范围，必须加L后缀，显示表示long类型，否则编译不通过
```

+ 当存储范围小的数据类型与存储范围大的数据类型一起混合运算时，会按照最大的类型运算。

```java
int i = 1;
byte b = 1;
double d = 1.0;
double sum = i + b + d; //混合运算，升级为double
```

+ 当byte，short，char数据类型进行算数运算时，按照int类型处理。

```java
byte b1 = 1;
byte b2 = 2;
byte b3 = b1 + b2; // 编译不通过， b1 + b2 自动升级为int

char c1 = '0';
char c2 = 'A';
int i = c1 + c2; //至少需要使用int类型来接收
```

## 强制类型转换
将取值范围大（或容量大）的类型强制转换成取值范围小（或容量小）的类型。自动类型提升是Java自动执行的，而强制类型转换是自动类型提升的逆运算，需要手动执行。

**转换格式**：数据类型1 变量名 = （数据类型1）被强制转换的数据值

+ 当把存储范围大的值（常量值、变量的值、表达式计算的结果值）强制转换为存储范围小的变量时，可能会损失精度或溢出。

```java
int i = (int) 3.14; // 损失精度

double d = 1.2;
int num = (int)d; // 损失进度

int i = 200;
byte b = (byte)i;// 溢出
```

+ 当某个值想要提升数据类型时，也可以使用强制类型转换。这种情况的强制类型转换是_没有风险_的，通常省略。

```java
int i = 1;
int j = 2;
double bigger = (double)(i/j);
```

+ 声明long类型变量时，可以出现省略后缀的情况。float则不同。

```java
long l1 = 123L;
long l2 = 123; // 这个可以看作是int类型自动提升为long类型


float f1 = 12.3; //编译不通过，浮点数值默认是double类型，不能自动转换为float类型
float f2 = 12.3F; // 加后缀
float f3 = (float)12.3; // 强制转换
```

## 基本数据类型与String的运算
+ 任意的基本数据类型与String类型只能进行连接“+”运算，且结果一定也是String类型。

```java
System.out.println("" + 1 + 2); // "12"

int num = 10;
boolean b1 = true;
String s1 = "abc";

String s2 = s1 + num + b1;
System.out.println(s2); // abc10true
```

+ String类型不能通过强制类型()转换，转为其他的类型

```java
String str = "123";
int num = (int)str; // 编译不通过
```

# 运算符（Operator）
运算符是一种特殊的符号，用以表示数据的运算、赋值和比较等。

## 算数运算符
+ 在Java中，使用算数运算符`+、-、*、/`表示加减乘除运算。当参与/运算的两个操作数都是整数是，表示整数除法。
+ 整数的求余操作（也称为取模）使用%表示。例如：15/2等于1，15%2等于1，15.0%2等于7.5。

> 整数被0除将会产生一个异常，而浮点数被0除将会得到无穷大或NaN结果。
>

## 数学函数与常量
在Math类中，包含了各种各样的数学函数。

+ bas函数

abs函数用于返回一个数字的绝对值。该函数接受一个参数，可以是任何整型类型或浮点类型。如果参数是正数，则返回该数本身；如果参数为负数，则返回其相反数。如果参数是NaN(不是数字)，则返回NaN。示例：

```java
public class MathAbsExample{
  public static void main(String[] args){
    int number1 = -19;
    double number2 = -20.5;
    
    // 计算两个数的绝对值
    int absNumber1 = Math.abs(number1);
    double absNumber2 = Math.abd(number2);
    
    System.out.println("绝对值:" + absNumber1);
    System.out.println("绝对值:" + absNumber1);
  }
}复制ErrorOK!
```

输出：

```java
绝对值：10
绝对值：20.5复制ErrorOK!
```

+ cell函数

cell函数用于返回大于等于给定参数的最小整数。该函数接受一个double类型的参数，并返回一个double类型的结果。如果参数是NaN(不是数字)，则返回NaN。示例：

```java
public class MathCeilExample {
    public static void main(String[] args) {
        double number1 = 12.4;
        double number2 = -8.6;
        
        // 计算两个数的向上取整
        double ceilNumber1 = Math.ceil(number1);
        double ceilNumber2 = Math.ceil(number2);
        
        System.out.println("向上取整：" + ceilNumber1);
        System.out.println("向上取整：" + ceilNumber2);
    }
}复制ErrorOK!
```

输出：

```java
向上取整：13.0
向上取整：-8.0复制ErrorOK!
```

> 当参数为正数时，向上取整是取大于等于该数的最小整数；但参数为负数时，向上取整是取小于等于该数的最大整数。
>

+ floor函数

floor函数用于返回一个小于等于给定参数的最大整数。该函数接受一个参数，可以是任何浮点类型，包括float和double。示例：

```java
public class MathFloorExample {
    public static void main(String[] args) {
        double number1 = 10.5;
        double number2 = -20.5;
       
        // 计算两个数的floor值
        double floorNumber1 = Math.floor(number1);
        double floorNumber2 = Math.floor(number2);
        
        System.out.println("floor值：" + floorNumber1);
        System.out.println("floor值：" + floorNumber2);
    }
}复制ErrorOK!
```

输出：

```java
floor值：10.0
floor值：-21.0复制ErrorOK!
```

> 如果参数为正数，则返回大于该数的最大整数值；如果参数为负数，则返回不小于该数的最大整数值。
>

+ max函数

max函数用于返回两个数字中的较大值。该函数接受两个参数，可以是任何整数类型或浮点类型。如果两个参数都是NaN,则返回NaN；如果只有一个参数是NaN，则返回另一个参数。如果两个参数相等，则返回第一个参数。示例：

```java
public class MathMaxExample {
    public static void main(String[] args) {
        int number1 = 10;
        double number2 = 20.5;
       
        // 计算两个数的最大值
        int maxNumber1 = Math.max(number1, 15);
        double maxNumber2 = Math.max(number2, 25.5);
        
        System.out.println("最大值：" + maxNumber1);
        System.out.println("最大值：" + maxNumber2);
    }
}复制ErrorOK!
```

输出：

```java
最大值：15
最大值：25.5复制ErrorOK!
```

+ min函数

min函数用于返回两个数字中较小值。该函数接受两个参数，可以是任何整数类型和浮点类型。如果第一个参数小于第二个参数，则返回第一个参数；否则返回第二个参数，如果参数是NaN,则返回NaN。示例：

```java
public class MathMinExample {
    public static void main(String[] args) {
        int number1 = 10;
        double number2 = 20.5;
       
        // 计算两个数的最小值
        int minNumber = Math.min(number1, 15);
        double minNumber2 = Math.min(number2, 10.5);
 
        System.out.println("最小值：" + minNumber);
        System.out.println("最小值：" + minNumber2);
    }
}复制ErrorOK!
```

输出:

```java
最小值：10
最小值：10.5复制ErrorOK!
```

## 强制类型转换
Java中的强制类型转换有两种形式，基本类型转换和引用数据类型转换。基本数据类型的转换，一般发生在需要将大范围数值转换为小范围数值（int类型转换为short类型），或者将高精度类型转换为低精度类型（double类型转换为int类型），这种转换需要通过**强制类型转换**来完成。强制类型转换的语法格式是在圆括号中给出想要转换的目标类型，后边紧跟待转换的变量名。例如

```java
double x = 9.997;
int nx = (int)x; // 9,强制类型转换通过截断小数部分将浮点数值转换为整型。复制ErrorOK!
```

引用数据类型的强制类型转换：xxxx

## 结合赋值和运算符
Java中，可以在赋值中使用二元运算符，例如：

```java
x += 4;
// 等价于
x = x + 4;
```

一般来说，要把运算符放在 = 号左边，如 *= 或 %=。

> 如果运算符得到一个值，其类型与左侧操作数的类型不同，就会发生强制类型转换。
>

## 自增与自减运算符
+ 自增：++
+ 自减：--

n++将变量n的当前值加1，n--将n的值减1。

+ 前缀和后缀
    - 前缀：先加减，后计算
    - 后缀：先计算，后加减

## 关系和boolean运算符
+ 关系运算符

```java
3==7; //false
```

```java
3 != 7; //true
```

    - `==`:检测相等性
    - `!=`:检测不相等
    - `<、>、<=、>=`:比较大小
+ 逻辑运算符
    - `&&`:逻辑与（短路运算）
    - `||`:逻辑或（短路运算）
    - `!`:逻辑非

> 短路运算特点：
>
> + expr1 && expr2:若expr1为false，不计算expr2
> + expr1 || expr2:若expr1为true，不计算expr2
>

+ 三元运算符

```java
x < y ? 1 : 0;
```

    - 语法：表达式 ? 值1 : 值2;
    - 示例：

## 位运算符
+ 基本位运算符

示例：

```java
// 检查 n 的二进制从右数第 4 位是否为 1
int fourthBitFromRight = (n & 0b1000) / 0b1000;
// 或使用移位操作：
int fourthBitFromRight = (n & (1 << 3)) >> 3;
```

    - `&`:按位与
    - `|`:按位或
    - `^`:按位异或
    - `～`:按位非
+ 位移运算符
    - `<<`:左移（低位补0）
    - `>>`:右移（高位补符号位）
    - `>>>`:无符号右移（高位补0）

> 右操作数会被模32（long类型模64）例如：`1 << 35`等价于`1 << 3`
>

## 括号与运算符优先级
优先级规则

+ 不使用括号时按优先级顺序计算
+ 同级别运算符从左向右计算（除右结合运算符外）
+ 右结合运算符包括：`=、+=、-=、?:`等

示例：

```java
a && b || c     // 等价于 (a && b) || c
a += b += c     // 等价于 a += (b += c)
```

