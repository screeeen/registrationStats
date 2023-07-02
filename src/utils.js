import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const convertToXLS = (data) => {
  console.log('to export', data);
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      first_name: item.data.first_name,
      last_name: item.data.last_name,
      birthdate: item.data.birthdate,
      experience: item.data.years_skating,
      country: item.data.country,
      music: item.data.music,
      participated_in_omarisquino: item.data.participated_in_omarisquino,
      skateboarding_classes: item.data.skateboarding_classes,
      sponsors: item.data.sponsors,
      under_18: item.data.under_18,
      //   tutor_name: item.data.tutor_name,
      //   tutor_lastname: item.data.tutor_lastname,
      //   tutor_phone: item.data.tutor_phone,
      email: item.data.email,
    })),
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const xlsFile = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

  const fileBuffer = new ArrayBuffer(xlsFile.length);
  const fileView = new Uint8Array(fileBuffer);
  for (let i = 0; i < xlsFile.length; i++) {
    fileView[i] = xlsFile.charCodeAt(i) & 0xff;
  }

  const blob = new Blob([fileBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'data.xlsx');
};
