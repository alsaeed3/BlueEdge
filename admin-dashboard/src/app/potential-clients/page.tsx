import ClientDirectoryView from "@/components/potential-clients/client-directory-view";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function PotentialClientsPage() {
  return (
    <DashboardLayout>
      <ClientDirectoryView />
    </DashboardLayout>
  );
}