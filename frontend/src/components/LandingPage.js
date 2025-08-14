import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Shield, 
  Smartphone, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  Zap,
  Target,
  TrendingDown
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-primary-600" />,
      title: "Track Income & Expenses",
      description: "Easily add, edit, and categorize your financial transactions with our intuitive interface."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success-600" />,
      title: "Real-time Balance",
      description: "See your current financial status at a glance with live balance calculations."
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary-600" />,
      title: "Visual Reports",
      description: "Beautiful charts and graphs to visualize your spending patterns and income trends."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-success-600" />,
      title: "Monthly & Weekly Reports",
      description: "Detailed reports to help you understand your financial habits over time."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Secure & Private",
      description: "Your financial data is protected with industry-standard security measures."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-success-600" />,
      title: "Responsive Design",
      description: "Access your finances from any device - desktop, tablet, or mobile."
    }
  ];

  const benefits = [
    "Complete transaction management",
    "Category-based organization",
    "Interactive charts and visualizations",
    "Monthly and weekly financial reports",
    "Secure user authentication",
    "Mobile-responsive interface"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white ml-3">FinanceTracker</h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login" className="px-6 py-2 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Sign In
              </Link>
              <Link to="/register" className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-white/80 text-sm">Trusted by 10,000+ users</span>
                </div>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Take Control of Your
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Financial Future</span>
              </h2>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your financial life with our intelligent tracking system. Visualize spending patterns, 
                set goals, and make data-driven decisions that lead to financial freedom.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Link to="/register" className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="px-8 py-4 text-white border-2 border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                  Sign In
                </Link>
              </div>
              
              <div className="flex justify-center lg:justify-start space-x-8 text-white/60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10K+</div>
                  <div className="text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">$2M+</div>
                  <div className="text-sm">Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99%</div>
                  <div className="text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-xl border border-white/10">
                    <div className="flex items-center">
                      <TrendingUp className="h-8 w-8 text-green-400 mr-3" />
                      <div>
                        <div className="text-white font-semibold">Monthly Income</div>
                        <div className="text-green-400 text-2xl font-bold">$5,420</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-400/20 to-pink-500/20 rounded-xl border border-white/10">
                    <div className="flex items-center">
                      <TrendingDown className="h-8 w-8 text-red-400 mr-3" />
                      <div>
                        <div className="text-white font-semibold">Monthly Expenses</div>
                        <div className="text-red-400 text-2xl font-bold">$3,280</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl border border-white/10">
                    <div className="flex items-center">
                      <Target className="h-8 w-8 text-yellow-400 mr-3" />
                      <div>
                        <div className="text-white font-semibold">Savings Goal</div>
                        <div className="text-yellow-400 text-2xl font-bold">$2,140</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Powerful Features</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Master Your Money</span>
            </h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive suite of intelligent tools helps you track, analyze, and optimize your financial health with precision and ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(feature.icon, { className: "h-6 w-6 text-white" })}
                  </div>
                  <h4 className="text-xl font-semibold text-white ml-4">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20">
                <Award className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-white font-medium">Why Choose Us</span>
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-6">
                Built for
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Financial Success</span>
              </h3>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Experience the perfect blend of cutting-edge technology and intuitive design. 
                Our platform empowers you to make smarter financial decisions every day.
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-1 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/90 group-hover:text-white transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/register" className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Start Your Financial Journey
                </h4>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Join thousands of users who have transformed their financial lives with our intelligent platform.
                </p>
                
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white/10 rounded-2xl p-4 mb-2">
                      <Users className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">10K+</div>
                    </div>
                    <div className="text-sm text-white/60">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-2xl p-4 mb-2">
                      <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">$2M+</div>
                    </div>
                    <div className="text-sm text-white/60">Tracked</div>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/10 rounded-2xl p-4 mb-2">
                      <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">99%</div>
                    </div>
                    <div className="text-sm text-white/60">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Financial Future?</span>
            </h3>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the financial revolution today. Start tracking, analyzing, and optimizing your money with our intelligent platform.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="px-8 py-4 text-white border-2 border-white/30 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center">
                Sign In Now
              </Link>
            </div>
            
            <div className="mt-8 text-white/60 text-sm">
              ✨ No credit card required • Free forever • Setup in 2 minutes
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-lg border-t border-white/10 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl mr-3">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold">FinanceTracker</h4>
          </div>
          
          <div className="text-center text-white/60 space-y-2">
            <p>&copy; 2024 FinanceTracker. All rights reserved.</p>
            <p>Built with ❤️ using React, Node.js, and MongoDB</p>
            <div className="flex justify-center space-x-6 mt-4">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-white transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
