# Content Management Guide

Your portfolio content is now centralized in the `content/` folder. To update your information, you only need to edit these files - no touching components!

## 📁 Content Structure

```
content/
├── info.ts       → Your name, bio, social links
├── work.ts       → Work experience
└── projects.ts   → Projects
```

---

## 🔧 How to Update

### Personal Info

**File:** `content/info.ts`

```typescript
export const personalInfo = {
  name: "Your Name",
  bio: "Your bio goes here...",
  links: [
    { label: "github", url: "https://github.com/username" },
    { label: "linkedin", url: "https://linkedin.com/in/profile" },
    { label: "email", url: "mailto:your@email.com" }
  ]
};
```

**To add a new link:**
```typescript
{ label: "twitter", url: "https://twitter.com/handle" }
```

---

### Work Experience

**File:** `content/work.ts`

```typescript
export const workExperience = [
  {
    title: "Your Job Title",
    company: "Company Name",
    date: "Month Year - Present",
    description: "What you did and achieved..."
  },
  // Add more jobs here
];
```

**To add new work:**
Just add another object to the array. They display in the order you list them.

---

### Projects

**File:** `content/projects.ts`

```typescript
export const projects = [
  {
    title: "Project Name",
    date: "2025",
    description: "What the project does...",
    link: "https://github.com/username/project" // optional
  },
  // Add more projects here
];
```

**To add new project:**
Add another object. The `link` field is optional - leave it out if you don't want a clickable title.

---

## 💡 Tips

### Order Matters
Items display in the order you list them. Put most recent/important first.

### Line Breaks
For multi-line descriptions, use regular strings:
```typescript
description: "First sentence. Second sentence. Keep it readable."
```

### Optional Fields
- `link` in projects is optional
- You can add new fields, just update the TypeScript types in `types/content.ts`

### Adding New Sections

Want to add "education" or "skills"?

1. Create `content/education.ts` with your data
2. Import it in `app/page.tsx`
3. Add a `<Section title="education">` to the page
4. Create a component like `EducationItem.tsx` if needed

---

## 🚀 Quick Updates

**Changed jobs?** → Edit `content/work.ts`
**New project?** → Add to `content/projects.ts`
**Updated bio?** → Edit `content/info.ts`

Then:
```bash
git add content/
git commit -m "updated work experience"
git push
```

Done! Your site updates automatically on deploy.

---

## 🎨 Want to Change Layout?

Content is separate from design. To change how things look, edit:
- `components/` - Component structure
- `app/globals.css` - Styles and colors
- `app/page.tsx` - Page layout

But you can update content without touching any of that! 🎉