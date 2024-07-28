import React from "react";
import "../../global/styles/index.css";

function Navbar(props) {
  const { name, options } = props;

  return (
    <div style={styles.container}>
      <div style={styles.title}>{name}</div>
      <div>
        {options.map((option) => (
          <a href={option.URL} key={option.name} style={styles.link}>
            {option.name}
          </a>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "var(--color-primary)",
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 2rem",
    boxShadow: "0 2px 4px rgba(97, 97, 97, 0.2)",
    width: "100%",
  },
  title: {
    color: "var(--color-secondary)",
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  link: {
    textDecoration: "none",
    color: "var(--color-secondary)",
    fontSize: "1.2rem",
    marginLeft: "1rem",
  },
};
export default Navbar;
