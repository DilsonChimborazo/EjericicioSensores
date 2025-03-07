import { useState, useEffect } from "react";
import { useSensor } from "@/hooks/useSensor";  // Asegúrate de que este hook está implementado correctamente
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registramos los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SensorDisplay() {
    // Estado para almacenar las lecturas del sensor, incluidas las fechas y los valores
    const [sensorReadings, setSensorReadings] = useState({
        labels: [] as string[], // Fechas
        data: [] as number[],   // Valores de temperatura
    });

    // Usamos el hook para obtener los datos del sensor
    const sensorData = useSensor();

    // Efecto que se ejecuta cuando los datos del sensor cambian
    useEffect(() => {
        if (sensorData && sensorData.fecha && typeof sensorData.valor_sensor === "number") {
            // Convertimos la fecha en formato legible
            const formattedDate = new Date(sensorData.fecha).toLocaleString();

            // Actualizamos las lecturas de los sensores
            setSensorReadings((prevData) => {
                // Creamos nuevos arrays con los valores actuales para evitar modificar el estado directamente
                const newLabels = [...prevData.labels, formattedDate];
                const newData = [...prevData.data, sensorData.valor_sensor];

                return {
                    labels: newLabels,
                    data: newData,
                };
            });
        }
    }, [sensorData]); // Dependemos de `sensorData` para actualizar el estado

    // Configuración de los datos para la gráfica
    const data = {
        labels: sensorReadings.labels,  // Fechas acumuladas
        datasets: [
            {
                label: 'Temperatura (°C)',  // Etiqueta para la línea
                data: sensorReadings.data, // Temperaturas acumuladas
                borderColor: 'rgb(75, 192, 192)',  // Color de la línea
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de la línea
                tension: 0.1,  // Curvatura de la línea
            },
        ],
    };

    return (
        <div className="max-w-md mx-auto mt-10 shadow-lg rounded-2xl bg-white p-6">
            <div className="text-center">
                <h2 className="text-xl font-bold">Sensor en Tiempo Real</h2>
                <div className="mt-4">
                    {sensorData ? (
                        <>
                            <p className="text-2xl font-semibold text-blue-600">{sensorData.valor_sensor} °C</p>
                            <p className="text-gray-500 text-sm">Última lectura: {sensorData.fecha}</p>
                        </>
                    ) : (
                        <p className="text-gray-500">Esperando datos...</p>
                    )}
                </div>
                <div className="mt-8">
                    {sensorReadings.data.length > 0 ? (
                        <Line data={data} />  // Mostramos la gráfica si hay datos
                    ) : (
                        <p>Cargando gráfico...</p>  // Mostramos mensaje de carga si no hay datos
                    )}
                </div>
            </div>
        </div>
    );
}
