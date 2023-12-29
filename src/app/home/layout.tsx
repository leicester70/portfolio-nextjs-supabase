import { Providers } from "@/context/Providers";
import HomeNav from "../components/HomeNav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNav />
    </>
  );
}
