# Context state re-rendering issue

Hi! I'm working on an e-commerce site, adapted from the gatsby-starter-stripe example. It's mostly working ok, but I'm having a couple of issues:
- 'count' should update when 'contents' changes, but it doesn't.
- the useEffect to update localStorage isn't being called when the value 'contents' is updated.

This repo is a minimal example of the issue I'm having - you can see the context provider at `src/components/context-provider.js` and the shop component at `src/components/shop.js`.

Live demo: https://context-state-troubleshooting.netlify.com
