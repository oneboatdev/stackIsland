# JavaIO基石：深入理解java.io.File类
在Java的I/O（输入/输出）体系中，`java.io.File`类扮演着至关重要的角色。它是连接Java程序与操作系统文件系统的桥梁，能够以面向对象的方式来操作文件和目录。

## 概述：万事万物皆对象
`File`类及其相关的流都定义在`java.io`包下。一个`File`对象可以代表硬盘或网络中一个可能存在的文件或目录（文件夹）。它完美体现了“万事万物皆对象”的编程思想。

`File`类的核心功能是对文件或目录的**属性**进行操作，例如：

+ 创建、删除、重命名文件或目录。
+ 获取文件或目录的路径、大小、修改时间等信息。

**一个关键点是：**`File`对象本身**不能访问文件的内容**。如果要读写文件的内容，则必须借助输入/输出流(InputStream/OutputStream/Reader/Writer)。`File`对象通常作为参数传递给流的构造器，来指明操作的目标文件。

此外，Java程序中的一个`File`对象，并不一定对应一个真实存在的文件或目录。它只是一个抽象的路径名表示。

## 如何创建一个File对象
创建`File`对象有多种方式，核心在于指定文件或目录的路径。

+ `public File(String pathname)`：根据一个路径字符串（可以是绝对路径或相对路径）创建`File`对象。
+ `public File(String parent, String child)`：根据一个父路径和一个子路径字符串创建`File`对象。
+ `public File(File parent, String child)`：根据一个父`File`对象和一个子路径字符串创建`File`对象。

**关于路径**：

+ **绝对路径**：从盘符(Windows) 或根目录（Linux/macOS）开始的完整路径。例如`D:\data\test.txt`或`/home/user/test.txt`。
+ **相对路径**：相对于某个基准目录的路径。在开发中常用。
    - 在IDEA的`main`方法中，相对路径的基准是**当前项目根目录**。
    - 在IDEA的单元测试方法中，相对路径的基准是**当前模块（Module）的根目录**。
    - 这个基准可以通过`System.getProperty("user.dir")`获取。

**代码示例：创建File对象**

```java
import java.io.File;

public class FileConstructorDemo {
    public static void main(String[] args) {
        // 1. 使用绝对路径
        File file1 = new File("D:\\data\\test.txt");

        // 2. 使用相对路径 (相对于 user.dir)
        File file2 = new File("config.properties");

        // 3. 使用父路径和子路径字符串
        File file3 = new File("D:\\data", "test.txt");

        // 4. 使用父 File 对象和子路径字符串
        File parentDir = new File("D:\\data");
        File file4 = new File(parentDir, "test.txt");
    }
}
```

**注意事项：**

+ 路径分隔符：Windows使用`\`，但Java中`\`是转义字符，所以路径应写为`\\`。为了跨平台兼容，推荐直接使用 `/` 或 `File.separator` 常量。

```java
// 推荐的跨平台写法
File file = new File("d:" + File.separator + "data" + File.separator + "test.txt");
```

+ **对象与实体**：无论路径指向的文件或目录是否存在，`File` 对象都可以被成功创建。
+ **路径方法的区别**：
    - 当构造路径是**绝对路径**时，`getPath()` 和 `getAbsolutePath()` 的结果相同。
    - 当构造路径是**相对路径**时，`getAbsolutePath()` 的结果 = `user.dir` 的路径 + 构造路径。

## 常用方法：操作文件与目录
`File` 类提供了丰富的方法来获取信息和执行操作，可以归纳为以下几类：

### 获取基本信息
+ `getName()`: 获取文件或目录的名称。
+ `getPath()`: 获取构造时传入的路径。
+ `getAbsolutePath()`: 获取文件的绝对路径。
+ `getParent()`: 获取上层文件目录的路径，若无则返回 `null`。
+ `length()`: 获取文件的大小（字节数）。**注意：不能用于获取目录的大小。**
+ `lastModified()`: 获取文件最后一次被修改的时间（毫秒值）。

**代码示例：获取文件信息**

```java
import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class FileInfoDemo {
    public static void main(String[] args) {
        File file = new File("D:\\data\\test.txt");
        System.out.println("文件名称: " + file.getName());
        System.out.println("文件路径: " + file.getPath());
        System.out.println("绝对路径: " + file.getAbsolutePath());
        System.out.println("文件大小: " + file.length() + " 字节");
        System.out.println("最后修改时间: " + LocalDateTime.ofInstant(
            Instant.ofEpochMilli(file.lastModified()), 
            ZoneId.of("Asia/Shanghai")));
    }
}
```

### 列出目录内容
+ `list()`: 返回一个 `String` 数组，包含该目录下所有子文件和子目录的名称。
+ `listFiles()`: 返回一个 `File` 数组，包含该目录下所有子文件和子目录的 `File` 对象。

### 判断功能
+ `exists()`: 判断文件或目录是否存在。
+ `isFile()`: 判断是否为文件。
+ `isDirectory()`: 判断是否为目录。
+ `canRead()`: 判断是否可读。
+ `canWrite()`: 判断是否可写。
+ `isHidden()`: 判断是否为隐藏文件。

### 创建与删除
+ `createNewFile()`: 创建一个新的空文件。如果文件已存在，则不创建并返回 `false`。
+ `mkdir()`: 创建单级目录。如果父目录不存在，则创建失败。
+ `mkdirs()`: 创建多级目录。如果父目录不存在，会一并创建。
+ `delete()`: 删除文件或目录。
    - **注意 1**：Java 中的删除操作不经过回收站，是永久删除。
    - **注意 2**：要删除一个目录，该目录必须是空的（不包含任何文件或子目录）。

### 重命名
+ `renameTo(File dest)`: 将文件重命名为指定的路径。这个方法也可以用于移动文件。

### 代码示例：创建、判断与删除
```java
import java.io.File;
import java.io.IOException;

public class FileOperationDemo {
    public static void main(String[] args) throws IOException {
        // 创建文件
        File newFile = new File("newFile.txt");
        if (newFile.createNewFile()) {
            System.out.println("文件创建成功！");
        }

        // 创建多级目录
        File newDir = new File("parent/child/grandchild");
        if (newDir.mkdirs()) {
            System.out.println("多级目录创建成功！");
        }

        // 判断
        System.out.println("newFile.txt 是文件吗？" + newFile.isFile());
        System.out.println("parent 是目录吗？" + new File("parent").isDirectory());

        // 删除
        System.out.println("文件删除结果：" + newFile.delete());
        // 删除目录前必须确保其为空
    }
}
```

# JavaI/O核心：流（Stream）
`java.io.File` 类，它能够操作文件和目录的属性。然而，`File` 类并不能读写文件的内容。要实现数据的读写，就需要借助 Java 的 IO 流。

> **注意**：网络上有一个名为 `java.io` 的域名，但它并非 Java 官方文档。Java IO 相关的官方 API 文档位于 `java.io` 包下。
>

## Java IO 原理：数据的流动
在 Java 程序中，所有的数据输入/输出操作都以“流（Stream）”的方式进行。可以将流想象成一条数据的管道，数据就像水流一样在其中单向流动。

+ **输入流 (Input)**：将数据从外部设备（如硬盘、网络）读取到程序内存中。
+ **输出流 (Output)**：将数据从程序内存写出到外部设备中。

I/O 技术是处理数据传输的实用技术，无论是读写文件还是进行网络通信，都离不开它。

## 流的分类
`java.io` 包下提供了数十个“流”类和接口，它们虽然繁多，但分类清晰，遵循着统一的规则。可以从三个维度来理解这些流。

+ **按数据流向分**
    - **输入流**：负责把数据从其他设备读取到内存中。其类名通常以 `InputStream` 或 `Reader` 结尾。
    - **输出流**：负责把数据从内存中写出到其他设备上。其类名通常以 `OutputStream` 或 `Writer` 结尾。
+ **按操作数据单位分**
    - **字节流**：以字节（8 bit）为单位读写数据。它可以处理所有类型的数据，如图片、音频、视频等。其抽象基类是 `InputStream` 和 `OutputStream`。
    - **字符流**：以字符（16 bit）为单位读写数据。它专为处理文本数据而设计，能更好地处理字符编码问题。其抽象基类是 `Reader` 和 `Writer`。
+ **按流的角色分**
    - **节点流**：也叫低级流，它们直接与数据源（如文件）或目的地相连，负责最基础的数据读写。
    - **处理流**：也叫高级流或包装流，它们不直接连接数据源，而是“包装”在已存在的流（节点流或其他处理流）之上。处理流通过对数据进行加工处理，为程序提供更强大、更便捷的读写功能。

## 流的 API 体系
Java 的 IO 流 API 设计得非常规整，所有流类都派生自以下四个抽象基类：

| **抽象基类** | **输入流** | **输出流** |
| :--- | :--- | :--- |
| **字节流** | `InputStream` | `OutputStream` |
| **字符流** | `Reader` | `Writer` |


一个重要的命名规则是：由这四个基类派生出的子类，其名称通常以其父类名作为后缀。例如，`FileInputStream` 是 `InputStream` 的子类。

**常用的节点流**

+ **文件流**：`FileInputStream`, `FileOutputStream`, `FileReader`, `FileWriter`。用于直接操作文件。
+ **数组流**：`ByteArrayInputStream`, `ByteArrayOutputStream`, `CharArrayReader`, `CharArrayWriter`。用于操作内存中的字节数组或字符数组。

**常用的处理流**

+ **缓冲流**：`BufferedInputStream`, `BufferedOutputStream`, `BufferedReader`, `BufferedWriter`。它们通过引入内部缓冲区，减少了对硬盘等底层设备的频繁读写，从而显著提升了 IO 效率。
+ **转换流**：`InputStreamReader`, `OutputStreamWriter`。它们是字节流和字符流之间的桥梁，可以实现字节到字符的转换，并允许指定字符编码。
+ **对象流**：`ObjectInputStream`, `ObjectOutputStream`。它们提供了强大的功能，可以直接将 Java 对象写入流中（序列化）或从流中读取出来（反序列化）。

# 节点流之一：字符流 (Reader / Writer)
字符流专门用于处理文本文件（如 `.txt`, `.java`, `.py` 等）。它不能操作图片或视频等非文本文件。

## 核心类介绍
+ **`java.io.Reader`**：字符输入流的父类，用于将字符信息读入内存。
+ **`java.io.Writer`**：字符输出流的父类，用于将字符信息写出到目的地。

## 具体实现：FileReader 与 FileWriter
### FileReader (读取)
`FileReader` 用于读取字符文件。

+ **构造器**：`new FileReader(File file)` 或 `new FileReader(String fileName)`。
+ **读取方式**：
    1. `read()`：一次读一个字符，返回该字符的 Unicode 值，若到达末尾返回 -1。
    2. `read(char[] cbuf)`：一次读入一个字符数组，返回实际读取的字符个数。

```java
// 示例：使用字符数组读取
FileReader fr = null;
try {
    fr = new FileReader("hello.txt");
    char[] cbuf = new char[5];
    int len;
    while ((len = fr.read(cbuf)) != -1) {
        // 注意：必须使用 new String(cbuf, 0, len) 防止读取残留数据
        System.out.print(new String(cbuf, 0, len));
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (fr != null) {
        try { fr.close(); } catch (IOException e) { e.printStackTrace(); }
    }
}
```

### FileWriter (写出)
`FileWriter` 用于写出字符到文件。

+ **构造器**：
    - `new FileWriter(file)`：覆盖原有文件。
    - `new FileWriter(file, true)`：在文件末尾追加内容。
+ **写出方法**：`write(int c)`, `write(char[] cbuf)`, `write(String str)` 等。

> **注意**：操作流资源时，必须使用 `try-catch-finally` 结构，并在 `finally` 中调用 `close()` 释放系统资源，防止内存泄漏。
>

# 节点流之二：字节流 (InputStream / OutputStream)
如果需要读取或写出非文本文件（如图片、视频、音频），必须使用字节流。

## 核心类介绍
+ **`java.io.InputStream`**：字节输入流的超类。
+ **`java.io.OutputStream`**：字节输出流的超类。

## 具体实现：FileInputStream 与 FileOutputStream
### FileInputStream (读取)
+ **读取方式**：
    - `read()`：一次读一个字节。
    - `read(byte[] b)`：一次读入一个字节数组。

### FileOutputStream (写出)
+ **写出方式**：`write(int b)`, `write(byte[] b)`, `write(byte[] b, int off, int len)`。
+ **应用场景**：常用于文件的复制、图片加密等。

**文件复制示例（图片/视频通用）：**

```java
FileInputStream fis = null;
FileOutputStream fos = null;
try {
    fis = new FileInputStream("source.jpg");
    fos = new FileOutputStream("target.jpg");

    byte[] buffer = new byte[1024];
    int len;
    while ((len = fis.read(buffer)) != -1) {
        fos.write(buffer, 0, len);
    }
} catch (IOException e) {
    e.printStackTrace();
} finally {
    // 关闭资源
    if(fos != null) try { fos.close(); } catch (IOException e) { e.printStackTrace(); }
    if(fis != null) try { fis.close(); } catch (IOException e) { e.printStackTrace(); }
}
```

# 处理流之一：缓冲流 (Buffered Streams)
为了提高数据读写的速度，Java 提供了带缓冲功能的流类。

## 原理与分类
+ **原理**：内部创建一个缓冲区数组（默认 8KB），通过缓冲区读写减少系统 IO 次数。
+ **分类**：
    - 字节缓冲流：`BufferedInputStream`, `BufferedOutputStream`
    - 字符缓冲流：`BufferedReader`, `BufferedWriter`

## 效率对比
使用缓冲流复制大文件（如 300MB+）的效率远高于普通节点流。

## 特有方法
字符缓冲流提供了专门处理行的方法：

+ `BufferedReader.readLine()`：读取一行文字。
+ `BufferedWriter.newLine()`：写入一个行分隔符。

# 处理流之二：转换流 (InputStreamReader / OutputStreamWriter)
转换流是字节流与字符流之间的桥梁，主要用于解决**乱码问题**。

## 为什么需要转换流？
如果文件的编码格式（如 GBK）与程序读取时使用的默认编码（如 UTF-8）不一致，就会出现乱码。`FileReader` 只能使用系统默认编码，无法指定，因此需要转换流。

## 核心类
+ **`InputStreamReader`**：将字节输入流转换为字符输入流（解码）。
    - 构造器：`new InputStreamReader(InputStream in, String charsetName)`
+ **`OutputStreamWriter`**：将字符输出流转换为字节输出流（编码）。
    - 构造器：`new OutputStreamWriter(OutputStream out, String charsetName)`

## 常见字符集
+ **ASCII**：7位，表示英语。
+ **GBK**：中文码表，兼容 GB2312，双字节编码。
+ **Unicode**：万国码，UTF-8 是互联网上最常用的 Unicode 实现方式（变长编码）。

# 处理流之三/四：数据流与对象流
## 数据流 (Data Streams)
`DataInputStream` 和 `DataOutputStream` 允许程序以与机器无关的方式读取 Java 基本数据类型（int, boolean, double 等）和 String。

## 对象流 (Object Streams)
`ObjectOutputStream` 和 `ObjectInputStream` 用于存储和恢复 Java 对象，即**序列化**与**反序列化**。

### 序列化机制
+ **定义**：将内存中的 Java 对象转换成平台无关的二进制流，保存到磁盘或通过网络传输。
+ **要求**：
    1. 类必须实现 `java.io.Serializable` 接口（标记接口）。
    2. 建议显式声明 `static final long serialVersionUID`，以保证类版本兼容性。
+ **细节**：
    - `static` 变量不会被序列化。
    - 使用 `transient` 关键字修饰的属性不会被序列化。

```java
// 序列化对象
ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.dat"));
oos.writeObject(employeeObj);
oos.close();

// 反序列化对象
ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.dat"));
Employee e = (Employee) ois.readObject();
ois.close();
```

# 其他常用流
## 标准输入输出流
+ `System.in`：标准输入，类型 `InputStream`（默认键盘）。
+ `System.out`：标准输出，类型 `PrintStream`（默认显示器）。
+ 可以通过 `System.setIn()` 和 `System.setOut()` 重定向输入输出设备。

## 打印流 (PrintStream / PrintWriter)
+ 提供 `print()` 和 `println()` 方法，支持多种数据类型输出。
+ 不会抛出 `IOException`。
+ 支持自动 flush。

## Scanner 类
+ 用于解析基本类型和字符串的简单文本扫描器。
+ 构造器可接收 `File`, `InputStream`, `String` 等。
+ 常用方法：`hasNextXxx()`, `nextXxx()`。

# 第三方工具：Apache Commons IO
为了简化 IO 开发，可以使用 Apache 的 `commons-io` 包。

## 核心工具类
+ **`IOUtils`**：
    - `IOUtils.copy(InputStream, OutputStream)`：一行代码实现文件复制。
    - `IOUtils.closeQuietly(stream)`：安静地关闭流，自动处理异常。
+ **`FileUtils`**：
    - `FileUtils.copyFile(src, dest)`：文件复制。
    - `FileUtils.copyDirectoryToDirectory(src, dest)`：目录复制（递归）。
    - `FileUtils.readFileToString(file)`：直接读取文件内容为字符串。

