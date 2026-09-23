# School Portal

A simple static website designed to run on GitHub Pages.

## Files

- `index.html` — page structure
- `style.css` — appearance and responsive layout
- `script.js` — shortcuts, URL viewer, and dark mode
- `apps/` — optional place for additional static pages

## GitHub Pages setup

1. Create a GitHub repository.
2. Upload the files from this folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.
7. GitHub will provide the Pages address after deployment.

## Adding shortcuts

Open `script.js` and add another object to `defaultSites`:

```js
{
  name: "Example",
  icon: "🌐",
  description: "Example website",
  url: "https://example.com/"
}
```

## Important limitation

This is a static portal, not a server-side proxy. GitHub Pages cannot fetch arbitrary websites on your behalf. Many sites also deliberately prevent themselves from being displayed inside an iframe. The **Open in new tab** button is included for those cases.

Use it only in ways allowed by your school's network and technology-use rules.
