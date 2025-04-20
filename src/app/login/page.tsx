import StudentLoginForm from "@/components/pages/login/studentLoginForm";

export default async function Login() {
  try {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <StudentLoginForm />
      </main>
    );
  } catch (error) {
    console.log("Error resolving parameters:", error);
    return <div>Error loading the page.</div>;
  }
}
