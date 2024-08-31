import Papa from 'papaparse';

export function handleFileUpload(event, setSteps) {
  const file = event.target.files[0];
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
