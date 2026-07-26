import Menu from "../../shared/presentation/components/layout/Menu";
import TeamLeadSidebar from "../../shared/presentation/components/layout/TeamLeadSidebar";
import { Outlet } from "react-router-dom";

export default function TeamLeadPage() {
  return (
    <main className="flex h-screen w-screen max-w-700 flex-col overflow-hidden">
      <Menu />
      <div className="grid h-full w-full grid-cols-[300px_1fr] overflow-hidden">
        <TeamLeadSidebar />

        <section className="mt-7 flex flex-wrap items-center justify-center overflow-y-auto px-4 2xl:px-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
