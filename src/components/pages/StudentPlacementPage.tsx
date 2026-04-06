/**
 * StudentPlacementPage.tsx
 * Detailed information about LegalAssist's student placement program,
 * application process, expectations, and standards.
 */

import { Link } from 'react-router-dom';
import {
  GraduationCap, Shield, CheckCircle, ArrowRight, Phone, Clock,
  FileText, Users, Briefcase, BookOpen, Scale, AlertTriangle,
  ChevronRight, Star, ClipboardCheck, MessageSquare, Eye,
  Award, Target, Lightbulb, Calendar, Building2, UserCheck,
  HeartHandshake, Mic, PenTool, FolderOpen
} from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/contact';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ============================================================
// COMPONENT
// ============================================================

export default function StudentPlacementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-pastelbeige/20 py-16 md:py-24">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <GraduationCap className="w-5 h-5" />
              <span className="font-paragraph text-sm font-medium">Career Development</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Student Placement Program
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 mb-4 max-w-3xl">
              LegalAssist accepts student placements from accredited paralegal and law clerk programs
              across Ontario. Our placement program is designed to give students real-world experience in
              a high-standards, client-facing paralegal practice.
            </p>
            <p className="font-paragraph text-base text-foreground/60 mb-8 max-w-3xl">
              We take our responsibility to the next generation of legal professionals seriously. Every placement
              student at LegalAssist is held to the same professional and ethical standards as our licensed staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#application-process" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors">
                View Application Process <ArrowRight className="w-5 h-5" />
              </a>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-primary/5 transition-colors">
                <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Look For — Standards Banner */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Shield className="w-10 h-10 mx-auto mb-4 opacity-90" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Standards Are High</h2>
            <p className="font-paragraph text-lg opacity-90">
              We do not offer placements for the sake of filling seats. Every student who joins our practice
              is expected to perform at a professional level from day one. We invest heavily in training,
              mentorship, and supervision — and we expect the same level of commitment in return.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Target, title: 'Precision', desc: 'Attention to detail in every document, every filing, every client interaction. There is no room for carelessness in legal work.' },
              { icon: HeartHandshake, title: 'Professionalism', desc: 'You represent this firm and the legal profession. Dress code, punctuality, communication — everything matters.' },
              { icon: BookOpen, title: 'Commitment to Learning', desc: 'You must be eager to learn, ask questions, take notes, and apply feedback immediately. Passive students will not succeed here.' },
              { icon: Scale, title: 'Ethical Conduct', desc: 'LSO Rules of Conduct apply to you. Confidentiality, conflicts, and client care are non-negotiable from day one.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-heading text-base font-bold mb-2">{item.title}</h3>
                <p className="font-paragraph text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">Who Should Apply</h2>
            <p className="font-paragraph text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
              Our placement program is open to students enrolled in accredited Ontario programs who meet the following criteria.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Eligible */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">We Welcome Students Who</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Are enrolled in an accredited Paralegal, Law Clerk, or Legal Assistant program at a recognized Ontario college',
                    'Have completed at least one semester of their program with a minimum 3.0 GPA (or equivalent)',
                    'Can commit to the full placement duration required by their program (typically 120–240 hours)',
                    'Demonstrate strong written and verbal English communication skills',
                    'Have a genuine interest in paralegal work — not just fulfilling a program requirement',
                    'Are comfortable in a fast-paced, client-facing environment',
                    'Can pass a Vulnerable Sector Check (VSC) and criminal background check',
                    'Have reliable transportation to our London, Ontario office',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-paragraph">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not a Fit */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-700" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">This May Not Be for You If</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'You are looking for a placement where you can observe passively — we expect active participation and contribution',
                    'You struggle with time management, deadlines, or punctuality — legal work is deadline-driven and clients depend on us',
                    'You are not comfortable speaking to clients on the phone or in person — client interaction starts immediately',
                    'You have difficulty accepting constructive criticism — we provide direct, honest feedback daily',
                    'You cannot commit to consistent, reliable attendance — courts and clients do not wait',
                    'You are unwilling to do administrative or clerical tasks — every task in a legal office serves the client',
                    'You have unresolved issues that would prevent passing a background check',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-paragraph">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-20 bg-pastelbeige/20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">What You'll Experience</h2>
          <p className="font-paragraph text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            This is not a simulated environment. You will work on real client files, attend real hearings,
            and interact with real clients under supervision.
          </p>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {[
              { icon: FolderOpen, title: 'Client File Management', desc: 'Open, organize, and maintain client files per LSO By-Law 7.1 compliance standards. Learn proper file opening, conflict checks, and retention protocols.' },
              { icon: FileText, title: 'Document Drafting', desc: 'Draft correspondence, demand letters, LTB applications, Small Claims Court filings, and retainer agreements under supervision.' },
              { icon: Scale, title: 'Tribunal & Court Preparation', desc: 'Prepare disclosure packages, organize evidence binders, draft submissions, and assist with hearing preparation for LTB, Small Claims, and POA matters.' },
              { icon: MessageSquare, title: 'Client Communication', desc: 'Conduct intake calls, schedule appointments, provide case updates, and learn how to communicate complex legal information clearly and compassionately.' },
              { icon: ClipboardCheck, title: 'Legal Research', desc: 'Research case law on CanLII, review legislation (RTA, CPA, HTA, HRTO), and prepare research memos for active files.' },
              { icon: Briefcase, title: 'Office Administration', desc: 'Learn practice management: scheduling, billing, trust accounting basics, deadline tracking, and the business side of running a paralegal practice.' },
              { icon: Mic, title: 'Hearing Attendance', desc: 'Attend LTB, Small Claims Court, and Provincial Offences Court hearings (in-person and virtual) alongside supervising paralegals.' },
              { icon: Shield, title: 'Ethics & Professional Conduct', desc: 'Real-world application of the Paralegal Rules of Conduct, confidentiality obligations, conflict of interest protocols, and LSO reporting requirements.' },
              { icon: Users, title: 'Client-Facing Experience', desc: 'Meet clients, take instructions, explain legal processes, and develop the interpersonal skills that distinguish great paralegals from average ones.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process — Step by Step */}
      <section id="application-process" className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Application Process</h2>
          <p className="font-paragraph text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            Our selection process is thorough. We review every application carefully and only accept students
            we believe will thrive in our environment and represent the firm with integrity.
          </p>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Step 1: Application */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">1</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Submit Your Application</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Email your application package to our office. We review applications on a rolling basis and
                  recommend applying at least 8 weeks before your placement start date.
                </p>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Your application must include:</h4>
                  <ul className="space-y-2">
                    {[
                      'A cover letter explaining why you want to complete your placement at LegalAssist, what area of law interests you most, and what you hope to gain from the experience',
                      'Your current resume, including any legal or customer service experience',
                      'An unofficial transcript showing your current GPA and courses completed',
                      'A letter from your program coordinator confirming your eligibility for placement, the required hours, and the placement dates',
                      'Two professional or academic references with contact information (we will contact them)',
                      'A writing sample — this can be a legal memo, case brief, research paper, or any professional writing that demonstrates your ability to communicate clearly in writing',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-paragraph">
                        <FileText className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Screening */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">2</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Application Screening</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  We review every application within 5 business days. We evaluate your writing sample critically —
                  grammar, structure, legal reasoning, and professionalism all matter. Your cover letter tells us
                  about your motivation and self-awareness. Your transcript tells us about your work ethic.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800 font-paragraph">
                    <strong>Note:</strong> Applications with spelling errors in the cover letter, generic cover letters
                    not addressed to LegalAssist, or missing documents will not proceed to the interview stage.
                    Attention to detail is tested from the very first interaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Interview */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">3</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">In-Person Interview</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  If your application passes screening, you'll be invited for an in-person interview at our
                  London office. This is a formal interview — treat it as you would a job interview.
                </p>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">The interview includes:</h4>
                  <ul className="space-y-3">
                    {[
                      { title: 'Professional Presentation Assessment', desc: 'We evaluate how you present yourself — attire, posture, handshake, eye contact, punctuality. First impressions matter in legal work because clients judge the firm by every person they encounter.' },
                      { title: 'Situational & Ethical Scenario Questions', desc: 'We present real-world scenarios you\'d encounter in our practice. How would you handle an upset client? What do you do if you make a mistake on a filing? What are your confidentiality obligations?' },
                      { title: 'Legal Knowledge Assessment', desc: 'Basic questions about areas of law within paralegal scope — the Residential Tenancies Act, Small Claims Court Rules, the Highway Traffic Act, and the Paralegal Rules of Conduct. We don\'t expect perfection, but we expect a working foundation.' },
                      { title: 'Communication & Personality Fit', desc: 'We assess whether you can communicate clearly, think on your feet, and whether your personality will work well with our team and our clients. We value warmth, directness, and a willingness to be corrected.' },
                    ].map((item, i) => (
                      <li key={i} className="text-sm font-paragraph">
                        <span className="font-semibold text-foreground">{item.title}:</span>{' '}
                        <span className="text-foreground/70">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4: Speaking Test */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">4</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Speaking & Communication Test</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  As part of the interview day, we conduct a structured speaking assessment. Paralegal work
                  is fundamentally about communication — with clients, with opposing parties, with adjudicators,
                  and with the court. If you cannot speak clearly and confidently, you cannot serve clients effectively.
                </p>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5 space-y-4">
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">The speaking test evaluates:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'Simulated Client Intake Call', desc: 'You\'ll role-play a phone intake with a "client" (one of our paralegals). We assess your ability to ask the right questions, listen actively, take notes, and provide clear next-step guidance.' },
                      { title: 'Oral Case Summary', desc: 'Given a short fact scenario, you\'ll have 10 minutes to prepare and deliver a 3-minute verbal summary of the case, the legal issues, and your recommended approach. We evaluate clarity, structure, and confidence.' },
                      { title: 'Pronunciation & Articulation', desc: 'Legal terminology must be pronounced correctly. We test your ability to clearly say terms like "adjournment," "jurisdiction," "Residential Tenancies Act," "per diem," and "quantum." This is about clarity, not accent.' },
                      { title: 'Composure Under Pressure', desc: 'We may interrupt you with follow-up questions, challenge your position, or present a curveball scenario. We want to see how you handle pressure, because that\'s what happens in court.' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                        <h5 className="font-heading text-sm font-bold text-foreground mb-1">{item.title}</h5>
                        <p className="font-paragraph text-xs text-foreground/70">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Reference & Background Check */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">5</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Reference & Background Checks</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  After a successful interview, we proceed with reference and background checks before making
                  a placement offer. This step is mandatory and non-negotiable.
                </p>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                  <ul className="space-y-2">
                    {[
                      'We contact both professional/academic references you provided — we ask about reliability, work ethic, communication skills, and any concerns',
                      'A Criminal Record Check (CPIC) is required — we will provide the form and instructions',
                      'A Vulnerable Sector Check (VSC) is required if the placement involves contact with vulnerable persons (which it does)',
                      'We verify your enrollment and good standing with your educational institution',
                      'Any misrepresentation on your application is grounds for immediate rejection',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-paragraph">
                        <UserCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6: Paperwork & Onboarding */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">6</div>
                <div className="w-0.5 h-full bg-primary/20 mx-auto mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Paperwork & Onboarding</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Once accepted, there is a formal onboarding process. All paperwork must be completed and signed
                  before your first day. No exceptions.
                </p>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Required documents include:</h4>
                  <ul className="space-y-2">
                    {[
                      'Placement Agreement — a tri-party agreement between you, LegalAssist, and your educational institution outlining the terms, hours, expectations, and evaluation criteria',
                      'Confidentiality & Non-Disclosure Agreement — you will have access to privileged client information. This agreement is binding and enforceable. Breaches are reported to your school and may be reported to the LSO.',
                      'Code of Conduct Acknowledgment — our internal code of conduct that supplements the LSO Paralegal Rules of Conduct, covering dress code, phone/social media policy, office procedures, and professional behaviour',
                      'Emergency Contact Form — standard emergency contact information for workplace safety',
                      'Photo ID — we keep a copy on file for the duration of your placement',
                      'Proof of WSIB Coverage — your educational institution typically provides workplace insurance. You must provide documentation before starting.',
                      'Technology & Systems Access Agreement — you will have access to our CMS, email, and document management systems. This agreement covers acceptable use, password policies, and data handling.',
                      'Learning Plan — developed collaboratively between you, your supervisor, and your program coordinator. Sets specific learning objectives, milestones, and evaluation dates.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-paragraph">
                        <PenTool className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 7: Placement Begins */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">7</div>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Your Placement Begins</h3>
                <p className="font-paragraph text-foreground/70 mb-4">
                  Your first week is an orientation period. You'll shadow supervising paralegals, learn our
                  systems, review our file management protocols, and begin with supervised tasks. By week two,
                  you'll be contributing to active client files under direct supervision.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-paragraph">
                    <strong>Evaluation:</strong> Your supervisor will provide weekly check-ins, a midpoint formal evaluation,
                    and a final evaluation at the end of your placement. We also welcome feedback from your
                    program coordinator and are happy to schedule site visits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expectations During Placement */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">Expectations During Your Placement</h2>
          <p className="font-paragraph text-foreground/70 text-center mb-12 max-w-2xl mx-auto">
            These are not suggestions — they are requirements. Students who do not meet these expectations
            may have their placement terminated early, which will be reported to your program coordinator.
          </p>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { icon: Clock, title: 'Punctuality & Attendance', desc: 'Arrive on time, every day. If you are going to be late or absent, notify your supervisor before 8:30 AM. Three unexcused absences or a pattern of lateness is grounds for termination of your placement. Courts do not wait and neither do clients.' },
              { icon: Briefcase, title: 'Professional Dress Code', desc: 'Business professional attire is required at all times. No jeans, no sneakers, no casual wear. If you are attending a hearing, you will be dressed appropriately for court. If you are unsure whether something is appropriate, it probably isn\'t.' },
              { icon: Shield, title: 'Confidentiality', desc: 'Everything you see, hear, and read at this office is confidential. Do not discuss client matters outside the office — not with friends, family, classmates, or on social media. This obligation continues after your placement ends. Violations are taken extremely seriously.' },
              { icon: MessageSquare, title: 'Communication Standards', desc: 'All written communication (emails, letters, memos) must be reviewed by your supervisor before being sent. Use proper grammar, spelling, and professional tone. Never promise a client an outcome. Never provide legal advice without supervision.' },
              { icon: Lightbulb, title: 'Initiative & Ownership', desc: 'Ask for work when you have capacity. Take notes when you receive instructions. Follow up on tasks without being reminded. If you make a mistake, report it immediately — do not try to hide it. Mistakes happen; cover-ups end placements.' },
              { icon: Star, title: 'Respect & Teamwork', desc: 'Treat every person — clients, colleagues, opposing parties, court staff — with respect. Be a team player. Help where needed. Leave your ego at the door. The best students are the ones who are humble, curious, and dependable.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="font-paragraph text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: 'Is this a paid placement?', a: 'No. This is an educational field placement in partnership with your college program. You earn academic credit, not wages. However, students who demonstrate exceptional performance may be considered for paid positions after graduation.' },
              { q: 'How many hours per week will I be expected to work?', a: 'Typical placement schedules are 3–5 days per week, matching regular office hours (9:00 AM – 5:00 PM). The exact schedule is determined in coordination with your program requirements. Some flexibility is available, but consistency is more important than flexibility.' },
              { q: 'Can I complete my placement remotely?', a: 'No. Our placement program is in-person at our London, Ontario office. Legal work requires hands-on experience — reviewing physical files, attending court, meeting clients face-to-face, and learning office culture. Remote placements do not provide this experience.' },
              { q: 'What programs do you accept students from?', a: 'We accept students from any accredited Ontario college Paralegal program, Law Clerk program, or Legal Assistant program. We have worked with students from Fanshawe College, Humber College, Seneca College, and others. If your program includes a field placement component, contact us.' },
              { q: 'How many students do you accept per semester?', a: 'Typically one to two students per semester. We intentionally keep the number small so each student receives meaningful supervision, mentorship, and hands-on experience. Quality over quantity.' },
              { q: 'What if I struggle during my placement?', a: 'We address performance concerns early and directly. Your supervisor will have an honest conversation with you, and we will work with you and your program coordinator to create an improvement plan. We want you to succeed — but we will not lower our standards.' },
              { q: 'Will I get to attend court or tribunal hearings?', a: 'Yes. Attending hearings is a core part of our placement program. You will observe and assist at LTB hearings, Small Claims Court, Provincial Offences Court, and potentially HRTO proceedings. You will not represent clients, but you will be in the room and actively contributing to case preparation.' },
              { q: 'Can this lead to a job after graduation?', a: 'It can. Several of our former placement students have been offered positions after completing their licensing. However, this is not guaranteed and depends on performance during the placement, firm needs at the time, and successful completion of the P1 licensing exam.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-heading text-base font-bold text-foreground mb-2">{item.q}</h3>
                <p className="font-paragraph text-sm text-foreground/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Apply?</h2>
          <p className="font-paragraph text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Send your complete application package to our office. We review applications year-round
            and will respond within 5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-gray-100 transition-colors">
              Contact Us to Apply <ArrowRight className="w-5 h-5" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-paragraph font-semibold hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* LSO Badge */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <p className="font-paragraph text-sm text-foreground/60">
            <Shield className="w-4 h-4 inline mr-1" />
            Licensed by the Law Society of Ontario | All placements supervised by licensed paralegals
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
