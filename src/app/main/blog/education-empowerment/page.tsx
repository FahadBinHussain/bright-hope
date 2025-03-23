import Image from "next/image";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

// Blog post data
const post = {
  title: "Education as a Tool for Empowerment",
  excerpt: "Transforming lives and creating opportunities through accessible education in underserved communities",
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1122&q=80",
  author: {
    name: "Tanvir Ahmed",
    role: "Education Program Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  date: "September 28, 2023",
  readTime: "10 min read",
  content: `
    <h2>Breaking Barriers to Education in Rural Bangladesh</h2>
    <p>In the remote village of Nilphamari in northern Bangladesh, 14-year-old Aisha used to walk three hours each way to attend the nearest secondary school. During monsoon season, when roads often flooded, she would miss weeks of classes. Her story is not unique – across rural Bangladesh, geographic isolation, economic pressures, and social barriers prevent millions of children, especially girls, from completing their education.</p>
    
    <p>When Bright Hope established its Education Outreach Program in Nilphamari district in 2020, we didn&apos;t start by building schools. Instead, we began by listening to community members like Aisha and her family about the specific barriers they faced.</p>
    
    <h2>Beyond Access: Quality and Relevance</h2>
    <p>The challenges extended beyond physical access. Many parents questioned the value of education when the curriculum seemed disconnected from local economic opportunities. Teachers struggled with large class sizes and limited resources. And students who did manage to attend school regularly often found themselves memorizing facts rather than developing critical thinking skills.</p>
    
    <p>"We realized that simply focusing on enrollment numbers wouldn&apos;t address the deeper issues," explains Tanvir Ahmed, our Education Program Director. "We needed to improve the quality and relevance of education while making it more accessible."</p>
    
    <h2>Community Learning Hubs: A New Approach</h2>
    <p>Rather than duplicating the traditional school model, Bright Hope developed Community Learning Hubs – flexible spaces that serve multiple educational functions. Located within villages, these hubs eliminate long commutes and provide safe spaces for learning during all seasons.</p>
    
    <p>Each hub features:</p>
    <ul>
      <li><strong>Supplementary Classes:</strong> Supporting formal school curriculum with smaller class sizes and personalized attention</li>
      <li><strong>Digital Learning Stations:</strong> Tablets and computers with educational content that can be accessed offline</li>
      <li><strong>Vocational Training:</strong> Practical skills development for older students and young adults</li>
      <li><strong>Adult Literacy Programs:</strong> Evening classes for parents and community members</li>
      <li><strong>Early Childhood Development:</strong> Programs for younger siblings, allowing older girls to attend school rather than providing childcare</li>
    </ul>
    
    <h2>Teacher Training and Curriculum Development</h2>
    <p>Recognizing that educational quality depends heavily on teachers, we invested in comprehensive teacher training programs. Local educators receive ongoing professional development in student-centered learning approaches, digital literacy, and inclusive education practices.</p>
    
    <p>In partnership with education experts and community members, we&apos;ve also developed supplementary learning materials that connect national curriculum requirements with local contexts. Mathematics is taught through examples relevant to local agriculture and small businesses. Science lessons incorporate local environmental challenges and solutions.</p>
    
    <h2>Measuring Impact: Beyond Enrollment</h2>
    <p>Three years into the program, the results are promising:</p>
    <ul>
      <li>School attendance has increased by 78% among participating communities</li>
      <li>Girls&apos; secondary school completion rates have improved from 36% to 67%</li>
      <li>Standardized test scores in core subjects have improved by an average of 42%</li>
      <li>87% of parents report greater satisfaction with their children&apos;s education</li>
      <li>Youth unemployment in communities with vocational training has decreased by 23%</li>
    </ul>
    
    <h2>Aisha&apos;s Story Continues</h2>
    <p>Today, Aisha attends the Community Learning Hub in her village each morning for two hours of supplementary lessons. She then walks 30 minutes to a newly established satellite secondary school – a partnership between Bright Hope, the local government, and community members.</p>
    
    <p>"I used to be so tired from walking that I couldn&apos;t focus in class," she says. "Now I have energy to participate. I&apos;m learning computer skills too, and I want to study information technology after I graduate."</p>
    
    <p>Her mother, previously skeptical about the value of education beyond basic literacy, has enrolled in evening classes herself. "I see how education is changing, becoming more useful for our lives," she explains. "I want to be able to help my daughter with her studies and maybe start a small business using what I learn."</p>
    
    <h2>Scaling and Sustainability</h2>
    <p>The Community Learning Hub model has proven both effective and economically sustainable. Operating costs are significantly lower than traditional schools, and community ownership ensures longevity beyond initial NGO involvement.</p>
    
    <p>The program now operates in 12 communities across three districts, with plans to expand to 25 communities by 2025. Local governments have begun adopting elements of the model, particularly the teacher training components and the approach to making curriculum locally relevant.</p>
    
    <p>"Education is not just about transferring information," says Ahmed. "It&apos;s about empowering communities to identify and solve their own challenges. When education connects to real life and creates tangible opportunities, it transforms not just individual lives but entire communities."</p>
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
            style={{ objectPosition: "center 40%" }}
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
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Breaking Barriers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Quality and Relevance</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Community Learning Hubs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Teacher Training</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Measuring Impact</a></li>
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
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Students at a Community Learning Hub"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <p className="text-white p-4 text-sm italic">Students at a Community Learning Hub in Nilphamari district using digital learning resources (2023)</p>
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
                  Education is not just about transferring information. It&apos;s about empowering communities to identify and solve their own challenges.
                </blockquote>
                <cite className="block mt-4 text-right text-gray-600 font-semibold">— Tanvir Ahmed, Education Program Director</cite>
              </div>
              
              {/* Stats visualization */}
              <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">78%</div>
                  <div className="text-sm text-gray-600">Attendance Increase</div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">67%</div>
                  <div className="text-sm text-gray-600">Girls&apos; Completion Rate</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">42%</div>
                  <div className="text-sm text-gray-600">Test Score Improvement</div>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600">23%</div>
                  <div className="text-sm text-gray-600">Youth Employment Gain</div>
                </div>
              </div>
            </article>
            
            {/* Interactive engagement section */}
            <div className="border-t border-gray-200 pt-8 mt-12 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>112 Likes</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>31 Comments</span>
                  </button>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Share This Story
                </button>
              </div>
              
              {/* Related articles */}
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Continue Reading</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/main/blog/making-a-difference" className="group">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full">
                      <Image 
                        src="https://images.unsplash.com/photo-1469571486292-b53601010376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="Making a Difference"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">Making a Difference: How Small Actions Create Big Impact</h4>
                      <p className="text-gray-600 line-clamp-2">Discover how a coastal community in Bangladesh is transforming itself through grassroots initiatives.</p>
                    </div>
                  </div>
                </Link>
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