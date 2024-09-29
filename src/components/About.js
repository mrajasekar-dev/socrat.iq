import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About SOCRAT.IQ</h1>
      <p>
        <strong>SOCRAT.IQ</strong> is a revolutionary AI-powered teaching assistant created to help students master Data Structures and Algorithms (DSA) using the <strong>Socratic method</strong>. 
        The Socratic method encourages critical thinking by guiding students through a series of targeted questions, leading them to solutions without providing direct answers. This promotes deeper understanding and retention.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to make learning Data Structures and Algorithms engaging and personalized. SOCRAT.IQ assists learners at various levels, whether they're just starting with basic algorithms or refining complex sorting techniques.
      </p>

      <h2>How It Works</h2>
      <p>
        SOCRAT.IQ provides an interactive coding environment that empowers users to solve algorithmic challenges in real-time. Here’s how we make the experience unique:
      </p>
      <ul>
        <li><strong>Guided Learning:</strong> The assistant poses thoughtful, probing questions to lead learners toward the right solutions.</li>
        <li><strong>Instant Feedback:</strong> Users receive real-time feedback as they write code, helping them adjust their approach on the fly.</li>
        <li><strong>Practice and Apply:</strong> A collection of exercises that challenge learners to apply their understanding in new and varied contexts.</li>
      </ul>

      <h2>Who Can Benefit?</h2>
      <p>
        SOCRAT.IQ is designed for:
      </p>
      <ul>
        <li><strong>Beginners:</strong> New programmers looking to build a solid foundation in algorithms and data structures.</li>
        <li><strong>Experienced Developers:</strong> Engineers preparing for coding interviews or brushing up on their DSA skills.</li>
        <li><strong>Students:</strong> Learners from all academic backgrounds looking to succeed in competitive programming and academic assessments.</li>
      </ul>

      <h2>Join Us in Building a Smarter Future</h2>
      <p>
        Whether you're new to programming or an experienced developer, SOCRAT.IQ is here to enhance your learning journey. Our AI assistant ensures that you not only solve problems but understand the reasoning behind every solution. 
        Together, let’s build a smarter future, one algorithm at a time.
      </p>
    </div>
  );
};

export default About;
