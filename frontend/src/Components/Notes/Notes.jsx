// src/components/Notes.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import noteService from '../../services/noteService';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function Notes() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('');
  const [noteCourse, setNoteCourse] = useState('');
  const [noteSemester, setNoteSemester] = useState('');
  const [noteFile, setNoteFile] = useState(null);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState([]);

  // grab JWT from localStorage (must match what your login stores)
  const token = localStorage.getItem('token');

  // Fetch all notes on mount and when filterCourse changes
  useEffect(() => {
    if (activeTab === 'search') {
      fetchNotes(searchTerm);
    }
    // eslint-disable-next-line
  }, [activeTab, filterCourse]);

  const fetchNotes = async (term = '') => {
    try {
      const data = term
        ? await noteService.searchNotes(term)
        : await noteService.getAllNotes();
      
      // Filter by course if a course filter is selected
      const filteredData = filterCourse
        ? data.filter(note => note.course === filterCourse)
        : data;
      
      setNotes(filteredData);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  const handleSearch = async e => {
    e.preventDefault();
    fetchNotes(searchTerm);
  };

  const handleUpload = async e => {
    e.preventDefault();

    if (!noteTitle || !noteSubject || !noteCourse || !noteSemester || !noteFile) {
      setError('All fields are required.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('title', noteTitle);
    formData.append('subject', noteSubject);
    formData.append('course', noteCourse);
    formData.append('semester', noteSemester);
    formData.append('file', noteFile);
    for (let pair of formData.entries()) console.log(pair[0], pair[1]);

    try {
      const result = await noteService.uploadNote(
        noteTitle, 
        noteSubject, 
        noteCourse, 
        noteSemester, 
        noteFile, 
        token
      );
      console.log('Upload result', result);
      alert('Note uploaded successfully!');
      setNoteTitle('');
      setNoteSubject('');
      setNoteCourse('');
      setNoteSemester('');
      setNoteFile(null);
    } catch (err) {
      console.error('Upload error', err.response || err);
      setError(err.response?.data?.message || err.message || 'Failed to upload note');
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext !== 'pdf') {
        alert('Only PDF files are allowed');
        e.target.value = '';
        return;
      }
      setNoteFile(file);
    }
  };

  const handleDownload = async (noteId, noteTitle) => {
    try {
      const blob = await noteService.downloadNote(noteId, token);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${noteTitle}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Failed to download note');
    }
  };

  return (
    <div className="mt-12 mb-12 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="border-b mb-4">
        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded-md transition-all duration-300 font-semibold ${
              activeTab === 'search'
                ? 'bg-gray-600 text-white shadow'
                : 'bg-gray-200 text-gray-800'
            } focus:outline-none hover:bg-gray-400`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-md transition-all duration-300 font-semibold ${
              activeTab === 'upload'
                ? 'bg-gray-600 text-white shadow'
                : 'bg-gray-200 text-gray-800'
            } focus:outline-none hover:bg-gray-400`}
          >
            Upload
          </button>
        </div>
      </div>

      {activeTab === 'search' ? (
        <>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search notes..."
                  className="flex-grow p-2 border rounded-l"
                />
                <button type="submit" className="px-4 bg-blue-600 text-white rounded-r">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
              <select
                value={filterCourse}
                onChange={e => setFilterCourse(e.target.value)}
                className="p-2 border rounded md:w-64" >
                <option value="">All Courses</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electronics and Telecommunication Engineering">Electronics and Telecommunication Engineering</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
              </select>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {notes.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No notes found.</div>
            ) : (
              notes.map(note => (
                <div
                  key={note._id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
                    <div className="text-gray-700 text-sm mb-2">{note.subject}</div>
                    <div className="text-gray-500 text-xs mb-2">{note.course}</div>
                    <div className="text-gray-400 text-xs mb-4">Semester: {note.semester}</div>
                  </div>
                  <button
                    onClick={() => handleDownload(note._id, note.title)}
                    className="flex items-center justify-center border border-blue-500 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleUpload} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block mb-1">Note File*</label>
            <input type="file" onChange={handleFileChange} className="block w-full" required />
          </div>
          <div>
            <label className="block mb-1">Note Title*</label>
            <input
              type="text"
              value={noteTitle}
              onChange={e => setNoteTitle(e.target.value)}
              className="block w-full p-2 border rounded"
              placeholder="Enter note title"
              required
            />
          </div>
          {/* REMOVE DESCRIPTION FIELD */}
          <div>
            <label className="block mb-1">Subject*</label>
            <input
              type="text"
              value={noteSubject}
              onChange={e => setNoteSubject(e.target.value)}
              className="block w-full p-2 border rounded"
              placeholder="Enter subject"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Course*</label>
            <select
              value={noteCourse}
              onChange={e => setNoteCourse(e.target.value)}
              className="block w-full p-2 border rounded"
              required
            >
              <option value="">Select Course</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electronics and Telecommunication Engineering">Electronics and Telecommunication Engineering</option>
              <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Semester*</label>
            <input
              type="number"
              min="1"
              max="8"
              value={noteSemester}
              onChange={e => setNoteSemester(e.target.value)}
              className="block w-full p-2 border rounded"
              placeholder="Enter semester number"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-center"
          >
            Upload Notes
          </button>
        </form>
      )}
    </div>
  );
}
