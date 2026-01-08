export const BRAND_COLORS = {
  moodBrown: '#7b4a38',
  moodDarkBrown: '#472f27',
  moodBackground: '#f4ece5',
  cardBackground: '#f6f4f0',
  textColor: '#434343',
  buttonTextColor: '#eeebe3',
}

export const MOODBOX_LOGO_SVG = `
<svg style="height: 40px; width: auto;" version="1.1" viewBox="800 400 400 400" xmlns="http://www.w3.org/2000/svg">
  <path transform="translate(948,614)" d="m0 0h224l9 3 4 5 2 7v142l-2 7-5 5-3 2-5 1h-223l-9-3-5-6-1-2v-150l4-6 5-4z" fill="#472927"/>
  <path transform="translate(825,414)" d="m0 0h153l5 3 5 6 1 6v144l-2 8-7 6-8 2h-141l-8-2-5-3-3-5-1-4v-148l3-7 5-5z" fill="#472927"/>
  <path transform="translate(828,614)" d="m0 0h65l8 3 4 5 2 6v145l-3 7-5 5-3 1h-72l-7-5-3-6v-149l3-6 5-4z" fill="#472927"/>
  <path transform="translate(1027,513)" d="m0 0h148l8 5 3 7v51l-4 8-6 4h-149l-6-3-4-6-1-3v-51l4-8z" fill="#472927"/>
  <path transform="translate(1026,414)" d="m0 0h150l6 4 4 6v54l-4 6-6 4h-150l-6-4-3-4-1-3v-53l4-6z" fill="#472927"/>
</svg>`

export type EmailItemT =
  | { type: 'text'; content: string; bold?: boolean; marginBottom?: string }
  | { type: 'button'; label: string; url: string }
  | { type: 'raw'; html: string }

type RenderLayoutPropsT = {
  title?: string
  items: EmailItemT[]
  footer?: string
}

export function renderBaseLayout({ title, items, footer }: RenderLayoutPropsT): string {
  const contentHtml = items
    .map((item) => {
      if (item.type === 'text') {
        const margin = item.marginBottom ?? '15px'
        const boldStyle = item.bold ? 'font-weight: bold;' : ''

        return `
          <p 
            style="
              color: ${BRAND_COLORS.textColor};
              font-size: 16px;
              line-height: 1.6;
              margin: 0px;
              margin-bottom: ${margin};
              ${boldStyle}
            "
          >
            ${item.content}
          </p>`
      }

      if (item.type === 'button') {
        return `
          <p style="margin: 32px 0; text-align: center;">
            <a 
              href="${item.url}" 
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
              ${item.label}
            </a>
          </p>`
      }

      if (item.type === 'raw') {
        return item.html
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
