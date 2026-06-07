#  异常
## 什么是异常
**异常**是指在程序运行过程中发生不正常事件，它会中断正常的指令流。例如：_打开不存在的文件、网络连接中断、数组下标越界、空指针访问等_。

Java中使用**异常**这种面相对象的方式来处理错误，通过异常机制，可以将业务逻辑和错误处理代码分离，使程序更健壮、更易维护。

## 异常的体系结构
Java的所有的异常都继承自`java.lang.Throwable`类。

![异常的体系结构](/Users/weixinsun/project/blog/stackIsland/docs/programming/java/basic-syntax/assets/异常的体系结构.png)

**Throwable**

+ 是所有错误和异常的父类
+ 常用方法：
    - `String getMessage()`：获取异常的详细信息
    - `void printStackTrace()`：打印异常的堆栈跟踪信息
    - `String toString()`：返回异常的简短描述

**Error**

+ 是程序无法处理的严重问题，表示运行应用程序的系统级错误
+ 通常由JVM产生和抛出，应用程序不应试图捕获和处理
+ 例子：
    - `OutofMemoryError`：内存耗尽
    - `StackOverflowError`：栈溢出
    - `VirtualMachineError`：虚拟机错误
+ 特点：Unchecked Exception(非检查型异常)

**Exception**

+ 是程序本身可以处理的问题。
+ 主要分为两大类：**检查型异常**和**非检查型异常**

## 检查型异常vs非检查型异常
| 特性 | 检查型异常 | 非检查型异常 |
| --- | --- | --- |
| 继承关系 | 继承自`Exception`，但不包括`RuntimeException` | 继承自`RuntimeException`或`Error` |
| 处理要求 | 必须被处理（捕获或声明抛出） | 不强制要求处理 |
| 编译器检查 | 是 | 是 |
| 常见异常 | IOException、SQLException、ClassNotFoundException | NullPointerException、ArrayIndexOutofBoundsException、IllegalArgumentException |
| 设计理念 | 表示程序可预见、可恢复的问题 | 表示程序逻辑错误或系统级问题 |


## 异常处理的关键字
Java通过五个关键字来实现异常处理：`try`，`catch`，`finally`，`throw`，`throws`。

### try-catch-finaaly块
Java中最核心的异常捕获和处理结构

```java
try {
    // 可能会发生异常的代码块
    FileInputStream file = new FileInputStream("nonexistent.txt");
} catch (FileNotFoundException e) {
    // 捕获并处理特定的异常
    System.out.println("文件未找到: " + e.getMessage());
    e.printStackTrace(); // 打印堆栈轨迹，用于调试
} catch (IOException e) {
    // 可以捕获多个异常，子类异常要放在父类前面
    System.out.println("发生IO异常");
} catch (Exception e) {
    // 一个“兜底”的捕获块，可以捕获所有Exception及其子类
    System.out.println("发生了未知异常");
} finally {
    // 无论是否发生异常，都会执行的代码块
    // 通常用于释放资源，如关闭文件、数据库连接等
    System.out.println("finally块始终执行");
}
```

从Java7开始支持多重捕获

```java
} catch (FileNotFoundException | NullPointerException e) {
    System.out.println("捕获到文件未找到或空指针异常");
}
```

+ `finally`块在`try`和`catch`中有`return`语句时依然会执行

### throws关键字
用于**方法签名**中，声明该方法可能抛出的检查型异常，将异常抛给方法的调用者处理。

```java
public void readFile() throws IOException, SQLException {
    // 方法体内部可能会抛出IOException或SQLException
    // 但本方法不处理，交给调用者处理
    FileInputStream file = new FileInputStream("myfile.txt");
    // ... 其他可能抛出SQLException的代码
}
```

### throw关键字
用于在方法体中内部**主动抛出一个异常对象**。

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        // 抛出一个运行时异常（非检查型）
        throw new IllegalArgumentException("年龄不合法: " + age);
    }
    this.age = age;
}
```

# 自定义异常
通过继承`Exception`或`RuntimeException`可以创建一个自定义异常类。

+ 继承`Exception`->创建检查型异常
+ 继承`RuntimeException`->创建非检查型异常。

**示例**

```java
// 自定义一个检查型异常
public class MyCheckedException extends Exception {
    public MyCheckedException() {
        super();
    }

    public MyCheckedException(String message) {
        super(message);
    }
}

// 自定义一个非检查型异常（业务逻辑异常）
public class MyBusinessException extends RuntimeException {
    public MyBusinessException() {
        super();
    }

    public MyBusinessException(String message) {
        super(message);
    }
}

// 使用自定义异常
public void businessOperation(int value) throws MyCheckedException {
    if (value < 0) {
        throw new MyCheckedException("值不能为负数");
    }
    if (value == 0) {
        // 非检查型异常，不需要在方法签名中声明
        throw new MyBusinessException("值不能为零");
    }
}
```

## try-with-resources(Java7+)
Java7之后提供了一种自动资源关闭的语法糖，用于自动关闭实现了`AutoCloseable`接口的资源（如`InputStream`、`Connection`等）

+ 传统方式（比较繁琐）

```java
BufferedReader br = null;
try {
    br = new BufferedReader(new FileReader("file.txt"));
    String line = br.readLine();
    // ... 处理line
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (br != null) {
        try {
            br.close(); // 需要手动关闭，也可能抛出异常
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
}
```

+ try-with-resources

```java
// 在try后的括号中声明资源，JVM会自动关闭它们
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    String line = br.readLine();
    // ... 处理line
} catch (IOException e) {
    e.printStackTrace();
}
// 无需finally块！资源会自动关闭。
```

+ 支持多个资源

```java
try (FileInputStream input = new FileInputStream("source.txt");
     FileOutputStream output = new FileOutputStream("target.txt")) {
    // ... 使用input和output
} catch (IOException e) {
    e.printStackTrace();
}
```

# 断言(Assertions)
## 什么是断言
+ 断言是Java中提供的一种调试工具，用于在开发和测试阶段验证程序的内部逻辑
+ 断言失败会抛出`AssertionError`
+ 默认情况下断言是禁用的

## 语法格式
```java
// 第一种形式：简单布尔表达式
assert condition;

// 第二种形式：带错误信息的布尔表达式
assert condition : expression;
```

## 使用示例
```java
public class AssertionExample{
    public void withdrawa(double amount){
        assert amount > 0 : "取款金额必须大于0:" + amount;
        
        double balance = getBalance();
    assert balance >= amount : "余额不足: 余额=" + balance + ", 取款=" + amount;
        
        // 业务逻辑
    }
    
    public void processList(List<String> list) {
        assert list != null : "列表不能为null";
        assert !list.isEmpty() : "列表不能为空";
        
        for (String item : list) {
            assert item != null : "列表元素不能为null";
        }
    }
}
```

## 启用和禁用断言
```bash
# 启用所有断言
java -ea MyClass
# 或
java -enableassertions MyClass

# 禁用所有断言
java -da MyClass
# 或
java -disableassertions MyClass

# 启用特定包的断言
java -ea:com.mycompany... MyClass

# 启用系统类的断言（谨慎使用）
java -esa MyClass
```

## 断言的使用场景
**适合使用断言的情况：**

+ 检查内部不变性（invariants）
+ 控制流不变性
+ 后置条件检查
+ 类不变性检查

**不适合使用断言的情况：**

+ 参数验证（应使用异常）
+ 公共方法的输入检查
+ 会改变程序状态的操作
+ 错误恢复（断言失败程序终止）

# 断言vs异常
| 特性 | 断言 | 异常 |
| --- | --- | --- |
| 目的 | 调试和测试 | 错误处理 |
| 默认状态 | 禁用 | 始终启用 |
| 性能影响 | 生产环境无影响 | 始终有影响 |
| 使用场景 | 内部逻辑验证 | 外部条件检查 |

