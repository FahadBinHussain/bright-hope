import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

// Blog post data
const post = {
  title: "Sustainable Development in Challenging Environments",
  excerpt: "Innovative approaches to sustainable agriculture in climate-vulnerable regions of Bangladesh",
  image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  author: {
    name: "Dr. Asif Khan",
    role: "Agricultural Program Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  date: "August 15, 2023",
  readTime: "9 min read",
  content: `
    <h2>Climate-Resilient Agriculture in Bangladesh</h2>
    <p>The flat, fertile lands of Bangladesh's river deltas have long been the country's agricultural heartland. But with rising sea levels, increasing salinity, and more frequent extreme weather events, traditional farming methods are becoming increasingly untenable for many rural communities.</p>
    
    <p>In Barisal district, where brackish water has begun to infiltrate previously fertile farmland, Bright Hope launched the Climate-Resilient Agriculture Initiative in 2019. Rather than viewing the changing conditions as simply a challenge to overcome, the program took an innovative approach: adapting traditional practices while introducing new techniques specifically suited to the evolving environment.</p>
    
    <h2>Saline-Resistant Cultivation</h2>
    <p>"When saltwater first reached my fields, I thought my family's farming legacy was finished," explains Karim, a third-generation farmer from Patuakhali. "Now I'm growing more food than my father ever did, just in different ways."</p>
    
    <p>The transformation of Karim's farm exemplifies the program's comprehensive approach:</p>
    <ul>
      <li><strong>Crop Selection:</strong> Introduction of salt-tolerant rice varieties developed by Bangladeshi agricultural researchers</li>
      <li><strong>Field Design:</strong> Implementation of raised bed farming with strategic drainage systems</li>
      <li><strong>Soil Management:</strong> Application of organic matter to improve soil structure and reduce salt absorption</li>
      <li><strong>Water Management:</strong> Construction of small-scale rainwater harvesting systems</li>
      <li><strong>Diversification:</strong> Integration of aquaculture in areas too saline for crop production</li>
    </ul>
    
    <h2>Community Knowledge Networks</h2>
    <p>While technical innovations were important, equally crucial was the program's approach to knowledge sharing. Instead of positioning outside experts as the sole authorities, Bright Hope established Farmer Field Schools where traditional knowledge was valued alongside scientific research.</p>
    
    <p>Local farmers with generations of experience were paired with agricultural specialists to jointly develop solutions. Regular field days allowed community members to observe different techniques in practice, while a digital platform enabled farmers to document and share their experiments.</p>
    
    <p>"We found that when farmers are treated as innovators rather than just recipients of aid, the rate of adoption for new practices increases dramatically," notes Dr. Asif Khan, who leads the program. "They adapt the techniques to their specific contexts in ways we might never have considered."</p>
    
    <h2>Integrating Market Access</h2>
    <p>Technical solutions alone aren't enough to ensure sustainable livelihoods. The program also addressed the critical question of market access, particularly important for crops that were new to the region.</p>
    
    <p>Working with local entrepreneurs, Bright Hope helped establish processing facilities for value-added products from climate-resilient crops. A cooperative marketing approach gave smallholder farmers greater bargaining power when selling to urban markets. And partnerships with grocery delivery services in Dhaka created reliable demand for sustainably grown produce.</p>
    
    <h2>Measurable Impact</h2>
    <p>Four years into the program, the results are encouraging:</p>
    <ul>
      <li>Average yields have increased by 32% despite increasingly challenging environmental conditions</li>
      <li>Household incomes among participating farmers have risen by 27%</li>
      <li>Soil testing shows reduced salinity levels in treated fields</li>
      <li>86% of participating farmers report greater confidence in their ability to adapt to future climate changes</li>
      <li>Food security indicators have improved across all participating communities</li>
    </ul>
    
    <h2>Beyond Agriculture: Environmental Regeneration</h2>
    <p>The program's vision extends beyond simply maintaining agricultural productivity in the face of climate change. Increasingly, participants are implementing practices that actively regenerate the local environment.</p>
    
    <p>Along the coast, farmers have planted over 20,000 mangrove trees that serve as natural barriers against storm surges while creating habitat for marine life. Agroforestry systems integrate fruit and timber trees that sequester carbon while providing additional income sources. And the reestablishment of traditional crop rotation practices has improved soil health across the region.</p>
    
    <h2>Scaling Through Policy</h2>
    <p>As the Climate-Resilient Agriculture Initiative demonstrates its effectiveness, Bright Hope has begun working with national agricultural institutions to incorporate successful approaches into broader policy frameworks. Training programs for government extension workers now include components on saline-resistant farming, and national agricultural universities have established research partnerships with farmer innovators from the program.</p>
    
    <p>"What we're seeing is a shift away from the idea that climate adaptation is about grand infrastructure projects or relocating communities," reflects Khan. "Sometimes the most effective approaches build on existing knowledge, adding targeted innovations that help communities thrive even as conditions change."</p>
    
    <p>For Karim and thousands of farmers like him across Bangladesh's coastal regions, this integrated approach has transformed a crisis into an opportunity for innovation—ensuring that traditional agricultural livelihoods can continue even in a changing climate.</p>
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
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-3xl relative animate-fade-in-up">
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
                    alt={`${post.author.name}'s profile picture`}
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
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Climate-Resilient Agriculture</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Saline-Resistant Cultivation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Knowledge Networks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Market Access</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Environmental Regeneration</a></li>
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
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                    alt="Farmers working in saline-resistant rice fields"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-4 text-sm italic">Farmers in Patuakhali district tending to saline-resistant rice varieties (2023)</p>
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
                  When farmers are treated as innovators rather than just recipients of aid, the rate of adoption for new practices increases dramatically.
                </blockquote>
                <cite className="block mt-4 text-right text-gray-600 font-semibold">— Dr. Asif Khan, Agricultural Program Director</cite>
              </div>
              
              {/* Stats visualization */}
              <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">32%</div>
                  <div className="text-sm text-gray-600">Yield Increase</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">27%</div>
                  <div className="text-sm text-gray-600">Income Growth</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">20K+</div>
                  <div className="text-sm text-gray-600">Mangroves Planted</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600">86%</div>
                  <div className="text-sm text-gray-600">Adaptation Confidence</div>
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
                    <span>15 Comments</span>
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
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">The Power of Community: Stories of Hope and Change</h4>
                      <p className="text-gray-600 line-clamp-2">Join us as we share inspiring stories of communities coming together to create lasting positive change.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/main/blog/education-empowerment" className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80"
                        alt="Education as a Tool for Empowerment"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">Education as a Tool for Empowerment</h4>
                      <p className="text-gray-600 line-clamp-2">Explore how education is transforming lives and creating opportunities in underserved communities.</p>
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