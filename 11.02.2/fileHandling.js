import fs from 'fs';

const path = '11.02.2/data.csv';

let data = [];

function readData() {
  try {
    const fileContent = fs.readFileSync(path, 'utf8');
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    
    lines.forEach(line => {
      if (line.startsWith('id,')) {
        return;
      }
      const [id, name, type, level, hp] = line.split(',');
      data.push({ id, name, type, level: parseInt(level, 10), hp: parseInt(hp, 10) });
    });

  } catch (error) {
    console.error('Error reading the file:', error);
  }
}

readData();

function dataToJSON() {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('11.02.2/data.json', jsonData, 'utf8');
    console.log('Data written to JSON file successfully.');
  } catch (error) {
    console.error('Error writing to JSON file:', error);
  }
}

dataToJSON();

console.log('Data read successfully:');