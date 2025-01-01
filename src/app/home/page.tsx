export default function Home() {
  return (
    <div className="z-10">
      {/* <Navbar /> */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] p-4">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to Revision Master
        </h1>
        <p className="mt-4 text-lg text-accent">
          Your go-to platform for awesome content.
        </p>
        <button className="mt-6 px-6 py-2 bg-button text-foreground rounded-md hover:bg-accent">
          Get Started
        </button>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
