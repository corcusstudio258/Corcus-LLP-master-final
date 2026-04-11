import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ClientFeedback = () => {
  const feedbacks = [
    {
      name: "Anamika Anand",
      title: "Paidavaar (CEO & Founder)",
      review:
        "Corcus completely reimagined our brand with a fresh and strong identity that truly connects with our audience. The creative touch they brought, especially with the 'Gayani Thai' character, helped us build a deeper bond with the farming community. The results speak for themselves - we've seen a huge boost in engagement, reach.",
    },
    {
      name: "Nand Kumar Patil",
      title: "Fresh O Need (CEO)",
      review:
        "Corcus took our digital presence to new heights with their seamless marketing strategies. They optimized our website, created amazing content, and ran ads that really resonated with our audience. Sales and engagement skyrocketed, and thanks to their expertise, we've been able to expand globally.",
    },
    {
      name: "Abinash",
      title: "Fresh Super Mall",
      review:
        "Working with Corcus was a game changer for our franchise lead generation. Their targeted ads, SEO, and automation strategies took things to the next level. We saw a 300% increase in leads, and our brand visibility grew massively. Their creative content and smart approach really made a difference. Couldn't recommend them more!",
    },
    {
      name: "Ankit Kumar",
      title: "Cosmosentials",
      review:
        "Working with Corcus Studio LLP has been a game-changer for Cosmosentials. They built our Shopify website and consistently deliver 5–7 ROAS every month. Their team is proactive, creative, and result-oriented. We’ve seen significant growth in our online sales thanks to their smart digital marketing strategies.",
    },
    {
      name: "Ashish",
      title: " Marshal Technologyl",
      review:
        "Corcus Studio LLP delivered exactly what we needed—an effective website, high-converting landing page, and targeted ad management. Their work has helped us generate quality leads specifically for our Salesforce courses. Their expertise and attention to detail have truly boosted our business.",
    },
    {
      name: " Dr. Punkesh",
      title: "Advance Skin Hair and Laser Clinic",
      review:
        "Corcus Studio LLP has done an excellent job with our social media management, content creation, and lead generation. Their creative approach and consistent efforts have significantly increased our online visibility and brought in quality leads. We’re extremely happy with the results and their professional service.",
    },
    {
      name: " — Mantu Mayank",
      title: "Haridwar Farms",
      review:
        "Corcus Studio LLP has been a valuable partner for Haridwar Farms. Their content creation and strategic marketing efforts have greatly boosted the sales of our organic fertilizers. Their team understands our vision and delivers results with creativity and consistency. Highly recommended!"
,
    },
  ];

  return (
    <div className="bg-white py-5">
      <div className="container text-center mb-5">
        <style>{`
          .reveal-text {
            opacity: 0;
            transform: translateY(20px);
            animation: revealText 0.8s ease-out forwards;
          }

          @keyframes revealText {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .testimonial-card {
            background-color: white;
            border-radius: 12px;
            padding: 2rem;
            min-height: 380px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            width: 100%;
            transition: all 0.3s ease;
          }

          .card-body-custom {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            gap: 1rem;
          }

          .card-title {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: black;
            line-height: 1.3;
          }

          .card-subtitle {
            font-size: 0.9rem;
            margin-bottom: 1rem;
            color: #666;
            font-weight: 500;
          }

          .star-rating {
            display: flex;
            gap: 8px;
            margin-bottom: 1rem;
          }

          .star {
            font-size: 1.3rem;
            color: #ffc107;
            animation: twinkle 1.5s infinite;
          }

          .star:nth-child(2) {
            animation-delay: 0.3s;
          }
          .star:nth-child(3) {
            animation-delay: 0.6s;
          }
          .star:nth-child(4) {
            animation-delay: 0.9s;
          }
          .star:nth-child(5) {
            animation-delay: 1.2s;
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }

          .card-text {
            font-size: 0.95rem;
            line-height: 1.7;
            color: #333;
            flex-grow: 1;
            text-align: justify;
          }

          .testimonial-card:hover {
            transform: translateY(-8px);
            background-color: #000;
            color: white;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          }

          .testimonial-card:hover .card-title,
          .testimonial-card:hover .card-text {
            color: white;
          }

          .testimonial-card:hover .card-subtitle {
            color: #ccc;
          }

          .testimonial-card:hover .star {
            color: #ffd700;
          }

          /* Swiper Navigation Styling */
          :global(.swiper-button-next),
          :global(.swiper-button-prev) {
            color: #000 !important;
            background: rgba(0, 0, 0, 0.15) !important;
            width: 50px !important;
            height: 50px !important;
            border-radius: 50% !important;
            top: 50% !important;
            transform: translateY(-50%);
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 10 !important;
          }

          :global(.swiper-button-next::after),
          :global(.swiper-button-prev::after) {
            font-size: 20px !important;
            font-weight: bold !important;
          }

          :global(.swiper-button-next:hover),
          :global(.swiper-button-prev:hover) {
            background: rgba(0, 0, 0, 0.3) !important;
          }

          @media (max-width: 768px) {
            .testimonial-card {
              min-height: 320px;
              padding: 1.5rem;
            }

            .card-title {
              font-size: 1rem;
            }

            .card-subtitle {
              font-size: 0.85rem;
            }

            .card-text {
              font-size: 0.9rem;
              line-height: 1.6;
            }

            :global(.swiper-button-next),
            :global(.swiper-button-prev) {
              width: 40px !important;
              height: 40px !important;
            }
          }

          .bg-white {
            background-color: white !important;
          }

          .animate-up {
            opacity: 1;
          }
        `}</style>
        <div className="reveal-text text-center">
          <h1
            className="display-4 font-weight-bold"
            style={{
              WebkitTextStroke: "2px black",
              color: "transparent",
              fontWeight: 900,
            }}
          >
            CLIENT
          </h1>
          <h2
            className="display-3 font-weight-bold"
            style={{ fontWeight: 900 }}
          >
            FEEDBACK
          </h2>
        </div>
      </div>

      <div className="container">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            320: { 
              slidesPerView: 1, 
              spaceBetween: 15 
            },
            768: { 
              slidesPerView: 3, 
              spaceBetween: 20 
            },
          }}
          style={{ paddingBottom: '50px' }}
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="card-body-custom d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title font-weight-bold animate-up">
                      {feedback.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 animate-up">
                      {feedback.title}
                    </h6>
                    <div className="star-rating text-warning mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="star"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="card-text mt-auto animate-up">
                    {feedback.review}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientFeedback;
