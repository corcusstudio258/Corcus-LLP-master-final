import ContactForm from "../Components/contactForm";
import Servicesnew from "../Components/servicenew/Services";
import Serviceshero from "../Components/HeroBanner/Serviceshero";

const ServicesPage = () => {
  return (
    <div>
      <Serviceshero></Serviceshero>
      <Servicesnew></Servicesnew>
      {<ContactForm></ContactForm>}
      {/* <WhyChoose4></WhyChoose4> */}
      {/* <Pricing1 CoulmnClass="pricing-section section-padding"></Pricing1> */}
      {/* <Cta2></Cta2> */}
      {/* <Testimonial2></Testimonial2> */}
    </div>
  );
};

export default ServicesPage;
