import { useEffect } from 'react'; import { useRouter } from 'next/router'; export default function Home(){ const r=useRouter(); useEffect(() => {
  const go = async () => {
    await r.replace('/products');
  };
  go();
}, [r]); return null }
