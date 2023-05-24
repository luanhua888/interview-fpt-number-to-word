import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalChangeNumber from "../../Modal/ModalChangeNumber/ModalChangeNumber";
import NumberToWords from "../../components/NumberToWords";

function ChangePage() {
  // validate number
  const validationSchema = Yup.object().shape({
    number: Yup.number()
      .typeError("Vui lòng nhập một số")
      .required("Vui lòng nhập số")
      .min(0, "Số phải lớn hơn hoặc bằng 0")
      .max(999, "Số phải nhỏ hơn hoặc bằng 999"),
  });

  // convert number to words
  const [number, setNumber] = useState();
  const [words, setWords] = useState("");

  const convertToWords = (number) => {
    const units = [
      "",
      "một ",
      "hai ",
      "ba ",
      "bốn ",
      "năm ",
      "sáu ",
      "bảy ",
      "tám ",
      "chín ",
    ];
    const teens = [
      "mười ",
      "mười một ",
      "mười hai ",
      "mười ba ",
      "mười bốn ",
      "mười năm ",
      "mười sáu ",
      "mười bảy ",
      "mười tám ",
      "mười chín ",
    ];
    const tens = [
      "",
      "",
      "hai mươi ",
      "ba mươi ",
      "bốn mươi ",
      "năm mươi ",
      "sáu mươi ",
      "bảy mươi ",
      "tám mươi ",
      "chín mươi ",
    ];

    const getResult = () => {
      let result = "";
      if (number < 0 || number > 999999999) {
        return "Số không hợp lệ!";
      }

      const ones = Math.floor(number % 10);
      const tensDigit = Math.floor((number / 10) % 10);
      const hundreds = Math.floor((number / 100) % 10);
      const thousands = Math.floor((number / 1000) % 1000);
      const millions = Math.floor(number / 1000000);

      if (millions > 0) {
        result += convertToWords(millions) + "triệu ";
      }
      if (thousands > 0) {
        result += convertToWords(thousands) + "nghìn ";
      }
      if (hundreds > 0) {
        result += units[hundreds] + "trăm ";
        if (tensDigit === 0 && ones > 0) {
          result += "linh ";
        }
      }
      if (tensDigit > 0) {
        if (tensDigit === 1 && ones > 0) {
          result += teens[ones];
        } else {
          result += tens[tensDigit];
          if (ones > 0) {
            result += "";
          }
        }
      }
      if (ones > 0 && tensDigit !== 1) {
        result += units[ones];
      }

      return result;
    };

    if (number === 0) {
      return "không";
    }

    return getResult().trim();
  };

  const initialValues = {
    number: "",
  };

  const handleSubmit = (values) => {
    const result = convertToWords(values.number);
    setNumber(values.number);
    console.log(result);
    setWords(result);
    openModal();
  };

  // display modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // style modal
  const customStyles = {
    content: {
      maxWidth: "90%",
      maxHeight: "80vh",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#5b6b54",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#5b6b54] p-8 rounded-lg w-1/2 md:w-2/3 lg:w-1/3">
        <h1 className="font-sans font-bold text-4xl text-[#eae8db] mb-4">
          CHUYỂN ĐỔI TỪ SỐ THÀNH CHỮ
        </h1>
        <h1 className="font-sans font-bold text-4xl text-[#eae8db] mb-4">
          <NumberToWords number={number} />
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <div className="flex justify-center">
                <ErrorMessage
                  name="number"
                  component="div"
                  className="text-[#f9fdc4] flex items-center justify-center"
                />
              </div>
              <Field
                className="w-full bg-[#858652] p-2 rounded-sm cursor-pointer text-white
            
              placeholder-[#f9fdc4] 
                "
                type="number"
                id="number"
                name="number"
                placeholder="Nhập số bạn muốn chuyển thành chữ (0-999)"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-[#d2cdb0] p-2 mt-1 rounded-md w-3/4 md:w-1/2
                hover:bg-[#eae8db] transition duration-500 ease-in-out
                "
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        <ModalChangeNumber
          isOpen={modalIsOpen}
          closeModal={closeModal}
          content="This is the modal content."
          customStyles={customStyles}
          number={words}
        />
      </div>
    </div>
  );
}

export default ChangePage;
