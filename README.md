# andy baek — personal site

A hand-drawn, minimal portfolio built with [Astro](https://astro.build).

```sh
npm install      # first time only
npm run dev      # http://localhost:4321 (updates as you save)
npm run build    # production build into dist/
```

## Where things live

| You want to change…               | Edit                                     |
| --------------------------------- | ---------------------------------------- |
| Name, intro, links, about, "Now"  | `src/data/site.ts`                       |
| Projects                          | `src/content/projects/*.md`              |
| Colors and fonts                  | top of `src/styles/global.css`           |
| Doodles                           | `src/components/doodles/*.astro`         |

Search the project for `TODO` to find every placeholder. The three sample projects show a dashed **sample** tag until you remove `placeholder: true`.

## Adding a project

1. Copy `src/content/projects/sunday.md` to `src/content/projects/my-thing.md`. The filename becomes the URL: `/projects/my-thing/`.
2. Fill in the frontmatter. `doodle` can be `plant`, `cup`, `plane`, `sparkle` or `bulb`. `note` is the optional handwritten aside, and `order` sets the position on the homepage.
3. Write the story of the project below the `---`. That text is the project's own page.

## Adding a demo video

1. **Record.** Press Cmd+Shift+5, choose "Record Selected Portion", and frame just the app. Aim for 10–30 seconds with no audio. Show the one thing that makes the project interesting and skip the setup.
2. **Compress.** Put raw recordings in `recordings/` (git ignores that folder), then run:
   ```sh
   ./scripts/compress-video.sh recordings/my-thing.mov my-thing          # whole clip
   ./scripts/compress-video.sh recordings/my-thing.mov my-thing 3 20     # 20s starting at 0:03
   ```
   This writes `demo.mp4`, `demo.webm` and `poster.jpg` into `public/projects/my-thing/`, and warns if a file is over 4MB.
3. **Point to it.** Add `video: /projects/my-thing/demo.mp4` to the project's frontmatter.

Videos loop silently and play only while on screen. Visitors who've turned on reduced motion get a play button instead. For a longer walkthrough with narration, upload it to YouTube as **unlisted** and add `youtube: https://youtu.be/...`.

> `public/projects/tiny-ledger/` holds a generated sample clip (Conway's Game of Life). Delete it when you add real projects.

## Deploying (free)

1. Create a repo on GitHub, then:
   ```sh
   git init && git add . && git commit -m "first version"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, choose **Add New → Project**, and import the repo. Vercel detects Astro, so click **Deploy**.
3. You'll get a URL like `your-repo.vercel.app`. Every `git push` redeploys automatically.
4. Optional custom domain: buy one (~$10–15/yr from Cloudflare, Porkbun or Namecheap), then add it under Vercel → Project → Settings → Domains and follow its DNS instructions.
5. Put your final URL in `astro.config.mjs` (`site:`).

Netlify and Cloudflare Pages work the same way if you'd rather use one of those.
