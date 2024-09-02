import Papa from 'papaparse';

export function handleFileUpload(event, setSteps) {
  const file = event.target.files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (fileExtension === 'json') {
    // Handle JSON file
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const json = JSON.parse(event.target.result);
        if (Array.isArray(json)) {
          setSteps(json);
        } else {
          console.error('Invalid JSON format: Expected an array of steps.');
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  } else if (fileExtension === 'csv') {
    // Handle CSV file
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        const importedSteps = results.data.map((row, index) => ({
          title: row['Title'] || `Step ${index + 1}`,
          description: row['Step Description'],
          items: JSON.parse(row['Inventory Items']),
          location: row['Map Location']
        }));
        setSteps(importedSteps);
      }
    });
  } else {
    console.error('Unsupported file format. Please upload a JSON or CSV file.');
  }
}

export function handleDownloadCSV(steps) {
  const csvData = steps.map(step => ({
    'Title': step.title,
    'Step Description': step.description,
    'Inventory Items': JSON.stringify(step.items),
    'Map Location': step.location
  }));
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'plan.csv');
  link.click();
}
