---
title: Dependency Injection in ASP.NET Core
tags:
  - Dependency Injection
  - Design Patterns
uuid: kxkqrql
unsplashImgCoverId: '-kW1TvBKk1s'
---

Design Patterns is general and reusable code to a commonly occurring problem, the benefit make the code reusable, code maintainability, any change will less effect with entire system, and also provide high cohesion.

Design Patterns that I frequently use is Dependency Injection.
This pattern provides high cohesion and reduce dependency of code component for example:

```c#
public class HomeController : Controller
{
  private readonly ILogger<HomeController> _logger;

  public HomeController(ILogger<HomeController> logger)
  {
      _logger = logger;
  }
}
```

For example code: In order to create the object of HomeController by creating object and passing the object inside.

Code example without Dependency Injection.

```c#
var logger = new ILogger<HomeController>();
var homeController = new HomeController(logger);
```

The above code means `HomeController` need to depend on class `ILogger`, and it hard to create a unit testing because every time when you test you need to pass the `ILogger` instance inside, in the other hand, when the system has some bug in `ILogger`, it may be affect with the other class.

So, the Dependency Injection can solve such problem. Let's see the below code:

```c#
public class HomeController : Controller
{
  private readonly ILogger<HomeController> _logger;

  public HomeController(ILogger<HomeController> logger)
  {
      _logger = logger;
  }
}
```

Dependency Injection engine will automatically inject `ILogger` instance inside `HomeController`, so this will break dependency between them, and can make unit testing easier.

I've implemented Dependency Injection tool in typescript (Node.Js)  from scratch: https://github.com/SukreepCode/mildjs-di and it've been used in https://github.com/SukreepCode/mildjs-mild that is the simple framework that inspired from Nest.Js
