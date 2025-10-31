import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ticket Monitoring Dashboard | Soaking in Bliss",
  description: "Real-time ticket booking monitoring for Teacher Special Pass",
};

export default function MonitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
