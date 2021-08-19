const config = {
  siteTitle: "Thada W.", // Site title.
  siteTitleShort: "Thada W", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Thada W.", // Alternative site title for SEO.
  siteLogo: "/logos/android-chrome-512x512.png", // Logo used for SEO and manifest.
  siteUrl: "https://thadaw.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  nodePrefix: "/b", // Prefixes for only post created by createNodeField from `gastby-node.js`
  siteDescription: "You can find almost stuff about me: sharing ideas, programming techniques, web technology and others.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "Thadaw.com RSS feed", // Title of the RSS feed
  siteFBAppID: "xxxxx", // FB Application ID for using app insights
  googleAnalyticsID: "UA-62565035-1", // GA tracking ID.
  disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  // postsPerPage: 4, // Amount of posts displayed per listing page.
  userName: "Thada Wangthammang", // Username to display in the author segment.
  userEmail: "thada.wth@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "mildronize", // Optionally renders "Follow Me" in the UserInfo segment.
  userGithub: "mildronize",
  userLocation: "Songkhla, Thailand", // User location to display in the author segment.
  userAvatar: "https://avatars.githubusercontent.com/u/3647850?v=4", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/mildronize",
      iconClassName: "fab fa-github",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/mildronize",
      iconClassName: "fab fa-twitter",
    },
    {
      label: "Email",
      url: "mailto:thada.wth@gmail.com",
      iconClassName: "fas fa-envelope",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/thada-wangthammang-281894a6/",
      iconClassName: "fab fa-linkedin",
    },
    {
      label: "Medium",
      url: "https://thadaw.medium.com/",
      iconClassName: "fab fa-medium",
    },
    {
      label: "RSS",
      url: "/rss.xml",
      iconClassName: "fas fa-rss",
    }
  ],
  copyright: "Copyright © 2021. Thada W.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure nodePrefix doesn't have an ending forward slash
if (config.nodePrefix.substr(-1) === "/")
  config.nodePrefix = config.nodePrefix.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
