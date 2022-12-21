---
uuid: 9ahhltg
title: Provider Azurerm Version 3 ออกมาแล้ว มีอะไรเปลี่ยนไปบ้าง มีอะไรที่ Deprecated
tags:
  - Terraform
unsplashImgCoverId: ns6YZqJxg08
---


# Provider Azurerm Version 3 ออกมาแล้ว มีอะไรเปลี่ยนไปบ้าง มีอะไรที่ Deprecated


https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/3.0-upgrade-guide

https://github.com/hashicorp/terraform-provider-azurerm/releases/tag/v3.0.0

1. Move State ไม่ได้ ต้องลบ state แล้ว import ใหม่

  ```
  terraform state rm azurerm_app_service.main
  terraform import azurerm_linux_web_app.main
  ```


