---
title: Uptime Kuma on Azure Virtual Machine
uuid: h4uaaip
---

- When I try to deploy Uptime Kuma on Azure App Service with Azure Files
  - It will throw error like [See more in uptime-kuma#1096](https://github.com/louislam/uptime-kuma/issues/1096)
    ```
    [Error: PRAGMA journal_mode = WAL - SQLITE_BUSY: database is locked]
    ```
    https://www.youtube.com/watch?v=q7J050yovuo
- Cannot use App Service with Kuma Uptime because Kuma require local SQLite
  - It's not recommended to use storage mounts for local databases (such as SQLite) or for any other applications and components that rely on file handles and locks.
  https://learn.microsoft.com/en-us/azure/app-service/configure-connect-to-azure-storage?tabs=portal&pivots=container-linux#best-practices
- Use VM instead
-  install docker on Azure VM
- Add Custom Domain with DNS A Record and IP v4 https://learn.microsoft.com/en-us/azure/virtual-machines/custom-domain
- Using Docker-compose and `https-portal` for https https://github.com/louislam/uptime-kuma/wiki/Reverse-Proxy#https-portal
- already sign https

# Good to Know
- [Use Docker, Uptime Kuma, and Traefik To Monitor Your Website](https://levelup.gitconnected.com/use-docker-uptime-kuma-and-traefik-to-monitor-your-website-593373f9e0c2) Ensure the stability and availability of your websites, blog, or else with Uptime Kuma. An intuitive, lightweight Docker service.
