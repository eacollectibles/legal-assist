// Blog posts stored as data - NOT as separate components
// This approach keeps bundle size small and build times fast

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'traffic' | 'ltb' | 'small-claims' | 'employment' | 'general';
  date: string;
  readTime: string;
  content: string; // HTML content
  faqs?: { q: string; a: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ontario-bill-60-tenant-landlord-changes-2026',
    title: 'Ontario Bill 60: What Tenants and Landlords Need to Know in 2026',
    description: 'Bill 60 brings major changes to Ontario\'s rental laws including faster evictions, new notice rules, and changes to tenant defences. Here\'s the full breakdown.',
    category: 'ltb',
    date: '2026-04-28',
    readTime: '5 min',
    content: `
      <p>Ontario's Bill 60, the <strong>Fighting Delays, Building Faster Act</strong>, has introduced sweeping changes to the Residential Tenancies Act. Whether you're a landlord or tenant in London, Ontario, these changes affect you directly.</p>

      <h2>Faster Non-Payment Eviction Timelines</h2>
      <p>One of the biggest changes: landlords can now file an eviction application at the Landlord and Tenant Board <strong>7 days</strong> after serving a notice of non-payment of rent. Previously, this waiting period was 15 days. This means the entire eviction process moves faster.</p>

      <h2>Fixed-Term Leases No Longer Auto-Convert</h2>
      <p>Under the old rules, a fixed-term lease automatically converted to a month-to-month tenancy when it expired. Under Bill 60, landlords have more flexibility to renegotiate terms or end the lease at the conclusion of a fixed term. Tenants should carefully review any new lease offers.</p>

      <h2>Personal Use Evictions (N12) Changes</h2>
      <p>If a landlord provides at least <strong>120 days notice</strong> for an N12 personal use eviction, they are no longer required to compensate the tenant with one month's rent. Under the previous rules, one month's compensation was mandatory regardless of the notice period.</p>

      <h2>Shorter Appeal Windows for Tenants</h2>
      <p>Tenants now have <strong>15 days</strong> to request a review of an LTB eviction order, down from the previous 30 days. This makes it critical to act immediately if you disagree with a decision.</p>

      <h2>New Rules for Raising Maintenance Issues at Hearings</h2>
      <p>Previously, tenants could raise maintenance complaints at a non-payment hearing as a defence. Under Bill 60, if a tenant wants to raise maintenance issues during a rent arrears hearing, they are generally required to <strong>pay 50% of the alleged arrears into the Board's trust</strong> before those arguments will be heard.</p>

      <h2>What This Means for You</h2>
      <p>Both landlords and tenants need to understand these new timelines and requirements. The faster processes and stricter procedural rules make professional representation more important than ever.</p>

      <p>Need help navigating Bill 60 changes? Call <a href="tel:+12262725153">226-272-5153</a> for a free consultation.</p>
    `,
    faqs: [
      { q: 'When did Bill 60 take effect?', a: 'Bill 60 passed in 2025 with provisions rolling out through 2026. Check with us for the latest implementation dates on specific sections.' },
      { q: 'Does Bill 60 affect my current lease?', a: 'Yes - the new rules apply to all residential tenancies in Ontario, including existing ones. The changes to eviction timelines and hearing procedures are already in effect.' },
      { q: 'Do I still have rent control under Bill 60?', a: 'If your unit was first occupied before November 15, 2018, rent control still applies. The 2026 guideline is 2.5%. Units first occupied after that date remain exempt from rent control.' }
    ]
  },
  {
    slug: 'distracted-driving-cell-phone-ticket-ontario',
    title: 'Caught Using Your Phone While Driving in Ontario? Here\'s What to Expect',
    description: 'Ontario distracted driving fines start at $615 with 3 demerit points and a licence suspension. Learn the penalties and how to fight a cell phone ticket.',
    category: 'traffic',
    date: '2026-04-24',
    readTime: '4 min',
    content: `
      <p>Distracted driving charges in Ontario are far more serious than most people realize. A single cell phone ticket can cost you thousands of dollars when you factor in fines, insurance increases, and licence suspensions.</p>

      <h2>Current Penalties for Distracted Driving</h2>

      <h3>Fully Licensed Drivers (G Licence)</h3>
      <ul>
        <li><strong>First offence:</strong> Fine of $615 to $1,000, 3 demerit points, 3-day licence suspension</li>
        <li><strong>Second offence:</strong> Fine of $615 to $2,000, 6 demerit points, 7-day licence suspension</li>
        <li><strong>Third offence:</strong> Fine of $615 to $3,000, 6 demerit points, 30-day licence suspension</li>
      </ul>

      <h3>Novice Drivers (G1, G2)</h3>
      <ul>
        <li><strong>First offence:</strong> $615 fine, 30-day licence suspension (no demerit points)</li>
        <li><strong>Second offence:</strong> $615 fine, 90-day licence suspension</li>
        <li><strong>Third offence:</strong> Licence cancellation and requirement to restart the graduated licensing process</li>
      </ul>

      <h2>What Counts as Distracted Driving?</h2>
      <p>You can be charged for holding or using a hand-held device while driving, including:</p>
      <ul>
        <li>Texting or reading texts</li>
        <li>Scrolling through social media</li>
        <li>Holding a phone to talk (even at a red light)</li>
        <li>Entering an address in GPS while driving</li>
        <li>Watching videos</li>
      </ul>
      <p>The only exception is calling 911 for emergencies.</p>

      <h2>The Hidden Cost: Insurance</h2>
      <p>A distracted driving conviction stays on your record for 3 years. Insurance increases of <strong>25-50%</strong> are common, which over 3 years can easily add $2,000-$5,000 in additional premiums on top of the fine itself.</p>

      <h2>How to Fight a Distracted Driving Ticket</h2>
      <p>Common defences include:</p>
      <ul>
        <li>You were using the device in hands-free mode</li>
        <li>The device was securely mounted and you used a single touch</li>
        <li>You were calling 911</li>
        <li>The vehicle was safely pulled over and not in a lane of traffic</li>
        <li>Officer misidentified the device or activity</li>
      </ul>

      <p>Got a distracted driving ticket? Call <a href="tel:+12262725153">226-272-5153</a> before you pay it.</p>
    `,
    faqs: [
      { q: 'Can I hold my phone at a red light?', a: 'No. Ontario\'s distracted driving law applies whenever you are in the lane of traffic, even if stopped at a light. You must be safely pulled over and parked.' },
      { q: 'Does a hands-free car mount make it legal?', a: 'Yes, if the phone is mounted securely. You can use voice commands and a single touch to accept or end a call. However, scrolling or texting while mounted is still illegal.' },
      { q: 'Will a distracted driving ticket affect my insurance?', a: 'Yes, significantly. Most insurers treat distracted driving as a serious conviction. Expect premium increases of 25-50% for three years.' }
    ]
  },
  {
    slug: 'filing-human-rights-complaint-ontario-hrto',
    title: 'How to File a Human Rights Complaint in Ontario (HRTO Guide)',
    description: 'Experienced workplace discrimination? Learn how to file a complaint with the Human Rights Tribunal of Ontario, deadlines, and what a paralegal can do for you.',
    category: 'employment',
    date: '2026-04-21',
    readTime: '5 min',
    content: `
      <p>If you've experienced discrimination in the workplace, housing, or services based on a protected ground, you may be able to file a complaint with the <strong>Human Rights Tribunal of Ontario (HRTO)</strong>. Here's what you need to know.</p>

      <h2>What Are Protected Grounds?</h2>
      <p>Ontario's Human Rights Code protects you from discrimination based on:</p>
      <ul>
        <li>Race, colour, ethnic origin, or ancestry</li>
        <li>Disability (physical or mental)</li>
        <li>Sex, gender identity, or sexual orientation</li>
        <li>Age</li>
        <li>Religion or creed</li>
        <li>Family or marital status</li>
        <li>Receipt of public assistance (housing only)</li>
        <li>Record of offences (employment only)</li>
      </ul>

      <h2>Common Examples of Discrimination</h2>
      <ul>
        <li>Fired or demoted because of your disability or need for accommodation</li>
        <li>Denied a promotion due to your race, gender, or age</li>
        <li>Workplace harassment based on a protected ground</li>
        <li>Landlord refusing to rent to you based on family status or income source</li>
        <li>Denied service based on your religion or ethnicity</li>
      </ul>

      <h2>The Filing Deadline</h2>
      <p>You must file your HRTO application within <strong>1 year</strong> of the last incident of discrimination. In some cases, the Tribunal may allow late filings, but this is not guaranteed. Don't wait.</p>

      <h2>Steps to File</h2>
      <ol>
        <li><strong>Document everything:</strong> Save emails, texts, performance reviews, and any evidence of discriminatory treatment</li>
        <li><strong>Complete Form 1:</strong> The Application to the HRTO (available online at tribunalsontario.ca)</li>
        <li><strong>Describe the discrimination:</strong> Include specific incidents with dates, times, and witnesses</li>
        <li><strong>Submit the application:</strong> Can be filed electronically</li>
        <li><strong>Mediation:</strong> The HRTO will typically offer mediation before a hearing</li>
      </ol>

      <h2>What Can a Paralegal Do?</h2>
      <p>Licensed paralegals can represent you at the HRTO. We can:</p>
      <ul>
        <li>Assess whether you have a strong case</li>
        <li>Draft and file your application</li>
        <li>Represent you in mediation and hearings</li>
        <li>Negotiate settlements on your behalf</li>
      </ul>

      <h2>What Remedies Are Available?</h2>
      <p>If your complaint is successful, the HRTO can order:</p>
      <ul>
        <li>Monetary compensation for injury to dignity and lost wages</li>
        <li>Reinstatement to your job</li>
        <li>Changes to policies or practices</li>
        <li>A written apology</li>
      </ul>

      <p>Think you've been discriminated against? <a href="/contact">Contact us</a> for a free, confidential consultation.</p>
    `,
    faqs: [
      { q: 'Do I need a lawyer for the HRTO?', a: 'No. Licensed paralegals have full rights to represent you at the HRTO. We handle these cases regularly and at a lower cost than most lawyers.' },
      { q: 'How long does an HRTO case take?', a: 'Most cases take 12-18 months from filing to resolution. Many settle at mediation, which happens earlier in the process.' },
      { q: 'Can I file if I was an independent contractor?', a: 'Yes. The Human Rights Code applies broadly, not just to traditional employees. Contact us to discuss your specific situation.' }
    ]
  },
  {
    slug: 'how-to-collect-small-claims-court-judgment-ontario',
    title: 'Won in Small Claims Court? How to Actually Collect Your Money',
    description: 'Winning a Small Claims Court judgment is only half the battle. Learn how to enforce and collect what you\'re owed in Ontario.',
    category: 'small-claims',
    date: '2026-04-17',
    readTime: '4 min',
    content: `
      <p>Congratulations on winning your Small Claims Court case. But here's the reality many people don't expect: the court doesn't collect the money for you. If the other party doesn't pay voluntarily, you need to take enforcement steps.</p>

      <h2>Step 1: Wait for the Appeal Period</h2>
      <p>After a judgment is issued, the losing party has <strong>30 days</strong> to appeal. If no appeal is filed, you can begin enforcement.</p>

      <h2>Step 2: Send a Demand</h2>
      <p>Start with a formal demand letter. Often, a letter from a paralegal on your behalf is enough to prompt payment. Many debtors pay once they realize enforcement actions are coming.</p>

      <h2>Step 3: Examination of Debtor</h2>
      <p>If they don't pay, you can request a <strong>debtor examination</strong> (also called a judgment debtor exam). This is a court hearing where the debtor must disclose:</p>
      <ul>
        <li>Employment and income details</li>
        <li>Bank accounts</li>
        <li>Property and vehicles owned</li>
        <li>Other assets and debts</li>
      </ul>
      <p>If the debtor fails to attend, a warrant for their arrest can be issued.</p>

      <h2>Step 4: Enforcement Tools</h2>
      <p>Once you know where the debtor's assets are, you can use:</p>
      <ul>
        <li><strong>Garnishment of wages:</strong> Up to 20% of the debtor's wages can be directed to you</li>
        <li><strong>Garnishment of bank accounts:</strong> Freeze and seize funds from their bank</li>
        <li><strong>Writ of seizure and sale:</strong> A sheriff can seize and sell the debtor's personal property</li>
        <li><strong>Lien on property:</strong> Register the judgment against their real estate</li>
      </ul>

      <h2>How Long Is a Judgment Valid?</h2>
      <p>A Small Claims Court judgment is valid for <strong>6 years</strong> and can be renewed. Interest accrues on the judgment at the Courts of Justice Act rate.</p>

      <h2>When to Get Help</h2>
      <p>Enforcement can be complicated and time-consuming. A paralegal experienced in collections can handle the process efficiently and knows which enforcement tools work best for each situation.</p>

      <p>Need help collecting a judgment? Call <a href="tel:+12262725153">226-272-5153</a> for a free consultation.</p>
    `,
    faqs: [
      { q: 'What if the debtor has no money or assets?', a: 'This is called being "judgment proof." The judgment remains valid for 6 years (renewable), so you can attempt collection later if their situation changes.' },
      { q: 'How much does it cost to enforce a judgment?', a: 'Enforcement costs (filing fees, sheriff fees) are generally added to the amount the debtor owes. Your paralegal fees for the enforcement process are separate.' },
      { q: 'Can I garnish someone\'s wages without their employer knowing why?', a: 'The employer will know a garnishment is in place but not the details of the case. They are legally required to comply with the garnishment order.' }
    ]
  },
  {
    slug: 'tenant-defences-against-eviction-ontario',
    title: '5 Defences Tenants Can Use to Fight an Eviction in Ontario',
    description: 'Facing eviction in Ontario? You may have strong defences. Learn 5 common ways tenants can fight back at the Landlord and Tenant Board.',
    category: 'ltb',
    date: '2026-04-14',
    readTime: '4 min',
    content: `
      <p>Getting an eviction notice is frightening, but receiving a notice does not mean you have to leave. The Landlord and Tenant Board must approve any eviction, and you have the right to present defences at your hearing.</p>

      <h2>1. The Notice Is Defective</h2>
      <p>Eviction notices must meet strict technical requirements. Common defects include:</p>
      <ul>
        <li>Wrong termination date (must give proper notice period)</li>
        <li>Incorrect or missing information</li>
        <li>Served improperly (not in accordance with the Act)</li>
        <li>Wrong form used for the situation</li>
      </ul>
      <p>A defective notice can result in the entire application being dismissed.</p>

      <h2>2. You've Paid the Rent Arrears</h2>
      <p>For N4 non-payment evictions, if you pay all rent arrears plus the filing fee before the hearing or before the eviction order takes effect, the application is typically dismissed. This is called "voiding" the notice.</p>

      <h2>3. The Landlord Filed in Bad Faith</h2>
      <p>For N12 (personal use) evictions, you can argue the landlord doesn't genuinely intend to move in. Signs of bad faith include:</p>
      <ul>
        <li>The unit is re-listed for rent shortly after you leave</li>
        <li>The landlord has used N12 notices before on other tenants</li>
        <li>The person claimed to be moving in has no real connection to the area</li>
      </ul>

      <h2>4. Maintenance Issues and Breach of Landlord Obligations</h2>
      <p>If your landlord has failed to maintain the property, you may be able to raise this as a defence or file your own applications (T2, T6) seeking rent abatement and repairs. Note that under Bill 60, raising maintenance issues at a non-payment hearing now requires paying 50% of arrears into trust first.</p>

      <h2>5. Request Relief From Eviction</h2>
      <p>Even if the landlord has grounds, the LTB has the power to grant "relief from eviction" under Section 83 of the Residential Tenancies Act. The Board considers:</p>
      <ul>
        <li>Your personal circumstances (illness, disability, children)</li>
        <li>How long you've been a tenant</li>
        <li>Whether you can catch up on payments</li>
        <li>The impact eviction would have on you</li>
      </ul>

      <h2>Don't Face a Hearing Alone</h2>
      <p>LTB hearings move quickly and the rules are technical. Having a paralegal present your case dramatically improves your chances of staying in your home.</p>

      <p>Facing eviction? Call <a href="tel:+12262725153">226-272-5153</a> immediately for a free consultation.</p>
    `,
    faqs: [
      { q: 'Can my landlord lock me out?', a: 'Absolutely not. Illegal lockouts are a serious offence. If this happens, call the police and file a T2 application at the LTB immediately.' },
      { q: 'Do I have to leave when the notice expires?', a: 'No. An eviction notice is not an eviction order. Only the LTB can order an eviction, and only a Sheriff can enforce it. Never leave just because you received a notice.' },
      { q: 'What if I can\'t afford a paralegal?', a: 'Contact us anyway - we offer payment plans and can discuss your options. Legal Aid Ontario may also help depending on your income.' }
    ]
  },
  {
    slug: 'red-light-camera-ticket-ontario-fight',
    title: 'Got a Red Light Camera Ticket in Ontario? Should You Fight It?',
    description: 'Red light camera tickets in Ontario come with fines but no demerit points. Learn whether you should pay or fight, and what your options are.',
    category: 'traffic',
    date: '2026-04-11',
    readTime: '3 min',
    content: `
      <p>Red light camera tickets are different from regular traffic tickets in several important ways. Before you pay or ignore it, here's what you need to know.</p>

      <h2>How Red Light Camera Tickets Work</h2>
      <p>Unlike regular traffic tickets, a red light camera ticket is issued to the <strong>vehicle owner</strong>, not the driver. This is an important distinction that affects your options.</p>

      <h2>The Good News</h2>
      <ul>
        <li><strong>No demerit points:</strong> Red light camera tickets do not add demerit points to anyone's licence</li>
        <li><strong>No insurance impact:</strong> Because the ticket is against the vehicle (not the driver), insurance companies generally don't consider it</li>
        <li><strong>No criminal record:</strong> It's a set fine, not a moving violation</li>
      </ul>

      <h2>The Bad News</h2>
      <ul>
        <li><strong>Fine is $325:</strong> The set fine for running a red light camera in Ontario is $325</li>
        <li><strong>Plate renewal issues:</strong> Unpaid red light camera tickets can prevent you from renewing your licence plate</li>
        <li><strong>Collections:</strong> Unpaid fines can be sent to collections</li>
      </ul>

      <h2>Should You Fight It?</h2>
      <p>Since there are no demerit points or insurance consequences, fighting a red light camera ticket is primarily about the fine itself. It may be worth fighting if:</p>
      <ul>
        <li>You were not the driver and can prove it</li>
        <li>The photo evidence is unclear</li>
        <li>There were issues with the intersection (signal timing, visibility)</li>
        <li>Your vehicle was stolen at the time</li>
        <li>You entered the intersection on a yellow light</li>
      </ul>

      <h2>Red Light Camera vs. Officer-Issued Ticket</h2>
      <p>If an officer pulls you over for running a red light (not a camera), the consequences are much worse:</p>
      <ul>
        <li>3 demerit points</li>
        <li>Fine of $260 to $500</li>
        <li>Insurance increase for 3 years</li>
      </ul>
      <p>Always fight an officer-issued red light ticket - the stakes are much higher.</p>

      <p>Questions about a traffic ticket? Call <a href="tel:+12262725153">226-272-5153</a> for a free consultation.</p>
    `,
    faqs: [
      { q: 'Will a red light camera ticket increase my insurance?', a: 'Generally no, because the ticket is issued to the vehicle owner, not the driver. Insurance companies typically don\'t factor these in.' },
      { q: 'What if someone else was driving my car?', a: 'You can request a trial and testify that you were not the driver. However, as the owner, the burden is on you to show someone else was driving.' }
    ]
  },
  {
    slug: 'paralegal-vs-lawyer-ontario-when-to-hire',
    title: 'Paralegal vs. Lawyer in Ontario: When Should You Hire Which?',
    description: 'Not sure whether to hire a paralegal or lawyer? Learn the differences in scope, cost, and when each is the right choice for your legal matter.',
    category: 'general',
    date: '2026-04-09',
    readTime: '4 min',
    content: `
      <p>Many people aren't sure whether they need a paralegal or a lawyer. In Ontario, both are licensed by the Law Society and can represent you - but in different areas of law. Understanding the difference can save you hundreds or even thousands of dollars.</p>

      <h2>What Can Paralegals Handle?</h2>
      <p>Licensed paralegals in Ontario can represent you in:</p>
      <ul>
        <li><strong>Small Claims Court:</strong> Civil disputes up to $50,000</li>
        <li><strong>Traffic tickets:</strong> All Highway Traffic Act charges</li>
        <li><strong>Landlord and Tenant Board:</strong> Evictions, rent disputes, maintenance issues</li>
        <li><strong>Provincial offences:</strong> Bylaw infractions, regulatory charges</li>
        <li><strong>Human Rights Tribunal of Ontario:</strong> Discrimination complaints</li>
        <li><strong>Criminal summary conviction offences:</strong> Minor criminal charges</li>
        <li><strong>Workplace Safety and Insurance Board:</strong> WSIB appeals</li>
        <li><strong>Notary services:</strong> Commissioning documents and affidavits</li>
      </ul>

      <h2>When Do You Need a Lawyer?</h2>
      <p>You'll need a lawyer for:</p>
      <ul>
        <li>Superior Court matters (claims over $50,000)</li>
        <li>Serious criminal charges (indictable offences)</li>
        <li>Real estate transactions</li>
        <li>Wills and estate planning</li>
        <li>Family law (divorce, custody, child support)</li>
        <li>Corporate and business law</li>
        <li>Immigration (beyond simple applications)</li>
      </ul>

      <h2>Cost Comparison</h2>
      <p>This is where the biggest difference lies:</p>
      <ul>
        <li><strong>Paralegal hourly rate:</strong> Typically $100-$250/hour</li>
        <li><strong>Lawyer hourly rate:</strong> Typically $250-$600+/hour</li>
      </ul>
      <p>For matters within a paralegal's scope, you're getting the same level of expertise at a significantly lower cost. We handle these specific areas daily - it's all we do.</p>

      <h2>Are Paralegals Qualified?</h2>
      <p>Absolutely. Ontario paralegals must:</p>
      <ul>
        <li>Complete an accredited paralegal program</li>
        <li>Pass the Law Society licensing exam</li>
        <li>Carry professional liability insurance</li>
        <li>Complete continuing professional development annually</li>
        <li>Follow the same ethical rules as lawyers</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>If your legal issue falls within a paralegal's scope, hiring a lawyer is paying more for the same result. If it's outside our scope, a good paralegal will tell you honestly and refer you to a lawyer.</p>

      <p>Not sure which you need? Call <a href="tel:+12262725153">226-272-5153</a> for a free consultation - we'll point you in the right direction.</p>
    `,
    faqs: [
      { q: 'Can a paralegal give legal advice?', a: 'Yes. Licensed paralegals in Ontario can provide legal advice within their scope of practice. We are regulated by the Law Society of Ontario just like lawyers.' },
      { q: 'What if my case starts in Small Claims but grows bigger?', a: 'If a matter exceeds a paralegal\'s scope (e.g., the claim exceeds $50,000 and moves to Superior Court), we\'ll refer you to a trusted lawyer. We always prioritize your best outcome.' }
    ]
  },
  {
    slug: 'illegal-lockout-tenant-rights-ontario',
    title: 'Locked Out by Your Landlord? Know Your Rights in Ontario',
    description: 'Illegal lockouts are against the law in Ontario. Learn what to do if your landlord changes the locks, shuts off utilities, or tries to force you out.',
    category: 'ltb',
    date: '2026-04-07',
    readTime: '4 min',
    content: `
      <p>If your landlord has changed the locks, removed your belongings, shut off utilities, or otherwise tried to force you out without an LTB order, they have committed an <strong>illegal lockout</strong>. This is one of the most serious violations of the Residential Tenancies Act.</p>

      <h2>What Counts as an Illegal Lockout?</h2>
      <ul>
        <li>Changing the locks while you're out</li>
        <li>Removing your personal belongings from the unit</li>
        <li>Shutting off electricity, water, heat, or gas</li>
        <li>Blocking access to the building or unit</li>
        <li>Intimidating or threatening you to leave</li>
        <li>Removing doors, windows, or fixtures to make the unit unlivable</li>
      </ul>
      <p>Even if you owe rent, your landlord <strong>cannot</strong> take any of these actions. Only a Sheriff with a valid LTB eviction order can remove a tenant.</p>

      <h2>What to Do Immediately</h2>
      <ol>
        <li><strong>Call the police:</strong> An illegal lockout is a provincial offence. Police can help you regain entry</li>
        <li><strong>Document everything:</strong> Take photos, videos, and screenshots of any communications</li>
        <li><strong>Contact a paralegal:</strong> You need to file at the LTB quickly</li>
        <li><strong>Keep receipts:</strong> If you need a hotel, food, or replacement items, keep all receipts for your claim</li>
      </ol>

      <h2>Filing a T2 Application</h2>
      <p>A T2 application at the LTB is used when a landlord has interfered with your rights. For illegal lockouts, the LTB can:</p>
      <ul>
        <li>Order the landlord to let you back in immediately</li>
        <li>Award compensation for expenses (hotel, food, damages)</li>
        <li>Award a rent abatement</li>
        <li>Order general damages for the violation</li>
        <li>Fine the landlord up to $50,000 for a corporation or $25,000 for an individual</li>
      </ul>

      <h2>Emergency Orders</h2>
      <p>In urgent lockout situations, you can request an emergency hearing at the LTB, which can be scheduled within days rather than the usual weeks or months.</p>

      <h2>Landlord Penalties</h2>
      <p>Landlords who commit illegal lockouts face serious consequences. Under the Residential Tenancies Act, a landlord who is found guilty of an illegal lockout can face fines of up to <strong>$50,000 for a corporation</strong> or <strong>$25,000 for an individual</strong>.</p>

      <p>Been locked out illegally? Call <a href="tel:+12262725153">226-272-5153</a> immediately - this is an urgent matter.</p>
    `,
    faqs: [
      { q: 'Can my landlord lock me out if I owe rent?', a: 'No. Owing rent does not give a landlord the right to lock you out. They must follow the proper LTB eviction process, which includes a hearing and a Sheriff-enforced order.' },
      { q: 'What if the landlord says I abandoned the unit?', a: 'A landlord can only treat a unit as abandoned under specific legal circumstances. If you\'re still living there and they lock you out, it\'s illegal regardless of what they claim.' },
      { q: 'How quickly can the LTB help with a lockout?', a: 'Emergency motions for illegal lockouts can be heard within days. Contact us immediately and we can file an emergency request on your behalf.' }
    ]
  },
  {
    slug: 'suing-contractor-bad-work-ontario-small-claims',
    title: 'Bad Contractor Work? How to Sue in Small Claims Court in Ontario',
    description: 'Hired a contractor who did terrible work or disappeared with your money? Learn how to take them to Small Claims Court in Ontario.',
    category: 'small-claims',
    date: '2026-04-04',
    readTime: '4 min',
    content: `
      <p>You hired a contractor, paid good money, and the work is terrible - or worse, they took your deposit and disappeared. Unfortunately, this is one of the most common reasons people end up in Small Claims Court.</p>

      <h2>Can You Sue a Contractor in Small Claims Court?</h2>
      <p>Yes. If your claim is worth <strong>$50,000 or less</strong> (including the cost of repairs, losses, and damages), Small Claims Court is the right place. Common contractor disputes include:</p>
      <ul>
        <li>Incomplete or abandoned work</li>
        <li>Poor quality workmanship</li>
        <li>Contractor took deposit and never started</li>
        <li>Work not done according to contract or code</li>
        <li>Property damage caused during the work</li>
        <li>Significant delays beyond what was agreed</li>
      </ul>

      <h2>Building Your Case</h2>
      <p>To win, you need to prove what was agreed and what went wrong:</p>
      <ol>
        <li><strong>The contract:</strong> Written contracts are best, but text messages, emails, and verbal agreements (with witnesses) count</li>
        <li><strong>Payment records:</strong> Bank statements, e-transfers, receipts, cancelled cheques</li>
        <li><strong>Photos and videos:</strong> Before, during, and after the work</li>
        <li><strong>Expert opinion:</strong> Get a quote from another contractor to fix or complete the work</li>
        <li><strong>Communications:</strong> Save all texts, emails, and voicemails showing attempts to resolve the issue</li>
      </ol>

      <h2>What Can You Recover?</h2>
      <ul>
        <li>Cost to fix or complete the work by another contractor</li>
        <li>Refund of money paid for work not done</li>
        <li>Compensation for property damage</li>
        <li>Additional costs caused by the delay (e.g., extended rental costs)</li>
        <li>Court costs and interest</li>
      </ul>

      <h2>The Court Process</h2>
      <ol>
        <li><strong>File a Plaintiff's Claim:</strong> Outlines your case and what you're seeking</li>
        <li><strong>Serve the contractor:</strong> They must be properly notified</li>
        <li><strong>Settlement conference:</strong> A judge helps both sides try to settle</li>
        <li><strong>Trial:</strong> If no settlement is reached, you present your case</li>
      </ol>

      <h2>Time Limit</h2>
      <p>You have <strong>2 years</strong> from when you discovered the problem to file a claim. Don't wait - witnesses' memories fade and evidence can be lost.</p>

      <p>Need to sue a contractor? Call <a href="tel:+12262725153">226-272-5153</a> for a free case evaluation.</p>
    `,
    faqs: [
      { q: 'What if the contractor doesn\'t have a business licence?', a: 'You can still sue them personally. Unlicensed contractors can actually be easier to hold accountable because operating without a licence may itself be a violation.' },
      { q: 'Should I try to resolve it before going to court?', a: 'Yes, and document your attempts. Send a formal demand letter (we can help with this). Courts look favourably on parties who tried to resolve disputes before filing.' },
      { q: 'What if the contractor counter-sues me?', a: 'This happens sometimes. They may claim you owe for extra work or changed the scope. Having a written contract and good documentation protects you against counter-claims.' }
    ]
  },
  {
    slug: 'workplace-harassment-options-ontario',
    title: 'Experiencing Workplace Harassment in Ontario? Here Are Your Options',
    description: 'Ontario employees have legal protections against workplace harassment. Learn what counts, how to document it, and your options for filing a complaint.',
    category: 'employment',
    date: '2026-04-02',
    readTime: '4 min',
    content: `
      <p>No one should have to tolerate harassment at work. Ontario law provides strong protections for employees, and you have several options for holding harassers and employers accountable.</p>

      <h2>What Is Workplace Harassment?</h2>
      <p>Under Ontario's Occupational Health and Safety Act, workplace harassment includes:</p>
      <ul>
        <li>Repeated unwelcome comments or conduct that is known (or should be known) to be unwelcome</li>
        <li>Bullying, intimidation, or threatening behaviour</li>
        <li>Sexual harassment (unwelcome sexual advances, comments, or contact)</li>
        <li>Workplace sexual solicitation from someone in a position of authority</li>
      </ul>
      <p>Harassment can come from supervisors, coworkers, clients, or customers.</p>

      <h2>How to Document Harassment</h2>
      <p>Good documentation is essential for any complaint:</p>
      <ul>
        <li>Keep a detailed log of every incident (date, time, location, what happened, who witnessed it)</li>
        <li>Save all emails, texts, and written communications</li>
        <li>Keep copies of any relevant company policies</li>
        <li>Note any impact on your health (doctor visits, prescriptions, time off work)</li>
        <li>Store documentation outside of work systems (don't rely on your work email alone)</li>
      </ul>

      <h2>Your Options for Taking Action</h2>

      <h3>1. Internal Complaint</h3>
      <p>Every Ontario employer with 5+ employees must have a harassment policy and investigation process. File a formal written complaint with HR or management. The employer is legally required to investigate.</p>

      <h3>2. Ministry of Labour Complaint</h3>
      <p>If your employer fails to investigate or take action, you can file a complaint with the Ontario Ministry of Labour. An inspector can order the employer to comply with the Act.</p>

      <h3>3. Human Rights Tribunal (HRTO)</h3>
      <p>If the harassment is based on a protected ground (race, sex, disability, etc.), you can file a complaint at the HRTO within 1 year. A paralegal can represent you through this process.</p>

      <h3>4. Constructive Dismissal Claim</h3>
      <p>If the harassment is so severe that you feel forced to quit, you may have a claim for constructive dismissal. This entitles you to severance as if you were fired without cause.</p>

      <h2>Employer Obligations</h2>
      <p>Ontario employers must:</p>
      <ul>
        <li>Have a written harassment policy</li>
        <li>Investigate all complaints</li>
        <li>Protect complainants from retaliation</li>
        <li>Provide results of the investigation to both parties</li>
      </ul>

      <p>Dealing with workplace harassment? Call <a href="tel:+12262725153">226-272-5153</a> for confidential advice.</p>
    `,
    faqs: [
      { q: 'Can I be fired for reporting harassment?', a: 'No. Retaliating against someone for filing a harassment complaint is illegal under Ontario law. If this happens, you have additional legal claims available.' },
      { q: 'What if the harasser is my boss?', a: 'You can report to their supervisor, HR, or go directly to the Ministry of Labour or HRTO. You don\'t have to report to the person who is harassing you.' },
      { q: 'Is a single incident enough to file a complaint?', a: 'For general harassment, it usually needs to be a pattern of behaviour. However, a single serious incident (especially sexual harassment or threats) can be enough for an HRTO or police complaint.' }
    ]
  },
  {
    slug: 'how-much-does-paralegal-cost-ontario',
    title: 'How Much Does a Paralegal Cost in Ontario? (2026 Guide)',
    description: 'Paralegal fees in Ontario explained. Traffic tickets from $300, LTB matters from $500, Small Claims from $750. Free consultations available.',
    category: 'general',
    date: '2026-01-15',
    readTime: '4 min',
    content: `
      <p>One of the most common questions we get is "how much will this cost?" The good news: paralegal services are significantly more affordable than hiring a lawyer for matters within our scope of practice.</p>
      
      <h2>Typical Paralegal Fees in Ontario</h2>
      <p>Here's what you can expect to pay for common legal matters:</p>
      
      <h3>Traffic Tickets</h3>
      <p><strong>$300 - $800</strong> depending on the charge. Speeding tickets are typically on the lower end, while careless driving or stunt driving charges cost more due to the complexity and court time involved.</p>
      
      <h3>Landlord and Tenant Board (LTB)</h3>
      <p><strong>$500 - $1,500</strong> for most matters. Simple N4 applications for non-payment are less expensive, while contested evictions or T2 applications for tenant rights take more time.</p>
      
      <h3>Small Claims Court</h3>
      <p><strong>$750 - $3,000+</strong> depending on complexity. Simple debt collections cost less than cases requiring trial preparation and multiple court appearances.</p>
      
      <h3>Human Rights Tribunal</h3>
      <p><strong>$1,000 - $3,000+</strong> for application preparation and representation. These matters often involve significant document preparation and multiple hearing dates.</p>
      
      <h2>Why Paralegals Cost Less Than Lawyers</h2>
      <p>Licensed paralegals can handle the same matters as lawyers within our scope of practice, but our overhead is lower and we specialize in these specific areas. You're not paying for services you don't need.</p>
      
      <h2>Payment Options</h2>
      <p>At LegalAssist, we offer:</p>
      <ul>
        <li>Free initial consultations (30 minutes)</li>
        <li>Flat-fee pricing for most services (no surprise bills)</li>
        <li>Payment plans for larger matters</li>
        <li>Clear written quotes before any work begins</li>
      </ul>
      
      <p>Call us at <a href="tel:+12262725153">226-272-5153</a> for a free quote on your specific situation.</p>
    `,
    faqs: [
      { q: 'Do paralegals charge hourly or flat fees?', a: 'Most paralegals offer both options. At LegalAssist, we prefer flat fees for transparency - you know exactly what you\'ll pay upfront.' },
      { q: 'Is a free consultation really free?', a: 'Yes. Our 30-minute consultations are completely free with no obligation. We\'ll assess your situation and provide a clear quote.' },
      { q: 'Can I pay in installments?', a: 'Yes, we offer payment plans for most services. Contact us to discuss options that fit your budget.' }
    ]
  },
  {
    slug: 'can-paralegal-represent-small-claims-court',
    title: 'Can a Paralegal Represent Me in Small Claims Court?',
    description: 'Yes! Licensed paralegals can represent you in Ontario Small Claims Court for claims up to $50,000. Learn when to hire a paralegal vs lawyer.',
    category: 'small-claims',
    date: '2026-01-12',
    readTime: '3 min',
    content: `
      <p>Yes, a licensed paralegal can absolutely represent you in Small Claims Court in Ontario. In fact, paralegals handle the majority of Small Claims cases because we specialize in this area and offer more affordable rates than lawyers.</p>
      
      <h2>What Paralegals Can Do in Small Claims Court</h2>
      <ul>
        <li>File claims and defences on your behalf</li>
        <li>Prepare all court documents</li>
        <li>Represent you at settlement conferences</li>
        <li>Represent you at trial</li>
        <li>Negotiate settlements with the other party</li>
        <li>Enforce judgments after you win</li>
      </ul>
      
      <h2>Small Claims Court Limits</h2>
      <p>Ontario Small Claims Court handles civil disputes up to <strong>$50,000</strong> (not including interest and costs). Common cases include:</p>
      <ul>
        <li>Unpaid invoices and debts</li>
        <li>Contract disputes</li>
        <li>Property damage claims</li>
        <li>Consumer complaints</li>
        <li>Return of personal property</li>
      </ul>
      
      <h2>Why Choose a Paralegal Over a Lawyer?</h2>
      <p>For Small Claims matters, paralegals offer several advantages:</p>
      <ul>
        <li><strong>Lower cost:</strong> Our fees are typically 40-60% less than lawyers</li>
        <li><strong>Specialization:</strong> We handle Small Claims cases daily</li>
        <li><strong>Same authority:</strong> We have full rights of representation in this court</li>
        <li><strong>Practical approach:</strong> We focus on cost-effective solutions</li>
      </ul>
      
      <p>Need help with a Small Claims matter? <a href="/contact">Contact us</a> for a free consultation.</p>
    `,
    faqs: [
      { q: 'What\'s the maximum I can sue for in Small Claims Court?', a: 'The limit is $50,000 in Ontario, not including interest and court costs which are added on top.' },
      { q: 'Do I have to go to court myself?', a: 'Not necessarily. Your paralegal can attend most proceedings on your behalf, including settlement conferences and even trial in many cases.' }
    ]
  },
  {
    slug: 'what-happens-ignore-traffic-ticket-ontario',
    title: 'What Happens If You Ignore a Traffic Ticket in Ontario?',
    description: 'Ignoring a traffic ticket in Ontario leads to automatic conviction, fines, licence suspension, and collections. Learn your options before the deadline.',
    category: 'traffic',
    date: '2026-01-10',
    readTime: '3 min',
    content: `
      <p>Ignoring a traffic ticket is one of the worst things you can do. Here's what happens if you don't respond:</p>
      
      <h2>The 15-Day Deadline</h2>
      <p>You have <strong>15 days</strong> from receiving a ticket to respond. Your options are:</p>
      <ol>
        <li>Pay the fine (this is a guilty plea)</li>
        <li>Request an early resolution meeting</li>
        <li>Request a trial</li>
      </ol>
      
      <h2>What Happens If You Do Nothing</h2>
      <p>If you miss the deadline:</p>
      <ul>
        <li><strong>Automatic conviction:</strong> You're deemed guilty without any hearing</li>
        <li><strong>Demerit points:</strong> Applied to your licence immediately</li>
        <li><strong>Fine increases:</strong> Additional fees and surcharges added</li>
        <li><strong>Collections:</strong> Unpaid fines go to collections agencies</li>
        <li><strong>Licence suspension:</strong> Your licence can be suspended for unpaid fines</li>
        <li><strong>Plate denial:</strong> You can't renew your licence plates</li>
      </ul>
      
      <h2>Can You Reopen a Conviction?</h2>
      <p>If you missed the deadline, you may be able to apply to "reopen" your case. You'll need to show a valid reason why you didn't respond (illness, never received the ticket, etc.). This process requires a court application.</p>
      
      <h2>Best Course of Action</h2>
      <p>Don't wait. Even if you think you're guilty, there are often options to reduce fines or eliminate demerit points. A paralegal can help you understand your options.</p>
      
      <p>Got a ticket? Call <a href="tel:+12262725153">226-272-5153</a> for a free consultation.</p>
    `,
    faqs: [
      { q: 'How long do I have to respond to a traffic ticket?', a: '15 days from when you receive the ticket. Don\'t miss this deadline.' },
      { q: 'Can I fight a ticket after the deadline passes?', a: 'Possibly. You can apply to reopen the matter, but you\'ll need to show a valid reason for missing the deadline.' }
    ]
  },
  {
    slug: 'can-landlord-enter-without-notice-ontario',
    title: 'Can My Landlord Enter My Apartment Without Notice?',
    description: 'Ontario landlords must give 24 hours written notice before entering, with limited exceptions. Know your tenant rights.',
    category: 'ltb',
    date: '2026-01-08',
    readTime: '3 min',
    content: `
      <p>No, in most cases your landlord cannot enter your rental unit without proper notice. Ontario's Residential Tenancies Act protects your right to privacy.</p>
      
      <h2>The 24-Hour Rule</h2>
      <p>Landlords must provide <strong>written notice at least 24 hours</strong> before entering your unit. The notice must include:</p>
      <ul>
        <li>The reason for entry</li>
        <li>The date of entry</li>
        <li>The time (between 8am and 8pm only)</li>
      </ul>
      
      <h2>Valid Reasons for Entry</h2>
      <p>Landlords can only enter for specific reasons:</p>
      <ul>
        <li>To make repairs or do maintenance</li>
        <li>To show the unit to prospective tenants or buyers</li>
        <li>For an inspection (with proper notice)</li>
        <li>If the tenant consents at the time of entry</li>
      </ul>
      
      <h2>Exceptions - When No Notice Is Required</h2>
      <ul>
        <li><strong>Emergency:</strong> Fire, flood, or immediate safety concern</li>
        <li><strong>Tenant consent:</strong> If you agree to entry at that moment</li>
        <li><strong>Care homes:</strong> Different rules apply</li>
      </ul>
      
      <h2>What If Your Landlord Violates This?</h2>
      <p>If your landlord enters illegally, you can:</p>
      <ol>
        <li>Document every incident (dates, times, what happened)</li>
        <li>Send a written complaint to your landlord</li>
        <li>File a T2 application at the Landlord and Tenant Board</li>
        <li>Seek compensation for harassment</li>
      </ol>
      
      <p>Dealing with landlord harassment? <a href="/contact">Contact us</a> - we can help.</p>
    `,
    faqs: [
      { q: 'Can my landlord enter while I\'m at work?', a: 'Yes, as long as they gave proper 24-hour written notice and entry is between 8am and 8pm.' },
      { q: 'What if my landlord keeps entering without notice?', a: 'This is harassment. Document every incident and file a T2 application at the LTB. You may be entitled to compensation.' }
    ]
  },
  {
    slug: 'speeding-ticket-affect-insurance-ontario',
    title: 'Will a Speeding Ticket Affect My Car Insurance in Ontario?',
    description: 'Yes, speeding tickets typically raise insurance rates for 3 years. Learn how much and why fighting the ticket often saves money.',
    category: 'traffic',
    date: '2026-01-05',
    readTime: '3 min',
    content: `
      <p>Yes, a speeding ticket conviction will likely increase your car insurance premiums in Ontario. Here's what you need to know:</p>
      
      <h2>How Long Does It Affect Insurance?</h2>
      <p>A speeding conviction typically affects your insurance rates for <strong>3 years</strong> from the conviction date. Some insurers look back further for serious offences.</p>
      
      <h2>How Much Will My Insurance Go Up?</h2>
      <p>The increase depends on several factors:</p>
      <ul>
        <li><strong>Minor speeding (1-15 km/h over):</strong> 0-10% increase</li>
        <li><strong>Moderate speeding (16-29 km/h over):</strong> 10-25% increase</li>
        <li><strong>Major speeding (30-49 km/h over):</strong> 25-50% increase</li>
        <li><strong>Stunt driving (50+ km/h over):</strong> 50-100%+ increase or policy cancellation</li>
      </ul>
      
      <h2>The Real Cost of Paying the Ticket</h2>
      <p>Consider this example:</p>
      <ul>
        <li>Speeding ticket fine: $150</li>
        <li>Insurance increase: $300/year × 3 years = $900</li>
        <li><strong>Total cost of conviction: $1,050</strong></li>
      </ul>
      <p>Fighting the ticket often costs less than the long-term insurance impact.</p>
      
      <h2>What About Demerit Points?</h2>
      <p>Demerit points stay on your driving record for 2 years and affect your licence status. Insurance companies see your convictions (which last 3+ years), not the points themselves.</p>
      
      <h2>Best Strategy</h2>
      <p>Before paying any ticket, get a free consultation to understand your options. Many tickets can be reduced or eliminated entirely.</p>
      
      <p>Got a speeding ticket? Call <a href="tel:+12262725153">226-272-5153</a> for a free case review.</p>
    `,
    faqs: [
      { q: 'Do insurance companies see every ticket?', a: 'They see convictions, not tickets. If you fight a ticket and win, or get it reduced to a non-moving violation, it may not affect your insurance.' },
      { q: 'Will my insurance company drop me for a speeding ticket?', a: 'One minor speeding ticket usually won\'t cause cancellation. However, stunt driving or multiple convictions can result in non-renewal.' }
    ]
  },
  {
    slug: '2026-ontario-rent-increase-guideline',
    title: '2026 Ontario Rent Increase Guideline: What You Need to Know',
    description: 'The 2026 Ontario rent increase guideline is 2.5%. Learn when landlords can increase rent and what tenants can do about illegal increases.',
    category: 'ltb',
    date: '2026-01-02',
    readTime: '3 min',
    content: `
      <p>The Ontario government has set the <strong>2026 rent increase guideline at 2.5%</strong>. Here's what landlords and tenants need to know.</p>
      
      <h2>What Is the Rent Increase Guideline?</h2>
      <p>The guideline is the maximum percentage a landlord can increase rent without applying to the Landlord and Tenant Board. It applies to most private residential rentals.</p>
      
      <h2>Key Rules for Rent Increases</h2>
      <ul>
        <li><strong>Once per year:</strong> Landlords can only increase rent once every 12 months</li>
        <li><strong>90 days notice:</strong> Written notice must be given at least 90 days before the increase</li>
        <li><strong>Proper form:</strong> Must use the official N1 or N2 form</li>
        <li><strong>Maximum 2.5%:</strong> Cannot exceed the guideline without LTB approval</li>
      </ul>
      
      <h2>Exemptions - Units Not Covered</h2>
      <p>The guideline does NOT apply to:</p>
      <ul>
        <li>Units first occupied after November 15, 2018 (no rent control)</li>
        <li>Social housing</li>
        <li>Commercial properties</li>
        <li>Care homes</li>
      </ul>
      
      <h2>What If Your Landlord Increases More Than 2.5%?</h2>
      <p>If your unit is rent-controlled and your landlord tries to increase beyond the guideline:</p>
      <ol>
        <li>Do NOT pay the illegal increase</li>
        <li>Pay only your current rent plus 2.5%</li>
        <li>Request proof of any LTB approval for above-guideline increase</li>
        <li>File a T1 application if they try to enforce an illegal increase</li>
      </ol>
      
      <p>Questions about rent increases? <a href="/contact">Contact us</a> for help.</p>
    `,
    faqs: [
      { q: 'When can my landlord increase my rent?', a: '12 months after your last rent increase (or 12 months after you moved in if no increases yet). They must give 90 days written notice.' },
      { q: 'Is my unit rent controlled?', a: 'Most units first occupied before November 15, 2018 are rent controlled. Units first occupied after that date have no rent control.' }
    ]
  },
  {
    slug: 'how-long-eviction-take-ontario',
    title: 'How Long Does an Eviction Take in Ontario?',
    description: 'Ontario evictions typically take 2-6 months through the LTB. Learn the timeline for different types of evictions.',
    category: 'ltb',
    date: '2025-12-28',
    readTime: '4 min',
    content: `
      <p>Eviction timelines in Ontario vary significantly depending on the type of eviction and current LTB backlogs. Here's what to expect:</p>
      
      <h2>Current LTB Wait Times</h2>
      <p>As of early 2026, the Landlord and Tenant Board is experiencing significant backlogs:</p>
      <ul>
        <li><strong>Non-payment of rent (L1):</strong> 2-4 months to hearing</li>
        <li><strong>Cause-based evictions (L2):</strong> 3-6 months to hearing</li>
        <li><strong>Personal use (N12):</strong> 3-6 months to hearing</li>
        <li><strong>Renoviction (N13):</strong> 4-8 months to hearing</li>
      </ul>
      
      <h2>The Eviction Timeline</h2>
      
      <h3>Step 1: Notice Period (Varies)</h3>
      <ul>
        <li>N4 (non-payment): 14 days</li>
        <li>N5 (interference/damage): 20 days (first notice)</li>
        <li>N12 (personal use): 60 days</li>
        <li>N13 (renovation): 120 days</li>
      </ul>
      
      <h3>Step 2: Application to LTB (1-2 weeks)</h3>
      <p>After the notice period expires, landlord files application.</p>
      
      <h3>Step 3: Hearing Scheduled (2-6 months)</h3>
      <p>Current wait times vary by region and application type.</p>
      
      <h3>Step 4: Eviction Order (If granted)</h3>
      <p>Tenant typically has 11 days to vacate after order.</p>
      
      <h3>Step 5: Sheriff Enforcement (If needed)</h3>
      <p>If tenant doesn't leave, Sheriff enforcement can take 2-4 additional weeks.</p>
      
      <h2>Total Timeline</h2>
      <p>A straightforward non-payment eviction typically takes <strong>3-5 months total</strong>. Contested evictions or those involving defences can take 6-12 months or longer.</p>
      
      <p>Need help with an eviction? <a href="/contact">Contact us</a> - we represent both landlords and tenants.</p>
    `,
    faqs: [
      { q: 'Can I be evicted immediately?', a: 'No. Even in urgent cases, the LTB process must be followed. Only a Sheriff can physically remove a tenant after a proper eviction order.' },
      { q: 'What if I pay rent arrears before the hearing?', a: 'For L1 applications, if you pay all arrears plus the $53 filing fee before the hearing, the application is typically dismissed.' }
    ]
  },
  {
    slug: 'fighting-careless-driving-charge-ontario',
    title: 'Fighting a Careless Driving Charge in Ontario',
    description: 'Careless driving carries 6 demerit points, fines up to $2,000, and possible licence suspension. Learn your defence options.',
    category: 'traffic',
    date: '2025-12-20',
    readTime: '4 min',
    content: `
      <p>Careless driving is one of the most serious charges under Ontario's Highway Traffic Act. Here's what you're facing and how to fight it.</p>
      
      <h2>Penalties for Careless Driving</h2>
      <ul>
        <li><strong>Fine:</strong> $400 to $2,000</li>
        <li><strong>Demerit points:</strong> 6 points</li>
        <li><strong>Licence suspension:</strong> Up to 2 years possible</li>
        <li><strong>Jail:</strong> Up to 6 months (rare, but possible)</li>
        <li><strong>Insurance:</strong> Major increase or policy cancellation</li>
      </ul>
      
      <h2>What Is Careless Driving?</h2>
      <p>Under section 130 of the Highway Traffic Act, careless driving means operating a vehicle "without due care and attention" or "without reasonable consideration for other persons."</p>
      <p>Common situations that lead to careless driving charges:</p>
      <ul>
        <li>Rear-end collisions</li>
        <li>Changing lanes into another vehicle</li>
        <li>Running red lights that cause accidents</li>
        <li>Distracted driving incidents</li>
        <li>Losing control of your vehicle</li>
      </ul>
      
      <h2>Defence Strategies</h2>
      <p>Careless driving charges can often be challenged:</p>
      <ul>
        <li><strong>Momentary lapse:</strong> A brief distraction isn't always careless driving</li>
        <li><strong>External factors:</strong> Road conditions, weather, mechanical failure</li>
        <li><strong>Witness credibility:</strong> Challenging witness statements</li>
        <li><strong>Reduction negotiations:</strong> Reducing to a lesser charge (following too closely, etc.)</li>
      </ul>
      
      <h2>Why You Need Representation</h2>
      <p>Careless driving goes on your record as a major conviction. Insurance companies view this almost as seriously as impaired driving. Professional representation significantly improves your chances of a reduced charge or dismissal.</p>
      
      <p>Facing a careless driving charge? Call <a href="tel:+12262725153">226-272-5153</a> immediately for a free consultation.</p>
    `,
    faqs: [
      { q: 'Is careless driving a criminal charge?', a: 'No, it\'s a provincial offence under the Highway Traffic Act, not the Criminal Code. However, it\'s treated very seriously and has significant consequences.' },
      { q: 'Can careless driving be reduced?', a: 'Yes, often. With proper representation, careless driving charges are frequently reduced to lesser offences like "following too closely" which carries fewer points and lower insurance impact.' }
    ]
  },
  {
    slug: 'wrongful-dismissal-ontario-what-to-do',
    title: 'Wrongfully Dismissed? What to Do First in Ontario',
    description: 'If you\'ve been fired without cause in Ontario, you may be owed severance pay. Learn your rights and immediate steps to take.',
    category: 'employment',
    date: '2025-12-15',
    readTime: '4 min',
    content: `
      <p>Being fired is stressful, but if you've been terminated without cause in Ontario, you likely have rights to severance pay. Here's what to do.</p>
      
      <h2>Immediate Steps After Termination</h2>
      <ol>
        <li><strong>Don't sign anything immediately</strong> - You have time to review any offer</li>
        <li><strong>Get everything in writing</strong> - Request your termination letter and ROE</li>
        <li><strong>Document everything</strong> - Save emails, performance reviews, communications</li>
        <li><strong>Apply for EI</strong> - Do this right away, regardless of severance negotiations</li>
        <li><strong>Get legal advice</strong> - Before accepting any severance offer</li>
      </ol>
      
      <h2>What You May Be Owed</h2>
      
      <h3>ESA Minimums</h3>
      <p>The Employment Standards Act provides minimum termination pay:</p>
      <ul>
        <li>1 week per year of service (up to 8 weeks)</li>
        <li>Plus severance pay if employer has $2.5M+ payroll and you have 5+ years</li>
      </ul>
      
      <h3>Common Law Entitlements</h3>
      <p>You may be entitled to significantly more than ESA minimums - often <strong>1 month per year of service</strong> or more, depending on:</p>
      <ul>
        <li>Your age</li>
        <li>Length of service</li>
        <li>Position and salary</li>
        <li>Availability of similar employment</li>
      </ul>
      
      <h2>Time Limits</h2>
      <p>You have <strong>2 years</strong> to file a wrongful dismissal claim, but acting quickly preserves your options and evidence.</p>
      
      <h2>What About My Employment Contract?</h2>
      <p>Many termination clauses in employment contracts are unenforceable. Just because your contract limits severance doesn't mean you're bound by it.</p>
      
      <p>Recently terminated? <a href="/contact">Contact us</a> for a free consultation to review your severance offer.</p>
    `,
    faqs: [
      { q: 'Should I accept the severance offer my employer gave me?', a: 'Not before getting legal advice. First offers are often below what you\'re entitled to. A free consultation can tell you if it\'s fair.' },
      { q: 'Can paralegals handle wrongful dismissal cases?', a: 'Yes, for claims within Small Claims Court jurisdiction (up to $50,000). For larger claims, we can refer you to an employment lawyer.' }
    ]
  },
  {
    slug: 'stunt-driving-ontario-new-rules',
    title: 'Ontario Stunt Driving Laws: What You Need to Know',
    description: 'Stunt driving in Ontario means 40+ km/h over the limit (or 50+ on highways 100km+). Penalties include licence suspension, vehicle impoundment, and huge fines.',
    category: 'traffic',
    date: '2025-12-10',
    readTime: '4 min',
    content: `
      <p>Ontario has some of the strictest stunt driving laws in North America. Here's what constitutes stunt driving and the severe penalties you face.</p>
      
      <h2>What Is Stunt Driving?</h2>
      <p>Under the Highway Traffic Act, stunt driving includes:</p>
      <ul>
        <li><strong>Excessive speed:</strong> 40+ km/h over on roads with limits under 80 km/h</li>
        <li><strong>Excessive speed (highways):</strong> 50+ km/h over on roads with 80+ km/h limits</li>
        <li><strong>Racing:</strong> Any form of racing on public roads</li>
        <li><strong>Dangerous maneuvers:</strong> Wheelies, drifting, blocking traffic intentionally</li>
        <li><strong>Driving too close:</strong> Intentionally cutting off other vehicles</li>
      </ul>
      
      <h2>Immediate Roadside Penalties</h2>
      <p>If charged with stunt driving, you face immediate consequences:</p>
      <ul>
        <li><strong>30-day licence suspension</strong> (roadside)</li>
        <li><strong>14-day vehicle impoundment</strong></li>
        <li>These apply even before your court date</li>
      </ul>
      
      <h2>Court Penalties (If Convicted)</h2>
      <ul>
        <li><strong>First offence:</strong> $2,000 - $10,000 fine, 1-3 year suspension</li>
        <li><strong>Second offence:</strong> $2,000 - $10,000 fine, 3-10 year suspension, up to 6 months jail</li>
        <li><strong>Third+ offence:</strong> $2,000 - $10,000 fine, lifetime suspension possible</li>
      </ul>
      
      <h2>Insurance Impact</h2>
      <p>A stunt driving conviction often results in:</p>
      <ul>
        <li>Policy cancellation</li>
        <li>Need for high-risk insurance</li>
        <li>Premiums increasing 100-400%</li>
        <li>Difficulty finding any insurer</li>
      </ul>
      
      <h2>Fighting Stunt Driving Charges</h2>
      <p>Common defences include:</p>
      <ul>
        <li>Challenging radar/lidar calibration</li>
        <li>Questioning officer's speed estimation</li>
        <li>Negotiating reduction to regular speeding</li>
        <li>Emergency circumstances</li>
      </ul>
      
      <p>Charged with stunt driving? Call <a href="tel:+12262725153">226-272-5153</a> immediately - time is critical.</p>
    `,
    faqs: [
      { q: 'Can I get my car back before the 14 days?', a: 'Generally no. The 14-day impoundment is mandatory. You\'ll also have to pay impound and towing fees.' },
      { q: 'Will I lose my licence forever?', a: 'Not for a first offence, but a third offence can result in a lifetime ban. Fighting the charge is critical.' }
    ]
  }
];

// Helper function to get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Helper function to get posts by category
export function getPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// Get recent posts
export function getRecentPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
