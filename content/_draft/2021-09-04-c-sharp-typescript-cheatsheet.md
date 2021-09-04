---
title: C# & TypeScript Cheat Sheet
uuid: 7y0e9i6
---


# Array

## C#

```csharp
int[] array = new int[] { 2, 7, 11, 15 };
```

## TypeScript

```ts
let array: number[] = [ 2, 7, 11, 15 ];
```

# Print Array

https://stackoverflow.com/a/16265268/4540808

## C#

```csharp
int[] array = new int[] { 2, 7, 11 };
// Method: 1
array.ToList().ForEach(i => Console.WriteLine(i.ToString()));
// Method: 2
Array.ForEach(array, Console.WriteLine);
// Method: 3
foreach(var item in array)
{
    Console.WriteLine(item.ToString());
}
// Output of Method 1-3:
// 2
// 7
// 11

// Method: 4
Console.WriteLine("[{0}]", string.Join(", ", array));
// Output: [2, 7, 11]
```

## String Reverse

```csharp
string ReverseString(string s)
{
    char[] charArray = s.ToCharArray();
    Array.Reverse( charArray );
    return new string( charArray );
}
```

## Convert string to array of chars

```csharp
char[] charArray = s.ToCharArray();
// Convert `char[]` back to `string`
new string( charArray );
```
