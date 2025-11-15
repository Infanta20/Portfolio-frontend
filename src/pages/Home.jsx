import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-red from-blue-500 to-purple-600 text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Infanta, a Mern Stack Developer</h1>
        <p className="text-xl">Building modern web applications with React, Node.js, and MongoDB</p>
      </section>

      {/* About Me */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          I'm a passionate Full Stack Developer with experience in building scalable web applications.
          I love solving complex problems and creating elegant solutions. My expertise spans across
          frontend and backend technologies, allowing me to deliver end-to-end solutions.
        </p>
      </section>

      {/* Skills */}
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-4">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['HTML','React', 'Node.js', 'MongoDB', 'Express', 'Firebase', 'Tailwind CSS', 'JavaScript'].map(skill => (
            <div key={skill} className="bg-blue-100 p-4 rounded-lg text-center font-semibold">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
