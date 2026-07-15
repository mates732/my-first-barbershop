import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'
import { siteConfig } from '../config/site'

export default function About({ compact }: { compact?: boolean }) {
  return (
    <SectionTransition id="o-nas" className="relative overflow-hidden py-[160px] sm:py-[200px]" snap>
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading label="O nás" align="center" />
          </Reveal>

          <div className="mt-6 flex justify-center">
            <span className="h-px w-16 bg-gold-500/40" />
          </div>

          <Reveal delay={0.1}>
            <div className={`text-ink-100 font-[500] leading-[1.85] text-base sm:text-lg ${compact ? 'mt-10 space-y-6' : 'mt-14 space-y-10'}`}>
              <p>
                {siteConfig.business.description}
              </p>
              {!compact && (
                <>
                  <p>
                    Každému střihu věnujeme čas, který si zaslouží. Záleží nám na
                    výsledku, ale i na tom, aby ses během návštěvy cítil příjemně.
                  </p>
                  <p>
                    Ať přicházíš na pravidelnou úpravu nebo úplnou změnu stylu,
                    cílem je vždy stejný &ndash; kvalitní práce, kterou poznáš
                    na první pohled.
                  </p>
                </>
              )}
            </div>
          </Reveal>

          {compact && (
            <Reveal delay={0.2}>
              <div className="mt-8 flex justify-center">
                <a
                  href="/o-nas"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Poznej náš příběh
                  <span className="text-base leading-none">→</span>
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </SectionTransition>
  )
}
