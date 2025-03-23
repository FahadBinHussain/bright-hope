import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post | Bright Hope",
  description: "Read our latest blog post about our work and impact.",
};

// Temporary data for the blog post
const post = {
  id: "1",
  slug: "making-a-difference",
  title: "Making a Difference: How Small Actions Create Big Impact",
  excerpt:
    "Discover how individual contributions can lead to significant positive changes in communities around the world.",
  image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  author: {
    name: "Mahir Abdullah",
    role: "Community Outreach Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  date: "March 14, 2024",
  readTime: "5 min read",
  content: `
    <p>In the small village of Patuakhali along Bangladesh's southern coast, a quiet revolution has been taking place. What started as a simple community meeting organized by Bright Hope volunteers has blossomed into a transformative movement that's changing lives.</p>
    
    <p>When we first arrived in Patuakhali in 2022, the village faced multiple challenges: limited access to clean water, vulnerable housing structures that couldn't withstand seasonal cyclones, and fishing practices that were becoming less sustainable as climate change altered coastal ecosystems.</p>
    
    <h3>Small Beginnings</h3>
    <p>Our team began with simple conversations. Rather than imposing outside solutions, we listened to community members about their most pressing needs. A small group of 12 local residents and 3 Bright Hope facilitators gathered weekly, discussing possibilities and mapping community resources.</p>
    
    <p>"We didn't need someone to build everything for us. We needed partners who could help us organize what we already had and bring in specific expertise," explains Farid, a local fisherman who emerged as a community leader.</p>
    
    <h3>Ripple Effects</h3>
    <p>The first micro-project focused on reinforcing 15 homes most vulnerable to flooding. Volunteers from both Bright Hope and the local community worked together, using a combination of traditional knowledge and modern engineering techniques. The success of this initial effort sparked enthusiasm throughout the village.</p>
    
    <p>Soon, other initiatives followed. The community established a water management committee that implemented simple but effective filtration systems for three community wells, providing clean water to 450 residents. Local fishers formed a cooperative that introduced sustainable fishing practices, increasing their catch while preserving fish populations.</p>
    
    <h3>Measuring Real Impact</h3>
    <p>Two years later, the results speak volumes:</p>
    <ul>
      <li>45 homes reinforced against cyclone damage</li>
      <li>Zero waterborne illness outbreaks, compared to three in the previous year</li>
      <li>Fishing yields increased by 27% while maintaining sustainable harvesting</li>
      <li>A new community emergency fund established with local contributions</li>
    </ul>
    
    <p>Perhaps most importantly, community leadership has flourished. The original group of 15 has expanded to 60 active members who now coordinate their own initiatives, with Bright Hope serving as an occasional advisor rather than the primary driver of change.</p>
    
    <p>"The biggest change isn't in our structures or systems," says Nasreen, who leads the water committee. "It's in how we see ourselves. We now approach problems as opportunities to come together rather than reasons to despair."</p>
    
    <p>As Bright Hope expands this model to other coastal communities in Bangladesh, the lesson from Patuakhali is clear: meaningful change doesn't always require massive resources or dramatic interventions. Sometimes, the most powerful catalyst is creating space for communities to recognize and mobilize their own strength.</p>
  `,
};

// Add data for the other blog posts that can be loaded dynamically
const blogPostsData = {
  "making-a-difference": {
    id: "1",
    slug: "making-a-difference",
    title: "Making a Difference: How Small Actions Create Big Impact",
    excerpt:
      "Discover how individual contributions can lead to significant positive changes in communities around the world.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Mahir Abdullah",
      role: "Community Outreach Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    date: "March 14, 2024",
    readTime: "5 min read",
    content: `
      <p>In the small village of Patuakhali along Bangladesh's southern coast, a quiet revolution has been taking place. What started as a simple community meeting organized by Bright Hope volunteers has blossomed into a transformative movement that's changing lives.</p>
      
      <p>When we first arrived in Patuakhali in 2022, the village faced multiple challenges: limited access to clean water, vulnerable housing structures that couldn't withstand seasonal cyclones, and fishing practices that were becoming less sustainable as climate change altered coastal ecosystems.</p>
      
      <h3>Small Beginnings</h3>
      <p>Our team began with simple conversations. Rather than imposing outside solutions, we listened to community members about their most pressing needs. A small group of 12 local residents and 3 Bright Hope facilitators gathered weekly, discussing possibilities and mapping community resources.</p>
      
      <p>"We didn't need someone to build everything for us. We needed partners who could help us organize what we already had and bring in specific expertise," explains Farid, a local fisherman who emerged as a community leader.</p>
      
      <h3>Ripple Effects</h3>
      <p>The first micro-project focused on reinforcing 15 homes most vulnerable to flooding. Volunteers from both Bright Hope and the local community worked together, using a combination of traditional knowledge and modern engineering techniques. The success of this initial effort sparked enthusiasm throughout the village.</p>
      
      <p>Soon, other initiatives followed. The community established a water management committee that implemented simple but effective filtration systems for three community wells, providing clean water to 450 residents. Local fishers formed a cooperative that introduced sustainable fishing practices, increasing their catch while preserving fish populations.</p>
      
      <h3>Measuring Real Impact</h3>
      <p>Two years later, the results speak volumes:</p>
      <ul>
        <li>45 homes reinforced against cyclone damage</li>
        <li>Zero waterborne illness outbreaks, compared to three in the previous year</li>
        <li>Fishing yields increased by 27% while maintaining sustainable harvesting</li>
        <li>A new community emergency fund established with local contributions</li>
      </ul>
      
      <p>Perhaps most importantly, community leadership has flourished. The original group of 15 has expanded to 60 active members who now coordinate their own initiatives, with Bright Hope serving as an occasional advisor rather than the primary driver of change.</p>
      
      <p>"The biggest change isn't in our structures or systems," says Nasreen, who leads the water committee. "It's in how we see ourselves. We now approach problems as opportunities to come together rather than reasons to despair."</p>
      
      <p>As Bright Hope expands this model to other coastal communities in Bangladesh, the lesson from Patuakhali is clear: meaningful change doesn't always require massive resources or dramatic interventions. Sometimes, the most powerful catalyst is creating space for communities to recognize and mobilize their own strength.</p>
    `,
  },
  "sustainable-development": {
    id: "2",
    slug: "sustainable-development",
    title: "Sustainable Development: Building a Better Future",
    excerpt:
      "Learn about our approach to sustainable development and how it's helping communities thrive.",
    image: "https://images.unsplash.com/photo-1552799446-159ba9523315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Fahad Bin Hussain",
      role: "Sustainability Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    date: "March 12, 2024",
    readTime: "4 min read",
    content: `
      <p>The rice paddies of Rangpur district have sustained generations of Bangladeshi farmers. But in recent years, changing rainfall patterns, increased flooding, and soil degradation threatened the livelihoods of thousands of agricultural families.</p>
      
      <p>When Bright Hope launched our Climate-Resilient Agriculture Initiative in 2021, we faced skepticism from farmers who had seen previous aid programs come and go with little lasting impact. "We've heard promises before," said Rahim, a third-generation rice farmer. "But promises don't grow rice."</p>
      
      <h3>A Holistic Approach</h3>
      <p>Rather than treating environmental challenges as isolated problems, our team worked with agricultural experts and local farmers to develop an integrated approach that considered the entire ecosystem.</p>
      
      <p>The initiative had three core components:</p>
      <ol>
        <li><strong>Climate-Adaptive Farming Techniques:</strong> Introducing drought-resistant rice varieties and water management systems that could withstand both floods and drought conditions.</li>
        <li><strong>Soil Regeneration:</strong> Implementing crop rotation and organic composting practices to restore soil health without reliance on expensive chemical fertilizers.</li>
        <li><strong>Market Access:</strong> Creating cooperative structures that helped small farmers aggregate their harvests and access fair markets.</li>
      </ol>
      
      <h3>Knowledge Sharing, Not Just Technology</h3>
      <p>While new seeds and farming techniques were important, the heart of the program was knowledge exchange. We established farmer field schools where agricultural scientists learned from traditional farming knowledge while introducing evidence-based innovations.</p>
      
      <p>"What made this different was that they asked us to teach them before they taught us," explained Minara, who now leads one of the women's farming collectives. "They respected what we already knew about our land."</p>
      
      <h3>Results That Grow</h3>
      <p>Three growing seasons later, the results have exceeded our expectations:</p>
      <ul>
        <li>Rice yields have increased by 35% despite increasingly erratic weather patterns</li>
        <li>400 farming families have reduced their reliance on chemical inputs by 60%</li>
        <li>Farmer incomes have grown by 28% through improved market access</li>
        <li>Soil health metrics show significant improvement in organic matter and microbiological activity</li>
      </ul>
      
      <p>Perhaps most significantly, the program is now primarily run by the farmers themselves. Eight local cooperatives coordinate knowledge sharing, seedbank management, and market negotiations with minimal outside support.</p>
      
      <h3>The Future of Farming</h3>
      <p>As climate change continues to reshape Bangladesh's agricultural reality, the farmers of Rangpur are no longer simply victims of environmental change – they're active agents in creating sustainable solutions.</p>
      
      <p>"We used to only worry about survival from one season to the next," says Rahim, who had initially been skeptical. "Now we're planning for our grandchildren's future. We're not just growing crops; we're growing hope."</p>
      
      <p>Bright Hope is now working to extend this model to four additional districts, adapting the approach for different ecological zones while maintaining the core principle: sustainable development isn't something done to communities or for communities – it's achieved with communities leading the way.</p>
    `,
  },
  "education-empowerment": {
    id: "3",
    slug: "education-empowerment",
    title: "Education as a Tool for Empowerment",
    excerpt:
      "Explore how education is transforming lives and creating opportunities in underserved communities.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80",
    author: {
      name: "Emily Rodriguez",
      role: "Education Program Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    },
    date: "March 10, 2024",
    readTime: "6 min read",
    content: `
      <p>Seventeen-year-old Labiba adjusts her hijab as she prepares to teach today's coding class. Three years ago, she had never touched a computer. Today, she's developing mobile applications that help her community in Sylhet track local flood patterns and alert residents before disaster strikes.</p>
      
      <p>Labiba's journey exemplifies the transformative power of education when it's designed to be both accessible and relevant to the realities of rural Bangladesh.</p>
      
      <h3>Beyond Traditional Learning</h3>
      <p>When Bright Hope established the Digital Pathways program in Sylhet in 2020, our goal wasn't simply to teach technical skills. We aimed to create an educational model that empowered young people—especially girls—to become problem-solvers in their communities.</p>
      
      <p>The program combined three essential elements:</p>
      <ol>
        <li><strong>Technical Training:</strong> Practical skills in programming, digital design, and data analysis.</li>
        <li><strong>Community Challenges:</strong> Students identified real problems facing their communities and used technology to develop solutions.</li>
        <li><strong>Entrepreneurship:</strong> Graduates received mentorship to turn promising projects into sustainable initiatives or small businesses.</li>
      </ol>
      
      <p>"Traditional education often feels disconnected from our daily challenges," explains Labiba. "Here, every skill we learn is immediately applied to problems we care about solving."</p>
      
      <h3>Breaking Barriers</h3>
      <p>In a region where girls' education is still sometimes contested, the program faced initial resistance. Some parents questioned whether digital skills were appropriate or necessary for their daughters.</p>
      
      <p>Rather than dismissing these concerns, we engaged with them directly. We organized community dialogues where successful female tech professionals from Bangladesh shared their journeys. We scheduled classes to accommodate household responsibilities and ensured safe transportation.</p>
      
      <p>Most importantly, we demonstrated the practical value of these skills by focusing on applications that addressed immediate community needs—from healthcare information systems to agricultural market platforms.</p>
      
      <h3>Measurable Impact</h3>
      <p>Four years later, the Digital Pathways program has achieved remarkable results:</p>
      <ul>
        <li>250 students (68% female) have completed the core curriculum</li>
        <li>28 community-based applications have been developed and deployed</li>
        <li>15 graduate-led tech initiatives now generate sustainable income</li>
        <li>The early warning system developed by Labiba's team has been credited with saving lives during the 2023 floods</li>
      </ul>
      
      <p>The ripple effects extend beyond direct participants. Enrollment of girls in secondary education has increased by 22% in communities with Digital Pathways graduates, as younger students see new possibilities for their futures.</p>
      
      <h3>Education That Transforms</h3>
      <p>"Education is most powerful when it helps people recognize and develop their own capacity to create change," says Tahmina, one of the program's local instructors. "We're not just teaching coding—we're fostering a generation that approaches problems with confidence and creativity."</p>
      
      <p>For Labiba, who now mentors younger students while continuing her own education, the impact has been personal as well as communal. "Before, I saw the floods as something we could only react to," she reflects. "Now I understand that with the right knowledge and tools, we can predict, prepare, and protect each other. That's the real power of education."</p>
      
      <p>As Bright Hope expands the Digital Pathways model to additional districts in 2024, Labiba's journey reminds us that education is most transformative when it doesn't just impart information—but empowers students to become agents of positive change in their own communities.</p>
    `,
  },
  "power-of-community": {
    id: "4",
    slug: "power-of-community",
    title: "The Power of Community: Stories of Hope and Change",
    excerpt:
      "Join us as we share inspiring stories of communities coming together to create lasting positive change.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Mahir Abdullah",
      role: "Community Outreach Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    },
    date: "March 16, 2024",
    readTime: "7 min read",
    content: `
      <p>When the river began to rise in Kurigram district during the monsoon season of 2022, it wasn't just another flood for the residents of Char Bhangapur. This time, something was different.</p>
      
      <p>Instead of waiting for outside help, the community mobilized. Emergency response teams formed by local volunteers were already evacuating vulnerable residents to pre-identified shelters. Community kitchens, established months earlier, began distributing meals. And a network of boats, organized by the village's fishing cooperative, transported people and supplies where roads had become impassable.</p>
      
      <h3>The Birth of Community-Led Disaster Response</h3>
      <p>This remarkable coordination wasn't spontaneous—it was the result of Bright Hope's Community Resilience Network, a program that has fundamentally changed how vulnerable communities prepare for and respond to Bangladesh's increasingly severe climate disasters.</p>
      
      <p>"In the past, we were victims waiting for rescue," explains Jalil, who heads the local Community Resilience Committee. "Now we are the first responders in our own community."</p>
      
      <p>The program, launched in 2021, works with communities in flood-prone regions to develop localized disaster preparation and response systems. Rather than imposing external plans, Bright Hope facilitators help communities map their unique vulnerabilities, inventory local resources, and design response protocols that leverage indigenous knowledge and existing social structures.</p>
      
      <h3>From Individual Survival to Collective Action</h3>
      <p>The transformation in Char Bhangapur didn't happen overnight. Initial community meetings revealed deep-seated fatalism about floods—many residents saw them as inevitable disasters to be endured rather than challenges that could be managed.</p>
      
      <p>"When we first started talking about community-led disaster response, people laughed," recalls Shilpi, a Bright Hope community organizer. "They said, 'We're poor villagers, not rescue workers.'"</p>
      
      <p>The breakthrough came when facilitators helped residents recognize the knowledge and resources they already possessed. Fishermen knew the river patterns better than any outside expert. Women who managed households understood family needs during displacement. Elders remembered traditional coping strategies from past generations.</p>
      
      <p>By documenting and systematizing this collective wisdom, the community began developing protocols tailored to their specific context. They mapped evacuation routes, identified natural high grounds, established communication systems, and designated responsibilities based on people's existing roles and skills.</p>
      
      <h3>Results That Save Lives</h3>
      <p>When the 2022 floods arrived, the impact of this preparation was dramatic:</p>
      <ul>
        <li>Zero casualties in Char Bhangapur, compared to seven deaths during similar flooding in 2020</li>
        <li>93% of vulnerable residents (elderly, pregnant women, children, people with disabilities) evacuated before floodwaters reached dangerous levels</li>
        <li>Community food security maintained throughout the three-week flood period</li>
        <li>Recovery period reduced by 65% compared to previous floods</li>
      </ul>
      
      <p>Perhaps most significantly, psychological impacts were markedly different. Post-flood assessments showed reduced trauma and anxiety compared to previous disasters, as residents felt empowered rather than helpless in the face of environmental threats.</p>
      
      <h3>Beyond Disaster Response</h3>
      <p>The Community Resilience Network has created benefits that extend beyond disaster management. The same committees now coordinate other development initiatives, from agricultural cooperatives to educational programs.</p>
      
      <p>"Once people experience their collective power in emergency situations, they begin to see how that same power can transform everyday challenges," explains Mahir Abdullah, Bright Hope's Community Outreach Director.</p>
      
      <p>In Char Bhangapur, the committee that coordinated flood response has gone on to establish a community seed bank, negotiate better prices for local crops, and launch a mobile health clinic that serves neighboring villages.</p>
      
      <h3>A Model for Climate Adaptation</h3>
      <p>As climate change increases the frequency and intensity of flooding across Bangladesh, the Community Resilience Network offers a promising model for adaptation. Unlike centralized disaster response systems that often arrive too late and lack local knowledge, community-led approaches leverage existing social capital and indigenous wisdom.</p>
      
      <p>"External aid will always be important during major disasters," says Jalil, "but our community has discovered that we don't need to wait for heroes to arrive from elsewhere. Sometimes the heroes are already here—they just need to recognize their own capacity and organize."</p>
      
      <p>Bright Hope is now working to expand the Community Resilience Network to 50 additional communities across Bangladesh's northern flood plains, with each implementation adapted to local conditions and social structures. The program's success demonstrates that when it comes to building climate resilience, the most powerful resource may not be money or technology—but the untapped potential of communities discovering their collective power.</p>
    `,
  }
};

// Use the URL slug to dynamically determine which blog post to display
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Get the current slug from the URL params
  const { slug } = params;
  
  // Use the slug to get the appropriate post data, or fall back to the default
  const currentPost = blogPostsData[slug as keyof typeof blogPostsData] || post;

  return (
    <MainLayout>
      <article className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full bg-gray-900 mb-20">
          <Image
            src="https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Blog post hero image"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/main/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Making a Difference: How Small Actions Lead to Big Impact
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm mt-10">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  March 15, 2024
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  5 min read
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg mx-auto space-y-8"
              dangerouslySetInnerHTML={{
                __html: `
                <p>In the heart of rural Bangladesh, Bright Hope has been working with local communities to implement sustainable development projects that empower residents and create lasting change.</p>
                
                <h2 class="mt-12 mb-6">The Power of Community-Led Initiatives</h2>
                <p>Our approach centers on the belief that the most effective solutions come from within communities themselves. By providing resources, training, and support, we enable local leaders to drive projects that address their most pressing needs.</p>
                
                <p>In Patharghata village, a group of women started a microfinance cooperative with initial support from Bright Hope. Today, that cooperative has grown to include over 200 members and has funded the start-up of dozens of small businesses.</p>
                
                <h2 class="mt-12 mb-6">Measuring Real Impact</h2>
                <p>We believe in measuring our success not by the number of projects undertaken, but by the tangible improvements in people's lives. Our impact assessment framework tracks key indicators like:</p>
                
                <ul>
                  <li>Household income growth</li>
                  <li>Educational attainment</li>
                  <li>Access to healthcare</li>
                  <li>Food security</li>
                  <li>Community resilience to natural disasters</li>
                </ul>
                
                <p>Through rigorous monitoring and evaluation, we ensure that our efforts are truly making a difference where it matters most.</p>
                
                <h2 class="mt-12 mb-6">Looking Ahead</h2>
                <p>As we continue our work, we remain committed to our core principles of community empowerment, sustainability, and measurable impact. We invite you to join us in this journey and be part of creating positive change in some of the world's most vulnerable communities.</p>
              `,
              }}
            />
          </div>
        </div>
      </article>
    </MainLayout>
  );
} 