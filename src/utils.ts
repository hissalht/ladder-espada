export function bleachify(text: string): string {
  return text.replaceAll("a", '<span class="obl">a</span>');
  return text.replaceAll("A", '<span class="obl">A</span>');
}
