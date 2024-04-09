export const exportToCsv = (filename, data) => {
  const csvContent = "data:text/csv;charset=utf-8,\n" + data;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const convertToCsv = (data, delimiter = ",") => {
  let csvData = [
    [
      "fname",
      "lname",
      "sbn",
      "beneficiary 1",
      "beneficiary 2",
      "contact 1",
      "contact 2",
      "contact 3",
      "email",
      "pan",
      "address",
      "amount 1",
      "date 1",
      "paymentMode 1",
      "purpose 1",
      "receipt 1",
      "amount 2",
      "date 2",
      "paymentMode 2",
      "purpose 2",
      "receipt 2",
    ],
  ];
  for (let i = 0; i < data.length; i++) {
    // if(data[i].isDeleted) {
    //   console.log(data[i].isDeleted)
    //   continue;
    // }
    let row = `"${data[i].fname}","${data[i].lname}","${data[i].sbn}","${data[i].beneficiary1}","${data[i].beneficiary2}","${data[i].contact1}","${data[i].contact2}","${data[i].contact3}","${data[i].email}","${data[i].pan}","${data[i].address}"`;
    for (let j = 0; j < data[i].donations.length; j++) {
      row += `,"${data[i].donations[j].amount}","${data[i].donations[j].date}","${data[i].donations[j].paymentMode}","${data[i].donations[j].purpose}","${data[i].donations[j].receipt}"`;
    }
    console.log(row);
    csvData.push(row);
  }
  return csvData.join("\n");
};

export const reload = async (db) => {
  await db.close();
  location.reload(true);
};
