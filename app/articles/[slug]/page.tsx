"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { trackPageVisit } from "@/utils/userTracking"
import Header from "@/components/Header"

// Article data
const articles = {
  "covid-spread-india": {
    title: "The Ripple Effect: How COVID-19 Swept Across India",
    date: "January 11, 2025",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&q=80",
    content: `
      When the first case of COVID-19 was reported in Kerala on January 30, 2020, few could have predicted the seismic impact it would have on India's 1.3 billion people. What followed was a story of resilience, innovation, and unprecedented challenges.

      The Initial Shock
      As news of the virus spread, so did a wave of uncertainty. Streets once bustling with life fell silent, and the hum of daily activity was replaced by the echo of lockdown announcements. It was as if someone had hit the pause button on the world's largest democracy.

      But India is no stranger to adversity. As the initial shock subsided, a spirit of adaptability emerged:

      - Balconies became stages for community bonding
      - Kitchen tables transformed into home offices
      - Local tailors switched from stitching clothes to crafting masks

      Riding the Waves
      The pandemic in India unfolded like a suspense thriller, with multiple plot twists:

      1. The First Wave (2020): A test of preparedness and public health infrastructure
      2. The Delta Surge (2021): A tsunami that pushed the healthcare system to its limits
      3. Omicron and Beyond (2022): A reminder that the virus could still surprise us

      Each wave brought its own set of challenges, but also sparked incredible innovations. From converting railway coaches into isolation wards to launching one of the world's largest vaccination drives, India's response was nothing short of a blockbuster script.

      The Healthcare Cavalry
      If this pandemic were a movie, healthcare workers would be the unsung heroes. Clad in PPE suits that looked like astronaut gear, they battled on the frontlines day and night. Their weapons? Stethoscopes, ventilators, and an unwavering commitment to saving lives.

      The medical community pulled off feats that seemed impossible:

      - Ramping up testing from a few hundred to millions per day
      - Setting up field hospitals in stadiums and parking lots
      - Developing indigenous vaccines in record time

      A Tale of Many Indias
      The virus didn't discriminate, but its impact varied dramatically across the country:

      - Metropolises became hotspots, with skyscrapers turning into vertical quarantine zones
      - Rural areas grappled with limited healthcare access, turning to age-old home remedies
      - Tourist havens like Goa saw their beaches empty, the sound of waves replacing the chatter of visitors

      Lessons for the Future
      As we look back, it's clear that this chapter in India's history is filled with valuable lessons:

      1. The importance of robust public health systems
      2. The power of community in times of crisis
      3. The need for clear, consistent communication
      4. The potential of technology in healthcare delivery

      While the story of COVID-19 in India is far from over, it has already left an indelible mark on the nation's psyche. It's a testament to the country's ability to face adversity head-on, innovate on the fly, and emerge stronger from challenges.

      As we continue to navigate the post-pandemic world, one thing is certain: The spirit of resilience that saw India through its darkest days will light the way forward.
    `,
  },
  "indian-states-battle": {
    title: "The Great Indian COVID-19 Battle: A State-by-State Saga",
    date: "February 15, 2025",
    image: "https://images.unsplash.com/photo-1587814969489-e5df12e17391?w=800&h=400&q=80",
    content: `
      The COVID-19 pandemic in India wasn't just a national crisis; it was a collection of state-level battles, each with its unique challenges and triumphs. This is the story of how India's diverse states faced the pandemic head-on.

      Maharashtra: The Eye of the Storm
      As India's economic powerhouse, Maharashtra bore the brunt of the pandemic's first wave. Mumbai, the city that never sleeps, found itself in an unprecedented lockdown. But Maharashtrians are known for their resilience:
      - Dharavi, Asia's largest slum, became a model for COVID management
      - The state's healthcare system expanded rapidly, turning stadiums into hospitals
      - Innovation flourished, with local engineers developing low-cost ventilators

      Kerala: The Prepared Pioneer
      Kerala's experience with the Nipah virus proved invaluable. The state's response was swift and decisive:
      - Robust contact tracing system implemented within days
      - Community kitchens ensured no one went hungry during lockdowns
      - The 'Break the Chain' campaign became a statewide movement

      Delhi: Capital Under Siege
      As the national capital, Delhi faced unique challenges:
      - Coordinating between state and central governments
      - Managing an influx of patients from neighboring states
      - Turning train coaches into isolation wards

      Uttar Pradesh: The Logistical Leviathan
      India's most populous state had to think big:
      - Managed the return of millions of migrant workers
      - Implemented a 'containment zone' strategy on a massive scale
      - Leveraged its pharmaceutical industry for medicine production

      The Northeastern Frontier
      Often overlooked, India's northeastern states showed remarkable adaptability:
      - Sikkim remained COVID-free for months through strict border control
      - Assam converted oil tankers into oxygen carriers
      - Mizoram's community-led approach kept numbers low

      Lessons from the Battleground
      Each state's experience offers valuable insights:
      1. The importance of decentralized decision-making
      2. The power of community engagement in crisis management
      3. The need for flexible healthcare systems that can scale rapidly
      4. The value of interstate cooperation and resource sharing

      As India moves forward, these state-level experiences will shape its approach to future health crises. The diversity that defines India proved to be its strength, with each state contributing its unique approach to the national fight against COVID-19.

      The battle isn't over, but India's states have shown that unity in diversity isn't just a slogan – it's a powerful strategy against even the most formidable of foes.
    `,
  },
  "maharashtra-goa-impact": {
    title: "Tale of Two States: Maharashtra and Goa's COVID-19 Journey",
    date: "March 20, 2025",
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&h=400&q=80",
    content: `
      In the grand tapestry of India's COVID-19 response, the contrasting experiences of Maharashtra and Goa stand out as a fascinating case study. These neighboring states, despite their proximity, faced vastly different challenges and developed unique strategies to combat the pandemic.

      Maharashtra: The Goliath's Battle
      As India's second-most populous state and its economic powerhouse, Maharashtra found itself at the epicenter of the pandemic:

      Urban Challenges:
      - Mumbai's dense slums became early hotspots
      - Public transportation, the city's lifeline, turned into a major concern
      - High-rise apartments posed unique containment challenges

      Economic Impact:
      - The shutdown of industries led to massive job losses
      - Maharashtra's famous dabbawalas saw their livelihoods disappear overnight
      - The Bollywood industry came to a standstill, affecting thousands

      Healthcare Response:
      - Rapid expansion of hospital capacity, including field hospitals in stadiums
      - Private hospitals were brought under government control to manage bed availability
      - Innovative solutions like 'doctor on wheels' for slum areas

      Goa: The Tourist Paradise in Lockdown
      Goa, known for its beaches and vibrant tourism, faced a different set of challenges:

      Tourism Woes:
      - The tourism-dependent economy came to a grinding halt
      - Hotels and shacks on beaches stood empty for months
      - Many small businesses dependent on tourists struggled to survive

      Healthcare Preparedness:
      - Despite its small size, Goa ramped up testing capabilities quickly
      - The state turned to telemedicine to manage mild cases
      - Goa's community bonds helped in effective contact tracing

      Unique Solutions:
      - Goa's feni distilleries were repurposed to produce hand sanitizers
      - Local fishing communities helped enforce coastal lockdowns
      - The state leveraged its strong panchayat system for grassroots-level pandemic management

      The Rebound Strategy
      Both states had to think creatively about post-lockdown recovery:

      Maharashtra's Approach:
      - Launched 'Mission Begin Again' for phased reopening
      - Focused on reviving SMEs through financial packages
      - Accelerated infrastructure projects to generate employment

      Goa's Revival Plan:
      - Introduced 'Goa Tourism 2.0' focusing on sustainable and health-conscious tourism
      - Promoted workations to attract long-term visitors
      - Diversified economy by promoting IT and startup culture

      Lessons and Reflections
      The Maharashtra-Goa story offers valuable insights:
      1. One-size-fits-all solutions don't work; strategies need to be localized
      2. Economic diversification is crucial for resilience against such crises
      3. Community engagement is key to effective healthcare delivery
      4. Technology adoption can significantly enhance crisis response capabilities

      As India moves forward, the experiences of Maharashtra and Goa serve as important chapters in the country's pandemic story. Their journeys highlight the importance of adaptability, innovation, and community spirit in facing unprecedented challenges.

      The tale of these two states reminds us that in diversity lies strength, and in adversity lies the seed of innovation and growth.
    `,
  },
  "data-driven-insights": {
    title: "Decoding the Pandemic: Data-Driven Insights from India's COVID-19 Battle",
    date: "April 5, 2025",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&h=400&q=80",
    content: `
      In the fight against COVID-19, data emerged as a powerful weapon. India's battle with the pandemic generated a wealth of information, offering unprecedented insights into disease spread, healthcare system responses, and the effectiveness of public health measures. Let's dive into the data-driven story of India's pandemic response.

      The Numbers Game
      Raw data told a compelling story:
      - Daily case counts peaked at over 400,000 during the second wave
      - Testing capacity grew from a few thousand to millions per day
      - Vaccination drive administered over 2 billion doses

      But beyond these headline figures lay deeper insights.

      Predictive Modeling: Staying Ahead of the Curve
      Data scientists across India developed models to predict:
      - Infection spread patterns
      - Healthcare resource requirements
      - Impact of lockdowns and other interventions

      Key findings:
      1. Early interventions were crucial in flattening the curve
      2. Hyperlocal containment strategies proved more effective than blanket lockdowns
      3. Vaccination significantly reduced severity and mortality in subsequent waves

      Mapping the Virus
      GIS technology helped in:
      - Identifying hotspots and containment zones
      - Optimizing healthcare resource allocation
      - Planning vaccination drives

      Interesting patterns emerged:
      - Urban centers were initial hotspots, but rural areas caught up in later waves
      - Coastal regions showed different transmission patterns compared to inland areas
      - Religious and political gatherings had quantifiable impacts on local case spikes

      Socio-Economic Correlations
      Data revealed intriguing connections:
      - Areas with higher literacy rates showed better compliance with safety measures
      - Economic factors influenced the ability to follow lockdown measures
      - Public transportation usage correlated strongly with infection rates in urban areas

      Healthcare System Insights
      Data-driven analysis helped in:
      - Predicting oxygen and bed requirements
      - Optimizing vaccine distribution
      - Identifying vulnerable populations for prioritized care

      Key learnings:
      1. Telemedicine adoption rose by 300%, improving healthcare access
      2. Tier-2 and Tier-3 cities needed significant healthcare infrastructure upgrades
      3. Mental health emerged as a critical but often overlooked aspect

      The Power of Real-Time Dashboards
      Data visualization played a crucial role:
      - Enabled policymakers to make informed decisions quickly
      - Helped the public understand the evolving situation
      - Facilitated international cooperation and knowledge sharing

Popular dashboards provided:
- Daily case updates and trends
- Vaccination progress
- Healthcare resource availability

Challenges in Data Collection and Analysis
The data journey wasn't without hurdles:
- Inconsistent reporting standards across states
- Limited data from rural areas in the initial phases
- Balancing data privacy concerns with public health needs

Overcoming these challenges led to:
1. Standardization of data collection protocols
2. Increased investment in rural healthcare IT infrastructure
3. Development of anonymized data sharing frameworks

Lessons for the Future
The data-driven approach to tackling COVID-19 in India offers valuable lessons:
1. Importance of robust health data infrastructure
2. Need for data literacy among healthcare workers and policymakers
3. Potential of AI and machine learning in epidemic management
4. Crucial role of transparent data sharing in building public trust

As India moves forward, these data-driven insights will shape its approach to public health, potentially revolutionizing how the country responds to future health crises.

The COVID-19 pandemic, while challenging, has accelerated India's journey towards becoming a data-driven society, especially in healthcare. This transformation promises to have lasting impacts, improving health outcomes and crisis preparedness for generations to come.
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const article = articles[params.slug as keyof typeof articles]
  const currentUser = localStorage.getItem("currentUser")

  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    } else {
      trackPageVisit(currentUser, `Article: ${article.title}`)
    }
  }, [currentUser, router, article.title])

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header type="news-article" />
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => {
            router.push("/")
            if (currentUser) {
              trackPageVisit(currentUser, "Back to Home")
            }
          }}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-6">{article.date}</p>

        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>

        <div className="prose prose-lg max-w-none">
          {article.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.trim().startsWith("- ")) {
              return (
                <ul key={index} className="list-disc pl-6 mb-4">
                  {paragraph.split("\n").map((item, itemIndex) => (
                    <li key={itemIndex}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              )
            }
            if (/^\d+\./.test(paragraph.trim())) {
              return (
                <ol key={index} className="list-decimal pl-6 mb-4">
                  {paragraph.split("\n").map((item, itemIndex) => (
                    <li key={itemIndex}>{item.replace(/^\d+\.\s/, "")}</li>
                  ))}
                </ol>
              )
            }
            return (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>
    </>
  )
}

