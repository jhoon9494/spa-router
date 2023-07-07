import { Dispatch, ReactElement, SetStateAction, createContext, useEffect, useState } from 'react';
import NotFound from './NotFound';

type RouterContextType = null | { path: string; setPath: Dispatch<SetStateAction<string>> };

export const RouterContext = createContext<RouterContextType>(null);

export const Router = ({ children }: { children: ReactElement[] }) => {
  const [path, setPath] = useState(window.location.pathname);

  const handlePopstate = () => {
    setPath(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  const renderChild = children.find((c) => c.props.path === path);

  if (!renderChild) return <NotFound />;

  return <RouterContext.Provider value={{ path, setPath }}>{renderChild}</RouterContext.Provider>;
};

interface RouteProps {
  path: string;
  element: ReactElement;
}

export const Route = ({ element }: RouteProps) => {
  return <>{element}</>;
};
