import ProfileBio from "@/components/home/ProfileBio";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-2 min-h-screen flex items-center justify-center">
      <main className="w-full text-center">
        <ProfileBio />
      </main>
    </div>
  );
}
