export const inputStructure = {
    user: [
      {
        id: "fname",
        label: "First Name",
        type: "text",
        required: true,
      },
      {
        id: "lname",
        label: "Last Name",
        type: "text",
        required: true,
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        required: false
      },
      {
        id: "contact1",
        label: "Contact No 1",
        type: "number",
        required: false
      },
      {
        id: "contact2",
        label: "Contact No 2",
        type: "number",
        required: false
      },
      {
        id: "contact3",
        label: "Contact No 3",
        type: "number",
        required: false
      },
      {
        id: "pan",
        label: "PAN Number",
        type: "text",
        required: false
      },
      {
        id: "sbn",
        label: "SBN",
        type: "number",
        required: true,
      },
      {
        id: "beneficiary1",
        label: "Beneficiary 1",
        type: "text",
        required: false
      },
      {
        id: "beneficiary2",
        label: "Beneficiary 2",
        type: "text",
        required: false
      },
      {
        id: "address",
        label: "Address",
        type: "text",
        required: false
      },
    ],
    donations: [
      {
        id: "purpose",
        label: "Purpose",
        type: "text",
        required: false
      },
      {
        id: "amount",
        label: "Donation Amount",
        type: "number",
        required: false
      },
      {
        id: "paymentMode",
        label: "Payment Mode",
        type: "select",
        required: false
      },
      {
        id: "date",
        label: "Date",
        type: "date",
        required: false
      },
      {
        id: "receipt",
        label: "Receipt Number",
        type: "text",
        required: false
      },
    ],
  };