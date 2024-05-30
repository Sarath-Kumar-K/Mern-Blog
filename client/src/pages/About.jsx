import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-3 max-w-2xl mx-auto text-center">
        <div className="">
          <h1 className="my-7 text-center text-3xl font-semibold">
            About Sarath's Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to my blog! I'm thrilled to have you here in my little
              corner of the internet. This space is where my passion for
              storytelling and creativity comes alive. Whether through words,
              photos, or videos, I aim to create content that resonates with you
              and adds a bit of joy to your day.
            </p>
            <p>
              Here, you'll find a variety of topics that reflect my diverse
              interests. From travel tales and culinary adventures to tech tips
              and personal growth, there's something for everyone. My goal is to
              build a vibrant community where we can share our stories and learn
              from each other.
            </p>
            <p>
              I'd love to connect with you beyond the screen! If you ever want
              to chat or discuss a blog post, feel free to reach out through the
              contacts in the footer. Whether it's for a friendly discussion or
              a virtual cup of tea, I'm here for it. Let's make this blogging
              journey a fun and meaningful adventure together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
