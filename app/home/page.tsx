import Section from "@/components/Section";
import { about } from "@/content/about";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl mb-2">{about.title}</h1>
      <p className="text-lg text-zinc-700 max-w-2xl">
        I’m Aarush. I build simple, resilient software and write about what I learn.
      </p>

      <Section title="About Me">
        {about.intro.map((t, i) => <p key={i}>{t}</p>)}
      </Section>

      <Section title="Passions">
        <ul>
          {about.passions.map(p => <li key={p}>{p}</li>)}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="space-y-6">
          {about.experiences.map((e) => (
            <li key={e.role}>
              <p className="font-medium">{e.role} <span className="text-zinc-500">· {e.time}</span></p>
              <ul className="mt-2 list-disc pl-5">
                {e.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Hobbies">
        <p>{about.hobbies.join(", ")}.</p>
      </Section>
    </div>
  );
}
