<template>
    <div>
      <button @click="fetchDevices">Fetch Devices</button>
      <button @click="triggerSpeaker">Trigger Speaker</button>
      <!-- Display device list and other relevant information -->
      <ul>
        <li v-for="device in devices" :key="device.id">
          <div>
            <strong>Name:</strong> {{ device.name }}
          </div>
          <div>
            <strong>Address:</strong> {{ device.address }}
          </div>
          <div>
            <strong>Manufacturer:</strong> {{ device.manufacturerName }}
          </div>
          <div>
            <strong>Product Name:</strong> {{ device.productName }}
          </div>
          <div>
            <strong>UUIDs:</strong>
            <ul>
              <li v-for="uuid in device.uuids" :key="uuid">{{ uuid }}</li>
            </ul>
          </div>
          <!-- Add any other desired properties from the device object -->
          <div>
            <strong>Services:</strong>
            <ul>
              <li v-for="service in device.services" :key="service.uuid">
                {{ service.uuid }}
                <ul>
                  <li v-for="characteristic in service.characteristics" :key="characteristic.uuid">
                    {{ characteristic.uuid }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'BluetoothView',
    setup() {
      const devices = ref([]);
  
      // Fetch Bluetooth devices
      const fetchDevices = async () => {
        try {
          const devices = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
          });
          // Extract relevant information from the devices
          const deviceList = devices.map(async device => {
            // Get primary services
            const services = await device.getPrimaryServices();
  
            // Extract characteristic information for each service
            const serviceList = await Promise.all(
              services.map(async service => {
                const characteristics = await service.getCharacteristics();
                return {
                  uuid: service.uuid,
                  characteristics: characteristics.map(c => ({ uuid: c.uuid })),
                };
              })
            );
  
            // Return device information including services and characteristics
            return {
              name: device.name,
              address: device.address,
              manufacturerName: device.manufacturerName,
              productName: device.productName,
              uuids: device.uuids,
              services: serviceList,
            };
          });
          // Update devices ref
          devices.value = await Promise.all(deviceList);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      // Trigger the Bluetooth speaker
      const triggerSpeaker = async () => {
        // Your existing triggerSpeaker code here
      };
  
      return {
        devices,
        fetchDevices,
        triggerSpeaker,
      };
    },
  };
  </script>