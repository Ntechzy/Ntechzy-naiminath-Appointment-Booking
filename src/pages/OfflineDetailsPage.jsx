import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import BackButton from "../components/BackButton";
import OfflineCaseForm from "../components/offlineCaseForm/OfflineCaseForm";


export default function OfflineDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [formData, setFormData] = useState(null);

  const translations = {
    noDataFound: "No data found. / कोई डेटा नहीं मिला।",
    completeCaseInfo: "Complete Case Information / पूर्ण केस जानकारी",
    provideCaseDetails:
      "Please provide your case details before continuing. / कृपया जारी रखने से पहले अपनी केस जानकारी प्रदान करें।",
    continueToPayment: "Continue to Payment / भुगतान पर जारी रखें",
    pleaseCompleteForm:
      "Please complete the case form before proceeding to payment. / कृपया भुगतान के लिए आगे बढ़ने से पहले केस फॉर्म पूरा करें।",
  };

  if (!state)
    return <div className="p-8 text-center">{translations.noDataFound}</div>;

  const handleNext = () => {
    if (!isFormComplete) {
      alert(translations.pleaseCompleteForm);
      return;
    }
    navigate("/payment", { state: { ...state, formData } });
  };

  const handleFormComplete = (complete) => {
    setIsFormComplete(complete);
    console.log('Form completion status:', complete);
  };

  const handleFormSubmit = (submittedFormData) => {
    console.log('Form submitted with data:', submittedFormData);
    setFormData(submittedFormData);
    setIsFormComplete(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e6e2ff] via-[#d8f0ff] to-[#7ddfff] py-6 px-4 sm:px-6 lg:px-12">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
        {/* ✅ Appointment Summary Header */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3 text-center">
            Appointment Details / अपॉइंटमेंट विवरण
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Mode / तरीका</p>
              <p className="font-semibold text-gray-900">Offline</p>
            </div>

            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Date / तिथि</p>
              <p className="font-semibold text-gray-900">
                {state.selectedSlot?.dateFormatted || "Not Selected"}
              </p>
            </div>

            {/* Time Slot */}
            <div className="bg-white border border-blue-200 rounded-md p-3 shadow-sm">
              <p className="text-xs text-gray-500">Time Slot / समय</p>
              <p className="font-semibold text-gray-900">
                {state.selectedSlot?.time || "Not Selected"}
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Case Information Header */}
        <div className="mb-6 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-5 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 text-center">
            {translations.completeCaseInfo}
          </h2>
          <p className="text-sm text-gray-600 text-center">
            {translations.provideCaseDetails}
          </p>
        </div>

        {/* ✅ Essential Case Form */}
        <div className="mb-6">
          <OfflineCaseForm
            onFormComplete={handleFormComplete}
            onFormSubmit={handleFormSubmit}
            isFormComplete={isFormComplete}
          />
        </div>

        {/* ✅ Continue Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            disabled={!isFormComplete}
            className={`w-full max-w-xs py-3 rounded-md font-semibold transition
              ${
                isFormComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
          >
            {translations.continueToPayment}
          </button>
        </div>

        {/* ✅ Form Status Indicator */}
        <div className="mt-4 text-center">
          {isFormComplete ? (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Form Complete - Ready to Proceed / फॉर्म पूर्ण - आगे बढ़ने के लिए तैयार
            </div>
          ) : (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please Complete the Form Above / कृपया ऊपर दिया गया फॉर्म पूरा करें
            </div>
          )}
        </div>
      </div>
    </div>
  );
}