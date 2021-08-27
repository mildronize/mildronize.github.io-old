---
title: Google Analytics
uuid: bqfiofl
---

# Begin with GA

Analyzing user acquisition
Tracking PageViews
Tracking Events
Tracking Load/Render Performance
Tracking Exception

https://wendeehsu.medium.com/google-analytics-in-react-js-c1b78dc1bbda

# How track user behavior

- https://www.codesanook.com/programming-google-analytics-javascript-library-to-track-user-behavior
- https://maxchadwick.xyz/blog/tracking-your-most-popular-blog-post-tags-in-google-analytics-with-jekyll

# How to read page view from GA with specific URL

Example API request

```
https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A101792950&dimensions=ga%3ApagePath&metrics=ga%3Apageviews&sort=-ga%3Apageviews&start-date=2015-01-01&end-date=yesterday
```

https://ga-dev-tools.web.app/query-explorer/

![](query-params.png)
![](query-result.png)

Ref:
- https://stackoverflow.com/a/19667939/4540808
- https://maxchadwick.xyz/blog/fetching-pageview-counts-google-analytics-api-ruby

# Read GA

Your application must use OAuth 2.0 to authorize requests. No other authorization protocols are supported.

https://developers.google.com/analytics/devguides/reporting/core/v4/authorization

[Service Accounts](https://developers.google.com/accounts/docs/OAuth2ServiceAccount)

Service accounts are useful for automated, offline, or scheduled access to Google Analytics data for your own account. For example, to build a live dashboard of your own Google Analytics data and share it with other users.

To get started using Analytics API, you need to first [use the setup tool](https://console.developers.google.com/start/api?id=analytics&credential=client_key), which guides you through creating a project in the Google API Console, enabling the API, and creating credentials.

To set up a [new service account](https://developers.google.com/identity/protocols/oauth2/service-account), do the following:

1. Go: https://console.cloud.google.com/apis/api/analytics.googleapis.com/credentials, then go to project you want.
2. Click **Create credentials > Service account key**.
  ![](create-service-account.png)
3. Click **key** tab
  ![](service-account.png)
4. Choose whether to download the service account's public/private key as a standard P12 file, or as a JSON file that can be loaded by a Google API client library.
  ![](create-service-account-key.png)

Your new public/private key pair is generated and downloaded to your machine; it serves as the only copy of this key. You are responsible for storing it securely.

**Note:** You need to add the service account email address as an authorized user of the view (profile) you want to access.
