# My personal site

## Todo
- [ ] POC , Hugo can be replaced Gatsby
  - [X] Using images in subdirectory (Using [Page Bundle](https://gohugo.io/content-management/page-bundles/)) and Rename from `README.md` to `index.md`
  - [ ] 404 Page should be automatically resolve missing page by UUID
  - [X] Problem: Filename is too long (filename generate from title)
    - [X] Quick solution - rename it to be more short.
    - [X] This issue is also found in Gatsby, ignore it.
  - [X] Field date is missing
    - [ ] Solution: Using `Inject UUID` script to inject date from filename on every markdown file.
  - [X] Short URL
    - [ ] Solution: Add `aliases: [ '/s/z578nvw/']` in every markdown file using  `Inject UUID` script 
  - [ ] Slug URL
    - [ ] Solution: Add `slug: guideline-for-upgrading-jekyll-from-2.x-to-3.x-z578nvw`  in every markdown file using  `Inject UUID` script 
  - [ ] SEO Support 
    - [ ] Support `unsplashImgCoverId: jvtKm4Wjd0Q` field, automatically add cover from unsplash
- [ ] Implement Theme using TypeScript and Webpack Setup (See example in https://github.com/mildronize/blog-jekyll/blob/jekyll/webpack.config.js)
  - [ ] Modify: https://github.com/mildronize/mild-theme

## Hugo 101

```
# In-memory Mode
hugo server -D  
hugo server --renderToDisk
```