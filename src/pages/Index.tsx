
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Music, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layout/MainLayout";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-16 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Music Rights
            </span>{" "}
            Made Simple
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Find, track, and manage music rights and repertoire with our modern platform.
            Search for songs, writers, publishers, and view ownership splits all in one place.
          </p>
          
          <div className="max-w-md mx-auto w-full pt-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by song title, writer, publisher, ISWC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11"
              />
              <Button type="submit" size="lg">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border rounded-lg p-6 text-center space-y-4 shadow-sm">
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Song Database</h2>
            <p className="text-muted-foreground">
              Search and browse our comprehensive database of songs with full metadata and ownership information.
            </p>
            <Link to="/search?type=songs">
              <Button variant="outline" className="w-full">
                Browse Songs
              </Button>
            </Link>
          </div>
          
          <div className="bg-card border rounded-lg p-6 text-center space-y-4 shadow-sm">
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Writer Credits</h2>
            <p className="text-muted-foreground">
              Find detailed information about songwriters, including their catalogs, IPI numbers, and ownership splits.
            </p>
            <Link to="/search?type=writers">
              <Button variant="outline" className="w-full">
                Find Writers
              </Button>
            </Link>
          </div>
          
          <div className="bg-card border rounded-lg p-6 text-center space-y-4 shadow-sm">
            <div className="bg-primary/10 rounded-full p-3 w-12 h-12 mx-auto flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold">Publisher Data</h2>
            <p className="text-muted-foreground">
              Access publisher information, managed catalogs, and ownership percentage across the repertoire.
            </p>
            <Link to="/search?type=publishers">
              <Button variant="outline" className="w-full">
                View Publishers
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Contributor Portal Callout */}
        <section className="bg-primary/5 border border-primary/10 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Contributor Portal
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Are you a songwriter or publisher? Log in to our contributor portal to manage your catalog, 
              track your songs, and receive important updates about your music rights.
            </p>
          </div>
          <Link to="/login">
            <Button size="lg" className="min-w-[160px]">
              Login or Register
            </Button>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
