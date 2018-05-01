#include <RH_ASK.h>
#include <SPI.h> // Not actualy used but needed to compile

RH_ASK driver(1000, 11, 12); // bps,rx,tx

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // Debugging only
  if (!driver.init())
    Serial.println("init failed");
}

void loop() {
  // put your main code here, to run repeatedly:
  uint8_t buf[12];
  uint8_t buflen = sizeof(buf);
  if (driver.recv(buf, &buflen)) // Non-blocking
  {
    int i;
    // Message with a good checksum received, dump it.
    // Serial.print("Message: ");
    Serial.println((char*)buf);
  }
}
