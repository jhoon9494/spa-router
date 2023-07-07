import useRouter from '../hooks/useRouter';

const About = () => {
  const { push } = useRouter();
  const handleClick = (path: string) => {
    push(path);
  };

  return (
    <div>
      <div>About 컴포넌트입니다.</div>
      <button onClick={() => handleClick('/')}>go Root</button>
    </div>
  );
};

export default About;
