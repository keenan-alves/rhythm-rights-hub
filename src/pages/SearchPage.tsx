
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchFilters } from "@/components/music/SearchFilters";
import { SongCard } from "@/components/music/SongCard";
import { ContributorPill } from "@/components/music/ContributorPill";
import { SearchFiltersType, SearchResult, Song } from "@/types/music";

// Mock data for demonstration - would be replaced with API calls to Supabase
const MOCK_SONGS: Song[] = [
  {
    id: "1",
    title: "Moonlight Sonata",
    iswc: "T-123456789-0",
    writers: [
      { id: "w1", name: "Ludwig van Beethoven", type: "writer" }
    ],
    publishers: [
      { id: "p1", name: "Classical Music Publishing", type: "publisher" }
    ],
    splits: [
      { 
        id: "s1", 
        song_id: "1", 
        contributor: { id: "w1", name: "Ludwig van Beethoven", type: "writer" }, 
        percentage: 75 
      },
      { 
        id: "s2", 
        song_id: "1", 
        contributor: { id: "p1", name: "Classical Music Publishing", type: "publisher" }, 
        percentage: 25 
      }
    ],
    audio_preview: "https://example.com/audio/moonlight_sonata.mp3"
  },
  {
    id: "2",
    title: "Bohemian Rhapsody",
    iswc: "T-987654321-0",
    writers: [
      { id: "w2", name: "Freddie Mercury", type: "writer" }
    ],
    publishers: [
      { id: "p2", name: "Queen Music Ltd", type: "publisher" }
    ],
    splits: [
      { 
        id: "s3", 
        song_id: "2", 
        contributor: { id: "w2", name: "Freddie Mercury", type: "writer" }, 
        percentage: 70 
      },
      { 
        id: "s4", 
        song_id: "2", 
        contributor: { id: "p2", name: "Queen Music Ltd", type: "publisher" }, 
        percentage: 30 
      }
    ],
    audio_preview: "https://example.com/audio/bohemian_rhapsody.mp3"
  },
  {
    id: "3",
    title: "Yesterday",
    iswc: "T-456789123-0",
    writers: [
      { id: "w3", name: "Paul McCartney", type: "writer" },
      { id: "w4", name: "John Lennon", type: "writer" }
    ],
    publishers: [
      { id: "p3", name: "Sony/ATV Music Publishing", type: "publisher" }
    ],
    splits: [
      { 
        id: "s5", 
        song_id: "3", 
        contributor: { id: "w3", name: "Paul McCartney", type: "writer" }, 
        percentage: 50 
      },
      { 
        id: "s6", 
        song_id: "3", 
        contributor: { id: "w4", name: "John Lennon", type: "writer" }, 
        percentage: 20 
      },
      { 
        id: "s7", 
        song_id: "3", 
        contributor: { id: "p3", name: "Sony/ATV Music Publishing", type: "publisher" }, 
        percentage: 30 
      }
    ],
    audio_preview: "https://example.com/audio/yesterday.mp3"
  },
  {
    id: "4",
    title: "Shape of You",
    iswc: "T-135792468-0",
    writers: [
      { id: "w5", name: "Ed Sheeran", type: "writer" },
      { id: "w6", name: "Steve Mac", type: "writer" }
    ],
    publishers: [
      { id: "p4", name: "Warner Chappell Music", type: "publisher" }
    ],
    splits: [
      { 
        id: "s8", 
        song_id: "4", 
        contributor: { id: "w5", name: "Ed Sheeran", type: "writer" }, 
        percentage: 60 
      },
      { 
        id: "s9", 
        song_id: "4", 
        contributor: { id: "w6", name: "Steve Mac", type: "writer" }, 
        percentage: 10 
      },
      { 
        id: "s10", 
        song_id: "4", 
        contributor: { id: "p4", name: "Warner Chappell Music", type: "publisher" }, 
        percentage: 30 
      }
    ],
    audio_preview: "https://example.com/audio/shape_of_you.mp3"
  }
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<SearchFiltersType>({
    type: (searchParams.get("type") as any) || "songs",
  });
  const [searchResults, setSearchResults] = useState<SearchResult>({
    songs: [],
    writers: [],
    publishers: [],
    totalResults: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("q", searchTerm);
    if (filters.type) newParams.set("type", filters.type);
    
    setSearchParams(newParams);
    
    // Perform search (mock implementation)
    performSearch(searchTerm, filters);
  };
  
  // Filter change handler
  const handleFilterChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (newFilters.type) {
      newParams.set("type", newFilters.type);
    } else {
      newParams.delete("type");
    }
    
    setSearchParams(newParams);
    
    // Refresh search with new filters
    performSearch(searchTerm, newFilters);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    const newFilters = { type: "songs" };
    setFilters(newFilters);
    
    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set("q", searchTerm);
    newParams.set("type", "songs");
    
    setSearchParams(newParams);
    
    // Refresh search with cleared filters
    performSearch(searchTerm, newFilters);
  };
  
  // Mock search implementation
  const performSearch = (query: string, searchFilters: SearchFiltersType) => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Simulate filtering based on search term and filters
      let filteredSongs = [...MOCK_SONGS];
      
      if (query) {
        const lowercaseQuery = query.toLowerCase();
        filteredSongs = filteredSongs.filter(song => 
          song.title.toLowerCase().includes(lowercaseQuery) ||
          song.iswc.toLowerCase().includes(lowercaseQuery) ||
          song.writers?.some(writer => writer.name.toLowerCase().includes(lowercaseQuery)) ||
          song.publishers?.some(publisher => publisher.name.toLowerCase().includes(lowercaseQuery))
        );
      }
      
      // Extract writers and publishers from songs for other search types
      const writers = filteredSongs
        .flatMap(song => song.writers || [])
        .filter((writer, index, self) => 
          index === self.findIndex(w => w.id === writer.id)
        );
      
      const publishers = filteredSongs
        .flatMap(song => song.publishers || [])
        .filter((publisher, index, self) => 
          index === self.findIndex(p => p.id === publisher.id)
        );
      
      const results: SearchResult = {
        songs: filteredSongs,
        writers: writers,
        publishers: publishers,
        totalResults: filteredSongs.length + writers.length + publishers.length
      };
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };
  
  // Run search on mount and when URL params change
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const typeFilter = searchParams.get("type") as any || "songs";
    
    setSearchTerm(query);
    setFilters({ ...filters, type: typeFilter });
    
    performSearch(query, { ...filters, type: typeFilter });
  }, [searchParams]);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Search Music Database</h1>
          <p className="text-muted-foreground">
            Find songs, writers, publishers and view detailed rights information.
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
            <Input
              type="text"
              placeholder="Search by song title, writer, publisher, ISWC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
            <Button type="submit">
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
        
        <div className="flex items-center justify-between">
          <SearchFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          
          <div className="text-sm text-muted-foreground">
            {isLoading ? (
              "Searching..."
            ) : (
              searchResults.totalResults > 0 ? (
                `${searchResults.totalResults} results found`
              ) : (
                "No results found"
              )
            )}
          </div>
        </div>
        
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="flex items-end gap-1">
                <div className="w-1 h-5 bg-primary rounded-full animate-pulse"></div>
                <div className="w-1 h-8 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          ) : (
            <>
              {/* Display results based on filter type */}
              {filters.type === "songs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.songs && searchResults.songs.length > 0 ? (
                    searchResults.songs.map(song => (
                      <SongCard key={song.id} song={song} />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <Music className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No songs found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {filters.type === "writers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.writers && searchResults.writers.length > 0 ? (
                    searchResults.writers.map(writer => (
                      <div key={writer.id} className="music-card p-4">
                        <div className="flex gap-3 items-start">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {writer.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">{writer.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <ContributorPill 
                                contributor={writer}
                                type="writer"
                              />
                              {writer.ipi_number && (
                                <span className="code-text">
                                  IPI: {writer.ipi_number}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <User className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No writers found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {filters.type === "publishers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.publishers && searchResults.publishers.length > 0 ? (
                    searchResults.publishers.map(publisher => (
                      <div key={publisher.id} className="music-card p-4">
                        <div className="flex gap-3 items-start">
                          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            {publisher.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium">{publisher.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <ContributorPill 
                                contributor={publisher}
                                type="publisher"
                              />
                              {publisher.ipi_number && (
                                <span className="code-text">
                                  IPI: {publisher.ipi_number}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <Building2 className="h-12 w-12 text-muted-foreground/30 mb-4" />
                      <h3 className="text-lg font-medium">No publishers found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
