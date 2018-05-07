<?php
include 'PhpSerial.php';

// Let's start the class
$serial = new PhpSerial;

// First we must specify the device. This works on both linux and windows (if
// your linux serial device is /dev/ttyS0 for COM1, etc)
$serial->deviceSet("/dev/ttyUSB0");

// We can change the baud rate, parity, length, stop bits, flow control
$serial->confBaudRate(9600);
$serial->confParity("none");
$serial->confCharacterLength(8);
$serial->confStopBits(1);
$serial->confFlowControl("none");

// Then we need to open it
$serial->deviceOpen();

// Or to read from
$read = $serial->readPort();

echo $read;

// Or to read from
echo "LISTENING...".PHP_EOL;

while ( true ) {
    $read = $serial->readPort();
    if ($read != '') {
         $arr = explode("X", $read);
         $data = explode("|", $arr[0]);
         $date = date("Y-m-d H:i:s");
         echo $date." - ".$arr[0].PHP_EOL;

        // INSERT INTO PHP
$servername = "localhost";
$username = "Homestead";
$password = "Passw0rd";
$dbname = "HOMESTEAD";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error .PHP_EOL;
}  else {

$sql = "INSERT INTO measurements (value,unit,type,date)
VALUES ($data[0], 1, 1, '$date')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully".PHP_EOL;
} else {
    echo "Error: " . $sql . PHP_EOL . $conn->error;
}

$sql = "INSERT INTO measurements (value,unit,type,date)
VALUES ($data[1], 3, 2, '$date')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully".PHP_EOL;
} else {
    echo "Error: " . $sql . PHP_EOL . $conn->error;
}


$conn->close();
}
    }

        sleep(5);
}

// If you want to change the configuration, the device must be closed
$serial->deviceClose();
