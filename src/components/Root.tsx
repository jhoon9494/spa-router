import useRouter from '../hooks/useRouter';

const Root = () => {
  const { push } = useRouter();
  const handleClick = (path: string) => {
    push(path);
  };

  return (
    <div className="container">
      <h2>Root</h2>
      <button onClick={() => handleClick('/about')}>go About</button>
    </div>
  );
};

export default Root;
