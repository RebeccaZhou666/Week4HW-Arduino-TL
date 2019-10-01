#include <Servo.h>
Servo servoMotor;

int servoPin = 5;
int start = 1;
int ledPin = 6;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);           // initialize serial communications
  servoMotor.attach(servoPin);
  servoMotor.write(0);
}

void loop() {
   if (Serial.available() > 0) { // if there's serial data available
     int inByte = Serial.read();   // read it
     Serial.write(inByte);         // send it back out as raw binary data
     if (inByte == 255){
      digitalWrite(LED_BUILTIN, HIGH);
      delay(100);
      digitalWrite(LED_BUILTIN, LOW);
      delay(100);
      int servoAngle = 110;
      servoMotor.write(servoAngle);       // use it to set the servo brightness
      //delay(1000);                // waits for 2 seconds
      //servoMotor.write(0); // sets the servo off
     }else if(inByte == 123){
      digitalWrite(LED_BUILTIN, HIGH);
      delay(100);
      digitalWrite(LED_BUILTIN, LOW);
      delay(100);
      servoMotor.write(0);
     }
   }
      //servoMotor.write(100);
//      if (start == 1){
//        servoMotor.write(10);
//        int servoAngle = 100;
//        servoMotor.write(servoAngle);       // use it to set the servo brightness
//        delay(1000);                // waits for 2 seconds
//        servoMotor.write(10); // sets the servo off
//        delay(1000);
//        Serial.println(1);
//        start = 0;
//      }else{
//      }

//  if (Serial.available() > 0) { // if there's serial data available
//    int inByte = Serial.read();   // read it
//    Serial.write(inByte);         // send it back out as raw binary data
//    analogWrite(ledPin, inByte);       // use it to set the LED brightness
//    delay(2000);                // waits for 2 seconds
//    analogWrite(ledPin, 0);  // sets the LED off
//  }

}
