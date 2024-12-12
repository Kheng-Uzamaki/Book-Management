

const Hero = () => {
  const styles = {
    heroContainer: {
      display: "flex",
      flexDirection: "column",
      //   justifyContent: "center",
      alignItems: "center",
      backgroundImage: 'url("../../public/getimage.webp")', // Replace with your library image
      backgroundSize: "contain", // This ensures the image scales to fit the container
      backgroundRepeat: "no-repeat", // Prevents the image from repeating
      backgroundPosition: "right bottom", // Centers the image in the container
      height: "100dvh",
      color: "#fff",
      padding: "20px",
      textAlign: "center",
    },
    heroTitle: {
      color: "var(--navbar_text)",
      fontSize: "4rem",
      padding: "40px",
      fontWeight: "bold",
      // marginBottom: "20px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
      fontFamily: "Sofadi One",
      border: "var(--border)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end", // Positions text at the bottom
      height: "30vh", // Takes full viewport height for proper bottom alignment
    },
  };


  return (
    <div style={styles.heroContainer}>
      <h1 style={styles.heroTitle}>Welcome to the Book Library</h1>
    </div>
  );
};

export default Hero;
