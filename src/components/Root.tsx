import useRouter from '../hooks/useRouter';

const Root = () => {
  const { push } = useRouter();
  const handleClick = (path: string) => {
    push(path);
  };

  return (
    <div>
      <div>Root 컴포넌트입니다</div>
      <button onClick={() => handleClick('/about')}>go About</button>
    </div>
  );
};

export default Root;
