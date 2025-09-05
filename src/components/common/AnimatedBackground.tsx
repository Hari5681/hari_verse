import FloatingShapes from "./FloatingShapes";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="animated-gradient absolute inset-0 -z-20 h-full w-full" />
        <FloatingShapes />
    </div>
  );
};

export default AnimatedBackground;
