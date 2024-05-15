import React from "react";
import Navbar from "../views/navbar/Navbar";
import Footer from "../views/footer/Footer";

const TermsConditions = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-8">Terms and Conditions</h2>
        <p className="text-md lg:text-lg text-gray-700 mb-4">
          Welcome to Workers Hive's Terms and Conditions page. This section
          outlines the terms of use for our website and the services provided by
          Workers Hive. By accessing or using our website, you agree to abide by
          these terms and conditions. Please read them carefully before
          proceeding.
        </p>
        <h3 className="text-xl lg:text-2xl font-semibold mb-4">1. Agreement to Terms</h3>
        <p className="text-md lg:text-lg text-gray-700 mb-4">
          By accessing or using Workers Hive, you agree to be bound by these
          Terms and Conditions, our Privacy Policy, and all applicable laws and
          regulations. If you do not agree with any of these terms, you are
          prohibited from using or accessing this site.
        </p>
        <h3 className="text-xl lg:text-2xl font-semibold mb-4">2. Use of Services</h3>
        <p className="text-md lg:text-lg text-gray-700 mb-4">
          Workers Hive provides a platform for users to access information about
          various services, schedule appointments, and interact with service
          providers. You agree to use our services solely for lawful purposes
          and in accordance with these terms.
        </p>
        <h3 className="text-xl lg:text-2xl font-semibold mb-4">3. User Accounts</h3>
        <p className="text-md lg:text-lg text-gray-700 mb-4">
          To access certain features of Workers Hive, you may be required to
          create a user account. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default TermsConditions;
