# Aswin B — AI Engineer Portfolio

A modern, futuristic, fully responsive portfolio website.

## 📁 Folder Structure
```
portfolio/
├── index.html       ← All sections and content
├── style.css        ← All styles, responsive + dark theme
├── script.js        ← Particles, typing, animations, form
├── Aswin_B_Resume.pdf  ← Place your resume PDF here
└── README.md
```

---

## 🚀 Deployment

### GitHub Pages
1. Create a new GitHub repo (e.g. `aswinbose05.github.io`)
2. Upload all files to the root of the `main` branch
3. Go to **Settings → Pages → Source: main branch / root**
4. Your site will be live at `https://aswinbose05.github.io`

### Vercel (Recommended)
1. Push files to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Git Repository
3. Select your repo — click **Deploy**
4. Done! Custom domain can be added free.

### Netlify (Alternative)
1. Drag and drop the `portfolio/` folder at [app.netlify.com/drop](https://app.netlify.com/drop)
2. Instant deployment, no config needed

---

## ✏️ How to Add New Content

### ➕ Add a New Project
In `index.html`, find the comment:
```html
<!-- Add new project card below this comment -->
```
Copy any existing `<article class="project-card glass reveal" ...>` block above it and update:
- `data-category` → `"ai"` or `"fullstack"`
- `id` on the `<h3>` (e.g. `proj6-title`)
- GitHub link in `<a href="...">`
- Title, subtitle, description, features, tech stack

### ➕ Add a New Certification
Find the comment:
```html
<!-- Add new certification card below this comment -->
```
Copy a `<div class="cert-card glass reveal">` block and update the badge color class (`ibm`, `google`, `amazon`), title, issuer, description, and cert-tag.

### ➕ Add a New Skill Pill
Inside any `.skill-group`, add a `<span class="pill">New Skill</span>` inside `.skill-pills`.

To add a whole new skill group, copy any `<div class="skill-group glass reveal">` block.

### ➕ Add a New Achievement
Find `<!-- Add new achievement below this comment -->` and copy an `.ach-item` block.

### ➕ Add Work Experience
Find `<!-- Add new experience below this comment -->` and copy the `.exp-card` block.

---

## 🖼️ Adding Your Photo
Replace the avatar initials block with an `<img>`:
```html
<!-- In .avatar-placeholder, replace the <span>AB</span> with: -->
<img src="your-photo.jpg" alt="Aswin B" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```

---

## 📞 Contact Form
The form uses a `mailto:` link to open the user's email client pre-filled.
For a real backend form, replace the submit handler in `script.js` with a fetch call to:
- [Formspree](https://formspree.io) — free, no backend needed
- [Web3Forms](https://web3forms.com)

---

## 🎨 Customizing Colors
All colors are CSS variables in `style.css`:
```css
--blue: #4f8eff;
--purple: #9d65ff;
--cyan: #00d4ff;
```
Change these to update the entire theme instantly.
