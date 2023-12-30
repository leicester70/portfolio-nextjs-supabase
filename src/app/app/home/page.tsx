"use client";

export default function Home() {
  return (
    <>
      <h1>{Home.name}</h1>

      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        <section>
          <h2>Section Title</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc id tristique.
          </p>
        </section>

        <article>
          <h3>Article Title</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, nunc id tristique.
          </p>
        </article>
      </main>

      <aside>
        <h4>Aside Title</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nunc id tristique.
        </p>
      </aside>

      <footer>
        <p>Copyright &copy; 2022</p>
      </footer>
    </>
  );
}
