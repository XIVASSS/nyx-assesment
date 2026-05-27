export default function ManifestoBand() {
  return (
    <section className="bg-[var(--color-midnight-ink)] text-[var(--color-canvas-white)] py-16 sm:py-20">
      <div className="fold-container max-w-[900px] text-center">
        <h2
          className="text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-[1.2]"
          style={{ fontFamily: 'var(--font-gt-america)' }}
        >
          Our Goal
          <br />
          To separate anxiety from money.
        </h2>
        <p className="fold-body mt-6 !text-[rgba(255,255,255,0.7)] max-w-[560px] mx-auto">
          Tom & Jerry, Jim & Pam, Chai & Biscuit are examples of desirable pairs. An example of
          undesirable pair is money & anxiety. What can software and good design do to decimate
          the pair?
        </p>
        <a
          href="#"
          className="fold-link inline-block mt-8 font-bold"
          onClick={(e) => e.preventDefault()}
        >
          Read our manifesto
        </a>
      </div>
    </section>
  )
}
