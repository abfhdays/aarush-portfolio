import HomeNav from "@/components/HomeNav";
import ProfileBio from "@/components/ProfileBio";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-6 min-h-screen flex items-center justify-center">
      <header className="w-full -mt-12 text-center">
        <HomeNav />
        <ProfileBio />
      </header>
    </div>
  );
}
