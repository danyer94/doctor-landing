import React from 'react';
import { HiAcademicCap, HiUsers, HiClock, HiCheckCircle } from 'react-icons/hi';

interface Achievement {
  icon: JSX.Element;
  value: string;
  label: string;
}

interface Specialty {
  text: string;
}

const About: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: <HiAcademicCap className="w-8 h-8" />,
      value: '+5',
      label: 'Años de Experiencia',
    },
    {
      icon: <HiUsers className="w-8 h-8" />,
      value: '+1000',
      label: 'Pacientes Satisfechos',
    },
    {
      icon: <HiClock className="w-8 h-8" />,
      value: '24/7',
      label: 'Soporte y Seguimiento',
    },
  ];

  const specialties: Specialty[] = [
    { text: 'Pérdida de peso saludable' },
    { text: 'Nutrición deportiva' },
    { text: 'Planes personalizados' },
    { text: 'Asesoría online' },
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                alt="Dr. Khristian González"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Sobre Dr. Khristian González
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Como nutricionista especializado, me dedico a ayudar a las personas a alcanzar sus objetivos de salud y bienestar a través de planes nutricionales personalizados y un seguimiento constante.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Mi enfoque se basa en crear planes sostenibles y adaptados a tu estilo de vida, garantizando resultados duraderos y una mejor calidad de vida.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {specialties.map((specialty, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <HiCheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-gray-700">{specialty.text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-lg">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-secondary mb-3 flex justify-center">
                    {achievement.icon}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
