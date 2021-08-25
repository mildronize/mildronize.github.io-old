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

https://www.codesanook.com/programming-google-analytics-javascript-library-to-track-user-behavior


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
