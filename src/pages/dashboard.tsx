import { Header } from "@/components/header";
import { MedicationForm } from "@/components/medication-form";
import { MedicationList } from "@/components/medication-list";
import { VitalsForm } from "@/components/vitals-form";
import { VitalsLog } from "@/components/vitals-log";
import { InactivityWarning } from "@/components/inactivity-warning";
import { useMedications, useVitals } from "@/hooks/use-auth";
import type { UserSession } from "@shared/schema";

interface DashboardProps {
  user: UserSession;
  onLogout: () => void;
  showInactivityWarning: boolean;
  onDismissWarning: () => void;
}

export function Dashboard({ user, onLogout, showInactivityWarning, onDismissWarning }: DashboardProps) {
  const { medications, isLoading: medicationsLoading, addMedication, removeMedication } = useMedications(user.username);
  const { vitals, isLoading: vitalsLoading, addVitals } = useVitals(user.username);

  return (
    <div className="min-h-screen bg-background">
      {showInactivityWarning && <InactivityWarning onDismiss={onDismissWarning} />}
      <Header username={user.username} onLogout={onLogout} />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Welcome back, {user.username}</h1>
          <p className="text-muted-foreground mt-1">
            Track your medications and log your vital signs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-6" aria-labelledby="medications-heading">
            <h2 id="medications-heading" className="sr-only">Medication Management</h2>
            <MedicationForm onAdd={addMedication} />
            <MedicationList
              medications={medications}
              isLoading={medicationsLoading}
              onRemove={removeMedication}
            />
          </section>

          <section className="space-y-6" aria-labelledby="vitals-heading">
            <h2 id="vitals-heading" className="sr-only">Vital Signs Logging</h2>
            <VitalsForm onAdd={addVitals} />
            <VitalsLog vitals={vitals} isLoading={vitalsLoading} />
          </section>
        </div>
      </main>
    </div>
  );
}
