// src/pages/BookingDetailsForm.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ServiceInfo from "../components/ServiceInfo";

const BookingDetailsForm = ({ collegeName, selectedSlot, selectedType, onSubmit }) => {
  const [selectedMode, setSelectedMode] = useState(selectedType || "");
  const [selectedService, setSelectedService] = useState("");

  const translations = {
    yourBasicDetails: "Your Basic Details / आपका बुनियादी विवरण",
    pleaseFillDetails: "Please fill your details carefully / कृपया अपना विवरण ध्यान से भरें",
    selectService: "Select Service * / सेवा चुनें *",
    newAppointment: "New Appointment / नया अपॉइंटमेंट",
    orderMedicine: "Order Medicine / दवाई का ऑर्डर",
    fullName: "Full Name * / पूरा नाम *",
    mobileNumber: "Mobile Number * / मोबाइल नंबर *",
    emailAddress: "Email Address (Optional) / ईमेल पता (वैकल्पिक)",
    consultationMode: "Consultation Mode * / परामर्श का तरीका *",
    enterFullName: "Enter your full name / अपना पूरा नाम दर्ज करें",
    tenDigitNumber: "10-digit number / 10-अंकीय नंबर",
    emailPlaceholder: "example@mail.com / उदाहरण@मेल.कॉम",
    online: "Online / ऑनलाइन",
    offline: "Offline / ऑफलाइन",
    continue: "Continue → / जारी रखें →",
    verify: "Verify → / सत्यापित करें →",
    onlyLettersSpaces: "Only letters and spaces allowed / केवल अक्षर और रिक्त स्थान अनुमत हैं",
    validFullName: "Please enter a valid full name / कृपया एक वैध पूरा नाम दर्ज करें",
    nameRequired: "Name is required / नाम आवश्यक है",
    validIndianNumber: "Must be a valid 10-digit Indian number / एक वैध 10-अंकीय भारतीय नंबर होना चाहिए",
    phoneRequired: "Phone number is required / फोन नंबर आवश्यक है",
    invalidEmail: "Invalid Email / अमान्य ईमेल",
    chooseService: "Please select a service type / कृपया एक सेवा प्रकार चुनें",
    chooseConsultation: "Please choose Online or Offline consultation / कृपया ऑनलाइन या ऑफलाइन परामर्श चुनें",
    verifyingDetails: "Verifying your details... / आपका विवरण सत्यापित किया जा रहा है...",
    serviceText:
      "Naiminath Homoeopathic Hospital provides natural healing through classical homeopathy. Expert physicians offer personalized treatments for acute and chronic conditions using safe, gentle remedies. / नैमिनाथ होम्योपैथिक अस्पताल शास्त्रीय होम्योपैथी के माध्यम से प्राकृतिक उपचार प्रदान करता है। विशेषज्ञ चिकित्सक सुरक्षित, सौम्य उपचारों का उपयोग करके तीव्र और पुरानी स्थितियों के लिए व्यक्तिगत उपचार प्रदान करते हैं।",
  };

  const formik = useFormik({
    initialValues: { name: "", phone: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]+$/, translations.onlyLettersSpaces)
        .min(3, translations.validFullName)
        .required(translations.nameRequired),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, translations.validIndianNumber)
        .required(translations.phoneRequired),
      email: Yup.string().email(translations.invalidEmail).notRequired(),
    }),
    onSubmit: async (values) => {
      if (!selectedService) return alert(translations.chooseService);

      if (selectedService === "appointment" && !selectedMode)
        return alert(translations.chooseConsultation);

      if (selectedService === "medicine") {
        alert(translations.verifyingDetails);
        await new Promise((r) => setTimeout(r, 1000));
        window.location.href = "/order/order-medicine";
        return;
      }

      onSubmit({ ...values, selectedType: selectedMode });
    },
  });

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (service === "medicine") setSelectedMode("");
  };

  const getSubmitButtonText = () =>
    selectedService === "medicine" ? translations.verify : translations.continue;

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row overflow-hidden">
        {/* ✅ Left Section */}
        <div className="w-full lg:w-[40%] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <ServiceInfo textData={translations.serviceText} />
        </div>

        {/* ✅ Right Section */}
        <div className="w-full lg:flex-1 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-start">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight text-center lg:text-left">
            {translations.yourBasicDetails}
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center lg:text-left">
            {translations.pleaseFillDetails}
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5">
            {/* Service Selection */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2 text-center lg:text-left">
                {translations.selectService}
              </p>
              <div className="flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleServiceSelect("appointment")}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition border-b sm:border-b-0 sm:border-r border-gray-300 ${
                    selectedService === "appointment"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {translations.newAppointment}
                </button>
                <button
                  type="button"
                  onClick={() => handleServiceSelect("medicine")}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition ${
                    selectedService === "medicine"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {translations.orderMedicine}
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.fullName}
              </label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.enterFullName}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.mobileNumber}
              </label>
              <div className="mt-1 flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-3 sm:px-4 py-3 bg-gray-100 border-r text-gray-700 text-sm font-medium">
                  +91
                </span>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  maxLength="10"
                  className="flex-1 px-3 sm:px-4 py-3 text-sm outline-none"
                  placeholder={translations.tenDigitNumber}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-800">
                {translations.emailAddress}
              </label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Consultation Mode */}
            {selectedService === "appointment" && (
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2 text-center lg:text-left">
                  {translations.consultationMode}
                </p>
                <div className="flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedMode("Online")}
                    className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition border-b sm:border-b-0 sm:border-r border-gray-300 ${
                      selectedMode === "Online"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {translations.online}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMode("Offline")}
                    className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition ${
                      selectedMode === "Offline"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {translations.offline}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition shadow-md mt-4"
            >
              {getSubmitButtonText()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
