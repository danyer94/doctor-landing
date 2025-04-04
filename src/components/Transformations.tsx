import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const Transformations: React.FC = () => {
  const transformations = [
    {
      id: 1,
      name: 'María García',
      beforeImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&h=600&fit=crop',
      duration: '3 meses',
      achievement: '-15kg',
      testimonial: 'El programa del Dr. Khristian cambió mi vida. No solo perdí peso, sino que aprendí a mantener un estilo de vida saludable.',
    },
    {
      id: 2,
      name: 'Juan Pérez',
      beforeImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop',
      duration: '6 meses',
      achievement: '-20kg',
      testimonial: 'Increíble el cambio que logré. El apoyo constante y los planes personalizados fueron clave para mi éxito.',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      beforeImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1579047440583-43a690fe2243?w=800&h=600&fit=crop',
      duration: '4 meses',
      achievement: '-12kg',
      testimonial: 'Gracias al Dr. Khristian, ahora tengo más energía y me siento mejor que nunca.',
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
    <section id="transformations" className="py-20 bg-gray-50">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span 
            variants={itemVariants}
            className="text-primary-600 font-semibold mb-4 block"
          >
            Transformaciones Reales
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Historias de Éxito
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Conoce a algunas de las personas que han transformado sus vidas 
            a través de nuestros programas personalizados de nutrición.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {transformations.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-soft-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-6">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <img
                        src={item.beforeImage}
                        alt={`${item.name} antes`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-sm font-semibold">
                        Antes
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={item.afterImage}
                        alt={`${item.name} después`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary-500/90 text-white px-2 py-1 rounded text-sm font-semibold">
                        Después
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {item.duration} • {item.achievement}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.testimonial}</p>

              <div className="flex justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  <span>Comienza tu transformación</span>
                  <HiArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div variants={itemVariants}>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center group"
            >
              <span>Inicia tu transformación ahora</span>
              <HiArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Transformations;
