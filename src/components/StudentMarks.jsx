import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logo from '../assets/image/logo.png'; // path to the logo image

const StudentMarks = () => {
  const [students, setStudents] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [marks, setMarks] = useState("");
  const [section, setSection] = useState("B");

  // nextRollNumber is now a constant value
  const nextRollNumber = "23011556-";

  const handleAddStudent = () => {
    if (marks && studentCode.length === 3) {
      const fullRoll = nextRollNumber.toString() + studentCode;
      setStudents([...students, { rollNumber: fullRoll, marks, section }]);
      setStudentCode("");
      setMarks("");
      setSection("A");
    } else {
      alert("Please enter a 3-digit student code.");
    }
  };

  const exportToExcel = () => {
    const formattedData = students.map(({ rollNumber, marks, section }) => ({
      "Student ID": rollNumber,
      Marks: marks,
      Section: section,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Marks");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, "Student_Marks_B(Section).xlsx");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="flex space-x-8 w-full max-w-7xl">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg animate-fadeIn">
          <div className="mb-6 flex justify-center">
            <img src={logo} alt="University of Gujrat Logo" className="h-20 w-auto" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
            📋 Student Marks Entry
          </h2>

          {/* 1. Disabled Roll Number */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">Base Roll Number</label>
            <input
              type="text"
              value={nextRollNumber}
              disabled
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* 2. 3-Digit Student Code */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">Student Code (3-digit)</label>
            <input
              type="text"
              placeholder="e.g. 101"
              value={studentCode}
              maxLength={3}
              onChange={(e) => setStudentCode(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200"
            />
          </div>

          {/* 3. Marks Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">Marks</label>
            <input
              type="number"
              placeholder="Enter Marks"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
            />
          </div>

          {/* 4. Section Selector */}
          <div className="mb-6">
            <label className="block font-medium mb-1 text-gray-700">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleAddStudent}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              ➕ Add
            </button>
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              📥 Export to Excel
            </button>
          </div>
        </div>

        {/* Student List Section */}
        <div className="w-full max-w-md">
          {students.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-2 text-white">Student List</h3>
              <ul className="space-y-4">
                {students.map((student, index) => (
                    <li
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg border border-gray-300 flex justify-between hover:bg-gray-200 transition-all duration-300 transform hover:translate-x-2 w-[800px]" // Added width and max-width
                    >
                    <span>Roll #: <strong>{student.rollNumber}</strong></span>
                    <span>Marks: <strong>{student.marks}</strong></span>
                    <span>Section: <strong>{student.section}</strong></span>
                    </li>
                ))}
               </ul>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;
