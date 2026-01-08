'use client'

import React, { useState } from 'react'
import { generatePostOrderEmailHTML } from '@/utilities/email/templates/postOrder'
import { generateDiscountCodeEmailHTML } from '@/utilities/email/templates/discountCode'

const templates = [
  {
    id: 'post-order',
    name: 'Post-Order Survey',
    generate: () => generatePostOrderEmailHTML('https://moodbox.pl/ankieta/test-token'),
  },
  {
    id: 'discount-code',
    name: 'Discount Code',
    generate: () => generateDiscountCodeEmailHTML('MOOD-123-ABC'),
  },
]

export default function EmailPreviewsPage() {
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
