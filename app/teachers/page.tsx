import TeacherEvent from "@/components/TeacherEvent";

export const metadata = {
  title: "Teacher Registration - Soaking in Bliss",
  description: "Exclusive Teacher Family Special Registration for Soaking in Bliss with Gurudev Sri Sri Ravi Shankar",
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
};

export default function TeachersPage() {
  return (
    <main className="min-h-screen">
      <TeacherEvent />
    </main>
  );
}
