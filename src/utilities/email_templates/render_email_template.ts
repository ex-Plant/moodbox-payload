import { BRAND_COLORS, MOODBOX_LOGO_SVG, EmailItemT } from './email_templates_constants'

type PropsT = {
  title?: string
  items: EmailItemT[]
  footer?: string
}

export function renderEmailTemplate({ title, items, footer }: PropsT): string {
  const contentHtml = items
    .map((el) => {
      if (el.type === 'text') {
        const margin = el.marginBottom ?? '15px'
        const boldStyle = el.bold ? 'font-weight: bold;' : ''

        return `
          <p 
            style="
              color: ${BRAND_COLORS.textColor};
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: ${margin};
              ${boldStyle}
            "
          >
            ${el.content}
          </p>`
      }

      if (el.type === 'button') {
        return `
          <p style="margin: 32px 0; text-align: center;">
            <a 
              href="${el.url}" 
              style="
                background-color: ${BRAND_COLORS.moodBrown};
                color: ${BRAND_COLORS.buttonTextColor};
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
              "
            >
              ${el.label}
            </a>
          </p>`
      }

      if (el.type === 'raw') {
        return el.html
      }

      return ''
    })
    .join('\n')

  const titleHtml = title
    ? `
      <h1 
        style="
          color: ${BRAND_COLORS.moodDarkBrown};
          font-size: 28px;
          margin-bottom: 32px;
          text-align: center;
        "
      >
        ${title}
      </h1>`
    : ''

  const footerHtml = footer
    ? `
      <p 
        style="
          color: ${BRAND_COLORS.moodBrown};
          font-weight: bold;
          text-align: center;
          margin-top: 30px;
        "
      >
        ${footer}
      </p>`
    : ''

  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body 
            style="
              background-color: ${BRAND_COLORS.moodBackground};
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            "
          >
            <div 
              style="
                max-width: 600px;
                margin: 0 auto;
                background-color: ${BRAND_COLORS.cardBackground};
                padding: 30px;
                border-radius: 8px;
              "
            >
              <div style="text-align: center; margin-bottom: 20px;">
                ${MOODBOX_LOGO_SVG}
              </div>
              
              ${titleHtml}
              
              ${contentHtml}
              
              ${footerHtml}
            </div>
          </body>
        </html>`
}
