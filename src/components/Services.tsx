import React from 'react';
import { HiScale, HiLightningBolt, HiHeart, HiUserGroup, HiAcademicCap, HiClock } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      icon: <HiScale className="w-8 h-8" />,
      title: 'Control de Peso',
      description: 'Plan personalizado para alcanzar y mantener tu peso ideal de forma saludable.',
      features: [
        'Evaluación corporal completa',
        'Plan nutricional personalizado',
        'Ajustes periódicos según progreso',
        'Seguimiento de métricas',
      ],
    },
    {
      icon: <HiLightningBolt className="w-8 h-8" />,
      title: 'Nutrición Deportiva',
      description: 'Optimiza tu rendimiento deportivo con planes nutricionales especializados.',
      features: [
        'Plan pre y post entrenamiento',
        'Suplementación deportiva',
        'Hidratación estratégica',
        'Periodización nutricional',
      ],
    },
    {
      icon: <HiHeart className="w-8 h-8" />,
      title: 'Salud y Bienestar',
      description: 'Mejora tu calidad de vida a través de una alimentación consciente y balanceada.',
      features: [
        'Hábitos alimenticios saludables',
        'Gestión del estrés',
        'Mejora del sueño',
        'Balance hormonal',
      ],
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
    <section id="services" className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
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
            Servicios Especializados
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-gray-900">Soluciones nutricionales</span>{' '}
            <span className="text-gradient">para cada objetivo</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600"
          >
            Descubre nuestros servicios diseñados para ayudarte a alcanzar tus metas 
            de salud y bienestar de manera efectiva y sostenible.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600/5 to-secondary-600/5 rounded-3xl transform rotate-3 group-hover:rotate-1 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-soft-xl hover:shadow-soft-2xl transition-all duration-300">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-secondary-500 mt-1 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href="#contact"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    <span>Conocer más</span>
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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="text-center p-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <HiUserGroup className="w-8 h-8 text-primary-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Atención Personalizada</h4>
            <p className="text-gray-600">Cada plan se adapta a tus necesidades específicas</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center p-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary-50 flex items-center justify-center mb-4">
              <HiAcademicCap className="w-8 h-8 text-secondary-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Respaldo Profesional</h4>
            <p className="text-gray-600">Basado en evidencia científica actualizada</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center p-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-accent-50 flex items-center justify-center mb-4">
              <HiClock className="w-8 h-8 text-accent-600" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Soporte Continuo</h4>
            <p className="text-gray-600">Seguimiento y ajustes según tu progreso</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
