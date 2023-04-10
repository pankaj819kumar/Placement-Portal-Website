// excel file download
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const downloadAsExcel = (data, desiredFields) => {
    console.log(data);
    if (!data || data.length === 0) {
      console.error('No data to export.');
      return;
    }
    const newArray = data.map(obj =>
      desiredFields.reduce((acc, field) => {
        acc[field] = obj[field];
        return acc;
      }, {})
    );
    data = newArray;
    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet['!cols'] = Object.keys(data[0]).map(() => ({ width: 20 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'data.xlsx');
}

export default downloadAsExcel;