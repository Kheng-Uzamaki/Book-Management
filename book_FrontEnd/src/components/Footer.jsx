import React from "react";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "var(--navbar_background)",
    color: "var(--navbar_text)",
    textAlign: "center",
    padding: "40px 0",
    // position: "fixed",
    // left: 0,
    // bottom: 0,
    borderTop:"var(--bt)",
    width: "100%",
  };

  return (
    <div style={footerStyle}>
      <p>&copy; 2024 Open Book. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
