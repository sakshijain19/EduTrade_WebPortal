/* eslint-disable no-unused-vars */
import { React, useState } from 'react'
import { FiDownload, FiSearch } from 'react-icons/fi'


// Updated subjects for Computer Engineering
const computerEngineeringSubjects = [
  [
    "Engineering Mathematics-I",
    "Engineering Physics / Engineering Chemistry",
    "Systems in Mechanical Engineering",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Programming and Problem Solving / Engineering Mechanics"
  ],
  [
    "Engineering Mathematics-II",
    "Engineering Physics / Engineering Chemistry",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Programming and Problem Solving / Engineering Mechanics",
    "Engineering Graphics"
  ],
  [
    "Discrete Mathematics",
    "Fundamentals of Data Structures",
    "Object Oriented Programming (OOP)",
    "Computer Graphics",
    "Digital Electronics and Logic Design"
  ],
  [
    "Engineering Mathematics III",
    "Data Structures and Algorithms",
    "Software Engineering",
    "Microprocessor",
    "Principles of Programming Languages"
  ],
  [
    "Database Management Systems",
    "Theory of Computation",
    "Systems Programming and Operating System",
    "Computer Networks and Security",
    "Elective I - Internet of Things and Embedded Systems"
  ],
  [
    "Data Science and Big Data Analytics",
    "Web Technology",
    "Artificial Intelligence",
    "Cloud Computing"
  ],
  [
    "Design and Analysis of Algorithms",
    "Machine Learning",
    "Blockchain Technology",
    "Cyber Security and Digital Forensics",
    "Mobile Computing"
  ],
  [
    "High Performance Computing",
    "Deep Learning",
    "Natural Language Processing",
    "Elective-VI Business Intelligence"
  ]
]

// Updated subjects for Civil Engineering
const civilEngineeringSubjects = [
  [
    "Engineering Mathematics-I",
    "Engineering Physics / Engineering Chemistry",
    "Engineering Mechanics",
    "Basic Civil Engineering",
    "Basic Electrical and Electronics Engineering"
  ],
  [
    "Engineering Mathematics-II",
    "Engineering Geology",
    "Strength of Materials",
    "Fluid Mechanics",
    "Surveying"
  ],
  [
    "Engineering Mathematics-III",
    "Structural Analysis-I",
    "Geotechnical Engineering-I",
    "Concrete Technology",
    "Building Technology and Architectural Planning"
  ],
  [
    "Structural Analysis-II",
    "Geotechnical Engineering-II",
    "Environmental Engineering-I",
    "Transportation Engineering-I",
    "Hydrology and Water Resource Engineering"
  ],
  [
    "Design of Steel Structures",
    "Environmental Engineering-II",
    "Transportation Engineering-II",
    "Hydraulic Engineering",
    "Foundation Engineering"
  ],
  [
    "Advanced Structural Analysis",
    "Earthquake Engineering",
    "Construction Management",
    "Advanced Concrete Technology"
  ],
  [
    "Design of Reinforced Concrete Structures",
    "Traffic Engineering and Transport Planning",
    "Water and Wastewater Treatment",
    "Infrastructure Engineering"
  ],
  [
    "Advanced Construction Techniques",
    "Pavement Design",
    "Water Resource Planning and Management",
    "Sustainable Development"
  ]
]


const mechanicalEngineeringSubjects = [
  [
    "Engineering Mathematics-I",
    "Engineering Physics / Engineering Chemistry",
    "Systems in Mechanical Engineering",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Programming and Problem Solving / Engineering Mechanics"
  ],
  [
    "Engineering Mathematics-II",
    "Engineering Physics / Engineering Chemistry",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Programming and Problem Solving / Engineering Mechanics",
    "Engineering Graphics"
  ],
  [
    "Engineering Mathematics-III",
    "Thermodynamics",
    "Fluid Mechanics",
    "Manufacturing Processes",
    "Material Science and Metallurgy",
    "Strength of Materials"
  ],
  [
    "Engineering Mathematics-IV",
    "Applied Thermodynamics",
    "Heat Transfer",
    "Theory of Machines – I",
    "Numerical & Statistical Methods",
    "Electrical and Electronics Engineering"
  ],
  [
    "Design of Machine Elements - I",
    "Dynamics of Machinery",
    "Turbo Machines",
    "Metrology and Quality Control",
    "Advanced Manufacturing Processes"
  ],
  [
    "Design of Machine Elements - II",
    "Refrigeration and Air Conditioning",
    "Mechatronics",
    "Finite Element Analysis",
    "Industrial Engineering & Management"
  ],
  [
    "Computer Integrated Manufacturing",
    "Energy Engineering",
    "Mechanical System Design"
  ],
  [
    "Power Plant Engineering",
    "Industrial Fluid Power"
  ]
]

const electronicsSubjects = [
  [
    "Engineering Mathematics-I",
    "Engineering Physics / Engineering Chemistry",
    "Basic Electrical Engineering",
    "Basic Electronics Engineering",
    "Systems in Mechanical Engineering"
  ],
  [
    "Engineering Mathematics-II",
    "Engineering Physics / Engineering Chemistry",
    "Basic Civil and Environmental Engineering",
    "Engineering Graphics",
    "Programming and Problem Solving"
  ],
  [
    "Engineering Mathematics-III",
    "Electronic Devices & Circuits",
    "Network Theory",
    "Digital Electronics",
    "Data Structures"
  ],
  [
    "Signal Processing",
    "Control Systems",
    "Microcontrollers",
    "Analog Circuits",
    "Electromagnetic Field Theory"
  ],
  [
    "Digital Communication",
    "Microprocessors and Interfacing",
    "Embedded Systems",
    "Transmission Lines and Antennas",
    "Computer Networks"
  ],
  [
    "VLSI Design and Technology",
    "Wireless Communication",
    "Power Electronics",
    "Image Processing",
    "Instrumentation and Measurement"
  ],
  [
    "Internet of Things",
    "Mobile Communication",
    "Optical Fiber Communication",
    "RF and Microwave Engineering"
  ],
  [
    "Advanced Communication Systems",
    "Satellite Communication",
    "Artificial Intelligence and Machine Learning"
  ]
]

const aidsSubjects = [
  [
    "Engineering Mathematics-I",
    "Engineering Physics / Engineering Chemistry",
    "Programming and Problem Solving",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Engineering Mechanics"
  ],
  [
    "Engineering Mathematics-II",
    "Engineering Physics / Engineering Chemistry",
    "Basic Electrical Engineering / Basic Electronics Engineering",
    "Data Structures and Algorithms",
    "Engineering Graphics"
  ],
  [
    "Engineering Mathematics-III",
    "Database Management Systems",
    "Object Oriented Programming (OOP)",
    "Computer Networks",
    "Operating Systems"
  ],
  [
    "Engineering Mathematics-IV",
    "Data Mining and Warehousing",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning"
  ],
  [
    "Big Data Analytics",
    "Computer Vision",
    "Natural Language Processing",
    "Reinforcement Learning",
    "Cloud Computing"
  ],
  [
    "Internet of Things (IoT)",
    "Cyber Security",
    "Blockchain Technology",
    "Software Engineering and Agile Methodologies"
  ],
  [
    "High Performance Computing",
    "Advanced Machine Learning",
    "Neural Networks and Fuzzy Systems",
    "Robotic Process Automation"
  ],
  [
    "Ethical Hacking and Penetration Testing",
    "Bioinformatics",
    "Autonomous Systems",
    "Quantum Computing"
  ]
]


// Mock data for branches with subjects
const questionPapers = {
  "Civil Engineering": Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Semester ${i + 1}`,
    subjects: civilEngineeringSubjects[i].map((subject, j) => ({
      id: j + 1,
      name: subject,
      url: "#"
    }))
  })),
  "Computer Engineering": Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Semester ${i + 1}`,
    subjects: computerEngineeringSubjects[i].map((subject, j) => ({
      id: j + 1,
      name: subject,
      url: "#"
    }))
  })),
  "Mechanical Engineering": Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Semester ${i + 1}`,
    subjects: mechanicalEngineeringSubjects[i].map((subject, j) => ({
      id: j + 1,
      name: subject,
      url: "#"
    }))
  })),
  "Electronics and Telecommunication Engineering": Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Semester ${i + 1}`,
    subjects: electronicsSubjects[i].map((subject, j) => ({
      id: j + 1,
      name: subject,
      url: "#"
    }))
  })),
  "Artificial Intelligence and Data Science": Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Semester ${i + 1}`,
    subjects: aidsSubjects[i].map((subject, j) => ({
      id: j + 1,
      name: subject,
      url: "#"
    }))
  }))
};

export default function PYQComponent() {
  const [selectedBranch, setSelectedBranch] = useState("Computer Engineering");
  const [selectedSemester, setSelectedSemester] = useState(
    questionPapers["Computer Engineering"][0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = selectedSemester
    ? selectedSemester.subjects.filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDownload = (subject) => {
    const formattedSubject = subject.name.replace(/\s+/g, '%20');
    const branch = selectedBranch.replace(/\s+/g, '');
    const semester = `sem-${selectedSemester.id}`;
    const filename = `${subject.name}.pdf`;

    const downloadUrl = `http://localhost:5001/api/questionpapers/download/${branch}/${semester}/${formattedSubject}/${filename}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">
            Previous Year Question Papers (PYQ)
          </h1>

          {/* Branch Selector */}
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedSemester(null);
                setSearchTerm("");
              }}
              value={selectedBranch || ""}
            >
              <option value="">Select Branch</option>
              {Object.keys(questionPapers).map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Semester Selector */}
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) =>
                setSelectedSemester(
                  questionPapers[selectedBranch].find(
                    (sem) => sem.id === parseInt(e.target.value)
                  )
                )
              }
              value={selectedSemester ? selectedSemester.id : ""}
              disabled={!selectedBranch}
            >
              <option value="">Select Semester</option>
              {selectedBranch &&
                questionPapers[selectedBranch].map((sem) => (
                  <option key={sem.id} value={sem.id}>
                    {sem.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Subject Search + List */}
          {selectedSemester && (
            <div>
              <div className="mb-4 flex items-center">
                <FiSearch className="mr-2" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  className="w-full p-2 border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <p className="mb-2 text-gray-600">
                {filteredSubjects.length} subjects found
              </p>

              <ul className="space-y-2">
                {filteredSubjects.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 transition duration-200"
                  >
                    <span>{sub.name}</span>

                    <button
                      onClick={() => handleDownload(sub)}
                      className="text-blue-600 hover:underline hover:text-blue-800 focus:outline-none"
                      title="Download PDF"
                    >
                      <FiDownload className="w-5 h-5 cursor-pointer" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clear Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                setSelectedBranch(null);
                setSelectedSemester(null);
                setSearchTerm("");
              }}
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Clear Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}