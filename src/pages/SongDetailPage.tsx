
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Music, 
  CalendarDays, 
  Copy,
  ExternalLink
} from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SplitPieChart } from "@/components/music/SplitPieChart";
import { ContributorPill } from "@/components/music/ContributorPill";
import { AudioPlayer } from "@/components/music/AudioPlayer";
import { Song } from "@/types/music";

// Mock data for demonstration - would be replaced with API calls to Supabase
const MOCK_SONGS: Song[] = [
  {
    id: "1",
    title: "Moonlight Sonata",
    alternate_titles: ["Piano Sonata No. 14"],
    iswc: "T-123456789-0",
    writers: [
      { id: "w1", name: "Ludwig van Beethoven", type: "writer", ipi_number: "00012345678" }
    ],
    publishers: [
      { id: "p1", name: "Classical Music Publishing", type: "publisher", ipi_number: "00045678912" }
    ],
    splits: [
      { 
        id: "s1", 
        song_id: "1", 
        contributor: { 
          id: "w1", 
          name: "Ludwig van Beethoven", 
          type: "writer",
          ipi_number: "00012345678"
        }, 
        percentage: 75 
      },
      { 
        id: "s2", 
        song_id: "1", 
        contributor: { 
          id: "p1", 
          name: "Classical Music Publishing", 
          type: "publisher",
          ipi_number: "00045678912" 
        }, 
        percentage: 25 
      }
    ],
    audio_preview: "https://example.com/audio/moonlight_sonata.mp3"
  }
];

const SongDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedText, setCopiedText] = useState("");
  
  // Load song details
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      // Find song by ID
      const foundSong = MOCK_SONGS.find(s => s.id === id);
      if (foundSong) {
        setSong(foundSong);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  // Handle copy to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-40">
          <div className="flex items-end gap-1">
            <div className="w-1 h-5 bg-primary rounded-full animate-pulse"></div>
            <div className="w-1 h-8 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
            <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!song) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <Music className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-display text-2xl font-semibold mb-2">Song Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the song you're looking for.
          </p>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Back Link */}
        <div>
          <Link to="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to search</span>
          </Link>
        </div>
        
        {/* Song Header */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{song.title}</h1>
            <div className="flex flex-wrap gap-2 items-center mb-3">
              {song.writers && song.writers.map(writer => (
                <ContributorPill 
                  key={writer.id} 
                  contributor={writer}
                  type="writer"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Music className="h-3.5 w-3.5" />
                <span>ISWC: {song.iswc}</span>
              </div>
              <button
                onClick={() => copyToClipboard(song.iswc, "ISWC")}
                className="hover:text-foreground"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
              {copiedText === "ISWC" && (
                <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                  Copied!
                </span>
              )}
            </div>
          </div>
          
          {/* Right side - Audio preview */}
          <div className="w-full md:w-80 lg:w-96">
            <AudioPlayer 
              audioUrl={song.audio_preview || ""}
              songTitle={song.title}
            />
          </div>
        </div>
        
        {/* Alternate titles */}
        {song.alternate_titles && song.alternate_titles.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-sm text-muted-foreground">Also known as:</span>
            {song.alternate_titles.map((title, index) => (
              <Badge key={index} variant="outline">
                {title}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Ownership visualization */}
            <div className="bg-card border rounded-lg p-6 my-4">
              <h2 className="font-display text-xl font-semibold mb-4">
                Ownership Split
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <SplitPieChart splits={song.splits || []} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg mb-2">Percentage Breakdown</h3>
                  <div className="space-y-2">
                    {song.splits && song.splits
                      .sort((a, b) => b.percentage - a.percentage)
                      .map(split => (
                        <div 
                          key={split.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <ContributorPill 
                              contributor={split.contributor}
                              type={split.contributor.type}
                              percentage={split.percentage}
                              showPercentage={false}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  split.contributor.type === "writer" 
                                    ? "bg-primary" 
                                    : "bg-accent"
                                }`}
                                style={{ width: `${split.percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-sm">
                              {split.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="contributors" className="space-y-6">
            {/* Writers Section */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">
                Writers
              </h2>
              
              <div className="space-y-4">
                {song.writers && song.writers.map(writer => {
                  // Find writer split
                  const writerSplit = song.splits?.find(
                    split => split.contributor.id === writer.id
                  );
                  
                  return (
                    <div key={writer.id} className="border-b pb-4 last:border-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {writer.name.charAt(0)}
                          </div>
                          <h3 className="font-medium text-lg">{writer.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge>Writer</Badge>
                          {writerSplit && (
                            <Badge variant="outline">
                              {writerSplit.percentage}% share
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {writer.ipi_number && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">IPI:</span>
                            <span className="code-text">{writer.ipi_number}</span>
                            <button
                              onClick={() => copyToClipboard(writer.ipi_number || "", "IPI")}
                              className="hover:text-foreground"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            {copiedText === "IPI" && (
                              <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                                Copied!
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Publishers Section */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">
                Publishers
              </h2>
              
              <div className="space-y-4">
                {song.publishers && song.publishers.map(publisher => {
                  // Find publisher split
                  const publisherSplit = song.splits?.find(
                    split => split.contributor.id === publisher.id
                  );
                  
                  return (
                    <div key={publisher.id} className="border-b pb-4 last:border-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            {publisher.name.charAt(0)}
                          </div>
                          <h3 className="font-medium text-lg">{publisher.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Publisher</Badge>
                          {publisherSplit && (
                            <Badge variant="outline">
                              {publisherSplit.percentage}% share
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {publisher.ipi_number && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">IPI:</span>
                            <span className="code-text">{publisher.ipi_number}</span>
                            <button
                              onClick={() => copyToClipboard(publisher.ipi_number || "", "Publisher IPI")}
                              className="hover:text-foreground"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            {copiedText === "Publisher IPI" && (
                              <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                                Copied!
                              </span>
                            )}
                          </div>
                        )}
                        
                        {publisher.contact_url && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Contact:</span>
                            <a 
                              href={publisher.contact_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary flex items-center gap-1 hover:underline"
                            >
                              <span>Website</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            {/* Technical details */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">
                Technical Information
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ISWC</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="code-text text-base">{song.iswc}</p>
                      <button
                        onClick={() => copyToClipboard(song.iswc, "ISWC Details")}
                        className="hover:text-foreground"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      {copiedText === "ISWC Details" && (
                        <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                          Copied!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      International Standard Musical Work Code
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total Writers</h3>
                      <p className="mt-1 font-medium">
                        {song.writers?.length || 0}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total Publishers</h3>
                      <p className="mt-1 font-medium">
                        {song.publishers?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SongDetailPage;
