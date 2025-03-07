#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = " ";            
const char* password = "";                  
const char* serverName = "http://192.168.101.9:8000/api/sensores/";  

const int sensorPin = 2;  

void setup() {

    Serial.begin(115200);   

    pinMode(sensorPin, INPUT);

    Serial.println("Conectando a WiFi...");
    WiFi.begin(ssid, password);


    int retries = 0;
    while (WiFi.status() != WL_CONNECTED && retries < 10) {
        delay(1000);
        Serial.print(".");
        retries++;
    }


    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Conectado a WiFi");
    } else {
        Serial.println("Error al conectar a WiFi. Verifica la conexión.");
        while (true); 
    }
}

void loop() {
    int sensorValue = digitalRead(sensorPin);  

    HTTPClient http;
    http.begin(serverName);  
    http.addHeader("Content-Type", "application/json");  


    String jsonData = "{\"valor_sensor\": " + String(sensorValue) + "}";


    int httpResponseCode = http.POST(jsonData);


    if (httpResponseCode > 0) {

        Serial.print("Código de respuesta HTTP: ");
        Serial.println(httpResponseCode);
        Serial.println("Datos enviados correctamente.");
    } else {
        Serial.print("Error al enviar los datos. Código de respuesta: ");
        Serial.println(httpResponseCode);

        if (httpResponseCode == -1) {
            Serial.println("Error de conexión. Verifica la URL del servidor.");
        } else if (httpResponseCode == 404) {
            Serial.println("Error 404: URL no encontrada.");
        } else if (httpResponseCode == 500) {
            Serial.println("Error 500: Problema en el servidor.");
        }
    }
    http.end();
    delay(10000);
}
