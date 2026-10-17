# Vowelle — Chaitra's First Birthday Invitation

A responsive invitation built with **plain HTML, CSS and vanilla JavaScript only**. No React, Next.js or frontend framework.

## Preview locally
1. Keep `index.html`, `style.css`, `script.js` and the `assets` folder together.
2. Open `index.html` in a browser. For best results, run it through a small local static server.

## Add Chaitra's photo
Chaitra’s supplied photo is included at `assets/chaitra-photo.jpg`. Replace this file to use a different photo. The image is cropped with `object-fit: cover` inside a circular frame.

## Before publishing
- The party time is set to **7:00 PM IST** on 1 December 2027. Change `2027-12-01T19:00:00+05:30` in `script.js` if needed.
- Confirm the exact venue/address. The supplied text was “Daspalla Hyderabad jubilihills”; the map link searches “Daspalla Hyderabad Jubilee Hills”.
- The supplied `Chaithrabirthday.mp3` is included as `assets/birthday-music.mp3`. Music starts after the visitor taps the opening button, and the music control toggles play/pause. It pauses when the tab/app is hidden and does not automatically restart.
- Add a family contact/RSVP number if you want RSVP functionality.

## Current features
- Animated invitation welcome screen
- Underwater lavender pastel theme with playful stickers and bubbles
- Mobile-first responsive design
- One-photo frame populated with Chaitra’s supplied photo
- Countdown to the date (uses 7 PM IST)
- Venue map search link
- Add-to-calendar `.ics` download
- Share action using the Web Share API where supported
- Scroll reveal animations and reduced-motion accessibility support
- Vowelle branding and closing message

## Theme
Lavender, lilac, pastel blue, peach, soft pink, cream and deep purple, inspired by the provided underwater birthday reference.

## Deploying to GitHub Pages
1. Push your repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Select `main` (or `master`) branch and `/ (root)` folder, then click **Save**.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
*(The repository includes `.nojekyll` to prevent Jekyll processing errors).*

## Deploying to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop this project folder into the Netlify "Sites" dashboard, or connect via Git.
3. Build command: *(leave empty)*
4. Publish directory: *(leave empty or `. / root`)*
5. Netlify will generate a free HTTPS URL like `https://<site-name>.netlify.app/`.

## WhatsApp Link Previews
When you paste the link into a WhatsApp chat:
1. WhatsApp reads the Open Graph tags (`og:title`, `og:description`, `og:image`) configured in `index.html`.
2. **Pro Tip for WhatsApp**: After typing or pasting the link, wait 2–3 seconds for WhatsApp to fetch and display the preview box before tapping Send.
3. For 100% guarantee across all WhatsApp versions, once your live domain is known (e.g. `https://chaitra-one.netlify.app`), you can optionally update the `og:image` URL in `index.html` with your full HTTPS URL (`https://chaitra-one.netlify.app/assets/chaitra-photo.jpg`).
