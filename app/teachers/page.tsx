import TeacherCleanEvent from "@/components/TeacherCleanEvent";

export const metadata = {
  title: "Teacher Registration - Soaking in Bliss",
  description: "Exclusive registration for Art of Living teachers",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeachersPage() {
  return (
    <main className="min-h-screen">
      <TeacherCleanEvent />
    </main>
  );
}
