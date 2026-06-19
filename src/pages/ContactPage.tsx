import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import { Seo } from '../components/Seo'
import { profile } from '../data/profile'
import { trackEvent } from '../utils/analytics'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
})

type ContactForm = z.infer<typeof schema>

export const ContactPage = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '', company: '' },
  })

  const onSubmit = async (data: ContactForm) => {
    if (data.company) {
      return
    }

    setStatus('sending')

    try {
      const formspree = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
      if (formspree) {
        const response = await fetch(formspree, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }),
        })

        if (!response.ok) {
          throw new Error('Submission failed')
        }
      } else {
        const service = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
        const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
        const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

        if (!service || !template || !key) {
          throw new Error('Missing form provider configuration')
        }

        await emailjs.send(
          service,
          template,
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: profile.email,
          },
          { publicKey: key },
        )
      }

      trackEvent('contact_submission', { method: 'contact_form' })
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Seo title="Contact | Muhammad Wahaj" description="Contact Muhammad Wahaj via validated form with spam protection." path="/contact" />
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-white/75">Let&apos;s build impactful products together.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input {...register('company')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <label className="block">
          <span className="mb-1 block text-sm text-white/75">Name</span>
          <input {...register('name')} className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" />
          {errors.name ? <span className="mt-1 text-sm text-red-300">{errors.name.message}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-white/75">Email</span>
          <input {...register('email')} className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" />
          {errors.email ? <span className="mt-1 text-sm text-red-300">{errors.email.message}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-white/75">Subject</span>
          <input {...register('subject')} className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" />
          {errors.subject ? <span className="mt-1 text-sm text-red-300">{errors.subject.message}</span> : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-white/75">Message</span>
          <textarea {...register('message')} rows={6} className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3" />
          {errors.message ? <span className="mt-1 text-sm text-red-300">{errors.message.message}</span> : null}
        </label>

        <button type="submit" disabled={status === 'sending'} className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-black disabled:opacity-65">
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>

        {status === 'success' ? <p className="text-sm text-emerald-300">Message sent successfully.</p> : null}
        {status === 'error' ? <p className="text-sm text-red-300">Submission failed. Configure EmailJS or Formspree environment variables.</p> : null}
      </form>
    </section>
  )
}
