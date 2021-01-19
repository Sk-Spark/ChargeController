#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <rootpage.h>

//SSID and Password of your WiFi router
const char *ssid = "TP-LINK_9A04";
const char *password = "123456789";

//Declare a global object variable from the ESP8266WebServer class.
ESP8266WebServer server(80); //Server on port 80
const int ledPin = 2;

void handleRoot()
{
    Serial.println("You called root page");
    server.send(200, "text/html", rootPage); //Send web page
}

void handleStatus()
{
    Serial.println("/status called");
    int d = digitalRead(ledPin);
    Serial.println("res: " + d);

    String data = "";
    if (d)
        data = "{ \"data\":true }";
    else
    {
        data = "{ \"data\":false }";
    }

    Serial.println(data);
    server.send(200, "application/json", data);
}

void handleOn()
{
    digitalWrite(ledPin,HIGH);
    String data = "{ \"data\":true }";
    server.send(200, "application/json", data);
}

void handleOff()
{
    digitalWrite(ledPin,LOW);
    String data = "{ \"data\":false }";
    server.send(200, "application/json", data);
}

void handleTog()
{
    int v = digitalRead(ledPin);
    digitalWrite(ledPin,!v);
    int d = digitalRead(ledPin);
    String data = "";
    if (d)
        data = "{ \"data\":true }";
    else
    {
        data = "{ \"data\":false }";
    }
    server.send(200, "application/json", data);
}

void setup(void)
{
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, LOW);
    Serial.begin(115200);
    Serial.println("\n Smart Switch...");

    WiFi.begin(ssid, password); //Connect to your WiFi router

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println("");
    Serial.println(WiFi.localIP());

    server.on("/", handleRoot);
    server.on("/status", handleStatus);
    server.on("/on",handleOn);
    server.on("/off",handleOff);
    server.on("/tog",handleTog);

    server.begin();
}

void loop(void)
{
    server.handleClient(); //Handle client requests
}