import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getRecentPosts, BlogPost } from '@/data/blogData';

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-secondary/5 border-b border-secondary/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-secondary/70 hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </span>
              <span className="flex items-center gap-1 text-sm text-secondary/50">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-CA', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1 text-sm text-secondary/50">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary mb-4">
              {post.title}
            </h1>
            
            <p className="font-paragraph text-lg text-secondary/70">
              {post.description}
            </p>
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none font-paragraph
              prose-headings:font-heading prose-headings:text-secondary
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-secondary/80 prose-p:leading-relaxed
              prose-li:text-secondary/80
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-secondary prose-strong:font-semibold
              prose-ul:my-4 prose-ol:my-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12 pt-10 border-t border-secondary/10">
              <h2 className="font-heading text-2xl text-secondary mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, index) => (
                  <div key={index} className="bg-secondary/5 rounded-xl p-6">
                    <h3 className="font-heading text-lg text-secondary mb-2">
                      {faq.q}
                    </h3>
                    <p className="font-paragraph text-secondary/70">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Box */}
          <div className="mt-12 bg-primary/10 rounded-2xl p-8 text-center">
            <h3 className="font-heading text-2xl text-secondary mb-3">
              Need Help With Your Case?
            </h3>
            <p className="font-paragraph text-secondary/70 mb-6">
              Get a free consultation with a licensed Ontario paralegal.
            </p>
            <a 
              href="tel:+13658829515"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-paragraph font-medium"
            >
              <Phone className="w-5 h-5" />
              Call 365-882-9515
            </a>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12 bg-secondary/5">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-heading text-2xl text-secondary mb-8">
              More Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {recentPosts.slice(0, 2).map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl p-6 border border-secondary/10 hover:shadow-md transition-shadow"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[relatedPost.category]}`}>
                    {categoryLabels[relatedPost.category]}
                  </span>
                  <h3 className="font-heading text-lg text-secondary hover:text-primary transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="font-paragraph text-sm text-secondary/60 mt-2">
                    {relatedPost.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
