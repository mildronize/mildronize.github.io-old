---
title: TypeScript Object Mapping
uuid: 7rwsbzv
---

```ts
export type ObjectMappingCallback = (row: any) => any;

export type ObjectMapping = {
  [key: string]: string | number | ObjectMappingCallback;
};

mapObject(objects: Record<string, any>, objectMapping: ObjectMapping) {
    const item: Record<string, any> = {};
    for (const [key, value] of Object.entries(objectMapping)) {
      if (typeof value === 'function') {
        item[key] = value(objects);
      } else item[key] = objects[value];
    }
    return item;
  }


// Usage

const objectMapping = {
    'id': 'ID',
    'title': 'Title',
    'icon': (rows: any) => rows['Title'].charAt(0)
  };

const result = mapObject(sourceObject, objectMapping);
```
