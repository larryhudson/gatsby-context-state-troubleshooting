# Context state re-rendering issue

Hi! I'm working on an e-commerce site, adapted from the gatsby-starter-stripe example. It's mostly working ok, but I'm having a couple of issues:
- 'count' should update when 'contents' changes, but it doesn't.
- the useEffect to update localStorage isn't being called when the value 'contents' is updated.

Questions:
- does the entire value of the context provider need to be set using 'setState' in order for it to re-render on change? Is it not re-rendering because only 'contents' is set using setState?

This repo is a minimal example of the issue I'm having - you can see the context provider at [src/components/context-provider.js](https://github.com/larryhudson/context-state-troubleshooting/blob/master/src/components/context-provider.js) and the shop component at [src/components/shop.js](https://github.com/larryhudson/context-state-troubleshooting/blob/master/src/components/shop.js).

Live demo: https://context-state-troubleshooting.netlify.com
