#include <RH_ASK.h>
#include <SPI.h> // Not actually used but needed to compile

RH_ASK driver(1000, 11, 12); // bps,rx,tx

int led = 13;    // 'led' is the Arduino onboard LED
int mic = 3;    // 'mic' is the Arduino pin 3 = the digital output pin of the Microphone board (D0)
int val = 0;     // 'val' is used to store the digital microphone value

const int sampleWindow = 50; // Sample window width in mS (50 mS = 20Hz)
const int secondSampleWindow = 10256;
unsigned int numberOfSamples = 0;
unsigned int numberOfPositives = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode (led, OUTPUT) ;     // configure 'led' as output pin
  pinMode (mic, INPUT) ;     // configure 'mic' as input pin
  Serial.begin(9600);
  if (!driver.init())
    Serial.println("init failed");
}

void loop() {
  // put your main code here, to run repeatedly:
  unsigned long startMillis = millis(); // Start of sample window

  // collect data for 50 mS
  while (millis() - startMillis < sampleWindow)
  {
    val = digitalRead(mic);     // read value
    numberOfSamples++;

    if (val == HIGH)    // if he value is high then light the LED or else do not light the LED
    {
      numberOfPositives++;
      digitalWrite (led, HIGH);
    }
    else
    {
      digitalWrite (led, LOW);
    }

    if (numberOfSamples > secondSampleWindow) // toss out spurious readings
    {
      double value = ( (float) numberOfPositives / secondSampleWindow) * 100.00;
      numberOfPositives = 0;
      numberOfSamples = 0;
      String buf = String(value,6);

      unsigned int bufferSize = 10;
      char charBuffer[bufferSize];
      buf.toCharArray(charBuffer ,bufferSize);
      Serial.println(value);
      Serial.println(buf);
      
      driver.send((uint8_t *) charBuffer, bufferSize);
      driver.waitPacketSent();
    }
  }


}

