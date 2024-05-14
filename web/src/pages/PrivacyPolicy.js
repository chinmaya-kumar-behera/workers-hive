import React from "react";
import Navbar from "../views/navbar/Navbar";
import Footer from "../views/footer/Footer";

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to Workers Hive's Privacy Policy page. This section outlines
          how we collect, use, and protect your personal information when you
          use our website and services. Please read this privacy policy
          carefully to understand our practices regarding your personal data.
        </p>
        <h3 className="text-2xl font-semibold mb-4">
          1. Information Collection and Use
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Workers Hive may collect personal information from you when you use
          our website or services. This information may include your name, email
          address, contact information, and other details necessary for
          providing our services.
        </p>
        <h3 className="text-2xl font-semibold mb-4">
          2. Use of Personal Information
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          We may use the personal information collected from you to provide,
          maintain, and improve our services, as well as to communicate with you
          about your account and our offerings. We may also use this information
          to personalize your experience and to send you promotional messages
          and marketing materials.
        </p>
        <h3 className="text-2xl font-semibold mb-4">
          3. Information Sharing and Disclosure
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Workers Hive does not sell, trade, or rent your personal information
          to third parties. We may share your information with trusted
          third-party service providers who assist us in operating our website
          or providing our services, but only to the extent necessary for them
          to perform their functions.
        </p>
        {/* Include more sections as needed */}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PrivacyPolicy;
