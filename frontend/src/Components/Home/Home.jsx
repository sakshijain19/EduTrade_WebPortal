/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Cards/Cards";
import { DollarSign, MapPin, BookOpen, Search, BookOpenCheck, FileText, BookCopy } from "lucide-react";

const Header = () => {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center bg-gradient-to-r from-[#F0F8FF] to-[#E0F0FF] overflow-hidden">
        {/* Background circle decoration */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] bg-[#4D94FF] rounded-full -mr-32 opacity-90"></div>
        <div className="absolute right-10 top-20 w-20 h-20 bg-[#A8D8FF] rounded-full opacity-70"></div>
        <div className="absolute left-20 bottom-20 w-16 h-16 bg-[#A8D8FF] rounded-full opacity-50"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                You've got <span className="text-[#0066CC]">books to exchange</span>, we have brilliant minds.
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                Connecting students with educational resources they need. Buy, sell, and exchange books, notes, and question papers in your community.
              </p>
              
            </div>            

            <div className="hidden lg:block relative">
              <img
                src="https://i.pinimg.com/736x/65/5b/81/655b81dc33c00f9fd29ce510700bdebf.jpg"
                alt="Students studying with books and laptops"
                className="rounded-lg shadow-2xl max-w-full h-auto object-cover z-10 relative"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Resources at Your Fingertips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need for your academic success in one place</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Books Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Stack of books"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Books</h3>
                <p className="text-gray-600 mb-6">
                  Explore a vast collection of books to enhance your knowledge and understanding.
                </p>
                <Link to="/books" className="inline-flex items-center text-[#0066CC] font-medium hover:underline">
                  Explore Books
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Notes Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Student notes"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Notes</h3>
                <p className="text-gray-600 mb-6">
                  Access well-structured notes tailored to your subjects for effective studying.
                </p>
                <Link to="/notes" className="inline-flex items-center text-[#0066CC] font-medium hover:underline">
                  Explore Notes
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Question Papers Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group">
              <div className="h-48 overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Exam papers"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-4">
                  <BookOpenCheck className="h-6 w-6 text-[#0066CC]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Question Papers</h3>
                <p className="text-gray-600 mb-6">
                  Find past question papers and practice exams to prepare for your tests efficiently.
                </p>
                <Link to="/question-papers" className="inline-flex items-center text-[#0066CC] font-medium hover:underline">
                  Explore Question Papers
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Real People Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-[#A8D8FF] rounded-full opacity-70 z-0"></div>
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <span className="text-sm font-medium text-[#0066CC] uppercase tracking-wider">WHAT WE ARE</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">Real students helping real students</h2>
              </div>
              
              <p className="text-gray-600 mb-8">
                EduTrade is built by students who understand the challenges of finding affordable educational resources. 
                Our platform connects you directly with fellow students to exchange books, notes, and study materials.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E0F0FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-[#0066CC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Book Exchange</h3>
                    <p className="text-gray-600">Save money by buying used books from other students or selling your old ones.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#E0F0FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-[#0066CC]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Notes Sharing</h3>
                    <p className="text-gray-600">Access high-quality notes from top students to improve your understanding.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Highlights */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EduTrade?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              EduTrade provides a trusted platform for students to trade educational materials with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-7 w-7 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Money</h3>
              <p className="text-gray-600">
                Find great deals on used books or rent textbooks for a fraction of the cost.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Community</h3>
              <p className="text-gray-600">
                Connect with book lovers in your area and support local literacy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#E0F0FF] rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Vast Selection</h3>
              <p className="text-gray-600">
                Access a wide variety of books, from bestsellers to rare finds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with EduTrade is simple and straightforward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Sign Up</h3>
                <p className="text-gray-600">
                  Create your free account to start buying, selling your books.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">List or Browse</h3>
                <p className="text-gray-600">
                  List your books for sale or browse available books in your area.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0066CC] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Exchange</h3>
                <p className="text-gray-600">
                  Meet up with local book lovers to complete your transaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who have transformed their learning experience with EduTrade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah L.",
                role: "Engineering Student",
                quote: "I've saved so much money on textbooks using EduTrade. It's a game-changer for students!",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Mike R.",
                role: "Computer Science Major",
                quote: "As a book collector, I've found some amazing rare books through this platform. Highly recommended!",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Emily T.",
                role: "Medical Student",
                quote: "I love how easy it is to sell my old books. It's great for decluttering and making some extra cash.",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {/* Star Rating */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-[#0066CC]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.707 1.527 8.187-7.463-4.207-7.463 4.207 1.527-8.187-6.064-5.707 8.332-1.151z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;