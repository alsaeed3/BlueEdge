import { notFound } from 'next/navigation';
import ClientScenarioView from '@/components/potential-clients/client-scenario-view';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { potentialClients } from '@/lib/potential-clients-data';

export default function ClientScenarioPage({ params }: { params: { clientId: string } }) {
  const { clientId } = params;
  
  // Check if client exists
  const clientExists = potentialClients.some(client => client.id === clientId);
  
  if (!clientExists) {
    notFound();
  }
  
  return (
    <DashboardLayout>
      <ClientScenarioView clientId={clientId} />
    </DashboardLayout>
  );
}
