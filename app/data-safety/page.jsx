import React from "react";

const DataDeletion = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Request Data Deletion
        </h1>
        <p className="text-gray-600 mb-6">
          We take your privacy seriously. If you want to delete your account and
          associated data, please follow the instructions below.
        </p>

        <div className="text-left mb-6">
          <h2 className="text-xl font-semibold mb-2">
            How to Request Data Deletion:
          </h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>
              Email us at{" "}
              <a
                href="mailto:support@yourdomain.com"
                className="text-blue-600 hover:underline">
                pratikpp2302@gmail.com
              </a>
            </li>
            <li>Include your registered email address in the request.</li>
            <li>We will process your request within 7 business days.</li>
          </ol>
        </div>

        <div className="border-t border-gray-300 my-6" />

        <p className="text-sm text-gray-500">
          If you have any questions, feel free to contact us at the email above.
        </p>
      </div>
    </div>
  );
};

export default DataDeletion;
