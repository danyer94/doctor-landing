import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  achievement: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Ana García',
      role: 'Deportista Amateur',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      content: 'El Dr. Khristian me ayudó a optimizar mi nutrición para mejorar mi rendimiento. Los resultados han sido increíbles, ¡me siento con más energía que nunca!',
      rating: 5,
      achievement: '-15kg en 6 meses',
    },
    {
      name: 'Carlos Mendoza',
      role: 'Empresario',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      content: 'Gracias al plan personalizado, logré equilibrar mi alimentación con mi ajetreada vida laboral. El seguimiento constante fue clave para mi éxito.',
      rating: 5,
      achievement: 'Mejor calidad de vida',
    },
    {
      name: 'María Rodríguez',
      role: 'Madre y Profesional',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      content: 'El apoyo y la guía del Dr. González fueron fundamentales para recuperar mi salud después del embarazo. Su enfoque integral hace la diferencia.',
      rating: 5,
      achievement: 'Recuperación postparto',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="testimonials" className="section-padding relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-secondary-50/50 via-transparent to-transparent"></div>

      <div className="container-custom relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span 
            variants={itemVariants}
            className="text-secondary-600 font-semibold mb-4 block"
          >
            Testimonios
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-gray-900">Lo que dicen</span>{' '}
            <span className="text-gradient">nuestros pacientes</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600"
          >
            Descubre cómo hemos ayudado a nuestros pacientes a alcanzar sus objetivos 
            y transformar sus vidas a través de una nutrición inteligente.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 rounded-3xl transform rotate-3 group-hover:rotate-1 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-soft-xl hover:shadow-soft-2xl transition-all duration-300">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

                {/* Achievement Badge */}
                <div className="inline-flex items-center bg-secondary-50 text-secondary-700 rounded-full px-4 py-1 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {testimonial.achievement}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex flex-col sm:flex-row items-center gap-4"
          >
            <a 
              href="#contact" 
              className="btn-primary group"
            >
              Comienza tu transformación
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a 
              href="#transformations" 
              className="btn-outline"
            >
              Ver más historias de éxito
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
