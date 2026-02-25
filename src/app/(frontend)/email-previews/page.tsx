'use client'

import React, { useState } from 'react'
import { generatePostOrderEmailHTML } from '@/utilities/email_templates/templates/postOrder'
import { generateDiscountCodeEmailHTML } from '@/utilities/email_templates/templates/discountCode'
import { notFound } from 'next/navigation'

const PREVIEW_SURVEY_CONTENT = {
  title: 'Dziękujemy za skorzystanie z Moodbox Polska.',
  paragraph1:
    'Jesteśmy na etapie pilotażu i rozwijamy Moodbox w oparciu o realne doświadczenia projektantów.',
  paragraph2:
    'Twoja opinia pomaga nam lepiej zrozumieć potrzeby i kierunek dalszego rozwoju Moodboxa.',
  paragraph3: 'Wypełnienie ankiety zajmie tylko około 2–3 minut.',
  paragraph4: 'Po jej wypełnieniu otrzymasz kod rabatowy na kolejne zamówienie w Moodbox Polska.',
  buttonLabel: 'WYPEŁNIJ ANKIETĘ',
  footer: 'Zespół Moodbox Polska',
}

const PREVIEW_DISCOUNT_CONTENT = {
  greeting: 'Dzień dobry,',
  thankYou: 'Dziękujemy za wypełnienie ankiety.',
  codeIntro: 'Przesyłamy indywidualny kod rabatowy na kolejne zamówienie w Moodbox Polska:',
  codeActiveNote: 'Kod jest aktywny i gotowy do użycia przy składaniu zamówienia.',
  codeValidityNote: 'Ważny przez 30 dni od daty otrzymania tej wiadomości.',
  closingNote: 'Jeśli pojawią się pytania - jesteśmy do dyspozycji.',
  buttonLabel: 'ZAMÓW MOODBOX',
  footer: 'Zespół Moodbox Polska',
}

const templates = [
  {
    id: 'post-order',
    name: 'Post-Order Survey',
    generate: () =>
      generatePostOrderEmailHTML('https://moodbox.pl/ankieta/test-token', PREVIEW_SURVEY_CONTENT),
  },
  {
    id: 'discount-code',
    name: 'Discount Code',
    generate: () =>
      generateDiscountCodeEmailHTML('MOOD-123-ABC', PREVIEW_DISCOUNT_CONTENT, 'https://moodbox.pl'),
  },
]

export default function EmailPreviewsPage() {
  if (process.env.NODE_ENV !== 'development') notFound()

  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id)

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0]
  const html = selectedTemplate.generate()

  return (
    <div className="flex flex-col h-screen bg-gray-100 pt-20">
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Email Template Gallery</h1>
        <div className="flex gap-4">
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="border rounded p-2 bg-white"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="flex-1 flex p-8 gap-8 overflow-hidden">
        {/* Preview Container */}
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-gray-50 border-b p-2 text-xs text-gray-500 flex justify-between">
            <span>Desktop Preview (600px centered)</span>
            <span>Template: {selectedTemplate.name}</span>
          </div>
          <iframe title="Email Preview" srcDoc={html} className="w-full h-full border-none" />
        </div>

        {/* Info Panel */}
        <div className="w-80 flex flex-col gap-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(html)
                alert('HTML copied to clipboard!')
              }}
              className="w-full bg-mood-brown text-white p-2 rounded hover:bg-mood-dark-brown transition"
            >
              Copy Raw HTML
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
