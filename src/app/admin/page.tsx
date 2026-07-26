import { Outlet } from "react-router-dom";
import Menu from "../../shared/presentation/components/layout/Menu";
import AdminSidebar from "../../shared/presentation/components/layout/AdminSidebar";

export default function AdminPage() {
  return (
    <main className="flex h-screen w-screen max-w-700 flex-col overflow-hidden">
      <Menu />
      <div className="grid h-full w-full grid-cols-[300px_1fr] overflow-hidden">
        <AdminSidebar />

        <section className="mt-7 flex flex-wrap items-center justify-center overflow-y-auto px-4 2xl:px-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
