import { useContext } from 'react';
import { RouterContext } from '../components/Router';

const useRouter = () => {
  const contextValue = useContext(RouterContext);

  if (!contextValue) {
    throw new Error('RouterContextProvider not found.');
  }

  const push = (path: string) => {
    window.history.pushState(null, '', path);
    contextValue?.setPath(path);
  };

  return { push };
};

export default useRouter;
