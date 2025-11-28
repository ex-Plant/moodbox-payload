const handleFileDownload = async (link: string, title: string) => {
  const res = await fetch(link)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)

  console.log('handleFileDownload.ts:9 - res:', res)
  const blob = await res.blob()

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = title
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

export default handleFileDownload
