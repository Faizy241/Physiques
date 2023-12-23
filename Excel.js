import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Asset } from 'expo-asset';
import { FileSystem } from 'expo-file-system';
import { db } from './firebaseConfig'; // Import your Firebase configuration

const Excel = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load the CSV file as an Asset
        const csvAsset = Asset.fromModule(require('./assets/your-data.csv'));

        // Get the local URI of the CSV file
        const localUri = `${FileSystem.documentDirectory}/CarsData.csv`;

        // Download the CSV file from the Asset to the local file system
        await FileSystem.downloadAsync(csvAsset.uri, localUri);

        // Read the downloaded CSV file
        const csvData = await FileSystem.readAsStringAsync(localUri);

        // Parse the CSV data. Adjust this parsing logic as per your CSV format.
        const jsonData = parseCSVData(csvData);

        // Reference to the 'cars' collection in Firestore.
        const carsCollection = db.collection('cars');

        // Upload data to Firestore.
        for (const item of jsonData) {
          await carsCollection.add(item);
        }

        // Fetch data from Firestore.
        const snapshot = await carsCollection.get();

        const carData = [];
        snapshot.forEach((doc) => {
          carData.push({ id: doc.id, ...doc.data() });
        });

        // Set the data in the component state.
        setData(carData);
      } catch (error) {
        console.error('Error fetching or uploading data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Your Component Content</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Make: {item.make}</Text>
            <Text>Model: {item.model}</Text>
            {/* Add more fields as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default Excel;

// Function to parse CSV data (adjust this based on your CSV format).
function parseCSVData(csvData) {
  // Implement your CSV parsing logic here.
  // Example: Split CSV rows and extract values into an array of objects.
  const rows = csvData.split('\n');
  const jsonData = [];
  
  for (let i = 1; i < rows.length; i++) { // Assuming the first row is headers.
    const columns = rows[i].split(',');
    const car = {
      make: columns[0],
      model: columns[1],
      variant: columns[2],
      // Add more fields as needed.
    };
    jsonData.push(car);
  }

  return jsonData;
}
