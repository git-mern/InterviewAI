import React from "react";

const Testimonial = () => {
  return (
    <div>
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="mb-4">
                "This platform is amazing! It helped me ace my interview."
              </p>
              <p className="font-bold">- User</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <p className="mb-4">
                "The AI feedback was incredibly helpful and insightful."
              </p>
              <p className="font-bold">- User</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
