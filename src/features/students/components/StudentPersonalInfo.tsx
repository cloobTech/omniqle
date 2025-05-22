import React from "react";

const StudentPersonalInfo: React.FC = () => {
  // Example student data
  const student = {
    firstName: "John",
    middleName: "Michael",
    lastName: "Doe",
    dateOfBirth: "2008-05-15",
    gender: "Male",
    schoolId: "SCH12345",
    stateOfOrigin: "Lagos",
    localGovernment: "Ikeja",
    class: "JSS 1A",
    contact: {
      phone: "+234 812 345 6789",
      email: "john.doe@student.com",
    },
    address: "123 School Lane, Lagos, Nigeria",
  };

  return (
    <div className="bg-white p-4 ">
      <h1 className="text-xl font-bold mb-4">Student Personal Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Basic Information */}
        <div>
          <h2 className="font-bold text-gray-700">Basic Information</h2>
          <p>
            <strong>First Name:</strong> {student.firstName}
          </p>
          <p>
            <strong>Middle Name:</strong> {student.middleName}
          </p>
          <p>
            <strong>Last Name:</strong> {student.lastName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dateOfBirth}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
          <p>
            <strong>School ID:</strong> {student.schoolId}
          </p>
        </div>

        {/* Location Information */}
        <div>
          <h2 className="font-bold text-gray-700">Location Information</h2>
          <p>
            <strong>State of Origin:</strong> {student.stateOfOrigin}
          </p>
          <p>
            <strong>Local Government:</strong> {student.localGovernment}
          </p>
          <p>
            <strong>Address:</strong> {student.address}
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="font-bold text-gray-700">Contact Information</h2>
          <p>
            <strong>Phone:</strong> {student.contact.phone}
          </p>
          <p>
            <strong>Email:</strong> {student.contact.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentPersonalInfo;
