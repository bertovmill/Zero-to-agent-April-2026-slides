import Image from "next/image"

export default function AppendixPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Logo Appendix</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Rootly AI Logos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium mb-4">White (for dark backgrounds)</h3>
            <div className="bg-zinc-900 p-8 rounded-lg flex items-center justify-center mb-4">
              <Image 
                src="/logos/rootly-white.svg" 
                alt="Rootly AI Logo White" 
                width={300} 
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>SVG: <code className="bg-secondary px-2 py-0.5 rounded">/logos/rootly-white.svg</code></p>
              <p>PNG: <code className="bg-secondary px-2 py-0.5 rounded">/logos/rootly-white.png</code></p>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium mb-4">Black (for light backgrounds)</h3>
            <div className="bg-white p-8 rounded-lg flex items-center justify-center mb-4">
              <Image 
                src="/logos/rootly-black.svg" 
                alt="Rootly AI Logo Black" 
                width={300} 
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>SVG: <code className="bg-secondary px-2 py-0.5 rounded">/logos/rootly-black.svg</code></p>
              <p>PNG: <code className="bg-secondary px-2 py-0.5 rounded">/logos/rootly-black.png</code></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">MakersLounge Logos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium mb-4">App Icon / Luma Logo</h3>
            <div className="bg-zinc-900 p-8 rounded-lg flex items-center justify-center mb-4">
              <Image 
                src="/logos/makerslounge.png" 
                alt="MakersLounge Logo" 
                width={120} 
                height={120}
                className="h-24 w-24 rounded-xl"
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>PNG: <code className="bg-secondary px-2 py-0.5 rounded">/logos/makerslounge.png</code></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">Vercel Logos</h2>
        <p className="text-muted-foreground">Awaiting logos...</p>
      </section>
    </div>
  )
}
