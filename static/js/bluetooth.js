
/* constant for the service UUID */
const service = 0x1825;
/* constant for the TX characteristic */
const TX_char =  '30ff6dae-fbfe-453b-8a99-9688fea23832';
let TX_characteristic;
/* constant for the RX characteristic */
const RX_char = 'fbdf3e86-c18c-4e5b-aace-e7cc03257f7c';
let RX_characteristic;
/* variable so we can tell if the device is connected */
var isConnected = 0;

/* variable for the device */
let device;
/* variable for the ble server */
let bleserver;
/* variable for the object transfer service */
let objservice;

/*
 * bluetooth()
 * Function for the web bluetooth functionality
 * this opens a popup window automatically that shows devices
 * and allows the user to select and pair.
 *
 * Author: Justin Bee
 */
function bluetooth(){

     if (!navigator.bluetooth) {
        return alert('Web Bluetooth API is not available in this browser. Please use chrome.');
     }
     const z = document.getElementById('debugger');

     if (z.style.display ==="none"){
         z.style.display = "block";
     }else{
     }
     
     z.innerHTML= z.innerHTML + "\n"+ ('Requesting Bluetooth Devices');
     navigator.bluetooth.requestDevice({
     filters:[{
     name: 'MicroTrynkit',
          }],
          optionalServices: [service]
    })
     .then(device=>{
     z.innerHTML = z.innerHTML + "\n"+  ("Connected to: ");
     z.innerHTML= z.innerHTML +"\n"+  (">Name:" + device.name);
     z.innerHTML= z.innerHTML + "\n"+ (">id:" + device.id);
     isConnected = 1;
     device = device;
     return device.gatt.connect();
     })
         .then(server=>{
             bleserver = server;
             return server.getPrimaryService(service);
         })
         .then(service => {
             return service.getCharacteristic(RX_char).then(characteristic => {
                 RX_characteristic = characteristic;
                 return service.getCharacteristic(TX_char);
             })
         })
         .then(characteristic => {
             TX_characteristic = characteristic;
             return service.getCharacteristic(TX_char);
         })
     .catch(error=> {
     z.innerHTML= z.innerHTML + "\n"+ (error);
     });
     }

/*
 * bleSend()
 * This function is to send files to the ESP32 device.
 * Is called by the send file button in the menu.
 *
 * Author: Justin Bee
 */
function bleSend() {
    /* check if the device is connected if true send file*/
    let encoder = new TextEncoder('utf-8');

    if(isConnected){
        /* get the contents of the editor that is in use */
        let editorContents = editor.getValue();
        console.log(editorContents);
        /* send the contents to the device */
        RX_characteristic.writeValue(encoder.encode(editorContents));
     }else{
        const x = document.getElementById('console');
        alert("MicroTrynkit device not connected. Please pair it first.");
     }


}

/*
 * bleConsole()
 * This function is to access the REPL of the ESP32 device.
 * Called by the console button in the menu.
 *
 * Author: Justin Bee
 */
function bleConsole(){
    const y = document.getElementById('serial')
    /* check if the device is connected if true send file*/
     if(isConnected){
         RX_characteristic.writeValue(encoder.encode('value'));
     }else{
         const x = document.getElementById('console');
         x.style.display ="none";
        alert("MicroTrynkit device not connected. Please pair it first.");
     }

}