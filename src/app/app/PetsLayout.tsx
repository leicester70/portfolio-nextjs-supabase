import HomeNav from "@/components/AppNav";

export default function PetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-green">{children}</div>;
}
