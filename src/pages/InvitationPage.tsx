import { HeroSection } from "../components/invitation/HeroSection";
import { CouplePhotoSection } from "../components/invitation/CouplePhotoSection";
import { InvitationSection } from "../components/invitation/InvitationSection";
import { ScheduleSection } from "../components/invitation/ScheduleSection";
import { GiftsSection } from "../components/invitation/GiftsSection";
import { ResponseSection } from "../components/invitation/ResponseSection";
import { MusicPlaylist } from "../components/MusicPlaylist";

export function InvitationPage() {
  return (
    <>
      <HeroSection />
      <CouplePhotoSection />
      <InvitationSection />
      <ScheduleSection />
      <GiftsSection />
      <MusicPlaylist />
      <ResponseSection />
    </>
  );
}
