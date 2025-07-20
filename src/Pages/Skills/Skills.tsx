import { useEffect } from "react";
import Navbar from "../../Components/ui/Navbar/Navbar";
import { Link } from "react-router-dom";

const skillsData = [
  {
    title: "Graphic Design",
    description: "Create eye-catching designs that speak louder than words",
    content:
      " Unlock your creativity and learn how to bring ideas to life through stunning visuals. Our Graphic Design course teaches you how to design flyers, social media content, logos and more, using tools like Canva and Photoshop",
    for: ["🧠Beginner", "🎨Creatives", "💵Business Owners"],
    gain: [
      "Perfect for beginners; no drawing skills needed",
      "Learn to create visuals that grab attention and sell",
      "Start freelancing or building your personal brand",
    ],
    discount: "₦12,000",
    duration: "1 Month",
    price: "₦6,000",
  },
  {
    title: "Basic Computer Literacy",
    description:
      "Start your digital journey with the most essential tech skills",
    content:
      "Start from scratch and master the digital basics every student and job seeker must know. From using Microsoft Word and Excel to understanding the internet, email and digital safety, we’ve got you covered",
    for: ["🧠Beginner", "💵Business Owners"],
    gain: [
      "Gain confidence using laptops and mobile tools",
      "Learn typing, internet research, file management",
      "Great for complete beginners and students of all ages",
    ],
    discount: "₦12,000",
    duration: "6 weeks",
    price: "₦6,000",
  },
  {
    title: "No-Code Web Design",
    description:
      "Build stunning websites. No coding, your creativity is your limit",
    content:
      "Build beautiful websites without writing a single line of code. Learn how to design and launch portfolios, landing pages and business sites using powerful no-code tools like Wix and WordPress",
    for: ["🧠Beginner", "🎨Creatives", "💵Business Owners"],
    gain: [
      "Build websites quickly with drag-and-drop tools",
      "Ideal for freelancers, business owners and marketers",
      "A great way to enter tech without coding",
    ],
    discount: "₦12,000",
    duration: "1 Month",
    price: "₦6,000",
  },
  {
    title: "Frontend Development",
    description: "Learn to code and bring websites to life from scratch",
    content:
      "Learn how to build websites from the ground up using HTML, CSS and JavaScript. This course is your first step into the tech world, teaching you how websites work and how to create your own from scratch",
    for: ["🧠Beginner"],
    gain: [
      "Learn real coding skills used by developers worldwide",
      "Build interactive, mobile-friendly websites",
      "A solid foundation for careers in tech and software development",
    ],
    discount: "₦50,000",
    duration: "3 Months",
    price: "₦30,000",
  },
  {
    title: "Writing (Content, Promotion & Blog)",
    description: "Turn words into impact, write, promote and blog effectively",
    content:
      "Learn how to write content that grabs attention, tells stories and drives action. From social media captions to blog posts and email marketing, you’ll master the skill of effective communication",
    for: ["🧠Beginner", "💵Business Owners"],
    gain: [
      "Improved your writing for school, business or personal brand",
      "Learn how to write for the internet (SEO, storytelling, engagement)",
      "Start a blog, work as a content writer or promote your hustle",
    ],
    discount: "₦12,000",
    duration: "1 Month",
    price: "₦6,000",
  },
  {
    title: "UI/UX Design",
    description: "Design apps and websites people actually use",
    content:
      "Discover how to design digital experiences that people love using. UI/UX design teaches you how to make apps and websites not only look good but also feel easy and smooth to use",
    for: ["🧠Beginner", "🎨Creatives"],
    gain: [
      " Learn design thinking and user research",
      "Highly in-demand skill in tech and product teams",
      "No coding needed, just a love for creativity and solving problems",
    ],
    discount: "₦20,000",
    duration: "2 Months",
    price: "₦12,000",
  },
];

const Skills = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <Navbar />
      <section className="!py-12 !px-4 md:px-12 bg-white text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center !mb-3">
          Skills we Offer
        </h2>
        <p className="text-xl md:text-2xl font-light text-center !mb-12">
          Paid internship available
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className=" bg-gray-50  rounded-xl !p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <div>
                <h3 className="text-xl  font-bold !text-gray-900 !mb-1">
                  {skill.title}
                </h3>
                <p className="text-sm font-semibold text-center text-gray-600 italic !mb-4">
                  {skill.description}
                </p>
                <p className="text-sm text-gray-600  !mb-4">{skill.content}</p>
                <div className="!mb-3">
                  <h4 className="text-sm font-semibold text-gray-800 !mb-1">
                    Who it's for
                  </h4>
                  <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                    {skill.for.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="!mb-3">
                  <h4 className="text-sm font-semibold text-gray-800 !mb-1">
                    What you'll gain
                  </h4>
                  <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                    {skill.gain.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-500 font-semibold !mt-2">
                  Duration:
                  <span className="font-bold text-black !px-2">
                    {skill.duration}
                  </span>
                </p>
              </div>
              <div className="!mt-6 flex justify-between items-center">
                <Link to={"/login"}>
                  <button className=" border border-blue-600 hover:!text-white rounded-3xl text-blue-600 !px-4 !py-2 text-sm">
                    Book a Session
                  </button>
                </Link>
                <div>
                  <p className="text-lg font-normal text-gray-400 !line-through">
                    {skill.discount}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {skill.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
