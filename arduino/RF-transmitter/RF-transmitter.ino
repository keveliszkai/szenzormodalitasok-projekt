#include <RH_ASK.h>
#include <SPI.h> // Not actually used but needed to compile

RH_ASK driver(1000, 11, 12); // bps,rx,tx

int led = 13;    // 'led' is the Arduino onboard LED
int mic = 3;    // 'mic' is the Arduino pin 3 = the digital output pin of the Microphone board (D0)
int mov = 4;    // 'mov' is the Arduino pin 4 = the digital output pin of the Movement sensor (D1)

const unsigned int oneSecond = 20; // 20 * 50 ms = 1 s
const int rfSignalSeconds = 20;
unsigned int numberOfSamples = 0;
unsigned int numberOfPositives = 0;
unsigned int numberOfSeconds = 0;
int isMoved = 0;
double maxSound = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode (led, OUTPUT) ;     // configure 'led' as output pin
  pinMode (mic, INPUT) ;     // configure 'mic' as input pin
  pinMode (mov, INPUT) ;     // configure 'mov' as input pin
  Serial.begin(9600);
  if (!driver.init())
    Serial.println("init failed");
}

void loop() {
  delay(50);

  if (digitalRead(mov) == HIGH) {
    isMoved = 1;
  }

  if (digitalRead(mic) == HIGH) {
    numberOfPositives++;
    digitalWrite (led, HIGH);
  } else {
    digitalWrite (led, LOW);
  }

  numberOfSamples++;

  if (numberOfSamples > oneSecond) // toss out spurious readings
  {
    double value = ( (float) numberOfPositives / oneSecond) * 100.00;

    if (value > maxSound) {
      maxSound = value;
    }

    numberOfPositives = 0;
    numberOfSamples = 0;
    numberOfSeconds++;

    if (numberOfSeconds > rfSignalSeconds) {

      String buf = String(maxSound) + '|' + String(isMoved) + 'X';
      unsigned int bufferSize = 10;
      char charBuffer[bufferSize];
      buf.toCharArray(charBuffer , bufferSize);
      Serial.println(buf);

      driver.send((uint8_t *) charBuffer, bufferSize);
      driver.waitPacketSent();

      isMoved = 0;
      maxSound = 0;
      numberOfSeconds = 0;
    }
  }


}

