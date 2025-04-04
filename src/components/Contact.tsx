import React from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Contact: React.FC = () => {
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

  const contactInfo = [
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      title: 'Ubicación',
      content: 'Ciudad de México, México',
      link: 'https://goo.gl/maps/...',
    },
    {
      icon: <HiPhone className="w-6 h-6" />,
      title: 'Teléfono',
      content: '+52 (123) 456-7890',
      link: 'tel:+521234567890',
    },
    {
      icon: <HiMail className="w-6 h-6" />,
      title: 'Email',
      content: 'dr.khristian@example.com',
      link: 'mailto:dr.khristian@example.com',
    },
    {
      icon: <HiClock className="w-6 h-6" />,
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 18:00',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      name: 'WhatsApp',
      href: 'https://wa.me/521234567890',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      name: 'Instagram',
      href: 'https://instagram.com/dr.khristian',
      color: 'bg-pink-500 hover:bg-pink-600',
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50/30"></div>
      <div className="absolute top-1/2 -right-64 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/40 to-secondary-100/40 rounded-full blur-3xl"></div>
      <div className="absolute -top-64 -left-64 w-[800px] h-[800px] bg-gradient-to-br from-accent-100/30 to-primary-100/30 rounded-full blur-3xl"></div>

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
            Contáctanos
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            <span className="text-gray-900">¿Listo para</span>{' '}
            <span className="text-gradient">transformar tu vida?</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600"
          >
            Agenda tu consulta hoy y comienza tu viaje hacia una vida más saludable 
            con la guía profesional que necesitas.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft-xl">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold mb-8"
              >
                Información de Contacto
              </motion.h3>

              <motion.div 
                variants={containerVariants}
                className="space-y-6"
              >
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    variants={itemVariants}
                    className="flex items-start hover:bg-gray-50 p-4 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mr-4">
                      <div className="text-primary-600">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={containerVariants}
                className="mt-8 pt-8 border-t border-gray-100"
              >
                <motion.h4 
                  variants={itemVariants}
                  className="text-lg font-semibold mb-4"
                >
                  Síguenos en redes sociales
                </motion.h4>
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-soft-xl">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold mb-8"
              >
                Envíanos un mensaje
              </motion.h3>

              <motion.form
                variants={containerVariants}
                className="space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="+52 (123) 456-7890"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center group"
                  >
                    Enviar mensaje
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
                  </button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
