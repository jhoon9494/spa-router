import useRouter from '../hooks/useRouter';

const About = () => {
  const { push } = useRouter();
  const handleClick = (path: string) => {
    push(path);
  };

  return (
    <div className="container">
      <h2>About</h2>
      <button onClick={() => handleClick('/')}>go Root</button>
    </div>
  );
};

export default About;
