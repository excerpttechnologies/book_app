// // "use client";
// import React from "react";

// const blogs = [
//   {
//     id: 1,
//     title: "How to Choose the Perfect Book for Your Reading Style",
//     image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop",
//     category: "Reading Tips",
//     description: "Finding the right book keeps you engaged and helps build a long-lasting reading habit.",
//     date: "Dec 01, 2024",
//   },
//   {
//     id: 2,
//     title: "Top 10 Inspirational Books That Will Change Your Life",
//     image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w-600&auto=format&fit=crop",
//     category: "Top Picks",
//     description: "From timeless classics to modern masterpieces, here's our list of must-read transformative books.",
//     date: "Nov 22, 2024",
//   },
//   {
//     id: 3,
//     title: "Benefits of Reading Books Every Day",
//     image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop",
//     category: "Health",
//     description: "Daily reading boosts your brain, reduces stress, improves focus, and enhances creativity.",
//     date: "Oct 10, 2024",
//   },
//   {
//     id: 4,
//     title: "Top Fiction Books to Read in 2024",
//     image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop",
//     category: "Fiction",
//     description: "Looking for thrilling fiction? We bring you the best stories with unforgettable characters.",
//     date: "Aug 07, 2024",
//   },
//   {
//     id: 5,
//     title: "Building a Personal Library at Home",
//     image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop",
//     category: "Lifestyle",
//     description: "Tips and ideas for creating your own reading space and organizing your book collection.",
//     date: "Jul 15, 2024",
//   },
//   {
//     id: 6,
//     title: "Interview with Award-Winning Author",
//     image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=600&auto=format&fit=crop",
//     category: "Author Stories",
//     description: "Exclusive conversation about writing process, inspiration, and upcoming projects.",
//     date: "Jun 28, 2024",
//   },
// ];

// export default function BlogPage() {
//   return (
//     <div className="blogs-container">
//       <header className="blogs-header">
//         <h1>Book Blog</h1>
//         <p>Reading tips, recommendations, and literary insights</p>
//       </header>

//       <div className="blogs-grid">
//         {blogs.map((item) => (
//           <article key={item.id} className="blog-card">
//             <div className="blog-image-container">
//               <img src={item.image} alt={item.title} className="blog-image" />
//               <span className="blog-category">{item.category}</span>
//             </div>
            
//             <div className="blog-content">
//               <div className="blog-meta">
//                 <span className="blog-date">{item.date}</span>
//               </div>
              
//               <h2 className="blog-title">{item.title}</h2>
              
//               <p className="blog-description">{item.description}</p>
              
//               <a className="blog-read-more">
//                 Read Article →
//               </a>
//             </div>
//           </article>
//         ))}
//       </div>
      
//       <style jsx>{`
//         .blogs-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 40px 20px;
//         }
        
//         .blogs-header {
//           text-align: center;
//           margin-bottom: 50px;
//         }
        
//         .blogs-header h1 {
//           font-size: 2rem;
//           color: #1a202c;
//           margin-bottom: 10px;
//           font-weight: 600;
//         }
        
//         .blogs-header p {
//           color: #718096;
//           font-size: 1rem;
//         }
        
//         .blogs-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 30px;
//         }
        
//         .blog-card {
//           background: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//           transition: box-shadow 0.2s ease;
//         }
        
//         .blog-card:hover {
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }
        
//         .blog-image-container {
//           position: relative;
//           height: 200px;
//           overflow: hidden;
//         }
        
//         .blog-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
        
//         .blog-category {
//           position: absolute;
//           top: 15px;
//           left: 15px;
//           background: #4299e1;
//           color: white;
//           padding: 4px 12px;
//           border-radius: 4px;
//           font-size: 0.8rem;
//           font-weight: 500;
//         }
        
//         .blog-content {
//           padding: 20px;
//         }
        
//         .blog-meta {
//           margin-bottom: 10px;
//         }
        
//         .blog-date {
//           color: #718096;
//           font-size: 0.85rem;
//         }
        
//         .blog-title {
//           font-size: 1.1rem;
//           color: #2d3748;
//           margin-bottom: 12px;
//           font-weight: 600;
//           line-height: 1.4;
//         }
        
//         .blog-description {
//           color: #4a5568;
//           font-size: 0.95rem;
//           line-height: 1.5;
//           margin-bottom: 15px;
//         }
        
//         .blog-read-more {
//           color: #4299e1;
//           font-size: 0.9rem;
//           font-weight: 500;
//           text-decoration: none;
//           display: inline-block;
//           cursor: pointer;
//         }
        
//         .blog-read-more:hover {
//           text-decoration: underline;
//         }
        
//         /* Responsive */
//         @media (max-width: 900px) {
//           .blogs-grid {
//             grid-template-columns: repeat(2, 1fr);
//             gap: 25px;
//           }
//         }
        
//         @media (max-width: 600px) {
//           .blogs-container {
//             padding: 30px 15px;
//           }
          
//           .blogs-header {
//             margin-bottom: 30px;
//           }
          
//           .blogs-header h1 {
//             font-size: 1.6rem;
//           }
          
//           .blogs-grid {
//             grid-template-columns: 1fr;
//             gap: 20px;
//           }
          
//           .blog-image-container {
//             height: 180px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import React from "react";
import "./blogs.css";

const blogs = [
  {
    id: 1,
    title: "How to Choose the Perfect Book for Your Reading Style",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop",
    category: "Reading Tips",
    description: "Finding the right book keeps you engaged and helps build a long-lasting reading habit.",
    date: "Dec 01, 2024",
  },
  {
    id: 2,
    title: "Top 10 Inspirational Books That Will Change Your Life",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop",
    category: "Top Picks",
    description: "From timeless classics to modern masterpieces, here's our list of must-read transformative books.",
    date: "Nov 22, 2024",
  },
  {
    id: 3,
    title: "Benefits of Reading Books Every Day",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop",
    category: "Health",
    description: "Daily reading boosts your brain, reduces stress, improves focus, and enhances creativity.",
    date: "Oct 10, 2024",
  },
  {
    id: 4,
    title: "Top Fiction Books to Read in 2024",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop",
    category: "Fiction",
    description: "Looking for thrilling fiction? We bring you the best stories with unforgettable characters.",
    date: "Aug 07, 2024",
  },
  {
    id: 5,
    title: "Building a Personal Library at Home",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Tips and ideas for creating your own reading space and organizing your book collection.",
    date: "Jul 15, 2024",
  },
  {
    id: 6,
    title: "Interview with Award-Winning Author",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=600&auto=format&fit=crop",
    category: "Author Stories",
    description: "Exclusive conversation about writing process, inspiration, and upcoming projects.",
    date: "Jun 28, 2024",
  },
];

export default function BlogPage() {
  return (
    <div className="blogs-container">
      <header className="blogs-header">
        <h1>Book Blog</h1>
        <p>Reading tips, recommendations, and literary insights</p>
      </header>

      <div className="blogs-grid">
        {blogs.map((item) => (
          <article key={item.id} className="blog-card">
            <div className="blog-image-container">
              <img src={item.image} alt={item.title} className="blog-image" />
              <span className="blog-category">{item.category}</span>
            </div>
            
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-date">{item.date}</span>
              </div>
              
              <h2 className="blog-title">{item.title}</h2>
              
              <p className="blog-description">{item.description}</p>
              
              <a className="blog-read-more">
                Read Article →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}