"use client";

import React from 'react';
import Link from 'next/link';
import Books from '../books/books';

const SecondPage = () => {
  const categories = [
    { id: 1, name: 'Fiction', count: 42 },
    { id: 2, name: 'Non-Fiction', count: 38 },
    { id: 3, name: 'Science', count: 25 },
    { id: 4, name: 'Biography', count: 19 },
    { id: 5, name: 'Business', count: 31 },
    { id: 6, name: 'Technology', count: 27 },
  ];

  const featuredBooks = [
    { id: 1, title: 'The Silent Echo', author: 'Maya Rivers', price: '$24.99', discount: '$29.99', category: 'Fiction', imageColor: 'bg-blue-100' },
    { id: 2, title: 'Quantum Reality', author: 'Dr. Alex Chen', price: '$32.50', discount: '$39.99', category: 'Science', imageColor: 'bg-green-100' },
    { id: 3, title: 'Mindful Leadership', author: 'Sarah Johnson', price: '$27.99', discount: '$34.99', category: 'Business', imageColor: 'bg-purple-100' },
    { id: 4, title: 'The Last Horizon', author: 'James Wilson', price: '$21.99', discount: '$26.99', category: 'Fiction', imageColor: 'bg-yellow-100' },
  ];

  const testimonials = [
    { id: 1, text: 'Amazing collection! Found exactly what I was looking for.', author: 'David M.', role: 'Book Enthusiast' },
    { id: 2, text: 'Quality books with fast delivery. Highly recommended!', author: 'Priya S.', role: 'Regular Reader' },
    { id: 3, text: 'The categorization makes browsing so easy and enjoyable.', author: 'Michael T.', role: 'Literature Student' },
  ];

  return (
    <div className="book-collection-page">
      {/* Hero Section */}
      <section className="collection-hero">
        {/* <div className="hero-content">
          <h1 className="hero-title">Discover Your Next Favorite Book</h1>
          <p className="hero-subtitle">
            Explore thousands of books across all genres. From timeless classics to modern bestsellers.
          </p>
        </div> */}
      </section>

      {/* Categories Section */}
      {/* <section className="categories-section">
        <div className="section-header">
          <h2>Browse by Category</h2>
          <p>Find books that match your interests</p>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-icon">
                <span className="icon-text">{category.name.charAt(0)}</span>
              </div>
              <h3>{category.name}</h3>
              <p>{category.count} books</p>
              <Link href={`/category/${category.id}`} className="category-link">
                View All →
              </Link>
            </div>
          ))}
        </div>
      </section> */}

      {/* Featured Books */}
      {/* <section className="featured-section">
        <div className="section-header">
          <h2>Featured Books</h2>
          <p>Curated selection of our bestsellers</p>
        </div>
        <div className="featured-grid">
          {featuredBooks.map((book) => (
            <div key={book.id} className="featured-book">
              <div className={`book-cover ${book.imageColor}`}>
                <div className="book-title-short">{book.title.split(' ').map(word => word.charAt(0)).join('')}</div>
              </div>
              <div className="book-details">
                <span className="book-category">{book.category}</span>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <div className="book-price">
                  <span className="current-price">{book.price}</span>
                  <span className="original-price">{book.discount}</span>
                </div>
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="testimonials-section">
        <div className="section-header">
          <h2>What Readers Say</h2>
          <p>Join our community of happy readers</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="cta-section">
        <h2>Start Your Reading Journey Today</h2>
        <p>Get 20% off your first order when you sign up for our newsletter</p>
        <div className="cta-buttons">
          <button className="primary-cta">Browse All Books</button>
          <button className="secondary-cta">Sign Up for Newsletter</button>
        </div>
      </section> */}
      <></>
      <Books></Books>

      <style jsx>{`
        .book-collection-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Hero Section */
        .collection-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto 30px;
          opacity: 0.9;
        }

        /* Common Section Styles */
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a202c;
        }

        .section-header p {
          color: #718096;
          font-size: 1.1rem;
        }

        /* Categories */
        .categories-section {
          padding: 80px 20px;
          background: #f8fafc;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .category-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          background: #4299e1;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .category-card h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
          color: #2d3748;
        }

        .category-card p {
          color: #718096;
          margin-bottom: 15px;
        }

        .category-link {
          color: #4299e1;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }

        .category-link:hover {
          color: #2b6cb0;
        }

        /* Featured Books */
        .featured-section {
          padding: 80px 20px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .featured-book {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s;
        }

        .featured-book:hover {
          transform: translateY(-5px);
        }

        .book-cover {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .book-title-short {
          font-size: 2.5rem;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.3);
        }

        .book-details {
          padding: 20px;
        }

        .book-category {
          font-size: 0.8rem;
          color: #4299e1;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .book-title {
          font-size: 1.2rem;
          margin: 10px 0 5px;
          color: #2d3748;
        }

        .book-author {
          color: #718096;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }

        .book-price {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .current-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2d3748;
        }

        .original-price {
          font-size: 0.9rem;
          color: #a0aec0;
          text-decoration: line-through;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 12px;
          background: #48bb78;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .add-to-cart-btn:hover {
          background: #38a169;
        }

        /* Testimonials */
        .testimonials-section {
          padding: 80px 20px;
          background: #f8fafc;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: 0px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .quote-icon {
          font-size: 3rem;
          color: #cbd5e0;
          position: absolute;
          top: -15px;
          left: 50px;
          font-family: Georgia, serif;
        }

        .testimonial-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4a5568;
          margin-bottom: 20px;
        }

        .testimonial-author {
          border-top: 1px solid #e2e8f0;
          padding-top: 15px;
        }

        .testimonial-author strong {
          display: block;
          color: #2d3748;
        }

        .testimonial-author span {
          color: #718096;
          font-size: 0.9rem;
        }

        /* CTA Section */
        // .cta-section {
        //   padding: 80px 20px;
        //   text-align: center;
        //   background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        //   color: white;
        // }

        // .cta-section h2 {
        //   font-size: 2.2rem;
        //   margin-bottom: 20px;
        // }

        // .cta-section p {
        //   font-size: 1.2rem;
        //   max-width: 600px;
        //   margin: 0 auto 40px;
        //   opacity: 0.9;
        // }

        // .cta-buttons {
        //   display: flex;
        //   gap: 20px;
        //   justify-content: center;
        // }
.cta-section {
  padding: 50px 10px;
  text-align: center;
  background: linear-gradient(135deg, #eaf3ffff 0%, #f5576c 100%);
  color: white;
}

.cta-section h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 700;
}

.cta-section p {
  font-size: 1rem;
  max-width: 500px;
  margin: 0 auto 30px;
  opacity: 0.9;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

/* Desktop hover effects */
@media (min-width: 769px) {
  .cta-section {
    padding: 50px 20px;
  }
  
  .cta-section h2 {
    font-size: 1.6rem;
  }
  
  .cta-section p {
    font-size: 0.95rem;
    margin-bottom: 25px;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .cta-section {
    padding: 50px 20px;
  }
  
  .cta-section h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  
  .cta-section p {
    font-size: 0.95rem;
    margin-bottom: 25px;
    padding: 0 10px;
  }
  
  .cta-buttons {
    gap: 12px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .cta-section {
    padding: 40px 15px;
  }
  
  .cta-section h2 {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
  
  .cta-section p {
    font-size: 0.9rem;
    margin-bottom: 25px;
    padding: 0 5px;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 12px;
    max-width: 300px;
    margin: 0 auto;
  }
}

/* Extra Small Mobile */
@media (max-width: 360px) {
  .cta-section {
    padding: 35px 12px;
  }
  
  .cta-section h2 {
    font-size: 1.3rem;
  }
  
  .cta-section p {
    font-size: 0.85rem;
  }
  
  .cta-buttons {
    gap: 10px;
  }
}
        .primary-cta, .secondary-cta {
          padding: 12px 24px;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: auto;
          min-width: 160px;
        }

        .primary-cta {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .secondary-cta {
          background: rgba(255, 255, 255, 0.15);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
        }

        .primary-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          background: linear-gradient(135deg, #5a6fd8 0%, #6a4290 100%);
        }

        .secondary-cta:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.25);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .categories-grid,
          .featured-grid,
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          .primary-cta, .secondary-cta {
            padding: 10px 20px;
            font-size: 0.9rem;
            min-width: 140px;
            border-radius: 6px;
          }

          .cta-buttons {
            flex-direction: row;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .categories-grid,
          .featured-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .collection-hero {
            padding: 40px 15px;
          }

          .categories-section,
          .featured-section,
          .testimonials-section {
            padding: 50px 15px;
          }

          .category-card,
          .featured-book,
          .testimonial-card {
            padding: 20px;
          }

          .cta-section {
            padding: 60px 15px;
          }

          .cta-section h2 {
            font-size: 1.8rem;
          }

          .cta-section p {
            font-size: 1rem;
          }

          .primary-cta, .secondary-cta {
            padding: 10px 18px;
            font-size: 0.85rem;
            min-width: 130px;
            width: 100%;
            max-width: 180px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
            .cta-section {
  padding: 50px 20px;
  text-align: center;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.cta-section h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2d3748;
  font-weight: 600;
}

.cta-section p {
  font-size: 0.95rem;
  max-width: 500px;
  margin: 0 auto 25px;
  color: #718096;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.primary-cta, .secondary-cta {
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.primary-cta {
  background: #4299e1;
  color: white;
}

.primary-cta:hover {
  background: #3182ce;
}

.secondary-cta {
  background: transparent;
  color: #4299e1;
  border: 1px solid #4299e1;
}

.secondary-cta:hover {
  background: #ebf8ff;
  border-color: #3182ce;
}

/* Mobile */
@media (max-width: 768px) {
  .cta-section {
    padding: 40px 15px;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 12px;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .primary-cta, .secondary-cta {
    padding: 12px;
    width: 100%;
  }
}
        }
      `}</style>
    </div>
  );
};

// Make sure this export default exists
export default SecondPage;

