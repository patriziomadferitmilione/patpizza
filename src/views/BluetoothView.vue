<template>
    <div>
      <button @click="fetchDevices">Fetch Devices</button>
      <button @click="triggerSpeaker">Trigger Speaker</button>
      <!-- Display device list and other relevant information -->
      <ul>
        <li v-for="device in devices" :key="device.id">
          {{ device.name }} - {{ device.id }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'BluetoothComponent',
    setup() {
      const devices = ref([]);
  
      // Fetch Bluetooth devices
      const fetchDevices = async () => {
        try {
          const devices = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
          });
          // Extract relevant information from the devices
          const deviceList = devices.map(device => ({
            name: device.name,
            id: device.id,
            address: device.address,
            uuid: device.uuids[0],
            // Add any other desired properties
          }));
          // Update devices ref
          devices.value = deviceList;
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      // Trigger the Bluetooth speaker
      const triggerSpeaker = async () => {
        try {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['audio_sink'] }],
          });
  
          const server = await device.gatt.connect();
  
          // Access the primary service
          const service = await server.getPrimaryService('audio_sink');
          console.log('Service:', service);
  
          // Access the characteristic for triggering the speaker
          const characteristic = await service.getCharacteristic('trigger_characteristic');
          console.log('Characteristic:', characteristic);
  
          // Read characteristic value
          const value = await characteristic.readValue();
          console.log('Value:', value);
  
          // Write characteristic value
          const newValue = new Uint8Array([0x01]);
          await characteristic.writeValue(newValue);
          console.log('Value written successfully');
  
          // Subscribe to characteristic value changes
          characteristic.addEventListener('characteristicvaluechanged', (event) => {
            const value = event.target.value;
            console.log('New value:', value);
          });
  
          characteristic.startNotifications()
            .then(() => {
              console.log('Subscribed to characteristic value changes');
            })
            .catch((error) => {
              console.error('Error:', error);
            });
  
          await server.disconnect();
  
          console.log('Speaker triggered successfully');
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      return {
        devices,
        fetchDevices,
        triggerSpeaker,
      };
    },
  };
  </script>