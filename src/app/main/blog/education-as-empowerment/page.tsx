import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

// Blog post data
const post = {
  title: "Education as Empowerment",
  excerpt: "How education initiatives are transforming rural communities in Bangladesh",
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  author: {
    name: "Nasreen Ahmed",
    role: "Education Program Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
  },
  date: "November 5, 2023",
  readTime: "7 min read",
  content: `
    <h2>Breaking the Cycle: Education in Rural Bangladesh</h2>
    <p>In the remote villages of rural Bangladesh, education has traditionally been a luxury rather than a right. Families struggling with poverty often prioritize immediate survival needs over long-term educational investments. Girls, in particular, face additional barriers as cultural norms and early marriage practices can cut their educational journeys short.</p>
    
    <p>Yet, in the past five years, a remarkable transformation has been taking place in these communities. School attendance rates have risen by 35%, girls&apos; dropout rates have decreased by 42%, and more young people than ever are pursuing higher education and vocational training. Behind these statistics lies a story of community-driven change supported by Bright Hope&apos;s Education Empowerment Initiative.</p>
    
    <h2>Beyond Traditional Classrooms</h2>
    <p>The initiative began with a crucial insight: educational challenges in these communities weren&apos;t simply about access to schools but were intertwined with economic realities, cultural beliefs, and practical barriers. A holistic approach was needed.</p>
    
    <p>"We realized that simply building more schools wouldn&apos;t address the root causes of educational inequality," explains Tahmina Rahman, a local teacher who has been with the program since its inception. "We needed to make education relevant, accessible, and valuable to families facing multiple pressures."</p>
    
    <h2>Five Pillars of Educational Transformation</h2>
    <p>The Education Empowerment Initiative operates through five interconnected strategies:</p>
    <ul>
      <li><strong>Flexible Learning Models:</strong> Mobile classrooms and adaptive schedules work around agricultural seasons and family responsibilities, making education compatible with rural life</li>
      <li><strong>Economic Support Systems:</strong> Stipends and income-generating activities for families help offset the opportunity cost of sending children to school</li>
      <li><strong>Community Education Champions:</strong> Local volunteers who advocate for education and support families in navigating educational decisions</li>
      <li><strong>Practical Curriculum Enhancement:</strong> Integrating practical skills with academic knowledge to demonstrate immediate relevance</li>
      <li><strong>Technology Access:</strong> Solar-powered digital learning hubs providing wider educational resources and connecting rural students to the global knowledge economy</li>
    </ul>
    
    <h2>Success Stories</h2>
    <p>Seventeen-year-old Samira embodies the impact of these approaches. Three years ago, she was on the verge of dropping out as her family couldn&apos;t justify continuing her education when she could be contributing to household income. Through the program&apos;s economic support system, her family received assistance establishing a small poultry business, which now provides stable income.</p>
    
    <p>Meanwhile, the flexible learning model allowed Samira to help with the business while continuing her studies. Today, she&apos;s preparing for university entrance exams and plans to study agricultural science to bring new sustainable farming practices back to her community.</p>
    
    <h2>Measuring Impact</h2>
    <p>The program&apos;s success is reflected in multiple metrics:</p>
    <ul>
      <li>School attendance up 35% across participating communities</li>
      <li>Girls&apos; dropout rate decreased by 42%</li>
      <li>78% of participants report improved attitudes toward education&apos;s value</li>
      <li>63% increase in students pursuing post-secondary education</li>
      <li>Local teachers reporting higher job satisfaction and reduced turnover</li>
    </ul>
    
    <h2>The Multiplier Effect</h2>
    <p>Perhaps most significantly, education is creating a multiplier effect in these communities. As the first generation of extensively educated youth emerges, they&apos;re bringing new skills, connections, and perspectives back to their villages.</p>
    
    <p>"We&apos;re seeing young people return after technical training to start small businesses, improve agricultural practices, and even establish health initiatives," notes Bright Hope&apos;s Regional Director. "They&apos;re becoming agents of positive change, creating opportunities that simply didn&apos;t exist before."</p>
    
    <p>This regenerative cycle is at the heart of Bright Hope&apos;s vision: investing in education not as an end in itself, but as a catalyst for comprehensive community development led by empowered local individuals.</p>
    
    <h2>Expanding the Model</h2>
    <p>With proven success in the initial 12 villages, the model is now expanding to 20 additional communities, with adaptations based on lessons learned. Each new community benefits from the experience of early adopters, with local leaders from successful villages serving as mentors and advocates.</p>
    
    <p>As the program scales, it maintains its core principle: education must be shaped by and for the communities it serves. By continuing to listen to local voices and adapt to specific needs, the Education Empowerment Initiative aims to create lasting change that extends far beyond the classroom.</p>
  `
};

export default function BlogPostPage() {
  return (
    <MainLayout>
      {/* Enhanced Hero Section with Parallax Effect */}
      <section className="relative h-[70vh] bg-gray-900 text-white overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-10000 transform scale-110 animate-subtle-zoom"
            priority
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-3xl relative animate-fade-in-up">
                <div className="absolute -top-8 right-0 bg-yellow-500 text-black px-4 py-1 rounded-full font-bold flex items-center z-10 shadow-lg transform rotate-2">
                  <Star className="w-4 h-4 mr-1" /> <TrendingUp className="w-4 h-4 mr-1" /> FEATURED STORY
                </div>
                <Link
                  href="/main/blog"
                  className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-all duration-300 hover:translate-x-[-5px]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{post.title}</h1>
                <p className="text-xl text-white/90 mb-6 max-w-2xl">{post.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-white/80">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
          </svg>
        </div>
      </section>

      {/* Content Section with Enhanced Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author banner with animation */}
          <div className="max-w-4xl mx-auto mb-12 bg-white rounded-xl shadow-xl p-6 transform -translate-y-20 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={post.author.image}
                    alt={`${post.author.name}&apos;s profile picture`}
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl">{post.author.name}</div>
                  <div className="text-gray-600">{post.author.role}</div>
                </div>
              </div>
              
              {/* Social sharing buttons */}
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Table of contents - appears on desktop */}
            <div className="hidden lg:block fixed left-[calc(50%+400px)] top-40 w-64 border-l-2 border-gray-200 pl-6 animate-fade-in">
              <h3 className="font-bold text-lg mb-4">Contents</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Breaking the Cycle</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Beyond Traditional Classrooms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Five Pillars of Transformation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Success Stories</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Expanding the Model</a></li>
              </ul>
            </div>
            
            {/* Main content with enhanced typography and features */}
            <article className="prose prose-lg lg:prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-li:leading-relaxed prose-a:text-primary">
              <div
                className="animate-fade-in"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Featured image in content */}
              <div className="my-12 animate-fade-in">
                <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                  <Image 
                    src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80"
                    alt="Students in a classroom in rural Bangladesh"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-4 text-sm italic">Students participate in an interactive learning session at one of the program&apos;s flexible learning centers (2023)</p>
                  </div>
                </div>
              </div>
              
              {/* Pull quote with decorative elements */}
              <div className="my-12 bg-gray-50 border-l-4 border-primary p-6 rounded-r-lg shadow-sm relative overflow-hidden animate-fade-in">
                <div className="absolute -right-2 -top-2 text-primary/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z"/>
                  </svg>
                </div>
                <blockquote className="text-xl italic text-gray-700 relative z-10">
                  We needed to make education relevant, accessible, and valuable to families facing multiple pressures.
                </blockquote>
                <cite className="block mt-4 text-right text-gray-600 font-semibold">— Tahmina Rahman, Local Teacher</cite>
              </div>
              
              {/* Stats visualization */}
              <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">35%</div>
                  <div className="text-sm text-gray-600">Attendance Increase</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">42%</div>
                  <div className="text-sm text-gray-600">Dropout Reduction</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-gray-600">Improved Attitudes</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600">63%</div>
                  <div className="text-sm text-gray-600">Higher Education</div>
                </div>
              </div>
            </article>
            
            {/* Interactive engagement section */}
            <div className="border-t border-gray-200 pt-8 mt-12 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>87 Likes</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>12 Comments</span>
                  </button>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Share This Story
                </button>
              </div>
              
              {/* Related articles */}
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Continue Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/main/blog/power-of-community" className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="The Power of Community"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">The Power of Community: Disaster Response in Bangladesh</h4>
                      <p className="text-gray-600 line-clamp-2">Learn how community-led disaster response is saving lives in flood-prone regions of Bangladesh.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/main/blog/sustainable-development" className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1464297162474-b353d59b0e81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Sustainable Development"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">Sustainable Development in Challenging Environments</h4>
                      <p className="text-gray-600 line-clamp-2">Learn about our innovative approaches to sustainable agriculture in climate-vulnerable regions.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Stay Updated on Our Work</h3>
            <p className="text-gray-600 mb-6">Join our newsletter to receive stories of hope and impact directly in your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 