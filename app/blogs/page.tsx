




"use client";

import React, { useState } from "react";
import "./blogs.css";

// Updated blog data with culturally appropriate images for Tamil and Telugu books
const blogs = [
  {
    id: 1,
    title: "திருக்குறள் (Thirukkural) - Tamil Classical Work",
    image:
      "/assets/images/Thirukkural-Kadavul-Vazhthu-Tamil.jpg", // Ancient manuscript image
    category: "Tamil Literature",
    language: "Tamil",
    author: "Thiruvalluvar",
    description:
      "Ancient Tamil classic consisting of 1330 couplets covering ethics, polity, love and wealth.",
    detailedText:
      "Thirukkural is one of the most revered ancient Tamil texts. It is divided into three books: Aram (virtue), Porul (polity and wealth), and Inbam (love). Each couplet is concise and profound, offering timeless wisdom. The work has been translated into multiple languages and continues to inspire readers worldwide.",
    date: "Ancient",
  },
  {
    id: 2,
    title: "பொன்னியின் செல்வன் (Ponniyin Selvan)",
    image:
      "/assets/images/KALKIS_PONNIYIN_SELVAN_Volume.jpg", // Temple architecture image
    category: "Tamil Historical Fiction",
    language: "Tamil",
    author: "Kalki Krishnamurthy",
    description:
      "A classic Tamil historical novel set in the Chola dynasty, full of intrigue and adventure.",
    detailedText:
      "Ponniyin Selvan is a monumental work in Tamil literature, serialized in the 1950s. It weaves a gripping tale of power, love, and betrayal during the Chola period. The characters like Vandiyadevan, Arulmozhivarman, and Nandini are vividly drawn, and the plot is filled with unexpected twists. The story brings the grandeur of the Chola empire to life.",
    date: "1950s",
  },
  {
    id: 3,
    title: "మహాప్రస్థానం (Mahaprasthanam) - Telugu Poetry",
    image:
      "/assets/images/Mahaprasthanam.jpg", // Colorful books image
    category: "Telugu Poetry",
    language: "Telugu",
    author: "Sri Sri",
    description:
      "A landmark collection of Telugu poems that revolutionized modern Telugu literature.",
    detailedText:
      "Mahaprasthanam by Sri Sri (Srirangam Srinivasa Rao) is a path-breaking work that brought modernist poetry to Telugu in the 20th century. It reflects social realities, protests against injustice, and explores human emotions with powerful imagery and new rhythms. This collection marked a turning point in Telugu literature and inspired generations of poets.",
    date: "20th Century",
  },
  {
    id: 4,
    title: "రామాయణం (Ramayanam) - Telugu Epic",
    image:
      "/assets/images/Ramayanam.jpg", // Traditional art/image
    category: "Telugu Epic",
    language: "Telugu",
    author: "Valmiki (Translated)",
    description:
      "The timeless epic of Rama, Sita, and Lakshmana, cherished in Telugu households for centuries.",
    detailedText:
      "The Ramayana is not just a story but a cultural touchstone in India. This Telugu translation/adaptation captures the devotion, drama, and dharma of the original Sanskrit epic, making it accessible to Telugu readers. The epic follows Rama's exile, Sita's abduction by Ravana, and the eventual battle to rescue her, teaching valuable lessons about duty, loyalty, and righteousness.",
    date: "Ancient",
  },
  {
    id: 5,
    title: "சிலப்பதிகாரம் (Silappathikaram)",
    image:
      "/assets/images/silappatikaram.jpg", // Ancient Tamil script image
    category: "Tamil Epic",
    language: "Tamil",
    author: "Ilango Adigal",
    description:
      "One of the five great epics of Tamil literature, telling the story of Kannagi and Kovalan.",
    detailedText:
      "Silappathikaram is a Jain epic from the Sangam period that revolves around the lives of Kovalan and Kannagi. It provides a vivid picture of Tamil society, music, and culture from that era. The story of Kannagi's vengeance against the Pandya kingdom for her husband's unjust execution is legendary. The epic is divided into three books set in the capitals of the three Tamil kingdoms.",
    date: "Sangam Period",
  },
  {
    id: 6,
    title: "కన్యాశుల్కం (Kanyasulkam) - Telugu Play",
    image:
      "/assets/images/Kanyasulkam.jfif", // Theater/stage image
    category: "Telugu Drama",
    language: "Telugu",
    author: "Gurajada Apparao",
    description:
      "A landmark social play that addresses issues like bride price and caste in colonial India.",
    detailedText:
      "Kanyasulkam is the first major social play in Telugu, first performed in 1892. It brilliantly satirizes social evils like bride price (kanyasulkam), caste discrimination, and hypocrisy while showcasing the dialects and manners of the time. Its characters, like Girisam and Madhuravani, are unforgettable. The play remains relevant even today and is considered a masterpiece of Indian literature.",
    date: "1892",
  },
];

// Define the Blog interface
interface Blog {
  id: number;
  title: string;
  image: string;
  category: string;
  language: string;
  author: string;
  description: string;
  detailedText: string;
  date: string;
}

export default function BlogPage() {
  const [selectedBook, setSelectedBook] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadClick = (book: Blog) => {
    setSelectedBook(book);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="blogs-container">
      <header className="blogs-header">
        <h1>🕉️ Om Spiritual -  Book Blog</h1>
        <p>Explore the richness of  literature • Spiritual • Classical • Modern</p>
      </header>

      <div className="blogs-grid">
        {blogs.map((item) => (
          <article key={item.id} className="blog-card">
            <div className="blog-image-container">
              <img src={item.image} alt={item.title} className="blog-image" />
              <span className="blog-category">{item.category}</span>
              <span className="blog-language">{item.language}</span>
            </div>

            <div className="blog-content">
              <div className="blog-meta">
               
                <span className="blog-author">By {item.author}</span>
              </div>

              <h2 className="blog-title">{item.title}</h2>

              <p className="blog-description">{item.description}</p>

              <button
                className="blog-read-more"
                onClick={() => handleReadClick(item)}
              >
                Read Details →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal / Popup for detailed view */}
      {isModalOpen && selectedBook && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseDetails}>
              ×
            </button>
            <div className="modal-header">
              <h2>{selectedBook.title}</h2>
              <p className="modal-subtitle">
                <span className="modal-language">{selectedBook.language}</span> •{" "}
                <span className="modal-category">{selectedBook.category}</span> •{" "}
                <span className="modal-author">By {selectedBook.author}</span> •{" "}
                <span className="modal-date">{selectedBook.date}</span>
              </p>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  className="modal-image"
                />
              </div>
              <div className="modal-text-content">
                <p className="modal-description">
                  <strong>Brief:</strong> {selectedBook.description}
                </p>
                <p className="modal-detailed-text">
                  <strong>Detailed Information:</strong> {selectedBook.detailedText}
                </p>
                <div className="modal-footer">
                  <p className="modal-footer-note">
                    — Om Spiritual Library • Preserving Tamil & Telugu Literary Heritage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}