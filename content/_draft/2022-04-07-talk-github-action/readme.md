---
title: Deploy Multiple Azure App Services using GitHub Actions Matrix
tags:
  - sre
uuid: tjd75q6
unsplashImgCoverId: tNzrRqWLDh0
---

Source Code: https://github.com/mildronize/deploy-multiple-azure-app-services-using-github-actions-matrix

Support for exposing Function App publishing profile as a resource/data source attribute #8739
https://github.com/hashicorp/terraform-provider-azurerm/issues/8739

# More Resources

https://www.dotnetthailand.com/cloud-hosting/azure/app-service

- [.NET 💜 GitHub Actions: Intro to GitHub Actions for .NET](https://devblogs.microsoft.com/dotnet/dotnet-loves-github-actions/)
- [Azure Base Camp ตอนพิเศษ - ทำแอปไม่ให้ล่ม ย้ายมาอยู่บน Azure App Service กันเถอะ](https://www.youtube.com/watch?v=c96JZyHaf-w)


TF_LOG=DEBUG terraform apply


```
terraform apply
terraform output -json  app_service_deployment > deploy.json
dasel -r json -w yaml < deploy.json > thadaw.jobs.yml

# copy yaml to thadaw.config.yml
# copt yaml to .github/workflows/build-and-deploy.yml

yarn dev -f thadaw.config.yml -m
./tmp/run-all.sh
```
