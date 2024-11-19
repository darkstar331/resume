// src/App.js

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
} from 'react-icons/fa';
import {
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Menu,
  X,
  Atom,
  Code,
  Paintbrush,
  Database as LucideDatabase,
  MousePointer2,
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import useIsMobile from './hooks/useIsMobile'; // Ensure this path is correct

// AnimatedSphere Component
const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef}>
      <MeshDistortMaterial
        color="#00fff2"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
};

// SkillIcon Component
const SkillIcon = ({ Icon, label }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center justify-center p-4 w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg"
  >
    <Icon size={40} className="text-teal-400 mb-2" />
    <span className="text-sm font-medium text-gray-200 text-center">
      {label}
    </span>
  </motion.div>
);

// ProjectCard Component
const ProjectCard = ({ project, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
    onClick={() => onClick(project)}
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
          {project.title}
        </h4>
        {project.icon}
      </div>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-teal-500 text-gray-900 font-bold py-2 px-4 rounded-full flex items-center space-x-2"
      >
        <span>View Details</span>
        <ChevronRight size={18} />
      </motion.button>
    </div>
  </motion.div>
);

// Main App Component
export default function App() {
  const isMobile = useIsMobile(); // Use the custom hook
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for the radial gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Prevent background scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const projectsRef = useRef(null);
  const isProjectsInView = useInView(projectsRef, { margin: '-80px' });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const projects = [
    {
      id: 1,
      title: 'Musiclite',
      description:
        'A Spotify-inspired music streaming application with real-time audio visualization and social features.',
      icon: <Code size={24} className="text-teal-400" />,
      previewUrl: 'https://musiclite.netlify.app/',
    },
    {
      id: 2,
      title: 'Usafe',
      description:
        'U Safe is a web app empowering university students to stay safe on campus by providing emergency contacts, resources, and options to find friends or quiet places.',
      icon: <Code size={24} className="text-purple-400" />,
      previewUrl: 'https://usafe-uoa.netlify.app/',
    },
    {
      id: 3,
      title: 'Techshop',
      description:
        'A fully-featured eCommerce platform using the MERN stack with Redux for state management.',
      icon: <Code size={24} className="text-pink-400" />,
      previewUrl: 'https://github.com/darkstar331/ProShop-V1',
    },
    {
      id: 4,
      title: 'SimTrade',
      description:
        'A modern e-commerce platform with AR product previews and personalized recommendations.',
      icon: <Code size={24} className="text-yellow-400" />,
      previewUrl: 'https://github.com/darkstar331/SimTrade',
    },
    {
      id: 5,
      title: 'Patronix',
      description:
        'Patronix is a streamlined patronage app enabling creators to receive donations effortlessly via Stripe’s secure checkout and GitHub authentication.',
      icon: <Code size={24} className="text-orange-400" />,
      previewUrl: 'https://github.com/darkstar331/Patronix',
    },
  ];

  const skills = [
    { Icon: FaJava, label: 'Java' },
    { Icon: FaReact, label: 'React' },
    { Icon: FaPython, label: 'Python' },
    { Icon: FaHtml5, label: 'HTML' },
    { Icon: FaCss3Alt, label: 'CSS' },
    { Icon: FaNodeJs, label: 'Node.js' },
    { Icon: FaDatabase, label: 'PostgreSQL' },
    { Icon: FaDatabase, label: 'MongoDB' },
  ];

  // Function to handle smooth scrolling to sections
  const handleScroll = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    },
    [isMenuOpen]
  );

  // Debugging: Log isMobile to verify its value
  useEffect(() => {
    console.log('isMobile:', isMobile);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-900 text-white font-sans overflow-auto"
    >
      {/* Background Image with Scroll Effect */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          opacity: isProjectsInView ? 0 : opacity,
        }}
      />

      {/* Radial Gradient Effect Following the Mouse */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 242, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-50">
        {/* Navbar */}
        <header className="p-6 flex justify-between items-center backdrop-blur-md bg-gray-900 bg-opacity-50 fixed top-0 w-full z-50">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-teal-400"
          >
            Harman
          </motion.h1>
          <nav className="hidden md:block">
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex space-x-6"
            >
              {['About', 'Projects', 'Technologies', 'Contact'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleScroll(item.toLowerCase())}
                    className="text-gray-300 hover:text-teal-400 transition-colors focus:outline-none"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className="text-gray-300 hover:text-teal-400 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 backdrop-blur-md z-50 flex flex-col items-center justify-center"
            >
              <motion.ul
                className="flex flex-col space-y-6 text-center"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                  closed: {},
                }}
              >
                {['About', 'Projects', 'Technologies', 'Contact'].map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -20 },
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleScroll(item.toLowerCase())}
                      className="text-gray-300 hover:text-teal-400 transition-colors text-2xl font-semibold"
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="container mx-auto px-6 pt-24"> {/* Adjusted padding-top to account for fixed header */}
          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative"
            >
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
              >
                Crafting Digital Experiences
              </motion.h2>
              <motion.p
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-300 mb-8"
              >
                Software Engineer
              </motion.p>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('projects');
                }}
                className="bg-teal-500 text-gray-900 font-bold py-3 px-8 rounded-full inline-block transition-transform transform hover:rotate-3"
              >
                Explore My Work
              </motion.a>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-50">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <AnimatedSphere />
                </Canvas>
              </div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-6 text-teal-400"
                >
                  About Me
                </motion.h3>
                <p className="text-gray-300 text-lg mb-4">
                  I'm a Full Stack Engineer with a keen eye for design and a love for creating
                  intuitive, engaging user experiences. With expertise in React, TypeScript, and
                  modern CSS, I bring ideas to life through clean, efficient code and polished UI.
                </p>
                <p className="text-gray-300 text-lg mb-4">
                  Currently, I'm pursuing a Bachelor of Science in Computer Science at the
                  University of Alberta.
                </p>
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 text-teal-400">
                    Key Skills
                  </h4>
                  {[
                    { skill: 'React', level: 90 },
                    { skill: 'TypeScript', level: 85 },
                    { skill: 'Node.js', level: 80 },
                    { skill: 'UI/UX Design', level: 75 },
                  ].map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.skill}</span>
                        <span className="text-gray-300">{item.level}%</span>
                      </div>
                      <motion.div
                        className="h-2 bg-gray-700 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: 0.2 * index }}
                      >
                        <div className="h-full bg-teal-400 rounded-full"></div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-teal-400"
                >
                  <h4 className="text-2xl font-semibold mb-4 text-teal-400">
                    Education
                  </h4>
                  <div className="text-xl font-medium mb-2 text-white">
                    🎓 BSc. in Computer Science
                  </div>
                  <div className="text-lg font-medium mb-4 text-gray-300">
                    University of Alberta
                  </div>
                  <ul className="space-y-2 text-lg text-gray-300">
                    <li>📅 Expected Graduation: May 2027</li>
                    <li>📘 Current Year: 2nd Year</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h4 className="text-xl font-semibold mb-4 text-teal-400">
                    Experience Timeline
                  </h4>
                  <div className="relative pl-8 border-l-2 border-teal-400">
                    {[
                      {
                        year: 'May 2024 - Aug 2024',
                        event: 'Internship at Rehabilitation Robotics Laboratory',
                      },
                      { year: 'Sep 2023 - Present', event: 'Bsc Computer Science' },
                      {
                        year: ' Jun 2023 - Aug 2023',
                        event: 'SDE Intern at JUSPAY',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="mb-6 relative"
                      >
                        <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-teal-400"></div>
                        <p className="text-teal-400 font-semibold">
                          {item.year}
                        </p>
                        <p className="text-gray-300">{item.event}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Technologies Section */}
          <section
            id="technologies"
            className="w-full flex items-center justify-center mb-24"
          >
            <div className="w-full px-6">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl text-left font-bold mb-12 text-teal-400 "
              >
                Technologies 
              </motion.h3>
              <motion.div
                className="grid grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.8 }} 
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                  >
                    <SkillIcon Icon={skill.Icon} label={skill.label} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={projectsRef}
            className="min-h-screen flex items-center justify-center mb-24"
          >
            <div>
              {/* Section Header */}
              {isMobile ? (
                <h3 className="text-3xl font-bold mb-12 text-teal-400">
                  Projects
                </h3>
              ) : (
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-12 text-teal-400"
                >
                  Projects
                </motion.h3>
              )}

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  isMobile ? (
                    // Without animation on mobile
                    <div key={project.id}>
                      <ProjectCard project={project} onClick={setActiveProject} />
                    </div>
                  ) : (
                    // With animation on desktop/tablet
                    <motion.div
                      key={project.id}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ProjectCard project={project} onClick={setActiveProject} />
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="w-full h-auto "
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full px-6"
            >
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-12 text-teal-400 text-left"
              >
                Get in Touch
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-4">
                    I'm always open to new opportunities and collaborations. Whether you
                    have a project in mind or just want to connect, feel free to reach
                    out!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        icon: <Github size={24} />,
                        href: 'https://github.com/darkstar331',
                        label: 'GitHub',
                      },
                      {
                        icon: <Linkedin size={24} />,
                        href: 'https://www.linkedin.com/in/harman-s-a1b0531b1',
                        label: 'LinkedIn',
                      },
                      {
                        icon: <Mail size={24} />,
                        href: 'mailto:ih30singh@gmail.com',
                        label: 'Email',
                      },
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 p-3 rounded-full flex items-center space-x-2 text-teal-400 hover:bg-gray-700 transition-colors"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full p-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 text-white"
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-teal-500 text-gray-900 font-bold py-2 px-4 rounded-full flex items-center space-x-2"
                  >
                    <span>Send Message</span>
                    <ChevronRight size={18} />
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="w-full mt-16 bg-gray-900 text-center text-gray-400">
            <p>Created by Harman</p>
          </footer>
        </main>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 p-6 rounded-xl max-w-lg w-full"
            >
              <h4 className="text-2xl font-semibold mb-4 text-teal-400">
                {activeProject.title}
              </h4>
              <p className="text-gray-300 mb-6">{activeProject.description}</p>
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveProject(null)}
                  className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Close
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={activeProject.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-500 text-gray-900 font-bold py-2 px-4 rounded-full flex items-center space-x-2"
                >
                  <ExternalLink size={18} />
                  <span>More</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-teal-500 text-gray-900 rounded-full p-3 shadow-lg"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        >
          <MousePointer2 size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}
