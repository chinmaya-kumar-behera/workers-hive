import React from "react";
import Navbar from "../views/navbar/Navbar";
import Footer from "../views/footer/Footer";

const Testimonial = ({ text, author, city }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
      <p className="text-gray-600 mt-4">
        {author}, {city}
      </p>
    </div>
  );
};

const TeamMember = ({ name, position, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={image} alt={name} className="w-full h-auto mb-4 rounded-full" />
      <h4 className="text-xl font-semibold mb-2">{name}</h4>
      <p className="text-gray-600">{position}</p>
    </div>
  );
};
const AboutUs = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6">About Workers Hive</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Workers Hive, your trusted destination for all your
            service needs. We are dedicated to providing top-notch customer
            service solutions, ranging from plumbing and electrical repairs to
            tablet and hair care services.
          </p>
          <p className="text-lg text-gray-700 mt-4 leading-relaxed">
            At Workers Hive, we understand the importance of quality service and
            convenience. That's why we've assembled a team of skilled
            professionals who are passionate about their craft and committed to
            delivering exceptional results.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission at Workers Hive is simple: to redefine the service
            industry by offering unparalleled quality, reliability, and
            convenience to our customers. We strive to be your go-to destination
            for all your service needs, providing timely solutions that exceed
            your expectations.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Our Services</h3>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li className="mb-2">Plumbing Repair</li>
            <li className="mb-2">Electrical Repair</li>
            <li className="mb-2">Tablet Repair</li>
            <li className="mb-2">Hair Care Services</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">
            Why Choose Workers Hive?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Expertise</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our team consists of skilled professionals with years of
                experience in their respective fields, ensuring quality service
                every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Convenience</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                We offer flexible scheduling options and on-demand service,
                making it easy for you to get the assistance you need when you
                need it.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4">Reliability</h4>
              <p className="text-lg text-gray-700 leading-relaxed">
                You can count on Workers Hive to deliver reliable solutions and
                transparent pricing, with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6">Meet Our Team</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Our team is comprised of dedicated professionals who are experts in
            their respective fields. Get to know the people behind Workers Hive:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="John Doe"
              position="Plumbing Specialist"
              image="john-doe.jpg"
            />
            <TeamMember
              name="Jane Smith"
              position="Electrical Technician"
              image="jane-smith.jpg"
            />
            <TeamMember
              name="Alex Johnson"
              position="Tablet Repair Technician"
              image="alex-johnson.jpg"
            />
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-semibold mb-6">
            What Our Customers Say
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Hear from our satisfied customers about their experience with
            Workers Hive:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Testimonial
              text="Workers Hive exceeded my expectations! Their team fixed my plumbing issues in no time, and the service was outstanding."
              author="John Smith"
              city="New York"
            />
            <Testimonial
              text="I've been a loyal customer of Workers Hive for years. Their reliability and professionalism are unmatched."
              author="Emily Johnson"
              city="Los Angeles"
            />
          </div>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AboutUs;
