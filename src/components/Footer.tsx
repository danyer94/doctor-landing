import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const links = {
    services: [
      { name: 'Control de Peso', href: '#services' },
      { name: 'Nutrición Deportiva', href: '#services' },
      { name: 'Salud y Bienestar', href: '#services' },
      { name: 'Consultas Online', href: '#contact' },
    ],
    company: [
      { name: 'Sobre Nosotros', href: '#about' },
      { name: 'Testimonios', href: '#testimonials' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contacto', href: '#contact' },
    ],
    legal: [
      { name: 'Términos de Servicio', href: '#' },
      { name: 'Política de Privacidad', href: '#' },
      { name: 'Aviso Legal', href: '#' },
    ],
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/521234567890',
      icon: <FaWhatsapp />,
      color: 'hover:text-green-500',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/dr.khristian',
      icon: <FaInstagram />,
      color: 'hover:text-pink-500',
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/dr.khristian',
      icon: <FaFacebook />,
      color: 'hover:text-blue-500',
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/dr-khristian',
      icon: <FaLinkedin />,
      color: 'hover:text-blue-600',
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-custom py-12 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Dr. Khristian González
            </h3>
            <p className="text-gray-600 mb-6">
              Transformando vidas a través de la nutrición inteligente y el bienestar integral.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  <span className="sr-only">{social.name}</span>
                  <span className="w-6 h-6">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Servicios</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Compañía</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-100"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              {new Date().getFullYear()} Dr. Khristian González. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                Diseñado y desarrollado por{' '}
                <a
                  href="#"
                  className="text-primary-600 hover:text-primary-700 transition-colors duration-300"
                >
                  Equipo Creativo
                </a>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
