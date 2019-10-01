const mySoundModelURL = 'https://storage.googleapis.com/teachable-machine-pubilshed-models/dc109011-dd0c-41c9-966b-fc7316154b41/model.json';
let mySoundModel;
let resultDiv;
let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14101'; // fill in your serial port name here
let outByte = 0;                       // for outgoing data

function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL);
}

function setup() {
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  mySoundModel.classify(gotResults);
}

// function printList(portList) {
//  // portList is an array of serial port names
//  for (var i = 0; i < portList.length; i++) {
//  // Display the list the console:
//  println(i + " " + portList[i]);
//  }
// }

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    console.log(results);
    //resultDiv.html('Result is: ' + results[0].label + ' with confidence ' + results[0].confidence);

    
    chart.data.datasets[0].data[0] = 0;//this update the value of may
    chart.update();

    switch (results[0].label){
      case 'open':{
        if(results[0].confidence > 0.5){
          outByte = 255;
          console.log('outByte: ', outByte);
          serial.write(outByte);
        }
        
        chart.data.datasets[0].data[1] = results[0].confidence;

        if (results[1].label == 'close'){
          chart.data.datasets[0].data[2] = results[1].confidence;
          chart.data.datasets[0].data[0] = 1-results[0].confidence-results[1].confidence;
        }else{
          chart.data.datasets[0].data[0] = results[1].confidence;
          chart.data.datasets[0].data[2] = 1-results[0].confidence-results[1].confidence;
        }
        break;
      }
      case 'close':{
        if(results[0].confidence > 0.5){
          outByte = 123;
          console.log('outByte: ', outByte);
          serial.write(outByte);
        }
        chart.data.datasets[0].data[2] = results[0].confidence;
        if (results[1].label == 'open'){
          chart.data.datasets[0].data[1] = results[1].confidence;
          chart.data.datasets[0].data[0] = 1-results[0].confidence-results[1].confidence;
        }else{
          chart.data.datasets[0].data[0] = results[1].confidence;
          chart.data.datasets[0].data[1] = 1-results[0].confidence-results[1].confidence;
        }
        break;
      }
      default:{
        chart.data.datasets[0].data[0] = results[0].confidence;
        if (results[1].label == 'open'){
          chart.data.datasets[0].data[1] = results[1].confidence;
          chart.data.datasets[0].data[2] = 1-results[0].confidence-results[1].confidence;
        }else{
          chart.data.datasets[0].data[2] = results[1].confidence;
          chart.data.datasets[0].data[1] = 1-results[0].confidence-results[1].confidence;
        }
        break;
      }
    }
    
    chart.update();
  }
}


