## 원티드 FE 챌린지 1주차 과제

### 🚩 과제 조건

#### React와 History API 사용하여 SPA Router 기능 구현하기

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>,
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

### 🤔 코드 설명

> Router.tsx

```tsx
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
      handlePopstate();
    };
  }, []);

  const renderChild = children.find((c) => c.props.path === window.location.pathname);

  if (!renderChild) return <NotFound />;

  return <RouterContext.Provider value={{ path, setPath }}>{renderChild}</RouterContext.Provider>;
};
```

- `useRouter` hook의 push 함수를 사용하여 변경시킨 path를 Router 컴포넌트에서 감지하고, 변경된 path에 맞는 컴포넌트를 렌더링시켜야 했다.

- root, about 등 여러 페이지에서 useRouter hook을 사용하더라도, 동일한 state(path)를 바라보고 있어야하므로 `context API`를 사용하여 구현했다.

- `popstate` 이벤트를 등록하여 뒤로가기, 앞으로가기 등 페이지 전환 이벤트를 감지

<br />

> useRouter.ts

```tsx
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
```

- `useContext`를 사용하여 context provider value에 담긴 path, setPath를 사용

- provider 외부에서 useRouter hook을 사용하는 것을 막기 위해 에러 처리
