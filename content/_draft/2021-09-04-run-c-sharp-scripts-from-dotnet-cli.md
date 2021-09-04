---
title: Run C# scripts from .NET CLI
uuid: t2z614m
---

https://leetcode.com/

```bash
dotnet tool install -g dotnet-script
```

# Setup

```json
// Filename: omnisharp.json
{
  "script": {
    "enableScriptNuGetReferences": true,
    "defaultTargetFramework": "net5.0"
  }
}
```

```csharp
// Filename: HelloWorld.cs
public class HelloWorld {
    public string GetString() {
        return "Hello World";
    }
}

Console.WriteLine(new HelloWorld().GetString());
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
