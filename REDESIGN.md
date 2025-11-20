# Portfolio Redesign - Baseline

A minimal, clean portfolio design inspired by modern developer portfolios. This is your starting point - customize it to make it your own.

## Design Philosophy

- **Content First**: Let your work speak for itself
- **Minimal Styling**: Clean typography, subtle interactions
- **Fast & Simple**: No unnecessary complexity
- **Readable**: Clear hierarchy, easy to scan

## Structure

```
app/
├── globals.css          # Minimal design system & styles
├── layout.tsx           # Root layout (clean, no nav)
└── page.tsx             # Main page with sections

components/
├── Header.tsx           # Name, bio, links
├── Section.tsx          # Reusable section wrapper
├── WorkItem.tsx         # Work experience card
└── ProjectItem.tsx      # Project card
```

## Customization Guide

### Colors
Edit `app/globals.css` variables:
```css
:root {
  --bg: #fafafa;           /* Background */
  --text: #171717;         /* Primary text */
  --text-secondary: #525252; /* Secondary text */
  --border: #e5e5e5;       /* Borders/underlines */
  --accent: #171717;       /* Accent color */
}
```

### Typography
Change the font in `app/globals.css`:
```css
body {
  font-family: your-font-here;
}
```

### Content
Fill in your info in:
- `components/Header.tsx` - Your intro
- `app/page.tsx` - Your work and projects

### Layout Options

**Want a side-by-side layout?**
```tsx
<div className="grid md:grid-cols-2 gap-12">
  <Section title="work">...</Section>
  <Section title="projects">...</Section>
</div>
```

**Want a sticky header?**
```tsx
<div className="md:grid md:grid-cols-3 gap-12">
  <div className="md:sticky md:top-16 md:self-start">
    <Header />
  </div>
  <div className="md:col-span-2">
    {/* Your sections */}
  </div>
</div>
```

## Next Steps

1. **Add your content** in `page.tsx` and `Header.tsx`
2. **Adjust colors** to match your brand
3. **Experiment with layout** - try different structures
4. **Add more sections** - education, skills, writing, etc.
5. **Consider adding**:
   - Dark mode toggle
   - Animations (keep them subtle)
   - A footer with additional links
   - Analytics

## What's Different from the Old Design?

- **Removed**: Complex nav, multiple color schemes, cards, badges
- **Added**: Focus on content, cleaner typography, simpler structure
- **Kept**: Responsive design, good accessibility, semantic HTML

## Run It

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

---

**Remember**: This is a baseline. Make it yours. Add your personality, but keep it clean.