import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, BlogPost } from '@/data/blogData';

const categoryLabels: Record<BlogPost['category'], string> = {
  'traffic': 'Traffic Tickets',
  'ltb': 'Landlord & Tenant',
  'small-claims': 'Small Claims Court',
  'employment': 'Employment',
  'general': 'General'
};

const categoryColors: Record<BlogPost['category'], string> = {
  'traffic': 'bg-red-100 text-red-800',
  'ltb': 'bg-blue-100 text-blue-800',
  'small-claims': 'bg-green-100 text-green-800',
  'employment': 'bg-purple-100 text-purple-800',
  'general': 'bg-gray-100 text-gray-800'
};

export default function BlogListPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="bg-secondary py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-primary font-paragraph text-sm tracking-widest uppercase mb-4 block">
            Legal Resources
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
            LegalAssist Blog
          </h1>
          <p className="font-paragraph text-white/70 text-lg max-w-2xl mx-auto">
            Practical legal information for Ontario residents. Traffic tickets, landlord-tenant issues, small claims court, and more.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white rounded-2xl border border-secondary/10 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                      {categoryLabels[post.category]}
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-heading text-xl text-secondary mb-3 hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="font-paragraph text-secondary/70 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-secondary/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-CA', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl text-secondary mb-4">
            Have a Legal Question?
          </h2>
          <p className="font-paragraph text-secondary/70 mb-6">
            Get a free consultation with a licensed paralegal. We're here to help.
          </p>
          <a 
            href="tel:+13658829515"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-paragraph"
          >
            Call 365-882-9515
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
