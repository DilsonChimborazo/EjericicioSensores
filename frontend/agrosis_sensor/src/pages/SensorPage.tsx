
import SensorDisplay from "@/components/Sensor";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-5">Dashboard de Sensores</h1>
      <SensorDisplay />
    </main>
  );
}
