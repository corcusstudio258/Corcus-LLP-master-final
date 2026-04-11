import HeroBanner3 from "../Components/HeroBanner/HeroBanner3";
import Marquee2 from "../Components/Marquee/Marquee2";
import Client from "../Components/ourclient";
import Poweredby from "../Components/poweredby";
import ContactForm from "../Components/contactForm";
import Why from "../Components/Why/why";
import Testimonial4 from "../Components/Testimonial/Testimonial4";
import Servicesnew from "../Components/servicenew/Services";
import Ourjourney from "../Components/ourjourney/Ourjourney";

const Home3 = () => {
  return (
    <div>
      <HeroBanner3></HeroBanner3>
      <Marquee2></Marquee2>
      <Servicesnew></Servicesnew>
      <Ourjourney></Ourjourney>
      <Why></Why>
      <Poweredby></Poweredby>
      {/* <WhyChoose2></WhyChoose2> */}
      {/* <CaseStudy3></CaseStudy3> */}
      {/* <Team1></Team1> */}
      {/* <Marquee3></Marquee3> */}
      <Client></Client>
      {/* <Letmake></Letmake> */}
      {/* <WhyChoose3></WhyChoose3> */}
      {/* <Testimonial3></Testimonial3> */}
      <Testimonial4></Testimonial4>
      <ContactForm></ContactForm>
      {/* <Counter2></Counter2>
      <Blog2></Blog2> */}
    </div>
  );
};

export default Home3;
