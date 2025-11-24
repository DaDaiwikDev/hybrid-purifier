// SAFETY MODE: Broken library removed.
// We are using CSS native smooth scrolling instead.
export default function SmoothScroll({ children }) {
  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {children}
    </div>
  )
}