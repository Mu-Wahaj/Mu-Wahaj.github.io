import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export const NotFoundPage = () => (
  <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-6 py-16 text-center">
    <Seo title="404 | Muhammad Wahaj" description="Page not found" path="/404" />
    <div>
      <p className="text-sm uppercase tracking-[0.15em] text-cyan-200">404</p>
      <h1 className="mt-3 text-4xl font-semibold">Page Not Found</h1>
      <p className="mt-3 text-white/75">The page you requested doesn&apos;t exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-xl bg-cyan-400 px-4 py-2 text-black">Back Home</Link>
    </div>
  </section>
)
