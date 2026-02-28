"use client";

import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaBookOpen } from 'react-icons/fa';
import Books from '../books/books';

interface Slide {
  img: string;
  title: string;
  desc: string;
  cta: string;
}

const Home = () => {
  const slides: Slide[] = [
    {
      img: "/assets/images/slider1.png",
      title: "Discover Your Next Favorite Book",
      desc: "Explore thousands of stories, knowledge, and imagination—all in one place.",
      cta: "Browse Collection"
    },
    {
      img: "/assets/images/slider2.png",
      title: "A World of Books Awaits You",
      desc: "From classics to modern bestsellers, dive into the universe of reading.",
      cta: "Explore Now"
    },
    {
      img: "/assets/images/slider3.jpg",
      title: "Unlock the Power of Reading",
      desc: "Nurture your mind with books that inspire, educate, and empower.",
      cta: "Start Reading"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentSlide]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: "'Segoe UI', 'Roboto', 'Arial', sans-serif"
    }}>
      {/* Hero Slider Section */}
      <section style={{
        position: 'relative',
        height: '90vh',
        overflow: 'hidden',
        borderRadius: '0 0 20px 20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        {/* Slides Container */}
        <div style={{
          display: 'flex',
          height: '100%',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentSlide * 100}%)`,
          willChange: 'transform'
        }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                minWidth: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Background Image with Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.7)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(153, 187, 207, 0.85) 0%, rgba(0, 0, 0, 0.7) 100%)'
                }} />
              </div>

              {/* Content */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '1200px',
                width: '90%',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <FaBookOpen style={{ fontSize: '1.2rem', color: '#ffffff' }} />
                  <span style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    letterSpacing: '1px'
                  }}>
                    Welcome to BookHub
                  </span>
                </div>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {slide.title}
                </h1>

                <p style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: '2.5rem',
                  maxWidth: '800px',
                  margin: '0 auto 2.5rem',
                  lineHeight: '1.6'
                }}>
                  {slide.desc}
                </p>

                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#ffffff',
                  color: '#2c3e50',
                  border: 'none',
                  padding: '16px 36px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#99bbcf';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
                >
                  {slide.cta}
                  <FaArrowRight style={{ transition: 'transform 0.3s ease' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#99bbcf';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Previous slide"
        >
          <FaChevronLeft style={{ fontSize: '1.2rem', color: '#2c3e50' }} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#99bbcf';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Next slide"
        >
          <FaChevronRight style={{ fontSize: '1.2rem', color: '#2c3e50' }} />
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentSlide === index ? '30px' : '12px',
                height: '12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          zIndex: 10
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            transformOrigin: 'left',
            animation: 'progress 5s linear infinite',
            animationPlayState: isTransitioning ? 'paused' : 'running'
          }} />
        </div>
    
      </section>

  
    <Books />
      {/* Add CSS Animation for Progress Bar */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        
        @media (max-width: 768px) {
          section:first-child {
            height: 70vh;
          }
          
          button {
            padding: 14px 28px !important;
            font-size: 1rem !important;
          }
          
          .navigation-buttons {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          section:first-child {
            height: 60vh;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;