import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function App() {
  const features = [
    'Automatic design system extraction',
    'Smart component organization',
    'Professional case study layouts',
    'Custom mockup generation',
    'Style guide creation',
    'Process documentation',
    'Outcome visualization'
  ];

  return (
    <div className="bg-white">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Case Study Generator</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#features"
                className="text-white hover:text-purple-100 transition-colors"
              >
                Features
              </a>
              <a
                href="https://www.figma.com/community/plugin/your-plugin-id"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Plugin
                <ArrowTopRightOnSquareIcon className="ml-2 -mr-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </nav>

        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Generate Beautiful Case Studies
              <br />
              Directly in Figma
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-xl text-purple-100"
            >
              Transform your design work into professional case studies with just a few clicks.
              Automatically extract design systems, create mockups, and document your process.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <a
                href="https://www.figma.com/community/plugin/your-plugin-id"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Now
                <ArrowTopRightOnSquareIcon className="ml-2 -mr-1 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        {/* Preview Section */}
        <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden">
                <img
                  src="/preview.png"
                  alt="Plugin Preview"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to create professional case studies
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Streamline your case study creation process with our powerful features
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{feature}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} Case Study Generator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}