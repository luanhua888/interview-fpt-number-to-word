function NumberToWords(number) {
  const ones = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const tens = [
    "",
    "mười",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];

  if (number === 0) {
    return "không";
  }

  let words = "";
  const hundreds = Math.floor(number / 100);
  const tensAndOnes = number % 100;

  if (hundreds > 0) {
    words += ones[hundreds] + " trăm";
  }

  if (tensAndOnes > 0) {
    if (hundreds > 0) {
      words += " ";
    }

    if (tensAndOnes < 10) {
      words += ones[tensAndOnes];
    } else if (tensAndOnes < 20) {
      words += "mười " + ones[tensAndOnes % 10];
    } else {
      const tensDigit = Math.floor(tensAndOnes / 10);
      const onesDigit = tensAndOnes % 10;
      words += tens[tensDigit] + " " + ones[onesDigit];
    }
  }

  return words;
}

export default NumberToWords;
