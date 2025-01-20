import React from "react";

const Testimonial = () => {
  return (
    <div>
      <section className=" mb-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16 text-gray-800">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                "This platform transformed my interview preparation. The AI
                feedback was spot-on and helped me secure my dream job!"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">User</p>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                "The structured feedback and practice sessions gave me the
                confidence I needed. Highly recommended!"
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">User</p>
                  <p className="text-gray-600">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
