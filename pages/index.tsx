import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <ul>
          <li>
            <Link href="/planes">Planes</Link>
          </li>
          <li>
            <Link href="/iso">Iso</Link>
          </li>
          <li>
            <Link href="/cube">Cube</Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
