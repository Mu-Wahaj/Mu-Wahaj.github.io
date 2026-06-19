import { Seo } from '../components/Seo'
import { trackEvent } from '../utils/analytics'

const resumeUrl = '/resume.pdf'

export const ResumePage = () => {
  const onDownload = () => trackEvent('resume_download', { source: 'resume_page' })
  const onPrint = () => {
    trackEvent('resume_print', { source: 'resume_page' })
    window.print()
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Seo title="Resume | Muhammad Wahaj" description="Resume of Muhammad Wahaj with download and print options." path="/resume" />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-semibold">Resume</h1>
        <div className="flex gap-3">
          <a href={resumeUrl} download onClick={onDownload} className="rounded-xl bg-cyan-400 px-4 py-2 font-medium text-black">Download</a>
          <button type="button" onClick={onPrint} className="rounded-xl border border-white/20 px-4 py-2">Print</button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <iframe title="Muhammad Wahaj resume" src={resumeUrl} className="h-[70vh] w-full" />
      </div>
    </section>
  )
}
