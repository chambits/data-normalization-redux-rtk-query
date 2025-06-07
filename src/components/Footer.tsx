import { Code, Heart } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Tech Stack */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center space-x-1">
              <span>Built with:</span>
            </span>
            <div className="flex space-x-3">
              <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium">
                React
              </span>
              <span className="bg-purple-600 px-2 py-1 rounded text-xs font-medium">
                Redux Toolkit
              </span>
              <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">
                RTK Query
              </span>
              <span className="bg-cyan-600 px-2 py-1 rounded text-xs font-medium">
                TypeScript
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">Data Normalization Demo</p>
            <p className="text-xs text-gray-500 mt-1">
              Showcasing Redux best practices
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Chamith Madusanka
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>🚀 Performance Optimized</span>
              <span>⚡ Real-time Updates</span>
              <span>🎯 Normalized Data</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
