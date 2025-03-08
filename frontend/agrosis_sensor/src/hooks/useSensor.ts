import { useState, useEffect } from "react";

const WS_URL = "ws://localhost:8000/ws/sensores/";

export function useSensor() {
    const [sensorData, setSensorData] = useState<{ valor_sensor: number; fecha: string } | null>(null);

    useEffect(() => {
        const socket = new WebSocket(WS_URL);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data && data.valor_sensor && data.fecha) {
                setSensorData(data); 
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => socket.close();
    }, []);

    return sensorData; 
}
