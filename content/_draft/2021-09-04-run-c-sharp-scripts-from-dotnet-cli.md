---
title: Run C# scripts from .NET CLI
uuid: t2z614m
---

https://leetcode.com/

```bash
dotnet tool install -g dotnet-script
```

```c#
// HelloWorld.cs
Console.WriteLine("Hello World");
```

```bash
dotnet-script .\HelloWorld.cs
```

# Output
```
Hello World
```

# Ref
https://github.com/filipw/dotnet-script
