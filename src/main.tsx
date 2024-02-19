import ReactDOM from 'react-dom/client';
import App from './App.tsx';
/*
const { DEV } = import.meta.env;
import { worker } from './mocks/browser.ts';
if (DEV) {
  worker.start();
}
*/
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
