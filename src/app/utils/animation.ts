export default function fadeUp(duration = 0.8, blur = false) {
  return {
    hidden: { opacity: 0, y: 30, filter: blur ? "blur(8px)" : "none" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration },
    },
  };
}
