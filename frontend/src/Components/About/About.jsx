/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

import Founder1 from '../Images/Founder 1.jpg';
import Founder2 from '../Images/Founder 2.png';
import Founder3 from '../Images/Founder 3.png';
import Founder4 from '../Images/Founder 4.png';

export default function About() {
  const founders = [
    {
      name: "Leena Chaudhari",
      img: Founder1,
      linkedin: "https://www.linkedin.com/in/leena-chaudhari-41a331293",
      github: "https://github.com/Leena237",
      instagram: "https://www.instagram.com/leena_chaudhari2303?igsh=MWJncjFqYzlwZmZ0Zg==&utm_source=ig_contact_invite",
    },
    {
      name: "Sakshi Jain",
      img: Founder2,
      linkedin: "https://www.linkedin.com/in/sakshi-jain-a640a7246",
      github: "https://github.com/sakshijain19",
      instagram: "https://www.instagram.com/sakshij__02?utm_source=qr&igsh=MXJ0Nng1aW83YWU1OA==",
    },
    {
      name: "Sonali Bachhav",
      img: Founder3,
      linkedin: "https://www.linkedin.com/in/sonali-bachhav-2abb2b233/",
      github:   "https://github.com/sonalibachhav",
      instagram: "https://www.instagram.com/sonali_bachhav23?igsh=d3p5ZDM3ZnBuYmNp",
    },
    {
      name: "Raksha Sancheti",
      img: Founder4,
      linkedin: "https://www.linkedin.com/in/raksha-sancheti-941b04220",
      github: "https://github.com/SanchetiRaksha",
      instagram: "https://www.instagram.com/_rakshaa.11_?igsh=13gw4r4by1enk&utm_content=c0tmwtj",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://i.ibb.co/T1RNwPh/pngtree-start-up-team-working-flat-design-style-png-image-5870928-transparent-Craiyon.png"
              alt="EduTrade Team"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              EduTrade <br />
            </h2>
            <h3 className="text-2xl text-gray-900 font-bold md:text-3xl">
              Simplifying Educational Resource Exchange for Students
            </h3>
            <p className="mt-6 text-gray-600 text-base">
              EduTrade is a platform dedicated to simplifying the exchange of educational resources. Whether you're looking to buy, rent, or sell textbooks, notes, or past question papers, EduTrade empowers students to access materials they need in an affordable and efficient way. Our goal is to foster a collaborative learning environment where resources are easily accessible for everyone.
            </p>
            <p className="mt-4 text-gray-600 text-base">
              <span className="font-semibold text-lg">Why EduTrade?</span> Traditional methods of acquiring educational materials can be costly and time-consuming. EduTrade provides a solution by creating a marketplace where students can exchange resources directly. This saves both time and money, while also promoting a sustainable practice of reusing valuable educational materials.
            </p>
          </div>
        </div>

        {/* Meet Our Founders Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Founders</h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 justify-center">
            {founders.map((founder, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={founder.img}
                  alt={founder.name}
                  className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 shadow-md hover:scale-105 transition-transform duration-300"
                />
                <h4 className="mt-4 text-xl font-semibold text-gray-900">{founder.name}</h4>

                {/* Removed the Co-Founder line */}

                <div className="flex space-x-4 mt-2 text-2xl text-gray-600">
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    <FaLinkedin />
                  </a>
                  <a href={founder.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
                    <FaGithub />
                  </a>
                  <a href={founder.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
