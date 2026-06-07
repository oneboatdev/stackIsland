# 不可变的字符串：String
## 字符串的特性
`java.lang.String`类代表字符串。Java程序中所有的字符串字面量 （如"hello"）都可以看作是实现此类的实例。它的核心特征可以概括为以下几点：

+ 常量性：字符串是常量，用双引号括起来表示。他们的值在创建之后**不能更改**。
+ 不能被继承：字符串`String`类型是被`final`声明的。
+ 底层存储：`String`对象的字符内容是存储在一个字符数组`value[]`中的。
    - JDK8以前：底层使用`private final char value[]`。`final`保证了数组的内容也无法被外部修改。
    - JDK9及以后，为了节省空间，底层优化为使用`private final byte[] value`。因为大多数字符串只包含Latin-1字符，这些字符只需要一个字节便存储，使用`byte[]`可以节省一半的空间。

**为什么设计成不变？**

不可变性带来了线程安全、可以缓存哈希码（`hash`字段）、以及可以被安全地共享（字符串常量池）等诸多好处。

## String的内存结构：常量池与堆
由于字符串对象被设计为不可变，Java虚拟机提供了**字符串常量池**来保存对象，以实现共享，提高效率。

+ 未知变迁：在JDK6中，字符串常量池位于方法区（永久代）。**从JDK7开始，字符串常量池被移到了堆空间**，并一直延续至今。

理解字符串的创建，关键在于区分字面量赋值和`new`关键字赋值。

### 拼接规则
字符串的拼接操作是实际开发中的常客，其结果存储位置遵循以下规则：

1. **常量 + 常量**：结果在**常量池**中。因为编译器在编译期间就能确定结果。
2. **常量与变量** 或 **变量与变量**：结果在**堆**中。因为变量的值在运行时才能确定。
3. **调用`intern()`方法**：如果堆中的字符串对象调用`intern()`，会去常量池中查找。如果存在，则返回常量池中该字符串的引用；如果不存在，则将该字符串对象的引用放入常量池并返回。

**示例**：

```java
@Test
public void testStringConcat() {
    String s1 = "hello";
    String s2 = "world";
    String s3 = "helloworld"; // 常量+常量，在常量池

    String s4 = s1 + "world"; // 变量+常量，在堆
    String s5 = s1 + s2;      // 变量+变量，在堆
    String s6 = "hello" + "world"; // 常量+常量，在常量池

    System.out.println(s3 == s4); // false，一个在常量池，一个在堆
    System.out.println(s3 == s5); // false，一个在常量池，一个在堆
    System.out.println(s3 == s6); // true，都在常量池，指向同一个对象
}
```

**特殊情况**：`final`**修饰的变量**

如果一个变量被`final`修饰，它在编译期就被视为常量。

```java
@Test
public void testFinalString() {
    final String s1 = "hello";
    final String s2 = "world";
    String s3 = "helloworld";
    
    // s1 和 s2 都是常量，所以 s1 + "world" 和 s1 + s2 都等同于常量+常量
    String s4 = s1 + "world"; 
    String s5 = s1 + s2;      
    
    System.out.println(s3 == s4); // true
    System.out.println(s3 == s5); // true
}
```

### `new String()`的奥秘
`String str = new String("abc");`这行代码其实是创建了两个对象，前提是常量池中之前没有"abc"。

1. 一个`"abc"`字面量对象被创建在**字符串常量池中**。
2. 一个`new String("abc")`对象被创建在**堆**中，其内部的`value`数组指向常量池中`"abc"`的`value`数组。

## String常用API
`String`类提供了丰富的方法来操作字符串，可以将其分为几个大类。

### 构造器与转换
+ 构造器：
    - `String()`：创建空字符串
    - `String(String origin)`：创建字符串副本。
    - `String(char[] value)`：通过字符数组构造。
    - `String(byte[] bytes)`：通过字节数组，使用平台默认字符集解吗构造。
+ 与其他结构转换：
    - **字符串 -> 基本类型/包装类**：`Integer.parseInt("123")`
    - **基本类型/包装类 -> 字符串**：`String.valueOf(123)`
    - **字符串 <-> 字符数组**：`toCharArray()`，`new String(char[])`
    - **字符串 <-> 字节数组**：`getBytes()`，`new String(byte[])`。注意编码和解码时要使用相同的字符集，否则会出现乱码。

### 常用方法
| 方法类别 | 方法签名 | 功能说明 |
| --- | --- | --- |
| **基础** | `int length()` | 返回字符串长度 |
| | `boolean isEmpty()` | 判断字符串是否为空 |
| | `char charAt(int index)` | 返回指定索引处的字符 |
| **比较** | `boolean equals(Object obj)` | 比较字符串内容是否相等（区分大小写） |
| | `boolean equalsIgnoreCase(String str)` | 比较字符串内容是否相等（不区分大小写） |
| | `int compareTo(String other)` | 按字典顺序比较两个字符串 |
| **查找** | `boolean contains(CharSequence s)` | 判断是否包含指定字符序列 |
| | `int indexOf(String str)` | 返回指定子字符串第一次出现的索引 |
| | `int lastIndexOf(String str)` | 返回指定子字符串最后一次出现的索引 |
| **截取** | `String substring(int begin)` | 从 `begin` 索引截取到末尾 |
| | `String substring(int begin, int end)` | 从 `begin` 截取到 `end` (不包含) |
| **修改** | `String concat(String str)` | 拼接字符串 |
| | `String replace(char old, char new)` | 替换所有指定字符 |
| | `String replaceAll(String regex, String replacement)` | 使用正则表达式替换 |
| | `String[] split(String regex)` | 使用正则表达式拆分字符串 |
| **处理** | `String toLowerCase()` / `toUpperCase()` | 转小写 / 转大写 |
| | `String trim()` | 去除字符串首尾的空白字符 |
| | `boolean startsWith(String prefix)` | 判断是否以指定前缀开头 |
| | `boolean endsWith(String suffix)` | 判断是否以指定后缀结尾 |


# 可变字符序列：StringBuffer、StringBuilder
字符串的不可变性带来了线程安全与常量池共享等优势。然而，这种不可变性也带来了一个明显的短板：**在进行频繁的字符串修改和拼接时，效率极低，且会产生大量临时对象，消耗内存**。

为了解决这个问题，Java在`java.lang`包中提供了两个可变的字符序列类；`StringBuffer`和`Stringbuilder`。

## 核心区别：String vs StringBuffer vs StringBuilder
这三者最核心的区别在于**可变性**与**线程安全**

| 特性 | String | StringBuffer | StringBuilder |
| --- | --- | --- | --- |
| 可变性 | 不可变 | 可变 | 可变 |
| 线程安全 | 安全 | 安全 (线程安全) | 不安全 (线程不安全) |
| 性能 | 低 (频繁修改时) | 中 | 高 |
| 引入版本 | JDK 1.0 | JDK 1.0 | JDK 1.5 |
| 底层结构 | `char[]` (JDK8) | `char[]` (JDK8) | `char[]` (JDK8) |


+ String：不可变的字符序列。任何对`String`的修改和拼接都会创建一个新的`String`对象。
+ StringBuffer：可变的字符序列。它的方法大多使用`synchronized`关键字修饰，保证了多线程环境下的线程安全，但也因此带来了新能开销。
+ StringBuilder：可变的字符序列。它是`StringBuffer`的“孪生兄弟”，API几乎一致，但去掉了`synchronized`同步锁，因此在单线程环境下效率更高。

因此，在单线程下进行大量字符串拼接，首选`StringBuilder`；在多线程环境下需要共享可变字符串，则使用`StringBuffer`。

## 常用API
`StringBuffer`和`StringBuilder`的API几乎是完全一致的，并且很多方法都支持**方法链式调用**。

### 增、删、改、查
+ 增（Append/Insert）
    - `append(xx)`：将各种类型的数据（String，int，boolean，char等）追加到序列末尾。这是最常用的方法。
    - `Insert(int index, xx)`：在执行`index`位置插入数据。
    - **扩容机制**：当内部`char[]`数组容量不足时，会自动进行扩容。
+ 删（Delete）
    - `delete(int start, int end)`：删除`[start , end]`范围内的字符。
    - `deleteCharAt(int index)`：删除指定`index`位置的单个字符。
+ 改（Replace/Set）
    - `replace(int start, int end, String str)`：用`str`替换`[start, end]`范围内的字符。
    - `setCharAt(int index, char c)`：将指定`index`位置的字符替换为`c`。
    - `reverse()`：将此字符序列用其反转形式取代。
+ 查（CharAt/Length)
    - `char charAt(int index)`：获取指定索引位置的字符。
    - `int length()`：返回当前序列中字符的数量（不是底层数组的容量）。

### 其他重要方法
+ `substring(int start)` / `substring(int start, int end)`: 截取子串，**注意返回的是 `String` 类型**，而不是 `StringBuilder` 本身。
+ `indexOf(String str)` / `lastIndexOf(String str)`: 查找子串首次或最后一次出现的位置。
+ `toString()`: 将可变字符序列转换为一个 `String` 对象。
+ `setLength(int newLength)`: 设置字符序列的长度。如果新长度大于当前长度，会用 `\u0000` (空字符) 填充；如果小于当前长度，则会截断。

**代码示例**：

```java
@Test
public void testCommonAPIs() {
    StringBuilder sb = new StringBuilder("Hello");
    
    // 增: append 和 insert
    sb.append(" World").append(true); // 链式调用
    sb.insert(5, ","); 
    System.out.println(sb); // 输出: Hello, Worldtrue
    
    // 删: delete
    sb.delete(5, 7); // 删除 ", "
    System.out.println(sb); // 输出: HelloWorldtrue
    
    // 改: replace 和 reverse
    sb.reverse();
    System.out.println(sb); // 输出: eurtdlroWolleH
    sb.reverse(); // 再反转回来
    
    // 查: charAt 和 length
    System.out.println("长度: " + sb.length()); // 输出: 13
    System.out.println("第一个字符: " + sb.charAt(0)); // 输出: H
}
```

## 效率对比测试
通过一个简单的循环拼接测试，可以直观地看到三者在性能上的巨大差异。

```java
public void testEfficiency() {
    long startTime, endTime;
    int loopCount = 20000;

    // 1. 测试 StringBuffer
    startTime = System.currentTimeMillis();
    StringBuffer buffer = new StringBuffer();
    for (int i = 0; i < loopCount; i++) {
        buffer.append(i);
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuffer 耗时: " + (endTime - startTime) + "ms");

    // 2. 测试 StringBuilder
    startTime = System.currentTimeMillis();
    StringBuilder builder = new StringBuilder();
    for (int i = 0; i < loopCount; i++) {
        builder.append(i);
    }
    endTime = System.currentTimeMillis();
    System.out.println("StringBuilder 耗时: " + (endTime - startTime) + "ms");

    // 3. 测试 String
    startTime = System.currentTimeMillis();
    String text = "";
    for (int i = 0; i < loopCount; i++) {
        text = text + i; // 每次都创建新对象
    }
    endTime = System.currentTimeMillis();
    System.out.println("String 耗时: " + (endTime - startTime) + "ms");
}
```

**预期结果**：`String` 的耗时将远远高于另外两者（可能相差数百甚至上千倍），而 `StringBuilder` 会比 `StringBuffer` 略快一些。

# 日期时间类
Java中日期时间API的发展，可以说是从”痛点”到“爽点”的演进。在JDK8之前，处理日期和时间是非常痛苦的，`java.util.Date`和`java.util.Calendar`的设计充满了各种反人类的操作。直到JDK8引入了全新的`java.time`包，才真正让日期时间处理变得清晰、安全和高效。

## JDK8之前
在JDK8之前，主要依赖`System.currentTimeMillis()`、`java.util.Date`、`java.text.SimpleDateFormat`和`java.util.Calendar`这几个类。它们虽然能完成任务，但设计上的缺陷让代码变得脆弱且难以维护。

### System.currentTimeMillis()：最原始的时间戳
`System`类提供了一个静态方法`currentTimeMillis()`，它返回当前时间与1970年1月1日0时0分0秒（UTC）之间的毫秒差。

+ 用途：主要用于计算时间差，比如性能测试
+ 局限：它只是一个长整形数字，不具备任何日期或时间的语义，无法直接进行日期操作。

### **java.util.Date：名不副实的“日期”类**
`java.util.Date` 类表示特定的瞬间，精确到毫秒。但它的名字极具误导性，因为它不仅包含日期，还包含时间。

+ **构造器**：
    - `new Date()`：获取本地当前时间。
    - `new Date(long millis)`：将毫秒值转换为日期对象。
+ **致命缺陷**：
    - **大部分方法已过时**：如 `getYear()`, `getMonth()` 等，因为设计不合理被废弃。
    - **可变性**：`Date` 对象是可变的，这在多线程环境下是不安全的。
    - **偏移量反人类**：年份是从 1900 开始计算的，月份是从 0（一月）到 11（十二月）。

### java.text.SimpleDateFormat：线程不安全的格式化器
`SimpleDateFormat` 用于格式化和解析日期，但它是一个 notorious 的线程不安全类。

+ **格式化**：`format(Date date)` 将日期对象转换为字符串。
+ **解析**：`parse(String source)` 将字符串解析为日期对象。
+ **线程安全问题**：由于 `SimpleDateFormat` 内部使用一个 `Calendar` 对象来存储解析过程中的状态，当多个线程共享同一个 `SimpleDateFormat` 实例时，会导致数据错乱或抛出异常。因此，在多线程环境下，通常需要使用 `ThreadLocal` 来为每个线程提供独立的实例。

### java.util.Calendar：复杂的日历抽象
为了解决 `Date` 类的问题，JDK 1.1 引入了 `Calendar` 抽象类。

+ **获取实例**：通过 `Calendar.getInstance()` 获取。
+ **字段操作**：可以对 `YEAR`, `MONTH`, `DAY_OF_MONTH` 等字段进行 `get`, `set`, `add` 操作。
+ **新的陷阱**：
    - **月份依然从 0 开始**：`Calendar.JANUARY` 的值是 0。
    - **星期从 1 开始**：`Calendar.SUNDAY` 的值是 1。
    - **依然可变且线程不安全**。

## JDK 8 的新纪元：java.time 包
JDK 8 引入了全新的日期时间 API，位于 `java.time` 包下，其设计灵感来源于优秀的 Joda-Time 库。新 API 的核心优势在于：

+ **不可变性**：所有核心类都是 `final` 的，且字段不可变，天生线程安全。
+ **清晰的职责分离**：区分了机器时间（`Instant`）、本地日期（`LocalDate`）、本地时间（`LocalTime`）和时区日期（`ZonedDateTime`）。
+ **流畅的 API**：提供了丰富的 `plus`, `minus`, `with` 等方法，支持链式调用。

### 本地日期时间三剑客：LocalDate, LocalTime, LocalDateTime
这三个类用于处理不包含时区信息的日期和时间。

+ **LocalDate**：只包含日期，如 `2026-05-31`。
+ **LocalTime**：只包含时间，如 `14:30:00`。
+ **LocalDateTime**：包含日期和时间，如 `2026-05-31T14:30:00`。

**常用操作：**

| **操作类型** | **方法示例**                    | **说明**                         |
| :----------- | :------------------------------ | :------------------------------- |
| **获取**     | `now()`, `now(ZoneId)`          | 获取当前日期/时间                |
| **创建**     | `of(2026, 5, 31)`               | 根据指定值创建对象               |
| **获取字段** | `getYear()`, `getMonthValue()`  | 获取年、月等字段值               |
| **修改**     | `plusDays(1)`, `minusMonths(2)` | 增加或减少时间，返回新对象       |
| **修改**     | `withYear(2027)`                | 修改指定字段，返回新对象         |
| **判断**     | `isLeapYear()`, `isBefore()`    | 判断是否闰年、是否在另一时间之前 |


### 瞬时：Instant
`Instant` 代表时间线上的一个瞬时点，类似于 `System.currentTimeMillis()`，但精度更高（纳秒级）。它主要用于记录时间戳。

+ **核心方法**：
    - `now()`：获取当前 UTC 时间的 `Instant`。
    - `toEpochMilli()`：转换为从 1970-01-01 开始的毫秒数。
    - `atOffset(ZoneOffset)`：结合时区偏移量，转换为 `OffsetDateTime`。

### 格式化与解析：DateTimeFormatter
`DateTimeFormatter` 是线程安全的，可以定义为 `static final` 常量在类中共享。它提供了三种格式化方式：

1. **预定义标准格式**：如 `ISO_LOCAL_DATE_TIME`。
2. **本地化格式**：如 `ofLocalizedDateTime(FormatStyle.LONG)`，会根据本地环境显示。
3. **自定义格式**：如 `ofPattern("yyyy-MM-dd HH:mm:ss")`，最常用。

### 时区与持续时间
+ **时区处理**：
    - `ZoneId`：代表一个时区 ID，如 `Asia/Shanghai`。
    - `ZonedDateTime`：包含时区信息的完整日期时间。
+ **时间间隔计算**：
    - `Period`：用于计算两个 `LocalDate` 之间的间隔，以年、月、日为单位。
    - `Duration`：用于计算两个时间点（`Instant`, `LocalTime`, `LocalDateTime`）之间的间隔，以秒和纳秒为单位。

### 时间校正器：TemporalAdjuster
这是一个非常强大的功能，用于执行复杂的日期调整逻辑。`TemporalAdjusters` 工具类提供了许多现成的实现。

**常见用法**：

+ `next(DayOfWeek.SUNDAY)`：获取下一个周日。
+ `firstDayOfMonth()`：获取本月第一天。
+ `lastDayOfYear()`：获取本年最后一天。

## 新旧 API 的转换
在实际开发中，经常需要在新旧 API 之间进行转换。JDK 8 的新类提供了便捷的方法与旧的 `Date` 和 `Calendar` 进行互操作。

| **新 API 类**             | **转换到旧 API**                        | **从旧 API 转换**             |
| :------------------------ | :-------------------------------------- | :---------------------------- |
| `java.time.Instant`       | `Date.from(instant)`                    | `date.toInstant()`            |
| `java.time.LocalDateTime` | `Timestamp.valueOf(localDateTime)`      | `timestamp.toLocalDateTime()` |
| `java.time.ZonedDateTime` | `GregorianCalendar.from(zonedDateTime)` | `calendar.toZonedDateTime()`  |
| `java.time.ZoneId`        | `TimeZone.getTimeZone(zoneId)`          | `timeZone.toZoneId()`         |


总而言之，JDK 8 的 `java.time` 包彻底解决了旧日期时间 API 的所有痛点，是现代 Java 开发中处理日期时间的不二之选。

# Java比较器
在 Java 中，基本数据类型（如 `int`, `double`）的比较轻而易举，一个 `>` 或 `<` 就能搞定。然而，当面对自定义的对象时，问题就变得复杂了：两个 `Student` 对象，到底谁“大”谁“小”？是按学号、姓名还是成绩？

为了解决这个问题，Java 提供了两种强大的机制来定义对象间的比较规则：**自然排序** (`java.lang.Comparable`) 和 **定制排序** (`java.util.Comparator`)。

## 自然排序：Comparable 接口
`Comparable` 接口可以看作是类的“天性”。它强制要求实现该接口的类定义一个全局的、默认的排序规则。这种排序被称为类的**自然排序**。

### 核心机制
实现 `Comparable` 接口的类，必须重写 `compareTo(Object obj)` 方法。这个方法定义了当前对象 (`this`) 与传入对象 (`obj`) 的比较逻辑。

+ **返回值规则**：
    - **正整数**：表示当前对象 `this` 大于参数对象 `obj`。
    - **负整数**：表示当前对象 `this` 小于参数对象 `obj`。
    - **零**：表示两个对象相等。

一旦类实现了 `Comparable` 接口，它的对象数组或列表就可以直接使用 `Arrays.sort()` 或 `Collections.sort()` 进行自动排序，无需额外指定比较器。

### 典型实现
Java 中许多核心类都实现了 `Comparable` 接口，它们的自然排序规则通常是：

+ `String`：按字符的 Unicode 值比较。
+ 数值包装类 (`Integer`, `Double` 等)：按数值大小比较。
+ `Date`：按时间先后比较，后面的时间比前面的“大”。

**示例：**

```java
public class Student implements Comparable<Student> {
    private int id;
    private String name;
    private int score;
    private int age;

    // 构造器、Getter/Setter、toString() 省略...

    @Override
    public int compareTo(Student other) {
        // 按学号升序排列
        // 使用 this.id - other.id 是一种简洁的写法，但需注意整数溢出问题
        return Integer.compare(this.id, other.id);
    }
}
```

**测试代码**：

```java
@Test
public void testComparable() {
    Student[] students = {
        new Student(3, "张三", 90, 23),
        new Student(1, "熊大", 100, 22),
        new Student(5, "王五", 75, 25)
    };

    // 直接使用 Arrays.sort，因为 Student 实现了 Comparable
    Arrays.sort(students);

    // 输出结果将按 id 排序：熊大(1), 张三(3), 王五(5)
    System.out.println(Arrays.toString(students));
}
```

## 定制排序：Comparator 接口
自然排序虽然方便，但有时并不够用。例如：

1. 一个第三方类没有实现 `Comparable` 接口，无法修改其源码。
2. 一个类虽然实现了 `Comparable`（比如按学号排序），但现在需要按成绩或姓名排序。

这时，`Comparator` 接口就派上了用场。它允许在不修改类本身的情况下，为其“定制”多种排序规则。

### 核心机制
`Comparator` 接口需要重写 `compare(Object o1, Object o2)` 方法。它独立于被比较的对象之外，定义了任意两个对象的比较逻辑。

+ **返回值规则**：与 `compareTo` 完全相同。
    - **正整数**：`o1` 大于 `o2`。
    - **负整数**：`o1` 小于 `o2`。
    - **零**：`o1` 等于 `o2`。

在使用 `Arrays.sort()` 或 `Collections.sort()` 时，将 `Comparator` 的实例作为第二个参数传入，即可实现定制排序。

**示例**：

```java
import java.util.Comparator;

public class StudentScoreComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        // 先按成绩降序排
        int scoreCompare = Integer.compare(s2.getScore(), s1.getScore());
        
        // 如果成绩相同，再按学号升序排
        if (scoreCompare == 0) {
            return Integer.compare(s1.getId(), s2.getId());
        }
        
        return scoreCompare;
    }
}
```

**测试代码**：

```java
@Test
public void testComparator() {
    Student[] students = {
        new Student(3, "张三", 90, 23),
        new Student(1, "熊大", 100, 22),
        new Student(5, "王五", 75, 25),
        new Student(4, "李四", 90, 24) // 与张三成绩相同
    };

    // 传入定制的比较器
    Arrays.sort(students, new StudentScoreComparator());

    // 输出结果将按 score 降序，id 升序：
    // 熊大(100), 张三(90, id=3), 李四(90, id=4), 王五(75)
    System.out.println(Arrays.toString(students));
}
```

### 使用匿名内部类或 Lambda 表达式
对于简单的排序，无需专门创建一个类，可以直接在调用处定义。

```java
@Test
public void testAnonymousComparator() {
    // 假设有一个 Goods 类，包含 name 和 price
    Goods[] goodsArray = {
        new Goods("《红楼梦》", 100),
        new Goods("《西游记》", 80)
    };

    // 使用匿名内部类按商品名称排序
    Arrays.sort(goodsArray, new Comparator<Goods>() {
        @Override
        public int compare(Goods g1, Goods g2) {
            return g1.getName().compareTo(g2.getName());
        }
    });

    // 在 Java 8+ 中，可以使用 Lambda 表达式，更加简洁
    // Arrays.sort(goodsArray, (g1, g2) -> g1.getName().compareTo(g2.getName()));
    
    System.out.println(Arrays.toString(goodsArray));
}
```

## 总结与对比
| 特性 | Comparable (自然排序) | Comparator (定制排序) |
| --- | --- | --- |
| 接口位置 | `java.lang.Comparable` | `java.util.Comparator` |
| 核心方法 | `int compareTo(Object o)` | `int compare(Object o1, Object o2)` |
| 设计思想 | “我是可比较的”。将排序逻辑内嵌到类中，作为其默认行为。 | “我来比较它们”。将排序逻辑外置，作为一个独立的策略。 |
| 使用场景 | 定义类的唯一、主要的排序规则。 | 定义多种、临时的排序规则，或为无法修改的类添加排序功能。 |
| 调用方式 | `Arrays.sort(array)` | `Arrays.sort(array, comparator)` |


总而言之，`Comparable` 定义了对象的“天性”，而 `Comparator` 提供了灵活的“外部视角”。在实际开发中，通常建议优先为一个类实现 `Comparable` 接口以定义其自然顺序，然后在需要其他排序方式时，再使用 `Comparator`。

# Java 系统核心：System 与 Runtime 类详解
在 Java 中，`java.lang.System` 和 `java.lang.Runtime` 这两个类如同幕后管家，默默管理着应用程序与底层操作系统的交互。它们都位于 `java.lang` 包下，无需手动导入，且构造器都是私有的，意味着无法创建它们的实例，只能通过其静态成员或单例实例来使用。

## java.lang.System 类：系统的门面
`System` 类提供了一系列与系统相关的属性和控制方法，是 Java 程序与运行环境交互的重要桥梁。

### 核心成员变量
`System` 类内部包含了三个非常重要的静态成员变量，它们代表了标准的输入输出流：

+ `in`: 标准输入流，通常对应键盘输入。常用的 `Scanner scan = new Scanner(System.in);` 就是基于它。
+ `out: 标准输出流，通常对应显示器。`System.out.println()` 是最常见的用法。
+ `err`: 标准错误输出流，也对应显示器，但专门用于输出错误信息，便于区分正常输出和错误日志。

### 常用方法

`System` 类提供了许多实用的静态方法，用于执行系统级操作。

+ `currentTimeMillis()`:  

  这是一个 `native` 方法，它返回当前计算机时间与 GMT 时间 1970 年 1 月 1 日 0 时 0 分 0 秒之间的毫秒差。这个值就是常说的“时间戳”，常用于计算程序运行时间或记录事件发生的精确时间。

+ `exit(int status)`:  

  该方法用于终止当前正在运行的 Java 虚拟机。参数 `status` 作为状态码：

    - **0**: 代表程序正常退出。

    - **非 0**: 代表程序异常退出。  

    调用此方法后，其后的代码将不会被执行。

+ `gc()`:  

  该方法是向 JVM 发出一个“建议”，请求系统进行垃圾回收。但这只是一个建议，系统是否立即执行回收，取决于垃圾回收算法的实现和当前系统的运行状况。在内存充足时，JVM 可能会忽略这个请求。

+ `getProperty(String key)`:  

  用于获取指定键（key）对应的系统属性值。这在获取运行环境信息时非常有用。

| **属性键 (Key)** | **描述**            |
| :--------------- | :------------------ |
| `java.version`   | Java 运行时环境版本 |
| `java.home`      | Java 安装目录       |
| `os.name`        | 操作系统的名称      |
| `os.version`     | 操作系统的版本      |
| `user.name`      | 用户的账户名称      |
| `user.home`      | 用户的主目录        |
| `user.dir`       | 用户的当前工作目录  |


**代码示例**

```java
import org.junit.Test;

public class TestSystem {

    @Test
    public void testSystemMethods() {
        // 1. currentTimeMillis
        long startTime = System.currentTimeMillis();
        // 模拟一些操作
        for (int i = 0; i < 10000; i++) {
            Math.pow(i, 2);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("操作耗时: " + (endTime - startTime) + " 毫秒");

        // 2. getProperty
        System.out.println("Java版本: " + System.getProperty("java.version"));
        System.out.println("操作系统: " + System.getProperty("os.name"));
        System.out.println("用户目录: " + System.getProperty("user.dir"));
    }

    @Test
    public void testGC() {
        for (int i = 0; i < 10; i++) {
            new MyDemo(i); // 创建对象后立刻失去引用，成为垃圾对象
        }
        // 建议JVM进行垃圾回收
        System.gc();
        // 为了让GC有时间执行，主线程休眠一下
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

class MyDemo {
    private int value;
    public MyDemo(int value) { this.value = value; }

    // 重写 finalize 方法，观察垃圾回收器的调用
    @Override
    protected void finalize() throws Throwable {
        System.out.println(this + " 即将被回收...");
    }

    @Override
    public String toString() {
        return "MyDemo{" + "value=" + value + '}';
    }
}
```

### 高效的数组复制：arraycopy
`System.arraycopy` 是一个 `native` 方法，用于高效地复制数组。它比使用循环逐个复制元素要快得多，因为它直接操作内存。

**方法签名**  

`public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)`

+ `src`: 源数组。
+ `srcPos`: 源数组中的起始位置。
+ `dest`: 目标数组。
+ `destPos`: 目标数组中的起始位置。
+ `length`: 要复制的元素数量。

**代码示例**

```java
@Test
public void testArrayCopy() {
    int[] source = {1, 2, 3, 4, 5};
    int[] target = new int[10];

    // 将 source 数组从索引 0 开始的 5 个元素，复制到 target 数组从索引 3 开始的位置
    System.arraycopy(source, 0, target, 3, source.length);

    // 输出: [0, 0, 0, 1, 2, 3, 4, 5, 0, 0]
    System.out.println(Arrays.toString(target));
}
```

## java.lang.Runtime 类：应用的运行时环境
每个 Java 应用程序都有一个 `Runtime` 类的实例，它允许应用程序与其运行的环境（即 Java 虚拟机）进行连接和交互。

### 获取实例

`Runtime` 类采用了单例模式，不能通过 `new` 来创建实例，必须通过其静态方法 `getRuntime()` 来获取当前应用程序唯一的 `Runtime` 对象。

```java
Runtime runtime = Runtime.getRuntime();
```

### 内存管理方法
`Runtime` 类提供了几个关键方法来监控和管理 JVM 的内存使用情况。

+ `totalMemory()`: 返回 JVM 向操作系统申请的内存总量。这个值可能会随时间变化。
+ `maxMemory()`: 返回 JVM 能够从操作系统获取的最大内存总量。如果尝试分配超过此限制的内存，将抛出 `OutOfMemoryError`。
+ `freeMemory()`: 返回 JVM 当前空闲的内存量。调用 `System.gc()` 或 `runtime.gc()` 后，这个值通常会增加。

**代码示例**

```java
public class TestRuntime {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        // 获取内存信息（单位转换为 MB）
        long totalMemory = runtime.totalMemory() / 1024 / 1024;
        long maxMemory = runtime.maxMemory() / 1024 / 1024;
        long freeMemory = runtime.freeMemory() / 1024 / 1024;

        System.out.println("JVM 总内存: " + totalMemory + " MB");
        System.out.println("JVM 最大可用内存: " + maxMemory + " MB");
        System.out.println("JVM 空闲内存: " + freeMemory + " MB");
        System.out.println("JVM 已用内存: " + (totalMemory - freeMemory) + " MB");

        // 模拟内存占用
        String str = "";
        for (int i = 0; i < 100000; i++) {
            str += i;
        }

        freeMemory = runtime.freeMemory() / 1024 / 1024;
        System.out.println("占用内存后，JVM 空闲内存: " + freeMemory + " MB");
        System.out.println("占用内存后，JVM 已用内存: " + (totalMemory - freeMemory) + " MB");
    }
}
```

总而言之，`System` 类提供了与系统交互的通用工具，而 `Runtime` 类则提供了对当前 Java 应用程序运行时环境的更底层控制，尤其是在内存管理方面。理解这两个类对于编写高性能、健壮的 Java 程序至关重要。

# Java 数学运算：从基础 Math 到高精度 BigDecimal
在 Java 开发中，数学运算无处不在。从最基础的加减乘除到复杂的科学计算，Java 都提供了丰富的类库支持。

## java.lang.Math：基础数学运算的工具箱
`Math` 类是数学工具类，它位于 `java.lang` 包下。作为一个典型的工具类，它的构造器是私有的，所有方法都是静态（static）的，这意味着不需要创建对象，直接通过 `Math.xxx()` 就能调用。

### 常用基础方法
+ **取绝对值 `abs`**：  

  `Math.abs(-5)` 返回 `5`。

+ **向上取整`ceil` 与向下取整`floor`**：  

  `Math.ceil(3.3)` 返回 `4.0`（返回大于等于参数的最小整数）。  

  `Math.floor(3.3)` 返回 `3.0`（返回小于等于参数的最大整数）。  

  *注意负数的情况*：`Math.ceil(-3.3)` 返回 `-3.0`，而 `Math.floor(-3.3)` 返回 `-4.0`。

+ **四舍五入`round`**：  

  `Math.round(5.5)` 返回 `6`，`Math.round(5.4)` 返回 `5`。它的原理相当于 `Math.floor(x + 0.5)`。

+ **幂运算与开方**：  

  `Math.pow(2, 3)` 返回 `8.0`（2的3次方）。  

  `Math.sqrt(16)` 返回 `4.0`（16的算术平方根）。

+ **最值与随机数**：  

  `Math.max(10, 20)` 返回 `20`，`Math.min(10, 20)` 返回 `10`。  

  `Math.random()` 返回一个 `[0.0, 1.0)` 范围内的随机 `double` 值。

+ **常量与三角函数**：  

  `Math.PI` 提供了高精度的圆周率。此外，它还提供了 `sin`、`cos`、`tan` 等常用的三角函数。

## java.math 包：解决大数与精度问题
当基本的 `int`、`long`、`double` 无法满足需求时，`java.math` 包下的两个类就派上了大用场。

### BigInteger：任意精度的整数
`int` 的最大值是 2^31-1，`long` 的最大值是 2^63-1。如果要处理超出这个范围的超大整数，或者进行高精度的整数运算，就必须使用 `BigInteger`。

+ **创建对象**：由于数值过大，只能通过字符串来构建，例如 `new BigInteger("123456789123456789...")`。
+ **运算方式**：`BigInteger` 是不可变的，且**不能使用`+`、`-`、`*`、`/`等运算符**，必须调用其对应的方法：
    - `add(BigInteger val)`：加法
    - `subtract(BigInteger val)`：减法
    - `multiply(BigInteger val)`：乘法
    - `divide(BigInteger val)`：除法（只保留整数部分）
    - `remainder(BigInteger val)`：取余（即取模）
    - `pow(int exponent)`：幂运算

### BigDecimal：高精度的商业计算
在商业计算（尤其是涉及金额的计算）中，`float` 和 `double` 往往会因为二进制存储的精度丢失问题而导致结果不准确（例如 `0.1 + 0.2` 在计算机中并不完全等于 `0.3`）。为了解决这个问题，Java 提供了 `BigDecimal`。

+ **创建对象的“坑”**：  

  强烈建议使用 **字符串构造器** `new BigDecimal("12435.351")`。如果使用 `new BigDecimal(12435.351)`（double构造器），依然可能会带入精度问题。

+ **常用运算**：  

  与 `BigInteger` 类似，使用 `add`、`subtract`、`multiply` 进行加减乘运算。

+ **高精度除法与舍入模式**：  

  除法运算 `divide` 是最复杂的，因为可能会出现除不尽的情况。因此，通常需要指定保留的小数位数和舍入模式：  
  
  `bd.divide(divisor, 保留位数, 舍入模式)`
  
    - `BigDecimal.ROUND_HALF_UP`：四舍五入。
    - `BigDecimal.ROUND_DOWN`：直接舍去多余位数。
    - `BigDecimal.ROUND_UP`：直接进位。

## java.util.Random：随机数生成器
`Random` 类专门用于生成各种类型的伪随机数。

+ **常用方法**：
    - `nextInt()`：返回一个随机的 `int` 值。
    - `nextInt(int n)`：返回一个 `[0, n)` 范围内的随机整数（非常常用，比如生成 0-99 的随机数）。
    - `nextDouble()`：返回 `[0.0, 1.0)` 之间的随机 `double` 值。
    - `nextBoolean()`：随机返回 `true` 或 `false`。
    
+ **种子（Seed）**：  

  `Random` 类的构造器可以传入一个 `long` 类型的种子。如果种子相同，无论运行多少次，生成的随机数序列都是完全一样的。如果不传种子，默认使用当前时间的毫秒数作为种子，从而保证每次运行的随机性。



