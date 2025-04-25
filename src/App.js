import React, { useEffect, useState } from "react";
import "./App.css"; 




const getDoctors = async () => {
  return [
    {
      id: 1,
      name: "Dr. Suchismita Acharya",
      specialty: ["Cardiology", "General Medicine"],
      consultationType: "Online",
      fee: 50,
      experience: 12,
    },


    {
      id: 2,
      name: "Dr. Suchi Acharya",
      specialty: ["Neurology"],
      consultationType: "In-person",
      fee: 75,
      experience: 8,
    },
    {
      id: 3,
      name: "Dr. Praveen Kumar",
      specialty: ["Dermatology", "General Medicine"],
      consultationType: "Online",
      fee: 65,
      experience: 10,
    },


    
    {
      id: 4,
      name: "Dr. David Brown",
      specialty: ["Orthopedics"],
      consultationType: "In-person",
      fee: 60,
      experience: 15,
    },
    {
      id: 5,
      name: "Dr. Walter White",
      specialty: ["Pediatrics", "General Medicine"],
      consultationType: "Online",
      fee: 40,
      experience: 6,
    },
    {
      id: 6,
      name: "Dr. Jesse Pinkman",
      specialty: ["Psychiatry"],
      consultationType: "In-person",
      fee: 85,
      experience: 20,
    },
    {
      id: 7,
      name: "Dr. George Turner",
      specialty: ["Cardiology", "General Medicine"],
      consultationType: "Online",
      fee: 55,
      experience: 9,
    },
    {
      id: 8,
      name: "Dr. Hannah Montana",
      specialty: ["Dermatology"],
      consultationType: "In-person",
      fee: 70,
      experience: 11,
    },
    {
      id: 9,
      name: "Dr. Ian Mitchell",
      specialty: ["Neurology"],
      consultationType: "Online",
      fee: 95,
      experience: 18,
    },
    {
      id: 10,
      name: "Dr. Julia Adams",
      specialty: ["Endocrinology", "General Medicine"],
      consultationType: "In-person",
      fee: 80,
      experience: 14,
    },
  ];
};

function App() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const availableSpecialties = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Psychiatry",
    "Endocrinology",
    "General Medicine",
  ];

  useEffect(() => {
    getDoctors().then(setDoctors);
  }, []);

  const toggleSpecialty = (spec) => {
    setSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const filteredDoctors = doctors
    .filter((doc) => doc.name.toLowerCase().includes(search.toLowerCase()))
    .filter((doc) =>
      consultationType ? doc.consultationType === consultationType : true
    )
    .filter((doc) =>
      specialties.length > 0
        ? specialties.every((s) => doc.specialty.includes(s))
        : true
    )
    .sort((a, b) => {
      if (sortOption === "fee") return a.fee - b.fee;
      if (sortOption === "experience") return b.experience - a.experience;
      return 0;
    });

  const handleBookAppointment = (doctorName) => {
    alert(`Appointment booked with  ${doctorName}`);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Filters</h2>
        <div className="filter">
          <label>Consultation Type</label>
          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Online">Online</option>
            <option value="In-person">In-person</option>
          </select>
        </div>

        <div className="filter">
          <label>Specialties</label>
          {availableSpecialties.map((spec) => (
            <div key={spec}>
              <input
                type="checkbox"
                checked={specialties.includes(spec)}
                onChange={() => toggleSpecialty(spec)}
              />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        <div className="filter">
          <label>Sort By</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="fee">Fee (Low to High)</option>
            <option value="experience">Experience (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="main">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />

        <div className="doctor-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div key={doc.id} className="doctor-card">
                <h3>{doc.name}</h3>
                <p><strong>Specialties:</strong> {doc.specialty.join(", ")}</p>
                <p><strong>Consultation:</strong> {doc.consultationType}</p>
                <p><strong>Fee:</strong> ${doc.fee}</p>
                <p><strong>Experience:</strong> {doc.experience} years</p>
                <button 
                  onClick={() => handleBookAppointment(doc.name)} 
                  className="book-appointment-btn"
                >
                  Book Appointment
                </button>
              </div>
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
