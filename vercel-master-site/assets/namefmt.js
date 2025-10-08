export function formatName({pattern, name, page, count, ext, date=new Date()}){
  const pad = (n)=> String(n).padStart(2,'0');
  const yyyy = date.getFullYear(), mm=pad(date.getMonth()+1), dd=pad(date.getDate());
  return pattern
    .replace(/\{name\}/g, name.replace(/\.[^.]+$/,''))
    .replace(/\{page\}/g, page ?? '')
    .replace(/\{count\}/g, count ?? '')
    .replace(/\{date\}/g, `${yyyy}-${mm}-${dd}`)
    .replace(/\{ext\}/g, ext.startsWith('.') ? ext : `.${ext}`);
}
