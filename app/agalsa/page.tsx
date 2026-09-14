import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Deck from "./deck/Deck";
import { AGALSA_COOKIE, getAuthSecret, verifyToken } from "@/lib/agalsa-auth";

export const metadata: Metadata = {
  title: "Auditoría AGALSA | Giocode",
  description:
    "Presentación de auditoría digital para AGALSA: hallazgos, riesgos y plan de acción.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AgalsaPage() {
  const token = (await cookies()).get(AGALSA_COOKIE)?.value;
  if (!token || !(await verifyToken(token, getAuthSecret()))) {
    redirect("/agalsa/login");
  }
  return <Deck />;
}
