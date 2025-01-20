import React from "react";

const Features = () => {
  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Feature</h3>
              <p>You can generate Interview Questions from AI.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Feature</h3>
              <p>Record Answers And send it for review.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Feature</h3>
              <p>
                A well Structured Feedback Page. Where you will get remark and
                feedback on your answers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
