import React from "react";

const StudentGuardianInfo: React.FC = () => {
  // Example guardian data
  const guardian = {
    name: "Jane Doe",
    relationship: "Mother",
    phone: "+234 802 345 6789",
    email: "jane.doe@guardian.com",
    address: "123 Guardian Lane, Lagos, Nigeria",
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Guardian Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Guardian Details */}
        <div>
          <h2 className="font-bold text-gray-700">Guardian Details</h2>
          <p>
            <strong>Name:</strong> {guardian.name}
          </p>
          <p>
            <strong>Relationship:</strong> {guardian.relationship}
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="font-bold text-gray-700">Contact Information</h2>
          <p>
            <strong>Phone:</strong> {guardian.phone}
          </p>
          <p>
            <strong>Email:</strong> {guardian.email}
          </p>
          <p>
            <strong>Address:</strong> {guardian.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentGuardianInfo;
