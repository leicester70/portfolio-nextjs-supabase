"use client";

import { transformDate } from "@/lib/helper";

interface Props {
  isostring: string;
}

export default function DisplayDate({ isostring }: Props) {
  const formattedDate = transformDate(isostring);

  return <span className="text-tiny py-4">{formattedDate}</span>;
}
