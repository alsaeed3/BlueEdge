import { notFound } from 'next/navigation';
import ClientScenarioView from '@/components/potential-clients/client-scenario-view';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { potentialClients } from '@/lib/potential-clients-data';

interface ClientScenarioPageProps {
  params: {
    clientId: string
  }
}

export default async function ClientScenarioPage({ params }: ClientScenarioPageProps) {
  // In Next.js App Router, we need to properly handle params
  const clientId = params?.clientId;
  
  // Wait for any promises to resolve (if any)
  await Promise.resolve();
  
  // Check if client exists
  const client = potentialClients.find(client => client.id === clientId);
  
  if (!client) {
    notFound();
  }
  
  return (
    <DashboardLayout>
      <ClientScenarioView clientId={clientId} />
    </DashboardLayout>
  );
}
