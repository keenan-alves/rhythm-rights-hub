
import { MainLayout } from "@/components/layout/MainLayout";
import { Music, User, Building2, Bookmark } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="space-y-10 py-6">
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            About RhythmRights
          </h1>
          
          <p className="text-lg text-muted-foreground">
            RhythmRights is a modern music rights and repertoire management platform designed to 
            bring transparency and efficiency to music copyright information.
          </p>
        </section>
        
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              We're committed to making music rights information accessible, transparent, 
              and easy to understand. By creating a modern alternative to traditional 
              rights databases, we help songwriters, publishers, and music industry 
              professionals manage their catalogs more effectively.
            </p>
            
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
              <blockquote className="italic text-muted-foreground">
                "Music rights shouldn't be complicated or hidden. Our platform brings clarity 
                and accessibility to an essential part of the music industry."
              </blockquote>
              <p className="mt-4 font-medium">— RhythmRights Team</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card border rounded-lg p-5 text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <Music className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Song Database</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive music catalog with detailed metadata
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-5 text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Writer Credits</h3>
              <p className="text-sm text-muted-foreground">
                Complete songwriter information and ownership details
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-5 text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Publisher Data</h3>
              <p className="text-sm text-muted-foreground">
                Publishing rights and administrative information
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-5 text-center space-y-3">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
                <Bookmark className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Rights Management</h3>
              <p className="text-sm text-muted-foreground">
                Transparent ownership splits and visualizations
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-6 max-w-3xl">
          <h2 className="font-display text-3xl font-semibold">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">What is RhythmRights?</h3>
              <p className="text-muted-foreground">
                RhythmRights is a modern music rights database that provides comprehensive 
                information about songs, songwriters, publishers, and ownership splits.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Who can use RhythmRights?</h3>
              <p className="text-muted-foreground">
                Our platform is designed for songwriters, music publishers, and industry 
                professionals who need to access or manage music ownership information.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">How does the contributor portal work?</h3>
              <p className="text-muted-foreground">
                The contributor portal is a secure area where verified songwriters and publishers 
                can log in to manage their catalog, view their songs, and receive important alerts 
                about their music rights.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">How is this different from other music rights databases?</h3>
              <p className="text-muted-foreground">
                RhythmRights offers a modern, intuitive interface with visual representations of 
                ownership splits, integrated audio previews, and a mobile-first design that makes 
                accessing music rights information easier than ever.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-card border rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Get Started Today
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Search our database or log in to the contributor portal to manage your music catalog.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/search" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors text-center">
              Search Database
            </a>
            <a href="/login" className="bg-card border px-6 py-2 rounded-md hover:bg-muted/30 transition-colors text-center">
              Contributor Login
            </a>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
