import HomeNav from "@/components/AppNav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNav />
      <div className="mt-6 grid grid-cols-12 gap-1">
        <div className="col-start-2 col-span-10 lg:col-start-4 lg:col-span-6">
          {children}
        </div>
        <div />
      </div>
    </>
  );
}
