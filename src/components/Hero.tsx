import React from 'react';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const benefits = [
    'Planes personalizados',
    'Seguimiento constante',
    'Resultados garantizados',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50/30"></div>
      <div className="absolute top-1/2 -right-64 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/40 to-secondary-100/40 rounded-full blur-3xl"></div>
      <div className="absolute -top-64 -left-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-100/30 to-primary-100/30 rounded-full blur-3xl"></div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6"
            >
              <span className="text-gray-900">Transforma tu vida con</span>{' '}
              <span className="text-gradient">nutrición inteligente</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Descubre cómo una alimentación personalizada puede mejorar tu salud, 
              energía y calidad de vida con el acompañamiento profesional que necesitas.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12"
            >
              <a 
                href="#contact" 
                className="btn-primary group w-full sm:w-auto"
              >
                <span>Agenda tu consulta</span>
                <HiArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#transformations" 
                className="btn-outline w-full sm:w-auto"
              >
                Ver transformaciones
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center text-gray-700"
                  >
                    <HiCheckCircle className="w-5 h-5 text-secondary-500 mr-2" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:ml-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary-600/20 to-transparent rounded-3xl transform -rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Dr. Khristian González"
                className="relative z-10 rounded-3xl shadow-2xl w-full h-[600px] object-cover object-center"
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute top-1/4 -left-8 lg:-left-12 bg-white rounded-2xl shadow-soft-xl p-4 glass-effect z-20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">+5</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Años de</div>
                  <div className="text-xs text-gray-600">Experiencia</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute bottom-1/4 -right-8 lg:-right-12 bg-white rounded-2xl shadow-soft-xl p-4 glass-effect z-20"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary-600">1K</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">Pacientes</div>
                  <div className="text-xs text-gray-600">Satisfechos</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
