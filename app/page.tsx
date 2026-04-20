import ProfileBio from "@/components/ProfileBio";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 min-h-screen flex items-center justify-center">
      <header className="w-full text-center">
        <ProfileBio />
      </header>
    </div>
  );
}
