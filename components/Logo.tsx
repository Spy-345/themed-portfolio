/** Custom path-drawn spy wordmark; shared by the header and footer. */
export default function Logo() {
  return <svg className="spy-logo" viewBox="0 0 132 64" fill="none" aria-hidden="true" focusable="false">
    <path className="logo-frame" d="M3 20V7a4 4 0 0 1 4-4h19M106 61h19a4 4 0 0 0 4-4V44" strokeWidth="1.5" />
    <g>
      <path d="M38 14H18L10 22V28L18 35H30V40H11V47H32L40 39V33L32 27H20L17 24L20 21H33Z" fill="var(--accent)" />
      <path d="M48 47V14H69L78 23V32L69 40H55V47ZM55 21V33H66L71 29V25L67 21Z" fill="var(--fg)" fillRule="evenodd" />
      <path d="M83 14H92L101 26L110 14H119L105 34V47H98V34Z" fill="var(--accent)" />
    </g>
  </svg>;
}
