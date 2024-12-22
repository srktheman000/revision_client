import ParentLoginForm from "@/components/pages/login/parentLoginForm";
import StudentLoginForm from "@/components/pages/login/studentLoginForm";
import { Role } from "@/types";

export default async function Home(paramPromise: {
  searchParams: Promise<{ role: Role }>;
}) {
  try {
    const param = await paramPromise.searchParams;
    const role = param.role;

    return (
      <main>
        {role === Role.Student ? (
          <StudentLoginForm />
        ) : role === Role.Parent ? (
          <ParentLoginForm />
        ) : (
          <div>Please select a role</div>
        )}
      </main>
    );
  } catch (error) {
    console.log("Error resolving parameters:", error);
    return <div>Error loading the page.</div>;
  }
}
