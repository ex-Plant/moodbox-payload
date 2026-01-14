/**
 * Escapes a value for CSV format according to RFC 4180
 * - Converts null/undefined to empty string
 * - Wraps values containing commas, quotes, or newlines in double quotes
 * - Escapes internal quotes by doubling them
 */
export function escapeCSVValue(value: unknown): string {
  // Convert to string and handle null/undefined
  const stringValue = value == null ? '' : String(value)

  // Check if the value needs to be quoted (contains special characters)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Escape quotes by doubling them and wrap in quotes
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}
