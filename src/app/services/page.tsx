export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-32">
      {/* SECTION 1 */}
      <section id="website-development" className="scroll-mt-32">
        <h2 className="text-3xl font-semibold text-blue-950">
          Website Design & Development
        </h2>
        <p className="text-amber-600 mt-2 font-medium">
          Modern, responsive, and performance-driven websites.
        </p>
        <div className="mt-6 space-y-4 text-blue-950/80 leading-relaxed">
          <p>
            We craft visually refined and technically optimized websites
            tailored to your brand and business goals.
          </p>
          <p>
            From UI/UX design to backend architecture, our solutions ensure
            scalability, speed, and security.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section id="pwa" className="scroll-mt-32">
        <h2 className="text-3xl font-semibold text-blue-950">
          Progressive Web Applications
        </h2>
        <p className="text-amber-600 mt-2 font-medium">
          App-like experiences delivered through the web.
        </p>
        <div className="mt-6 space-y-4 text-blue-950/80 leading-relaxed">
          <p>PWAs combine the best of web and mobile applications.</p>
          <p>
            Fast loading, offline capabilities, and push notifications — all
            without requiring app store downloads.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="custom-systems" className="scroll-mt-32">
        <h2 className="text-3xl font-semibold text-blue-950">
          Custom ERP / CRM / CMS / Dashboards
        </h2>
        <p className="text-amber-600 mt-2 font-medium">
          Tailored internal systems for operational excellence.
        </p>
        <div className="mt-6 space-y-4 text-blue-950/80 leading-relaxed">
          <p>
            We build centralized platforms that streamline operations,
            reporting, and automation.
          </p>
          <p>
            Fully customized dashboards with role-based access and secure
            database integrations.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="enterprise-systems" className="scroll-mt-32">
        <h2 className="text-3xl font-semibold text-blue-950">
          Enterprise / School / Hospital Systems
        </h2>
        <p className="text-amber-600 mt-2 font-medium">
          Mission-critical management platforms.
        </p>
        <div className="mt-6 space-y-4 text-blue-950/80 leading-relaxed">
          <p>
            We develop scalable systems for institutions requiring reliability
            and structured workflows.
          </p>
          <p>
            Built with robust backend frameworks and optimized databases to
            handle high user loads securely.
          </p>
        </div>
      </section>
    </div>
  );
}
